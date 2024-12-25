import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import useUserStore from "../store/user";

export default function Login() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const addUser = useUserStore((state) => state.addUser);
    // const [success, setSuccess] = useState(false);

    // const userRef = useRef();
    // const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/user/register", { firstName, lastName, email, phoneNumber, password });
            localStorage.setItem('token', res.data.token);
            const userData = {
                firstName,
                lastName,
                email,
            }
            if (res) {
                addUser(userData);
                setFirstName("");
                setLastName("");
                setErrorMsg("");
                setEmail("");
                setPassword("");
                setPhoneNumber("");
            }
            navigate("/");
        } catch (err) {
            setErrorMsg(err.response.data.message);
        }
    };

    return (
        <div className="w-full relative z-[1] min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121]">
            <div className="w-full max-w-[450px] bg-white rounded border-[1px] shadow border-neutral-200 relative z-[2] flex min-h-full flex-col justify-center mx-2 my-32 px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-0 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign Up to for new account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <p className={errorMsg ? "text-center text-red-500 font-bold text-lg" : "hidden"} aria-live="assertive">{errorMsg}</p>
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">First Name</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setFirstName(e.target.value); setErrorMsg("") }} value={firstName} type="text" name="firstName" id="firstName" autoComplete="firstName" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Last Name</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setLastName(e.target.value); setErrorMsg("") }} value={lastName} type="text" name="lastName" id="lastName" autoComplete="lastName" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }} value={email} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">Phone Number</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setPhoneNumber(e.target.value); setErrorMsg("") }} value={phoneNumber} type="text" name="phoneNumber" id="phoneNumber" autoComplete="phoneNumber" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input onChange={(e) => { setPassword(e.target.value); setErrorMsg("") }} value={password} type="password" name="password" id="password" autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                    <Link className="underline pt-5 text-center block" to="/login">Already have an Account?</Link>
                </div>
            </div>

        </div>
    )
}
