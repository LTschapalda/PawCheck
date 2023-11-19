import {Cat, Toy} from "../assets/Cat.ts";
import {useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import ToyIcon from "../../images/Kategorie_Icons_toys.png";
import SimpleInputField from "./components/SimpleInputField.tsx";
import ContinueOrSaveButton from "./components/ContinueOrSaveButton.tsx";

type TreatPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat?: Cat;
    readonly setCat: React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById: (id: string) => undefined;
    readonly getCatsFromUser: () => void;
    readonly updateCat: (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
}
export default function ToyPage(props: TreatPageProps) {
    //VARIABLES
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);

    const onToyInput = (field: keyof Toy, value: string) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                const newCat: Cat = {
                    id: '',
                    name: '',
                    toy: { [field]: value as never }, // hier verwenden wir "as any"
                };
                return newCat;
            } else {
                const updatedToy: Toy = { ...cat.toy, [field]: value };
                return { ...cat, toy: updatedToy };
            }
        });
    };

    const onWhatInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onToyInput("what", event.target.value);
    };

    const onWhereInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onToyInput("where", event.target.value);
    };

    return (
        <div className="container">
            <div className="scrollbar">
                <div className="inputTopic">
                    <img src={ToyIcon} alt="toy icon"/>
                    <h2>Womit spielt {props.cat?.name} am liebsten?</h2>
                </div>

                <SimpleInputField onInputChange={onWhatInput}
                                  buttonText="was ist es?"
                                  placeholder=""
                                  value={props.cat?.toy?.what ?? ''}
                />

                <SimpleInputField onInputChange={onWhereInput}
                                  buttonText="wo ist es?"
                                  placeholder=""
                                  value={props.cat?.toy?.where ?? ''}
                />
            </div>

            <ContinueOrSaveButton editMode={props.editMode}
                                  updateCat={props.updateCat}
                                  id={id}
                                  cat={props.cat}
                                  getCatsFromUser={props.getCatsFromUser}
                                  route={`/home`}/>
        </div>
    )
}