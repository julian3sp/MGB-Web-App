import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";


export default function SignInPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-[radial-gradient(circle_at_top_left,white,#003a96)]">
            <div className="m-auto py-[42px] px-[72px] bg-[white] rounded-[30px] w-[540px] h-[516px]">
                <SignInForm/>
            </div>
        </div>
    )
}