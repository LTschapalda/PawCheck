import {Link} from "react-router-dom";
import {Cat} from "../../assets/Cat.ts";

type CategoryDetailCardProps = {
    readonly toggleEditMode : () => void;
    readonly categoryTitle : string;
    readonly link : string;
    readonly catValue : string | undefined;
    readonly selectedCat : Cat | undefined;
}
export default function CategoryDetailsCard(props: CategoryDetailCardProps) {
    function onKeyDown (e:React.KeyboardEvent<HTMLDivElement>){
        if (e.key === 'Enter' || e.key === 'Space') {
            props.toggleEditMode();
        }
    }
    return (
        <div>
            {props.catValue && (
                <Link to={`/cat/${props.link}/${props.selectedCat?.id}`}>
                    <div className="catName" onClick={() => props.toggleEditMode() }
                         onKeyDown={onKeyDown} tabIndex={0}>
                        <div>
                            <h4>{props.categoryTitle}</h4>
                            <p>{props.catValue}</p>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}