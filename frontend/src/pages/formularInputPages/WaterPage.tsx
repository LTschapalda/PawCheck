import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import WaterIcon from "../../images/Kategorie_Icons_water.png"
import AutoResizingTextarea from "./components/AutoResizingTextarea.tsx";

type TreatPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat?: Cat;
    readonly setCat: React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById: (id: string) => undefined;
    readonly getCatsFromUser: () => void;
    readonly updateCat: (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
}
export default function WaterPage(props: TreatPageProps) {
    //VARIABLES
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);
    const onWaterInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    water: event.target.value,
                    id: '',
                    name: '',
                };
            } else {
                return {...cat, water: event.target.value};
            }
        });
    };

    return (
        <div className="container">
            <div className="scrollbar">
                <div className="inputTopic">
                    <img src={WaterIcon} alt="food icon"/>
                    <h1>Wo ist {props.cat?.name}s Wasser? </h1>
                </div>

                <div className="catDetails">
                <AutoResizingTextarea value={props.cat?.water ?? ''}
                                      placeholder="Raum für Notizen"
                                      onChange={onWaterInput}
                />
                </div>
            </div>

            {props.editMode ?
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id, props.cat, props.getCatsFromUser)
                                .then(() => {
                                    navigate(`/cat/details/${props.cat?.id}`)
                                })
                        }}
                >speichern</button>
                :
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id, props.cat, props.getCatsFromUser)
                                .then(() => {
                                    navigate(`/cat/litterbox/${props.cat?.id}`)
                                })
                        }}
                >weiter</button>
            }


        </div>
    )
}