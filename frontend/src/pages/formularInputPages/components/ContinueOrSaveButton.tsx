import PawCheck from "../../../images/PawCheck.svg";
import {useNavigate} from "react-router-dom";
import {Cat} from "../../assets/Cat.ts";

type ContinueOrSaveButtonProps = {
    editMode : boolean;
    updateCat : (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
    id : string | undefined;
    cat : Cat | undefined;
    getCatsFromUser: () => void;
    route: string;
}
export default function ContinueOrSaveButton(props : ContinueOrSaveButtonProps) {

    const navigate = useNavigate();

    return (<>
        {props.editMode ?
            <button className="mainButton save"
                    onClick={() => {
                        props.updateCat(props.id, props.cat, props.getCatsFromUser)
                            .then(() => {
                                navigate(`/cat/details/${props.id}`)
                            })
                    }}>
                <img className="thumbsUp" src={PawCheck} alt="PawCheck"/>
                <span className="text">speichern</span>
            </button>
            :
            <button className="mainButton save"
                    onClick={() => {
                        props.updateCat(props.id, props.cat, props.getCatsFromUser)
                            .then(() => {
                                navigate(`${props.route}`)
                            })
                    }}>
                <img className="thumbsUp" src={PawCheck} alt="PawCheck"/>
                <span className="text">weiter</span>
            </button>
        }
    </>)
}