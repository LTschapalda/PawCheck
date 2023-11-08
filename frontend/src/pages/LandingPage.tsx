import PawCheck from "../images/PawCheck.svg"

export default function LandingPage() {

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/google', '_self');
    }

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
            </div>
            <img id="pawcheck" src={PawCheck} alt="PawCheck"/>
        </>
    )
}