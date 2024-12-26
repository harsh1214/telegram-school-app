import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Test() {

    const [questions, setQuestions] = useState([]);
    const [readyForTest, setReadyForTest] = useState(false);
    const [isRunning, setIsRunning] = useState(false); 
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const { subject } = useParams();

    useEffect(() => {
        if ( !isRunning || timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
    }

    const handleReadyForTest = () => {
        setReadyForTest(!readyForTest);
        setIsRunning(true);
    }

    if (subject == "English" || subject == "Marathi" || subject == "Hindi" || subject == "Maths" || subject == "Science" || subject == "Geography" || subject == "Histroy") {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121] text-white">
                <div className="pt-[80px]"></div>
                <div className="container mx-auto lg:px-8 px-4">
                    {!readyForTest && (
                        <div className="w-full">
                            <h2 className="text-center text-xl font-bold py-10">Are you ready to take test for {subject} subject</h2>
                            <div className="w-full flex flex-col items-center justify-center">
                                <button onClick={handleReadyForTest} className="px-6 py-3 text-sm bg-[#782069] text-white tracking-[1px] font-bold shadow rounded">Start Test</button>
                            </div>
                        </div>
                    )}
                    {readyForTest && (
                        <div className="w-full flex flex-col items-center justify-normal mt-12">
                            <p className="font-bold text-xl">{formatTime(timeLeft)}</p>
                            <h2 className="text-center mt-4">Questions</h2>
                            <div className="w-full flex flex-col items-center justify-start gap-4 mt-4">
                                <div className="w-full flex flex-col items-start justify-start">
                                    <p>1. Some Questions?</p>
                                    <div className="w-full flex flex-row items-center justify-start gap-2 mt-2">
                                        <input type="radio" name="question1" id="question1" />
                                        <label htmlFor="question1">Option 1</label>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-start gap-2 mt-2">
                                        <input type="radio" name="question1" id="question2" />
                                        <label htmlFor="question2">Option 1</label>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-start gap-2 mt-2">
                                        <input type="radio" name="question1" id="question3" />
                                        <label htmlFor="question3">Option 1</label>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-start gap-2 mt-2">
                                        <input type="radio" name="question1" id="question4" />
                                        <label htmlFor="question4">Option 1</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="w-full text-center py-10 sm:min-h-screen min-h-svh text-white bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121]">
                <p className="text-xl font-bold">Please Select a Subject to Take Test</p>
                <Link className="underline pt-5 text-center block" to="/">Click here Select Subject</Link>
            </div>
        );
    }

}
