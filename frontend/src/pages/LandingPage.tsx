import PawCheck from "../images/PawCheck.svg"
import axios from "axios";
import {useState} from "react";
import {User} from "./assets/User.ts";

export default function LandingPage() {

    const [user, setUser] = useState<User>()

    /*const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        flow: 'auth-code',
        scope: 'openid profile email',
    });*/

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/google', '_self');
    }

    function getMe () {
        axios.get("/api/user")
            .then(response => {
                setUser(response.data)
                console.log(response.data)})
            .catch(error => {
                console.error('Fehler beim Abrufen des Benutzerprofils:', error);
            })
    }

    return (
        <>
            <div className="topic">
                <h1>Bereit für deinen Trip?</h1>
                <p>Let's check, ob deine Katze es auch ist!</p>
            </div>
            <div className="letsgo">
                    <p>{user?.name}</p>
                    <button className="mainButton" onClick={() => login()}>
                        check in with Google
                    </button>
                    <button className="secondaryButton" onClick={getMe}>Get me</button>
            </div>
            <img id="pawcheck" src={PawCheck} alt="PawCheck"/>
        </>
    )
}