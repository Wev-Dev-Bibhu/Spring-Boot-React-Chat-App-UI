import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ScreenApis } from "../Apis/ScreenApis";
import { useSnackbar } from "notistack";

const SignUp = () => {
    const { signUpApi } = ScreenApis();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [signUpFormData, setSignUpFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
    })


    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (signUpFormData.password !== signUpFormData.cpassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const response = await signUpApi({
                fullname: signUpFormData.fullname,
                email: signUpFormData.email,
                password: signUpFormData.password,
            });
            enqueueSnackbar("Signup successful", { variant: response.status });
            navigate("/dashboard");
        } catch (err) {
            console.error("Signup error:", err);
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
                            Create an Account
                        </h2>
                        <p className="mt-4 text-center text-gray-400">
                            Sign up to get started
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
                                        htmlFor="fullname"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        placeholder="Full Name"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        value={signUpFormData.fullname}
                                        onChange={(e) =>
                                            setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-4">
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
                                        value={signUpFormData.email}
                                        onChange={(e) =>
                                            setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
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
                                        value={signUpFormData.password}
                                        onChange={(e) =>
                                            setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
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
                                <div className="mt-4 relative">
                                    <label
                                        className="sr-only"
                                        htmlFor="cpassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        placeholder="Confirm Password"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required
                                        autoComplete="off"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="cpassword"
                                        id="cpassword"
                                        value={signUpFormData.cpassword}
                                        onChange={(e) =>
                                            setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <RemoveRedEyeIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                                        type="checkbox"
                                        name="terms"
                                        id="terms"
                                        required
                                    />
                                    <label
                                        className="ml-2 block text-sm text-gray-400"
                                        htmlFor="terms"
                                    >
                                        I agree to the{" "}
                                        <a
                                            href="/terms"
                                            className="text-indigo-500 hover:text-indigo-400"
                                        >
                                            Terms & Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <div>
                                {error && <p className="text-red-500">{error}</p>}
                                <button
                                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-slate-200 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "cursor-not-allowed" : ""}`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-700 text-center">
                        <span className="text-gray-400">
                            Already have an account?{" "}
                        </span>
                        <Link
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            to="/"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
