import { useState } from "react";
import useUserStore from "../store/user";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const [subject, setSubject] = useState(null)
    const [errMessage, setErrMessage] = useState("")

    const handleSubject = (e) => {
        e.preventDefault();
        if(subject == null){
            setErrMessage("Please Select Subject")
        }
        else{
            setErrMessage("")
            navigate(`/test/${subject}`);
        }
    }

    return (
        <div className="w-full h-full sm:min-h-screen min-h-svh flex flex-col items-center justify-center relative z-[1] py-10 bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121]">
            <div className="mt-[80px]"></div>
            <div className="w-full text-white">
                <div className="container mx-auto lg:px-8 px-4">
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-bold">Hii, {user.firstName}</h2>
                        <p className="mt-4 text-xl">Welcome to Telegram app where you can take test for free.</p>
                    </div>
                    <div className="w-full mt-12">
                        <p className="text-center text-lg font-bold">Please Select a Subject to Take Test</p>
                        <form onSubmit={handleSubject} className="flex flex-col items-center justify-start mt-6">
                            <div className="flex flex-col items-center justify-start gap-2">
                                <label className="text-xl font-bold" htmlFor="subject">Subject:</label>
                                <select value={subject} onChange={(e) => { setSubject(e.target.value); setErrMessage(""); }} name="subject" id="subject" className="text-black px-4 py-2 rounded">
                                    <option selected disabled value="Select a Subject">Select a Subject</option>
                                    <option value="English">English</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Maths">Maths</option>
                                    <option value="Science">Science</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Histroy">Histroy</option>
                                </select>
                                <p className="text-center text-md font-bold underline mt-4">{errMessage}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <button className="mt-12 px-6 py-3 text-sm bg-[#782069] text-white tracking-[1px] font-bold shadow rounded">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
