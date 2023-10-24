import './Home.css'
import {Cat} from "../assets/Cat.ts";

type CatHeaderProps = {
    cat : Cat
}
export default function CatHeader(props: CatHeaderProps) {

    return (
            <div className="catName">
                <img id="placeholder" src="/src/assets/ImagePlaceholder.png" alt="catface"/>
                <p>{props.cat.name}</p>
            </div>
    )
}