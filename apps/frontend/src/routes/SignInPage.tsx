import {User} from '../components/signIn/User'
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SigInForm.tsx";


export default function SignInPage() {
    return (
        <div id="signInBackground">
            <div className="m-auto p-[42px_72px] bg-white rounded-[30px] w-[540px] h-[496px]">
                <h1 className={"SignInTitle"}>Login to your account</h1>
                <div className={"SignInForm"}>
                    <SignInForm/>
                </div>
            </div>
        </div>
    )
}