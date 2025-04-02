
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";
import {useState} from "react";
import {CreateAccountForm} from "../components/signIn/CreateAccountForm.tsx";


export default function SignInPage() {
    const [hasAccount, setHasAccount] = useState<boolean>(true);

    if (hasAccount) {
        return (
            <div className="flex justify-center items-center w-screen h-screen bg-[radial-gradient(circle_at_top_left,white,#003a96)]">
                <div className="m-auto py-[42px] px-[72px] bg-[white] rounded-[30px] w-[540px] h-[516px]">
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