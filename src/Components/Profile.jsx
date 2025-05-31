import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { AuthContext } from "../Apis/AuthContext";
import { ScreenApis } from "../Apis/ScreenApis";
import { useSnackbar } from "notistack";

const Profile = () => {
    const { updateUserProfile } = ScreenApis();
    const [activeTab, setActiveTab] = useState("overview");
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    // Profile state
    const [profile, setProfile] = useState(currentUser);
    console.log(profile);


    // Editing state for Overview tab
    const [isEditing, setIsEditing] = useState(false);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "media", label: "Media" },
        { id: "files", label: "Files" },
        { id: "links", label: "Links" },
        { id: "friends", label: "Friends" },
    ];

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const data = await updateUserProfile(profile);
            setCurrentUser(data.data.userData);
            enqueueSnackbar(data.message, { variant: data.status });
            setIsEditing(false);
        } catch (err) {
            console.error("SignIn error:", err);
            enqueueSnackbar(err.message, { variant: err.status });
        } finally {
            // setLoading(false);
        }
    };

    const handleCancel = () => {
        setProfile({ ...currentUser });
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white w-full h-screen shadow-lg overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 bg-gray-800 flex flex-col items-center p-5 space-y-4 pt-12 relative overflow-y-auto">
                {/* Profile Image */}
                <div className="relative grid place-items-center">
                    <div className="w-40 h-40 rounded-full border-4 border-gray-700 overflow-hidden">
                        <img
                            src={profile?.avatar ?? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>

                <h1 className="text-xl font-bold">{profile.fullname}</h1>

                <div className="text-sm space-y-4 flex flex-col mt-4 w-full px-14 pl-20">
                    <div>
                        <p className="font-semibold">About:</p>
                        <p className="mt-2">{profile.about}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Email:</p>
                        <p className="mt-2">{profile.email}</p>
                    </div>
                </div>
            </div>

            {/* Tabs Content */}
            <div className="w-full md:w-2/3">
                {/* Horizontal Tabs */}
                <div className="flex space-x-4 bg-gray-700 px-4 py-3 text-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id
                                ? "text-white border-b-2 border-purple-500"
                                : "text-gray-400"
                                } px-2 py-1 focus:outline-none hover:text-white`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-5">
                    {activeTab === "overview" && (
                        <div>
                            <h2 className="flex text-lg font-semibold mb-4">Update Profile
                                {!isEditing && (
                                    <Tooltip placement="top" title="Edit Profile">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="ml-2 p-1 px-[0.4rem] bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center"
                                        >
                                            <EditIcon style={{ fontSize: 15 }} />
                                        </button>
                                    </Tooltip>
                                )}
                            </h2>
                            <div className="space-y-4">
                                {/* Editable Name */}
                                <div>
                                    <p className="font-semibold">Name:</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profile.fullname}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    fullname: e.target.value,
                                                })
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <p className="mt-2">{profile.fullname}</p>
                                    )}
                                </div>

                                {/* Editable Profile Image */}
                                <div>
                                    <p className="font-semibold">Profile Image URL:</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profile.avatar}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    avatar: e.target.value,
                                                })
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <p className="mt-2">{profile.avatar}</p>
                                    )}
                                </div>

                                {/* Editable About */}
                                <div>
                                    <p className="font-semibold">About:</p>
                                    {isEditing ? (
                                        <textarea
                                            rows={4}
                                            value={profile.about}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    about: e.target.value,
                                                })
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <p className="mt-2">{profile.about}</p>
                                    )}
                                </div>

                                {/* Editable Email */}
                                <div>
                                    <p className="font-semibold">Email:</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <p className="mt-2">{profile.email}</p>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold">Last Updated At:</p>
                                    <p className="mt-2">
                                        {new Date(profile.updated_at).toDateString("en-GB")}
                                        , {new Date(profile.updated_at).toLocaleTimeString("en-GB", { hour12: false })}
                                    </p>
                                </div>
                            </div>

                            {/* Save/Cancel Buttons */}
                            <div className="mt-6 flex space-x-4">
                                {isEditing && (
                                    <>
                                        <Tooltip placement="top" title="Save">
                                            <button
                                                onClick={handleSave}
                                                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center"
                                            >
                                                <DoneIcon />
                                            </button>
                                        </Tooltip>
                                        <Tooltip placement="top" title="Cancel">
                                            <button
                                                onClick={handleCancel}
                                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center"
                                            >
                                                <CloseIcon />
                                            </button>
                                        </Tooltip>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "media" && <div>Media Content</div>}
                    {activeTab === "files" && <div>Files Content</div>}
                    {activeTab === "links" && <div>Links Content</div>}
                    {activeTab === "friends" && <div>Friends Content</div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
