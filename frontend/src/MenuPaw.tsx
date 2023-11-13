import menuPaw from "./images/menuPaw.svg";
import {Link} from "react-router-dom";

type MenuPawProps = {
    readonly editMode : boolean,
    readonly toggleEditMode: () => void;
}
export default function MenuPaw(props: MenuPawProps) {

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter' || e.key === 'Space') {
            props.toggleEditMode();
        }
    }

    const onClick = () => {
        if (props.editMode) {
            props.toggleEditMode();
        }
    };

    return(
        <nav>
            <Link to="/home">
                <img onClick={onClick}
                     onKeyDown={onKeyDown}
                     src={menuPaw}
                     alt="menu Paw"/>
            </Link>
        </nav>
    )
}