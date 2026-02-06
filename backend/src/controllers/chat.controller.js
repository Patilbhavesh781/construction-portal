import ChatMessage from "../models/ChatMessage.model.js";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAdminUser = async () => {
  const admin = await User.findOne({ role: "admin" }).select("_id name email");
  if (!admin) {
    throw new ApiError(500, "Admin account not found");
  }
  return admin;
};

const emitChatMessage = (req, message, userId) => {
  const io = req.app.get("io");
  if (!io) return;
  io.to(`user:${userId}`).emit("chat:message", message);
  io.to("admin").emit("chat:message", message);
};

export const getThreads = async (req, res, next) => {
  try {
    const admin = await getAdminUser();

    const threads = await ChatMessage.aggregate([
      {
        $match: {
          $or: [{ sender: admin._id }, { recipient: admin._id }],
        },
      },
      {
        $project: {
          userId: {
            $cond: [
              { $eq: ["$sender", admin._id] },
              "$recipient",
              "$sender",
            ],
          },
          text: "$text",
          createdAt: "$createdAt",
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$userId",
          lastMessageAt: { $first: "$createdAt" },
          lastText: { $first: "$text" },
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    const userIds = threads.map((t) => t._id);
    const users = await User.find({ _id: { $in: userIds } })
      .select("name email role")
      .lean();
    const userMap = new Map(users.map((u) => [String(u._id), u]));

    const result = threads
      .map((thread) => {
        const user = userMap.get(String(thread._id));
        if (!user) return null;
        return {
          user,
          lastMessageAt: thread.lastMessageAt,
          lastText: thread.lastText,
        };
      })
      .filter(Boolean);

    res
      .status(200)
      .json(new ApiResponse(200, result, "Threads fetched"));
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const admin = await getAdminUser();
    const isAdmin = req.user?.role === "admin";
    const userId = isAdmin ? req.query.userId : req.user?._id;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const messages = await ChatMessage.find({
      $or: [
        { sender: userId, recipient: admin._id },
        { sender: admin._id, recipient: userId },
      ],
    })
      .populate("sender", "name role")
      .sort({ createdAt: 1 });

    res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched"));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const admin = await getAdminUser();
    const isAdmin = req.user?.role === "admin";
    const { text, userId } = req.body;

    if (!text || !text.trim()) {
      throw new ApiError(400, "Message text is required");
    }

    const targetUserId = isAdmin ? userId : req.user?._id;
    if (!targetUserId) {
      throw new ApiError(400, "userId is required");
    }

    const recipient = isAdmin ? targetUserId : admin._id;

    const message = await ChatMessage.create({
      sender: req.user._id,
      recipient,
      text: text.trim(),
    });

    const populated = await ChatMessage.findById(message._id).populate(
      "sender",
      "name role"
    );

    emitChatMessage(req, populated, targetUserId);

    res
      .status(201)
      .json(new ApiResponse(201, populated, "Message sent"));
  } catch (error) {
    next(error);
  }
};
