import './Home.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import CatHeader from './CatHeader.tsx';
import {Link} from "react-router-dom";

type HomeProps = {
    setCatsOwned : React.Dispatch<React.SetStateAction<Cat[]>>;
}

export default function Home(props : HomeProps) {

    const [catsOwned, setCatsOwnedLocal] = useState<Cat[]>([])
    const id : string = "123"

    useEffect(getCatsFromUser, []);
    function getCatsFromUser() {

        axios.get("/api/cats/" + id)
            .then(response => {
                const cats = response.data;
                setCatsOwnedLocal(cats);
                props.setCatsOwned(cats);})
            .catch(reason => console.error(reason))
    }


    return(
        <>
            <div className="container">
                <div className="xx">
                    <h1>Hallo Nutzer</h1>
                        <p>Hier findest du eine Übersicht über deine Katzen</p>
                </div>
                <div className="listOfCats">
                    {catsOwned.map(
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