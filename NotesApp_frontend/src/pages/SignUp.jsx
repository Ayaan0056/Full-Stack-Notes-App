import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import userValidationSchema from "../validators/userValidation.js";
import Navbar from "../components/NavBar.jsx";

const SignUp = () => {
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(userValidationSchema) });

    async function onSubmit(data) {
        console.log("data: ", data);
        try {
            const response = await axios.post("http://localhost:8000/user/register", data);
            console.log("response: ", response);

            if (response.data.success === false) {
                toast.error(response.data.message);
            }
            else {
                toast.success("User Registered successfully")
            }

        } catch (error) {
            console.log("Error Occured: ", error)
            toast.error(error.response.data.message || "Unauthorized");
        }

    }

    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-64px)] bg-[#0F0F11]">
                <div className="h-full flex flex-col justify-center items-center">
                    <div className="text-[#D0D0D0] font-man text-[24px] sm:text-[30px] font-semibold mb-[20px] xl:mb-[57px] ">
                        Sign Up
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-[#D0D0D0] text-[16px] font-semibold ">
                            User Name<span className="text-red-500 mt-1">*</span>
                        </label>
                        <input
                            name="User Name"
                            type="text"
                            required
                            className="w-full pt-[10px] pb-[10px] pl-[25px] mt-[4px] sm:mt-[8px] font-medium rounded-[10px] text-[14px] border border-[#DDDDDD] sm:w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                            placeholder="Enter User Name"
                            {...register("userName")}
                        />
                        <p className="text-xs text-white font-semibold h-4">{formState.errors.userName?.message}</p>

                        <label className="text-[#D0D0D0] text-[16px] font-semibold ">
                            Email Id <span className="text-red-500 mt-1">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full pt-[10px] pb-[10px] pl-[25px] mt-[4px] sm:mt-[8px] font-medium rounded-[10px] text-[14px] border border-[#DDDDDD] sm:w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                            placeholder="Enter Email Id"
                            {...register("email")}
                        />
                        <p className="text-xs text-white font-semibold h-4">{formState.errors.email?.message}</p>

                        <label className="text-[#D0D0D0] text-[16px] font-semibold mt-5">
                            Password <span className="text-red-500 mt-1">*</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full pt-[10px] pb-[10px] pl-[25px] mt-[4px] sm:mt-[8px] font-medium rounded-[10px] text-[14px] border border-[#DDDDDD] sm:w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
                            placeholder="Enter password"
                            {...register("password")}
                        />
                        <p className="text-xs text-white font-semibold h-4">{formState.errors.password?.message}</p>

                        <div className="flex justify-center items-center mt-10">
                            <button type="submit" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>
                        </div>

                    </form>
                </div>
            </div>
            <Toaster></Toaster>
        </>
    )
}

export default SignUp;