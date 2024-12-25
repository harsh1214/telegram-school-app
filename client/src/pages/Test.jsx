import { Link, useParams } from "react-router-dom";

export default function Test() {

    const { subject } = useParams();

    if( subject == "English" || subject == "Marathi" || subject == "Hindi" || subject == "Maths" || subject == "Science" || subject == "Geography" || subject == "Histroy"){
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121] text-white">
                <div className="pt-[80px]"></div>
                <h2 className="text-center text-xl font-bold py-10">{subject}</h2>
            </div>
        );
    }
    else{
        return (
            <div className="w-full text-center py-10 min-h-screen text-white bg-gradient-to-b from-[#8A2387] via-[#E94057] to-[#F27121]">
                <p className="text-xl font-bold">Please Select a Subject to Take Test</p>
                <Link className="underline pt-5 text-center block" to="/">Click here Select Subject</Link>
            </div>
        );
    }

}
