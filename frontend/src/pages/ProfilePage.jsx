import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import profileImg from "../../public/profileImg.jpg";

const ProfilePage = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const url = reader.result;
      setPreviewImg(url);
      await updateProfile({ profilePic: url });
    };
  };

  if (!authUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 font-semibold">Your Profile information</p>
          </div>

          {/* profile image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative ">
              <img
                src={previewImg || authUser?.profilePic || profileImg}
                alt="profile image"
                className="size-32 rounded-full object-cover border-4"
              />

              <label
                htmlFor="profile-pic"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 
                  p-2 rounded-full cursor-pointer transition-all duration-200 
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}>
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  name="profile-pic"
                  id="profile-pic"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Update Profile Photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 border-2 rounded-lg ">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 border-2 rounded-lg ">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="bg-base-300 rounded-xl p-4">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-400">
                <span className="font-semibold text-gray-500">
                  Member Since
                </span>
                <span className="font-semibold text-gray-500">
                  {authUser?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold text-gray-500">
                  Account Status
                </span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
