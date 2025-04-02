import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";


export default function SignInPage() {
    return (
        <div id="signInBackground">
            <div className="m-auto p-[42px_72px] bg-white rounded-[30px] w-[540px] h-[496px]">
                <div className={"SignInForm"}>
                    <SignInForm/>
                </div>
            </div>
        </div>
    )
}