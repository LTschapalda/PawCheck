import './Home.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import CatHeader from './CatHeader.tsx';

export default function Home() {

    const [catsOwned, setCatsOwned] = useState<Cat[]>([])
    const id : string = "123"

    useEffect(getCatsFromUser, []);
    function getCatsFromUser() {

        axios.get("/api/cats/" + id)
            .then(response => {setCatsOwned(response.data)})
            .catch(reason => console.error(reason))
    }


    return(
        <>
            <div className="xx"></div>
            {catsOwned.map(
                (cat:Cat) => <CatHeader key={cat.id} cat={cat}/>
            )}

        </>
    )
}