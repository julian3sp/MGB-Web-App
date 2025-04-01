
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";


export default function SignInPage() {
    return (
        <div className={"SignInPage"}>
            <div className={"SignInForm"}>
                <SignInForm/>
            </div>
        </div>
    )
}