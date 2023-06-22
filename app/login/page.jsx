'use client'
import Image from "next/image"
import loginImg from '../../public/login.jpg'
import logo from '../../public/logocommerce.png'
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {

    const router = useRouter()

    const notify = (message) => {
        toast.success(message, {
            autoClose: 6000,
        });
    };

    const notifyError = (message) => toast.error(message);

    const [login, setLogin] = useState({
        password: "",
        email: ""
    })

    const handleLogin = (event) => {
        const { name, value } = event.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
    }

    const handleSubmit = async(event) =>{
        event.preventDefault()
        let url = (`password=${login.password}&email=${login.email}`)
        try {
            const response = await axios(`http://localhost:3001/users/login?${url}`)
            console.log(response);
            notify("You are successfully logged in");
            setTimeout(() => router.push('/'), 3000);
        } catch (error) {
            notifyError(error.response.data.error);
        }
    }


    return (
        <main className="min-h-[100vh]">
            <section className="flex">
                <motion.article
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className=" w-[50%] min-h-[100vh] flex items-center">
                    <Image
                        className="relative h-[98%]  w-[100%] object-cover object-bottom rounded-r-[1rem]"
                        src={loginImg} alt="img-login" width={2000} height={2000} />
                    <span className="absolute font-playfair text-white font-light text-[3rem] top-[2rem] left-[4rem] py-[0.6rem] px-[1.4rem] rounded-[1rem]">EXPLORA <strong className="font-bold ">TENDENCIAS</strong> <br /> Y ENCUENTRA TU <strong className="font-bold ">ESTILO.</strong></span>
                </motion.article>

                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-[50%] h-[100vh] flex items-center">
                    <div className=" w-[60%] mx-[auto] bg-[#90909050] pt-[1rem] px-[3rem] pb-[4rem] flex flex-col gap-y-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]">
                        <div className="flex flex-col gap-y-[1rem]">
                            <Link href={'/'}>
                                <Image
                                    className="mx-[auto]"
                                    src={logo} alt="img-logo" width={150} height={150} />
                            </Link>
                            <div className="flex  bg-[#909090] w-[fit-content] p-[0.6rem] rounded-[1.6rem] mx-[auto]">
                                <Link
                                    className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] shadow-md shadow-[#11111180]"
                                    href={'/login'}>Login</Link>
                                <Link
                                    className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] text-white rounded-[1rem] "
                                    href={'/register'}>Register</Link>
                            </div>

                        </div>
                        <form
                            className="flex flex-col gap-y-[3rem]"
                            action="">
                            <label
                                className="flex flex-col gap-y-[0.4rem]"
                                htmlFor="">
                                <span className="font-medium">Email:</span>
                                <input
                                    name="email"
                                    value={login.email}
                                    onChange={handleLogin}
                                    className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                    type="text" />
                            </label>
                            <label
                                className="flex flex-col gap-y-[0.4rem]"
                                htmlFor="">
                                <span className="font-medium">Password:</span>
                                <input
                                    name="password"
                                    value={login.password}
                                    onChange={handleLogin}
                                    className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                    type="password" />
                            </label>

                            <div className="flex justify-between">
                                <div className="flex gap-x-[0.6rem] items-center">
                                    <span className="font-light text-[0.8rem]">Remember me</span>
                                    <input type="checkbox" />
                                </div>

                                <span className="font-light text-[0.8rem]">Fogget password?</span>
                            </div>

                            <button 
                            onClick={handleSubmit}
                            className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] shadow-md shadow-[#11111180]">Sign in</button>
                            <Link href={'#'} className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] text-center shadow-md shadow-[#11111180]">Google</Link>

                        </form>
                    </div>
                </motion.article>
                <ToastContainer />
            </section>
        </main>
    )
}