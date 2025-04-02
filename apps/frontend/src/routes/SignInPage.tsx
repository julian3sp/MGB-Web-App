import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SigInForm.tsx";
import {useState} from "react";
import {CreateAccountForm} from "../components/signIn/CreateAccountForm.tsx";


export default function SignInPage() {
    const [hasAccount, setHasAccount] = useState<boolean>(true);

    if (hasAccount) {
        return (
            <div className={"SignInPage"}>
                <div className={"SignInForm"}>
                    <SignInForm/>
                    <button onClick={() => setHasAccount(false)}>Don't have an account? Create one!</button>
                </div>
            </div>
        )
    }
    return (
        <div className={"SignInPage"}>
            <div className={"SignInForm"}>
                <CreateAccountForm/>
            </div>
        </div>
    )
}