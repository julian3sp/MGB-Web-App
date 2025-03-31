import {User} from '../components/signIn/User'
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SigInForm.tsx";


export default function SignInPage() {
    return (
        <div className={"SignInPage"}>
            <h1 className={"SignInTitle"}>Please Sign In!</h1>
            <div className={"SignInForm"}>
                <SignInForm/>
            </div>
        </div>
    )
}