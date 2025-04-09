import React, {useState} from "react";
import {InputHeader} from "./InputHeader.tsx";
import {InputBox} from "./InputBox.tsx";
import {InputBox1} from "./InputBox1.tsx";
import {ShowPasswordButton} from "./ShowPasswordButton.tsx";
import {SubmitPasswordButton} from "./SubmitPasswordButton.tsx";
import {Link, useNavigate} from 'react-router-dom';
import {trpc} from "../../lib/trpc.ts";

export function CreateAccountForm({rerenderBar}: {rerenderBar: () => void}){
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)
    const navigate = useNavigate();
    const createUser = trpc.makeUser.useMutation()

    function handleSubmit(){
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("isSignedIn", "true");
        createUser.mutate({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        })
        rerenderBar();
        navigate("/")
    }

    return(
        <>

            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Create an account</h1>
            <form id="signInForm" onSubmit={() => {handleSubmit()}}>
                <InputHeader className="pt-[30px]">First Name</InputHeader>
                <InputBox1 value={firstName} setState={setFirst} placeholder={"First Name"} />
                <br/>
                <InputHeader className="pt-[20px]">Last Name</InputHeader>
                <InputBox1 value={lastName} setState={setLast} placeholder={"Last Name"} />
                <br/>
                <InputHeader className="pt-[20px]">Email</InputHeader>
                <InputBox1 value={email} setState={setEmail} placeholder={"yourEmail@email.com"} />
                <br/>
                <InputHeader className="pt-[20px]">Password</InputHeader>
                <InputBox1 value={password} setState={setPassword} placeholder={"Enter your password"} width = "w-[260px]" type={viewPW ? "text" : "password"} />
                <ShowPasswordButton setView={setView} viewPW={viewPW}>{`${viewPW ? "Hide" : "Show"} Password`}</ShowPasswordButton>
                <br/>
                    <SubmitPasswordButton>Create account</SubmitPasswordButton>
            </form>
        </>
    )
}