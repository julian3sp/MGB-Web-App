import React, {useState} from "react";
import {useAppContext} from "../../Globals.tsx";
import {useNavigate } from 'react-router-dom';

export function CreateAccountForm(){
    const navigate = useNavigate();
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)
    const { setFirstName, setSignedIn } = useAppContext();

    function handleSubmit(){
        setFirstName(firstName)
        setSignedIn(true)
        navigate('../../../index.html')
    }

    return(
        <>
            <h1 className={"SignInTitle"}>Please Sign In!</h1>
            <form className={"signInForm"} onSubmit={() => {handleSubmit()}}>
                <input className={"fnBox"}
                       value={firstName}
                       onChange={(e)=>{setFirst(e.target.value)}}
                       placeholder="First Name"
                       required={true}
                ></input><br/>
                <input className={"lnBox"}
                       value={lastName}
                       onChange={(e)=>{setLast(e.target.value)}}
                       placeholder="Last Name"
                       required={true}
                ></input><br/>
                <input className={"emailBox"}
                       value={email}
                       onChange={(e)=>{setEmail(e.target.value)}}
                       placeholder="yourEmail@email.com"
                       required={true}
                ></input><br/>
                <input className={"pwBox"}
                       value={password}
                       onChange={(e) => { setPassword(e.target.value) }}
                       placeholder="Password"
                       type={viewPW ? "text" : "password"}
                       required={true}
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
                <br/>
                <button type={"submit"}>Submit</button>
            </form>
        </>
    )
}