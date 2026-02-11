import React, { useEffect, useMemo, useState } from "react";
import { User, Lock } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user, fetchProfile, updateProfile, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const addressText = useMemo(() => {
    const addr = user?.address;
    if (!addr) return "";
    if (typeof addr === "string") return addr;
    const parts = [addr.street, addr.city, addr.state, addr.country, addr.zipCode].filter(Boolean);
    return parts.join(", ");
  }, [user?.address]);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = user || (await fetchProfile());
        if (data) {
          setProfile(data);
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: addressText,
          });
        }
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchProfileData();
    }
  }, [authLoading, fetchProfile, user, addressText]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const updated = await updateProfile({
        name: form.name,
        phone: form.phone,
        address: form.address ? { street: form.address } : undefined,
      });
      const updatedUser = updated?.user || updated;
      setProfile(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if ((loading || authLoading) && !profile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          My Profile
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Account Details
        </h1>
      </section>

      <section className="py-14 px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="bg-white border border-gray-200 p-6 md:p-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-red-50 flex items-center justify-center border border-red-100">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-gray-900">{profile?.name || "-"}</h2>
                <p className="text-gray-600">{profile?.email || "-"}</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border focus:ring-2 focus:ring-red-500 focus:outline-none ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border focus:ring-2 focus:ring-red-500 focus:outline-none ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border focus:ring-2 focus:ring-red-500 focus:outline-none ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="rounded-none uppercase tracking-widest text-xs"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-none uppercase tracking-widest text-xs"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setForm({
                        name: profile?.name || "",
                        email: profile?.email || "",
                        phone: profile?.phone || "",
                        address: addressText,
                      });
                      setIsEditing(false);
                    }}
                    className="rounded-none uppercase tracking-widest text-xs"
                  >
                    Cancel
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                className="ml-auto rounded-none uppercase tracking-widest text-xs"
                to="/forgot-password"
              >
                <Lock className="w-4 h-4 mr-1" />
                Change Password
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default Profile;
