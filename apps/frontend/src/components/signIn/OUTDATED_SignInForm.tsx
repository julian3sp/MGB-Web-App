import React, {useState} from "react";
import {useAppContext} from "../../Globals.tsx";
import {useNavigate } from 'react-router-dom';
import './styles/mainStyles.css'


export function SignInForm(){
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
                <h2 className ="inputHeader" id="firstNameHeader">First Name</h2>
                <input className={"inputBox"} id="firstNameBox"
                       value={firstName}
                       onChange={(e)=>{setFirst(e.target.value)}}
                       placeholder="First Name"
                       required={true}
                ></input><br/>
                <h2 className ="inputHeader" id="lastNameHeader">Last Name</h2>
                <input className={"inputBox"} id="lastNameBox"
                       value={lastName}
                       onChange={(e)=>{setLast(e.target.value)}}
                       placeholder="Last Name"
                       required={true}
                ></input><br/>
                <h2 className ="inputHeader" id="emailHeader">Email</h2>
                <input className={"inputBox"} id="emailBox"
                       value={email}
                       onChange={(e)=>{setEmail(e.target.value)}}
                       placeholder="yourEmail@email.com"
                       required={true}
                ></input><br/>
                <h2 className ="inputHeader" id="passwordHeader">Password</h2>
                <div id="passwordBlock">
                    <input className={"inputBox"} id="passwordBox"
                           value={password}
                           onChange={(e) => { setPassword(e.target.value) }}
                           placeholder="Enter your password"
                           type={viewPW ? "text" : "password"}
                           required={true}
                    ></input>
                    <button
                        id="viewPWButton"
                        onClick={(e) => {
                            setView(!viewPW);
                        }}
                        type="button"
                    >
                        {viewPW ? "Hide" : "Show"} Password
                    </button>
                </div>
                <br/>
                <button type={"submit"}>Submit</button>
            </form>
        </>
    )
}