import menuPaw from "./images/menuPaw.svg";
import {Link} from "react-router-dom";

type MenuPawProps = {
    readonly editMode : boolean,
    readonly toggleEditMode: () => void;
}
export default function MenuPaw(props: MenuPawProps) {
    const onClick = () => {
        if (props.editMode) {
            props.toggleEditMode();
        }
    };

    return(
        <nav>
            <Link to="/home">
                <img onClick={onClick} src={menuPaw} alt="menu Paw"/>
            </Link>
        </nav>
    )
}