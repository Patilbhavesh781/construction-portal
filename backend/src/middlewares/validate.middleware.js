import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(
    {
      body: req.body,
      query: req.query,
      params: req.params,
    },
    { abortEarly: false }
  );

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }

  next();
};

export default validate;
