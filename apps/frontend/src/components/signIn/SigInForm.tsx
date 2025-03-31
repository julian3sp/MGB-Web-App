import React, {FormEvent, useState} from "react";



export function SignInForm(){
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)

    return(
        <form>
            <input className={"fnBox"}
                   value={firstName}
                   onChange={(e)=>{setFirst(e.target.value)}}
                   placeholder="First Name"
            ></input><br/>
            <input className={"lnBox"}
                   value={lastName}
                   onChange={(e)=>{setLast(e.target.value)}}
                   placeholder="Last Name"
            ></input><br/>
            <input className={"emailBox"}
                   value={email}
                   onChange={(e)=>{setEmail(e.target.value)}}
                   placeholder="yourEmail@email.com"
            ></input><br/>
            <input className={"pwBox"}
                   value={password}
                   onChange={(e) => { setPassword(e.target.value) }}
                   placeholder="Password"
                   type={viewPW ? "text" : "password"}
            ></input>
            <button
                className={"viewPWButton"}
                onClick={(e) => {
                    setView(!viewPW);
                }}
                type="button"
            >
                {viewPW ? "Hide" : "Show"} Password
            </button>
        </form>
    )
}