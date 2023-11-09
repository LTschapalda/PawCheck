import PawCheck from "../images/PawCheck.svg"

type LandingPageProps = {
    readonly login : () => void;
}
export default function LandingPage(props : LandingPageProps) {

    return (
        <>
            <div className="topic">
                <h1>Bereit für deinen Trip?</h1>
                <p>Let's check, ob deine Katze es auch ist!</p>
            </div>
            <div className="letsgo">
                    <button className="mainButton" onClick={props.login}>
                        check in with Google
                    </button>
            </div>
            <img id="pawcheck" src={PawCheck} alt="PawCheck"/>
        </>
    )
}