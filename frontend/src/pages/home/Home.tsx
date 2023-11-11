import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import CatHeader from "./components/CatHeader.tsx";
import {User} from "../assets/User.ts";
import PawCheck from "../../images/PawCheck.svg";
import axios from "axios";

type HomeProps = {
    readonly catsOwned : Cat[];
    readonly getCatsFromUser: () => void;
    readonly user? : User;
    readonly login : () => void;
}

export default function Home(props : HomeProps) {

    const navigate = useNavigate();

    useEffect(() => {
        props.getCatsFromUser();
    }, [props.user]);

    console.log(props.user)
    function logout() {
        axios.post("/api/logout")
        navigate(`/`);
    }

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
                    {props.user ?
                        <button onClick={logout}>Logout</button>
                        :
                        <button onClick={props.login}>Login</button>
                    }
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