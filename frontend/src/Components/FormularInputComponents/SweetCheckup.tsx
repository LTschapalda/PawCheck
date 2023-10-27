import  './SweetCheckup.css'
export default function SweetCheckup() {
    return (
        <div className="container">
            <div className="sweet">
                <h1>Sweet, hast du Lust direkt eine Checkliste zu erstellen?</h1>
                <br/>
                <p>Beantworte im Folgenden ein paar kurze Fragen und erhalte in weniger als 5 min deine Checkliste :)</p>
            </div>
            <div className="input">
                <button className="mainButton">Klaro</button>
                <button className="secondaryButton">später</button>
            </div>
        </div>
    )
}