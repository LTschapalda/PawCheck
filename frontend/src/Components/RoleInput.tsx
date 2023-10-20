import {useEffect, useState} from "react";
import axios from "axios";


export default function RoleInput() {

    const [isOwner, setIsOwner] = useState<string>()

    function handleIsOwner () {
        setIsOwner("true")
    }

    function handleIsSitter () {
        setIsOwner("false")
    }

    useEffect(() => {
        if (isOwner !== null) {
            axios.post('/api/newuser', {isOwner})
                .then(response => {
                    response.data
                })
                .catch(error => {
                    console.error('Fehler beim POST:', error)
                })
        }
    },[isOwner]);

    return(
        <>
            <div className="topic">
                <h1>Ich bin hier als...</h1>
            </div>
            <div className="selection">
            <button className="mainButton"      onClick={handleIsOwner}>Katzenbesitzer</button>
            <button className="secondaryButton" onClick={handleIsSitter}>Katzensitter</button>
            </div>
        </>
    );
}