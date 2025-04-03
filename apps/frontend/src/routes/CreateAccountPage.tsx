import '../styles/signInStyles.css'
import {CreateAccountForm} from "../components/signIn/CreateAccountForm.tsx";
import {CreateAccountButton} from "../components/signIn/CreateAccountButton.tsx";


export default function CreateAccountPage() {
    return (
        <div className="flex justify-end w-screen h-screen bg-[radial-gradient(circle,white,#003a96)]">
            <div className="flex justify-center py-[180px] px-[72px] bg-[white] w-[50vw] h-screen">
                <div className="w-fit">
                    <CreateAccountForm />
                    <CreateAccountButton caption={"Already Have An Account?"} linkName={"Log In"} toLink={"/signIn"}/>
                </div>
            </div>
        </div>
    )
}