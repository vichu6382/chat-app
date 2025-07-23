
import { FaHome, FaUserFriends, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const Sidebar = () => {
    const { authUser } = useAuthUser();

    const navItems = [
        { name: "Home", icon: <FaHome />, path: "/" },
       
        { name: "Notifications", icon: <FaBell />, path: "/notifications" },
    ];

    return (
        <aside className="w-64 bg-[#161617] text-white h-screen sticky top-0 border-r border-none border-[#000000] px-6 py-6 flex flex-col justify-between shadow-xl hidden lg:flex">

            {/* 🌐 Logo */}
            <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-10 flex items-center gap-2">
                    <span>🌐</span>
                    VibeChat
                </div>

                {/* 🔗 Nav Links */}
                <ul className="space-y-2">
                    {navItems.map(({ name, icon, path }) => (
                        <li key={name}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-[#1f2a3e] text-white shadow-inner"
                                        : "text-gray-400 hover:bg-[#1f2a3e] hover:text-white"
                                    }`
                                }
                            >
                                {icon}
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 👤 User Profile */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1e2a3b] shadow-inner mt-10">
                <img
                    src={authUser?.profilePic || "/default-avatar.png"}
                    alt="User"
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                    <p className="font-semibold text-sm leading-tight">{authUser?.fullName || "Kyle Doe"}</p>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                        <span className="animate-pulse">●</span> Online
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
