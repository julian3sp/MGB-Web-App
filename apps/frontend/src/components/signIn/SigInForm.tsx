import React, {FormEvent, useState} from "react";



export function SignInForm(){
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPW, setView] = useState<boolean>(false)

    return(
        <form>
            <h2 className ="inputHeader" id="firstNameHeader">First Name</h2>
            <input className={"inputBox"} id="firstNameBox"
                   value={firstName}
                   onChange={(e)=>{setFirst(e.target.value)}}
                   placeholder="First Name"
            ></input><br/>
            <h2 className ="inputHeader" id="lastNameHeader">Last Name</h2>
            <input className={"inputBox"} id="lastNameBox"
                   value={lastName}
                   onChange={(e)=>{setLast(e.target.value)}}
                   placeholder="Last Name"
            ></input><br/>
            <h2 className ="inputHeader" id="emailHeader">Email</h2>
            <input className={"inputBox"} id="emailBox"
                   value={email}
                   onChange={(e)=>{setEmail(e.target.value)}}
                   placeholder="yourEmail@email.com"
            ></input><br/>
            <h2 className ="inputHeader" id="passwordHeader">Password</h2>
            <div id="passwordBlock">
                <input className={"inputBox"} id="passwordBox"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value) }}
                       placeholder="Enter your password"
                       type={viewPW ? "text" : "password"}
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
        </form>
    )
}