"use client";
import { RootState } from "@/lib/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { User2Icon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { setProfile } from "@/lib/features/userSlice";

function Profile() {
  const userData = useSelector((state: RootState) => state.user);
  const [avaterPreview, setAvatarPreview] = useState<string | null>("");
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleAvatarPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAvatarPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      setAvatarFile(() => file);
    }
  };
  const handleRemovePreview = () => {
    setAvatarPreview(null);
    (document.getElementById("avatarUpload") as HTMLInputElement).value = "";
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      toast.error("Please select an image first!");
      return;
    }
    const customFileName = `${
      userData?.email || "default_email"
    }_${Date.now()}`;
    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("public_id", customFileName);
    console.log(formData);
    formData.append("upload_preset", "paradox_ss");
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to upload avatar");
      }
      setAvatarPreview(null);
      dispatch(setProfile({ avatarUrl: data.secure_url }));

      const result = await axios.post(
        "https://creation-web.onrender.com/api/user/uploadAvatar",
        {
          data: data.secure_url,
        },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success("Avatar uploaded successfully");
      } else {
        throw new Error("Failed to update avatar on the server");
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast.error(error?.message || "Failed to upload avatar");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    const nameParts = name?.split(" ");
    const firstLetter = nameParts[0]?.charAt(0).toUpperCase();
    const lastLetter = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase();
    return `${firstLetter}${lastLetter}`;
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col gap-10  bg-white rounded-lg shadow-sm p-5 pl-10 mb-8 h-[600px]">
        <input
          type="file"
          accept="image/*"
          hidden
          id="avatarUpload"
          onChange={handleAvatarPreview}
        />
        <div className="flex  items-center gap-10 relative">
          {avaterPreview || userData.avatarUrl ? (
            <label htmlFor="avatarUpload">
              <Avatar>
                <AvatarImage
                  src={avaterPreview || userData.avatarUrl || ""}
                  className="h-32 w-32 rounded-full object-cover"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <Loading />
                </AvatarFallback>
              </Avatar>
            </label>
          ) : (
            <label
              htmlFor="avatarUpload"
              className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-semibold"
            >
              {userData.username ? (
                getInitials(userData?.username)
              ) : (
                <Loading />
              )}
            </label>
          )}
          {avaterPreview && (
            <div
              onClick={handleRemovePreview}
              className=" bg-red-600 text-white rounded-full p-2 hover:bg-red-600 absolute left-[120px] top-0 cursor-pointer"
            >
              <Trash2Icon size={12} />
            </div>
          )}
          <div className="flex flex-col items-center gap-4 font-medium">
            <label
              htmlFor="avatarUpload"
              className="shadow-sm border transition-colors text-blue-600 px-4 py-2 rounded-lg text-sm mb-2 cursor-pointer hover:bg-blue-600 hover:text-white"
            >
              Change Profile
            </label>
            <button
              onClick={() => setAvatarPreview("")}
              className="text-red-500 transition-colors border px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white"
            >
              Remove Profile
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 space-y-4 mt-5">
          <span className="text-md font-semibold flex gap-3 items-center">
            {" "}
            <User2Icon size={18} /> Personal Information{" "}
          </span>
          <div className="flex items-center gap-10 space-x-2">
            <div>
              <label className="block text-gray-600 text-sm mb-3">
                Username
              </label>
              <input
                type="text"
                value={userData.username || ""}
                className="w-full px-4 py-3 border-2 rounded-lg text-sm focus:outline-none"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-3">Email</label>
              <input
                type="email"
                value={userData.email || ""}
                className="w-full px-4 py-3 border-2 rounded-lg text-sm focus:outline-none"
                disabled={true}
              />
            </div>
          </div>
          {avaterPreview && (
            <div onClick={handleAvatarUpload} className="mt-5">
              <button className="bg-blue-600 font-semibold text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
                {isLoading ? "Saving.." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
