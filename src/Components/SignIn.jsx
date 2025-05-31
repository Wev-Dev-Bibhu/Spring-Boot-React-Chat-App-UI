import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ScreenApis } from "../Apis/ScreenApis";
import { useSnackbar } from "notistack";
import { AuthContext } from "../Apis/AuthContext";


const SignIn = () => {
    const { signInApi } = ScreenApis();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { setCurrentUser } = useContext(AuthContext);



    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [signInFormData, setSignInFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await signInApi(signInFormData);
            setCurrentUser(data.data.userData);
            enqueueSnackbar(data.message, { variant: data.status });
            navigate("/dashboard");
        } catch (err) {
            console.error("SignIn error:", err);
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[100vh] relative">
            <img
                alt="background-image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <div className="max-w-lg w-full relative z-10">
                <div
                    style={{
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Welcome Back
                        </h2>
                        <p className="mt-4 text-center text-gray-400">
                            Sign in to continue
                        </p>
                        <form
                            method="POST"
                            onSubmit={handleSubmitSignUp}
                            className="mt-8 space-y-6"
                        >
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label
                                        className="sr-only"
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        placeholder="Email address"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={signInFormData.email}
                                        onChange={(e) =>
                                            setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-4 relative">
                                    <label
                                        className="sr-only"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        placeholder="Password"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="off"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={signInFormData.password}
                                        onChange={(e) =>
                                            setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value })
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <RemoveRedEyeIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <div className="text-sm">
                                    <a
                                        className="font-medium text-indigo-500 hover:text-indigo-400"
                                        href="/forgot-password"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                {error && <p className="text-red-500">{error}</p>}
                                <button
                                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-slate-200 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "cursor-not-allowed" : ""}`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            to="/signup"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
