import CatFace from "../../images/ImagePlaceholder.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import {useState} from "react";
import AddCategoriesOrDelete from "./components/AddCategoriesOrDelete.tsx";
import CategoryDetailsCard from "./components/CategoryDetailsCard.tsx";

type CatDetailProps = {
    readonly catsOwned: Cat[]
    readonly toggleEditMode: () => void;
}
export default function CatDetailPage(props: CatDetailProps) {

    //VARIABLES
    const {id} = useParams();
    const selectedCat = props.catsOwned.find((cat: Cat) => cat.id == id)
    const [addCategories, setAddCategories] = useState(false)
    const toggleAddCategories = () => {
        setAddCategories(!addCategories);
    }

    const navigate = useNavigate();

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter' || e.key === 'Space') {
            props.toggleEditMode();
        }
    }
    function onKeyDownAnchor(e: React.KeyboardEvent<HTMLAnchorElement>) {
        if (e.key === 'Enter' || e.key === 'Space') {
            props.toggleEditMode();
            navigate(`/cat/food/${id}`)
        }
    }

    //RETURN
    return (
        <>
            <div className="container">
                <div className="scrollbar"
                     style={{justifyContent: 'flex-start'}}>
                    <div className="inputTopic lower">
                        <img id="catFaceBigger"
                             src={CatFace}
                             alt="catface"/>
                        {selectedCat ? (
                            <div className="catDetails">
                                <h3>{selectedCat.name}</h3>
                            </div>
                        ) : (
                            <div className="catDetails">Katze nicht gefunden</div>
                        )}
                    </div>

                    <div style={{width: '100%'}}>
                        {selectedCat?.dry || selectedCat?.wet ? (
                                <a onKeyDown={onKeyDownAnchor}
                                   onClick={() => {props.toggleEditMode()
                                    navigate(`/cat/food/${id}`)}}>
                                    {selectedCat?.dry && (
                                        <div className="catDetailsCard">
                                            <h5>Trockenfutter</h5>
                                            {selectedCat.dry.morning && (
                                                <p>Morgens : {selectedCat.dry.morning}</p>
                                            )}
                                            {selectedCat.dry.evening && (
                                                <p>Abends : {selectedCat.dry.evening}</p>
                                            )}
                                        </div>
                                    )}
                                </a>
                        ) : (<div/>)}
                        <CategoryDetailsCard toggleEditMode={props.toggleEditMode}
                                             categoryTitle="Leckerlies"
                                             link="treats"
                                             catValue={selectedCat?.treats}
                                             selectedCat={selectedCat}/>
                        <CategoryDetailsCard toggleEditMode={props.toggleEditMode}
                                             categoryTitle="Wasser"
                                             link="water"
                                             catValue={selectedCat?.water}
                                             selectedCat={selectedCat}/>
                        {selectedCat?.toilet &&
                            <Link to={`/cat/litterbox/${selectedCat.id}`}>
                                <div className="catDetailsCard" onClick={() => props.toggleEditMode()}
                                     onKeyDown={onKeyDown}
                                     tabIndex={0}>
                                    <div>
                                        <h5>Katzenklo</h5>
                                        {selectedCat.toilet.where && (
                                            <p>Wo : {selectedCat.toilet.where}</p>
                                        )}
                                        {selectedCat.toilet.howOften && (
                                            <p>Wie oft? : {selectedCat.toilet.howOften}</p>
                                        )}
                                        {selectedCat.toilet.whereTheShit && (
                                            <p>Wohin?: {selectedCat.toilet.whereTheShit}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        }
                        <div className="bottomSpace"/>
                        <div className="bottomSpace"/>
                    </div>
                </div>
            </div>
            <button className="addCat" onClick={toggleAddCategories}>
                <svg id="plus" width="27" height="27" viewBox="0 0 27 27" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8966 2V25M25 13.3708H2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </button>

            {addCategories && (
                <AddCategoriesOrDelete selectedCat={selectedCat}
                                       toggleAddCategories={toggleAddCategories}
                                       toggleEditMode={props.toggleEditMode}/>
            )}

        </>
    )
}