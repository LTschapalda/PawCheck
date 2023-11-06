import '../Home.css'
import {Cat} from "../../assets/Cat.ts";
import CatFace from "../../../assets/ImagePlaceholder.png"
import {Link} from 'react-router-dom';

type CatHeaderProps = {
    cat: Cat
}
export default function CatHeader(props: CatHeaderProps) {

    return (
        <>
            <Link to={`/cat/details/${props.cat.id}`}>
                <div className="catName">
                    <img id="catFace"
                         src={CatFace}
                         alt="catface"/>
                    <p>{props.cat.name}</p>
                </div>
            </Link>
        </>
    )
}