
import '../styles/signInStyles.css'
import {SignInForm} from "../components/signIn/SignInForm.tsx";
import {CreateAccountButton} from "../components/signIn/CreateAccountButton.tsx";


export default function SignInPage({rerenderBar}: {rerenderBar: () => void}) {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-[radial-gradient(circle_at_top_left,white,#003a96)]">
            <div className="m-auto py-[55px] px-[72px] bg-[white] rounded-[30px] w-[540px] h-[456px]">
                <SignInForm rerenderBar={rerenderBar} />
                <CreateAccountButton caption={"Don't Have An Account?"} linkName={"Sign Up"} toLink={"/createAcc"}/>
            </div>
        </div>
    )
}