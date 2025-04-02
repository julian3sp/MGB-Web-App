import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import {InputHeader} from "./InputHeader.tsx";
import {InputBox} from "./InputBox.tsx";
import {ShowPasswordButton} from "./ShowPasswordButton.tsx";
import {SubmitPasswordButton} from "./SubmitPasswordButton.tsx";
//import 'src/styles/mainStyles.css';
//import './styles/signInStyles.css';

export function SignInForm(){
    const navigate = useNavigate();
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)

    function handleSubmit(){
        localStorage.setItem("firstName", "User");
        localStorage.setItem("isSignedIn", "true");
        navigate('../../../index.html')
    }

    return(
        <>
            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Login to your account</h1>
            <form id="signInForm" onSubmit={() => {handleSubmit()}}>
                <InputHeader className="pt-[20px]">First Name</InputHeader>
                <InputBox value={firstName} setState={setFirst} placeholder={"First Name"} />
                <br/>
                <InputHeader>Last Name</InputHeader>
                <InputBox value={lastName} setState={setLast} placeholder={"Last Name"} />
                <br/>
                <InputHeader>Email</InputHeader>
                <InputBox value={email} setState={setEmail} placeholder={"yourEmail@email.com"} />
                <br/>
                <InputHeader>Password</InputHeader>
                <InputBox value={password} setState={setPassword} placeholder={"Enter your password"} width = "w-[260px]" type={viewPW ? "text" : "password"} />
                <ShowPasswordButton setView={setView} viewPW={viewPW}>{`${viewPW ? "Hide" : "Show"} Password`}</ShowPasswordButton>
                <br/>
                <SubmitPasswordButton />
            </form>
        </>
    )
}