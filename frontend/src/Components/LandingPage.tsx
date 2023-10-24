import {Link} from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <div className="topic">
                <h1>Bereit für deinen Trip?</h1>
                <p>Let's check, ob deine Katze es auch ist!</p>
            </div>
            <img id="pawcheck" src="../assets/PawCheck.svg" alt="PawCheck"/>
            <div className="letsgo">
                <Link to="/cat/name">
                    <button className="mainButton">check in</button>
                </Link>
            </div>
        </>
    )
}