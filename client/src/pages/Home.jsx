import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/user";

export default function Home() {

    const user = useUserStore((state) => state.user);
    const [subject, setSubject] = useState(null)

    useEffect(() => {
        console.log(subject);

    });

    return (
        <div className="w-full relative z-[1]">
            <Navbar />
            <div className="w-full h-full relative z-[1] py-10 bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121]">
                <div className="mt-[80px]"></div>
                <div className="w-full text-white">
                    <div className="container mx-auto lg:px-8 px-4">
                        <div className="w-full">
                            <h2 className="text-xl font-bold">Hii, {user.fullName}</h2>
                            <p className="mt-4 text-xl">Welcome to Telegram app where you can take test for free.</p>
                        </div>
                        <div className="w-full mt-12">
                            <p>Please Select Subject to take test</p>
                            <form className="flex flex-col items-start justify-start mt-6">
                                <div className="flex flex-row items-center justify-start gap-2">
                                    <label className="text-xl font-bold" htmlFor="subject">Subject:</label>
                                    <select onChange={(e) => setSubject(e.target.value)} name="subject" id="subject" className="text-black px-4 py-2 rounded">
                                        <option value="English">English</option>
                                        <option value="Marathi">Marathi</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Science">Science</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Histroy">Histroy</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
