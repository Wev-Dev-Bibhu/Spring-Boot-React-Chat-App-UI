import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Apis/AuthContext";

const Settings = () => {
    const { apiUrl, changeBackend } = useContext(AuthContext);
    const [selectedBackend, setSelectedBackend] = useState("");

    const backendOptions = {
        local: "http://localhost:5000",
        render: "https://react-chat-app-node-js-server.onrender.com",
        aws: "https://your-aws-api-url.com",
    };

    // Set initial selection based on current apiUrl
    useEffect(() => {
        const matchedKey = Object.keys(backendOptions).find(
            key => backendOptions[key] === apiUrl
        );
        setSelectedBackend(matchedKey || "local");
    }, [apiUrl]);

    const handleSave = () => {
        changeBackend(selectedBackend);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

                <label className="block mb-2 text-sm font-medium text-gray-300">
                    Select Backend Server
                </label>
                <select
                    value={selectedBackend}
                    onChange={(e) => setSelectedBackend(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {
                        window.location.hostname === "localhost" &&
                        <option value="local">Localhost</option>
                    }
                    <option value="render">Render</option>
                    <option value="aws">AWS</option>
                </select>

                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>

                <div className="mt-4 text-sm text-gray-400 text-center">
                    <p>Current URL:</p>
                    <p className="text-purple-400 break-all">{apiUrl}</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
