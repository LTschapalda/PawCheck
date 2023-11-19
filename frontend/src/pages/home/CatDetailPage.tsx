import CatFace from "../../images/ImagePlaceholder.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import {useState} from "react";
import AddCategoriesOrDelete from "./components/AddCategoriesOrDelete.tsx";
import CategoryDetailsCard from "./components/CategoryDetailsCard.tsx";
import Copy from "../../images/copy.svg"

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

    const [share, setShare] = useState(false)

    const toggleOnShare = () => {
        setShare(!share)
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

    const copyToClipboard = () => {
        const input = document.querySelector('input');
        const btn = document.querySelector('button');
        if (input && btn) {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(input.value);
            })
        }
    };

    //TODO: copyIcon einfügen, checken, ob man die katze auch als nicht eingeloogter User aufrugfen kann & im nicht eingeloggten zustand die Katze zur Liste hinzufügen.


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
                                <div className="edit">
                                    <h3>{selectedCat.name}</h3>
                                    <svg onClick={toggleOnShare}
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                        <polyline points="16 6 12 2 8 6"/>
                                        <line x1="12" y1="2" x2="12" y2="15"/>
                                    </svg>
                                </div>

                                {share &&
                                    <div className="share">
                                        <input
                                            style={{'width': '90%'}}
                                            id="sharedLinkInput"
                                            type="text"
                                            value={"www.paw-check.de/cat/details/" + id}
                                            readOnly
                                        />
                                        <button onClick={copyToClipboard}>
                                            <img src={Copy} alt="copy"/>
                                        </button>
                                    </div>}
                            </div>
                        ) : (
                            <div className="catDetails">
                                <h2>Katze nicht gefunden</h2>
                            </div>
                        )}
                    </div>

                    <div style={{width: '100%'}}>
                        {selectedCat?.dry || selectedCat?.wet ? (
                            <a onKeyDown={onKeyDownAnchor}
                               onClick={() => {
                                   props.toggleEditMode()
                                   navigate(`/cat/food/${id}`)
                               }}>
                                <div className="catDetailsCard">
                                    <div className="edit">
                                        <h5>Futter</h5>
                                        <svg width="22" height="22" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                        </svg>
                                    </div>
                                    {selectedCat?.dry && (
                                        <>
                                            <h6>Trockenfutter</h6>
                                            {selectedCat.dry.morning && (
                                                <p>Morgens : {selectedCat.dry.morning}</p>
                                            )}
                                            {selectedCat.dry.evening && (
                                                <p>Abends : {selectedCat.dry.evening}</p>
                                            )}
                                        </>
                                    )}
                                    {selectedCat?.wet && (
                                        <>
                                            <h6>Nassfutter</h6>
                                            {selectedCat.wet.morning && (
                                                <p>Morgens : {selectedCat.wet.morning}</p>
                                            )}
                                            {selectedCat.wet.evening && (
                                                <p>Abends : {selectedCat.wet.evening}</p>
                                            )}
                                        </>
                                    )}
                                </div>
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
                                        <div className="edit">
                                            <h5>Katzenklo</h5>
                                            <svg width="22" height="22" viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                            </svg>
                                        </div>
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
                        {selectedCat?.toy &&
                        <Link to={`/cat/toys/${selectedCat.id}`}>
                            <div className="catDetailsCard" onClick={() => props.toggleEditMode()}
                                 onKeyDown={onKeyDown}
                                 tabIndex={0}>
                                <div>
                                    <div className="edit">
                                        <h5>Katzenklo</h5>
                                        <svg width="22" height="22" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                        </svg>
                                    </div>
                                    {selectedCat.toy.what && (
                                        <p>Was : {selectedCat.toy.what}</p>
                                    )}
                                    {selectedCat.toy.where && (
                                        <p>Wo? : {selectedCat.toy.where}</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                        }
                        <div className="bottomSpace"/>
                        <div className="bottomSpace"/>
                    </div>
                </div>
                <button className="addCat" onClick={toggleAddCategories}>
                    <svg id="plus" width="27" height="27" viewBox="0 0 27 27" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8966 2V25M25 13.3708H2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>

            {addCategories && (
                <AddCategoriesOrDelete selectedCat={selectedCat}
                                       toggleAddCategories={toggleAddCategories}
                                       toggleEditMode={props.toggleEditMode}/>
            )}

        </>
    )
}