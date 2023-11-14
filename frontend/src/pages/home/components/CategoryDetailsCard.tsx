import {useNavigate} from "react-router-dom";
import {Cat} from "../../assets/Cat.ts";

type CategoryDetailCardProps = {
    readonly toggleEditMode: () => void;
    readonly categoryTitle: string;
    readonly link: string;
    readonly catValue: string | undefined;
    readonly selectedCat: Cat | undefined;
}
export default function CategoryDetailsCard(props: CategoryDetailCardProps) {
    const navigate = useNavigate();

    function onKeyDownAnchor(e: React.KeyboardEvent<HTMLAnchorElement>) {
        if (e.key === 'Enter' || e.key === 'Space') {
            props.toggleEditMode();
            navigate(`/cat/${props.link}/${props.selectedCat?.id}`)
        }
    }

    return (
        <div>
            {props.catValue && (
                <a onKeyDown={onKeyDownAnchor}
                   onClick={() => {
                       props.toggleEditMode()
                       navigate(`/cat/${props.link}/${props.selectedCat?.id}`)
                   }}>
                    <div className="catDetailsCard">
                        <h5>{props.categoryTitle}</h5>
                        <p>{props.catValue}</p>
                    </div>
                </a>
            )}
        </div>
    )
}