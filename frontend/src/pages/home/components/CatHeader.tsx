import {Cat} from "../../assets/Cat.ts";
import CatFace from "../../../images/ImagePlaceholder.png"
import {Link} from 'react-router-dom';

type CatHeaderProps = {
    readonly cat: Cat
}
export default function CatHeader(props: CatHeaderProps) {

    return (
            <Link to={`/cat/details/${props.cat.id}`}>
                <div className="catHeader">
                    <img id="catFace"
                         src={CatFace}
                         alt="catface"/>
                    <h6>{props.cat.name}</h6>
                </div>
            </Link>
    )
}