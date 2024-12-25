import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user";
import { useState } from "react";
import userImage from "../assets/images/user.jpg";

export default function Navbar() {

    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const removeUser = useUserStore((state) => state.removeUser);
    const [openMenu, setOpenMenu] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        removeUser();
        navigate("/login");
    };

    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <header className="w-full text-black bg-neutral-950 bg-opacity-20 body-font shadow-md fixed z-[4] top-0 left-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between p-5 py-6 flex-row items-center">
                    <a className="flex title-font font-medium items-center text-white mb-0">
                        <span className="ml-3 text-xl">Telegram</span>
                    </a>
                    <div className="flex flex-col items-center justify-end gap-4 relative z-[1]">
                        <div className="flex flex-col items-center justify-center relative z-[1]">
                            <div className="w-full h-full px-6 rounded-full">
                                <img onClick={handleMenu} src={userImage} alt="" className="w-[32px] h-[32px] object-cover object-center rounded-full hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className={openMenu ? "w-[120px] rounded-md hidden flex-col items-center justify-end gap-4 absolute right-[10px] top-[36px] z-[3] bg-[#782069] text-white p-2 py-4" : "w-[120px] rounded-md flex flex-col items-center justify-end gap-4 absolute right-[10px] top-[36px] z-[3] bg-[#782069] text-white p-2 py-4"}>
                            <p className="sm:text-md text-sm font-semibold">{user.fullName}</p>
                            <button onClick={handleLogout} className="sm:text-md text-xs inline-flex items-center bg-[#f27022] border-0 py-2 px-4 focus:outline-none hover:bg-[#f27022aa] rounded shadow">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
