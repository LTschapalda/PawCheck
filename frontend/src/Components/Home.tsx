import './Home.css'
import {useEffect} from "react";
export default function Home() {

    useEffect(() => {

    }, []);

    return(
        <>
            <div className="xx"></div>
            <div className="catName">
                <img id="placeholder" src="/src/assets/ImagePlaceholder.png" alt="catface"/>
                <p>Mo</p>
            </div>
        </>
    )
}