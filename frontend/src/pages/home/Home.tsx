import './styling/Home.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import CatHeader from "./components/CatHeader.tsx";

type HomeProps = {
    catsOwned : Cat[];
    getCatsFromUser: () => void;
}

export default function Home(props : HomeProps) {

    useEffect(() => {
        props.getCatsFromUser();
    }, []);

    return(
        <>
            <div className="container">
                <div className="xx">
                    <h1>Hallo Nutzer</h1>
                        <p>Hier findest du eine Übersicht über deine Katzen</p>
                </div>
                <div className="listOfCats">
                    {props.catsOwned.map(
                        (cat:Cat) => <CatHeader key={cat.id} cat={cat}/>
                    )}
                </div>
                <div className="bottomSpace"/>
            </div>
            <div className="addCat">
                <Link to="/cat/name">
                <svg id="plus" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8966 2V25M25 13.3708H2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                </Link>
            </div>

        </>
    )
}