import './styling/Home.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import CatHeader from "./components/CatHeader.tsx";
import {User} from "../assets/User.ts";
import PawCheck from "../../images/PawCheck.svg";

type HomeProps = {
    readonly catsOwned : Cat[];
    getCatsFromUser: () => void;
    user? : User;
}

export default function Home(props : HomeProps) {

    useEffect(() => {
        props.getCatsFromUser();
    }, [props.user]);

    return(
        <>
            <div className="container">
                <div className="xx">
                    <h1>Hallo {props.user?.name ? props.user?.name : "Nutzer"}</h1>
                        <p>Hier findest du eine Übersicht über deine Katzen</p>
                </div>
                <div className="listOfCats">
                    {props.catsOwned.map(
                        (cat:Cat) => <CatHeader key={cat.id} cat={cat}/>
                    )}
                </div>
                <div className="bottomSpace"/>
                <div className="footer">
                    <div>
                        <h4>PawCheck</h4>
                        <p> © 2023 all Rights reserved</p>
                        <img src={PawCheck} alt="PawCheck"/>
                    </div>
                    <button>Logout</button>
                </div>
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