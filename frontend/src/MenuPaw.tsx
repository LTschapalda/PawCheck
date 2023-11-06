import menuPaw from "../src/assets/menuPaw.svg";
import {Link} from "react-router-dom";

type MenuPawProps = {
    editMode : boolean,
    toggleEditMode: () => void;
}
export default function MenuPaw(props: MenuPawProps) {
    const onClick = () => {
        if (props.editMode) {
            props.toggleEditMode();
        }
    };

    return(
        <nav>
            <button className="navbar" onClick={onClick}>
                <Link to="/home">
                    <img id="menuPaw" src={menuPaw} alt="menu Paw"/>
                </Link>
            </button>
        </nav>
    )
}