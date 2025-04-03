import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {InputHeader} from "./InputHeader.tsx";
import {InputBox} from "./InputBox.tsx";
import {ShowPasswordButton} from "./ShowPasswordButton.tsx";
import {SubmitPasswordButton} from "./SubmitPasswordButton.tsx";

export function SignInForm({rerenderBar}: {rerenderBar: () => void}){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)

    function handleSubmit(){
        localStorage.setItem("firstName", "User");
        localStorage.setItem("isSignedIn", "true");
        console.log(localStorage.getItem("firstName"));
        rerenderBar();
        navigate("/")
    }

    return(
        <>
            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Login to your account</h1>
            <form id="signInForm" onSubmit={() => {handleSubmit()}}>
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