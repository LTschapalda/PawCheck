import PawCheck from "../images/PawCheck.svg"
import {useGoogleLogin} from '@react-oauth/google';

export default function LandingPage() {


    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        flow: 'auth-code',
    });


    return (
        <>
            <div className="topic">
                <h1>Bereit für deinen Trip?</h1>
                <p>Let's check, ob deine Katze es auch ist!</p>
            </div>
            <div className="letsgo">
                    <button className="mainButton" onClick={() => login()}>
                        check in with Google
                    </button>
                    <button className="secondaryButton">ich habe ein Passwort für eine Katze</button>
            </div>
            <img id="pawcheck" src={PawCheck} alt="PawCheck"/>
        </>
    )
}