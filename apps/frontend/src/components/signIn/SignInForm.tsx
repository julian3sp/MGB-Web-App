import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {InputHeader} from "./InputHeader.tsx";
import {InputBox} from "./InputBox.tsx";
import {ShowPasswordButton} from "./ShowPasswordButton.tsx";
import {SubmitPasswordButton} from "./SubmitPasswordButton.tsx";
import {trpc} from "../../lib/trpc.ts";

export function SignInForm({rerenderBar}: {rerenderBar: () => void}){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)
    const input = {
        email,
        password
    }
    const { data, isLoading, error } = trpc.validUser.useQuery(input)

    function handleSubmit(){
        localStorage.setItem("firstName", "User");
        localStorage.setItem("isSignedIn", "true");
        console.log(localStorage.getItem("firstName"));
        if (data){
            rerenderBar();
            navigate("/")
        } else if (isLoading){
            return(
                <p>Loading...</p>
            )
        } else {
            return(
                <p>User Not Found</p>
            )
        }
    }

    return(
        <>
            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Login to your account</h1>
            <form id="signInForm" onSubmit={handleSubmit}>
                <InputHeader className="pt-[20px]">Email</InputHeader>
                <InputBox value={email} setState={setEmail} placeholder={"yourEmail@email.com"} />
                <br/>
                <InputHeader className="pt-[15px]">Password</InputHeader>
                <InputBox value={password} setState={setPassword} placeholder={"Enter your password"} width = "w-[260px]" type={viewPW ? "text" : "password"} />
                <ShowPasswordButton setView={setView} viewPW={viewPW}>{`${viewPW ? "Hide" : "Show"} Password`}</ShowPasswordButton>
                <br/>
                <SubmitPasswordButton>Login now</SubmitPasswordButton>
            </form>
        </>
    )
}