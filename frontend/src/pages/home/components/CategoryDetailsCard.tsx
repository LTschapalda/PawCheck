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
                        <div className="edit">
                            <h5>{props.categoryTitle}</h5>
                            <svg width="22" height="22" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                            </svg>
                        </div>
                        <p>{props.catValue}</p>
                    </div>
                </a>
            )}
        </div>
    )
}