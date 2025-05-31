import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Cookies from 'universal-cookie';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();


    const [tabState, setTabState] = useState("");

    const handleNavClick = (e) => {
        const route = e.target.value;
        setTabState(route);
        navigate(route);
    };

    useEffect(() => {
        setTabState(window.location.pathname);
    }, []);

    useEffect(() => {
        const cookie = new Cookies()

        if (location.pathname === "/logout") {
            navigate('/')
            cookie.remove('token')
            cookie.remove('userID')
            enqueueSnackbar("Logged out successfully", { variant: "success" })
        }
    }, [enqueueSnackbar, location.pathname, navigate])


    return (
        <div className="w-[80px] h-screen absolute z-10 flex justify-evenly flex-col drop-shadow-md p-2 bg-gray-800">
            <section className="h-[10%] w-full flex justify-center items-center">
                <div className="flex w-fit px-1.25 py-1.25 shadow-box-up rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out">
                    <div className="dark:shadow-buttons-box-dark rounded-2xl w-full px-1.5 py-1.5 md:px-2 md:py-2 bg-purple-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section className="h-[50%] w-full pt-10">
                <article
                    className="w-full h-full ease-in-out duration-500 left-0 inline-block"
                >
                    <label
                        htmlFor="dashboard"
                        className="cursor-pointer has-[:checked]:shadow-lg has-[:checked]:shadow-slate-700 relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center rounded-xl"
                    >
                        <input
                            className="hidden peer/expand"
                            type="radio"
                            value="/dashboard"
                            onChange={(e) => handleNavClick(e)}
                            name="path"
                            checked={tabState === "/dashboard"}
                            id="dashboard"
                        />
                        <Tooltip title="Dashboard" placement="right">
                            <svg
                                className="fill-white peer-hover/expand:scale-125 peer-hover/expand:text-purple-400 peer-hover/expand:fill-purple-400 peer-checked/expand:text-purple-400 peer-checked/expand:fill-purple-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                                ></path>
                            </svg>
                        </Tooltip>
                    </label>
                    <label
                        htmlFor="profile"
                        className="cursor-pointer has-[:checked]:shadow-lg has-[:checked]:shadow-slate-700 relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                    >
                        <input className="hidden peer/expand" type="radio" name="path" id="profile"
                            value="/profile"
                            checked={tabState === "/profile"}
                            onChange={(e) => handleNavClick(e)} />
                        <Tooltip title="Profile" placement="right">
                            <svg
                                className="fill-white peer-hover/expand:scale-125 peer-hover/expand:text-purple-400 peer-hover/expand:fill-purple-400 peer-checked/expand:text-purple-400 peer-checked/expand:fill-purple-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                                ></path>
                            </svg>
                        </Tooltip>
                    </label>
                    <label
                        htmlFor="messages"
                        className="cursor-pointer has-[:checked]:shadow-lg has-[:checked]:shadow-slate-700 relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                    >
                        <input
                            className="hidden peer/expand"
                            type="radio"
                            name="path"
                            id="messages"
                            checked={tabState === "/messages"}
                            value="/messages"
                            onChange={(e) => handleNavClick(e)}
                        />
                        <Tooltip title="Messages" placement="right">
                            <svg
                                className="fill-white peer-hover/expand:scale-125 peer-hover/expand:text-purple-400 peer-hover/expand:fill-purple-400 peer-checked/expand:text-purple-400 peer-checked/expand:fill-purple-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"
                                ></path>
                                <path
                                    d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"
                                ></path>
                            </svg>
                        </Tooltip>
                    </label>
                    <label
                        htmlFor="help"
                        className="cursor-pointer has-[:checked]:shadow-lg has-[:checked]:shadow-slate-700 relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                    >
                        <input className="hidden peer/expand" type="radio" name="path" id="help"
                            value="/help"
                            checked={tabState === "/help"}
                            onChange={(e) => handleNavClick(e)} />
                        <Tooltip title="Help" placement="right">
                            <svg
                                className="fill-white peer-hover/expand:scale-125 peer-hover/expand:text-purple-400 peer-hover/expand:fill-purple-400 peer-checked/expand:text-purple-400 peer-checked/expand:fill-purple-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"
                                ></path>
                                <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
                            </svg>
                        </Tooltip>
                    </label>
                    <label
                        htmlFor="settings"
                        className="cursor-pointer has-[:checked]:shadow-lg has-[:checked]:shadow-slate-700 relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                    >
                        <input
                            className="hidden peer/expand"
                            type="radio"
                            name="path"
                            id="settings"
                            checked={tabState === "/settings"}
                            value="/settings"
                            onChange={(e) => handleNavClick(e)}
                        />
                        <Tooltip title="Settings" placement="right">
                            <svg
                                className="fill-white peer-hover/expand:scale-125 peer-hover/expand:text-purple-400 peer-hover/expand:fill-purple-400 peer-checked/expand:text-purple-400 peer-checked/expand:fill-purple-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"
                                ></path>
                                <path
                                    d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"
                                ></path>
                            </svg>
                        </Tooltip>
                    </label>
                </article>
            </section>
            <section className="h-[20%] w-full flex justify-center items-end">
                <div className="flex w-fit px-1.25 py-1.25 shadow-box-up rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out">
                    <div className="dark:shadow-buttons-box-dark rounded-2xl w-full bg-purple-200">
                        <NavLink to={"/logout"} className="text-light-purple-light hover:text-black text-red-500 border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0">
                            <Tooltip title="Logout" placement="right">
                                <PowerSettingsNewIcon />
                            </Tooltip>
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sidebar
