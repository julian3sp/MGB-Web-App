
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";
import {useState} from "react";
import {CreateAccountForm} from "../components/signIn/CreateAccountForm.tsx";
import {CreateAccountButton} from "../components/signIn/CreateAccountButton.tsx";


export default function SignInPage() {
    const [hasAccount, setHasAccount] = useState<boolean>(true);

    if (hasAccount) {
        return (
            <div className="flex justify-center items-center w-screen h-screen bg-[radial-gradient(circle_at_top_left,white,#003a96)]">
                <div className="m-auto py-[55px] px-[72px] bg-[white] rounded-[30px] w-[540px] h-[456px]">
                    <SignInForm />
                    <CreateAccountButton setHasAccount={setHasAccount} caption={"Don't Have An Account?"} linkName={"Sign Up"}/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-end w-screen h-screen bg-[radial-gradient(circle,white,#003a96)]">
            <div className="flex justify-center py-[180px] px-[72px] bg-[white] w-[50vw] h-screen">
                <div className="w-fit">
                    <CreateAccountForm />
                    <CreateAccountButton setHasAccount={setHasAccount} caption={"Already Have An Account?"} linkName={"Log In"}/>
                </div>
            </div>
        </div>
    )
}