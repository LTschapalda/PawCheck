import {ChangeEvent, useState} from "react";
import axios from "axios";
import NameCat from "../../images/NameCat.svg";
import {useNavigate} from 'react-router-dom';
import {User} from "../assets/User.ts";
import PawCheck from "../../images/PawCheck.svg";

type NameInputProps = {
    readonly getCatsFromUser: () => void;
    readonly user?: User;
}
export default function NameInput(props: NameInputProps) {
    const [name, setName] = useState<string>('')
    const navigate = useNavigate();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.value;
        setName(name);
    }

    const handleSubmitCreatNewCat = () => {
        if (name !== '' && props.user?.id) {
            axios.post('/api/cat', {catName: name, userId: props.user.id})
                .then(response => {
                    props.getCatsFromUser();
                    const newCat = response.data;
                    console.log(newCat);
                    setName('');
                    navigate(`/sweeet/${newCat.id}`);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <>
            <div className="container">
                <div className="topic">
                    <h2>Wie heißt deine Katze?</h2>
                </div>

                <div className="nameinput">
                    <svg width="100%" height="97" viewBox="0 0 305 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M26 95L38 69H16.5C7 69 1 61 1 52V19C1 10.5 7.5 1.5 16.5 1.5H287C296 1.5 304 7.5 304 19V52C304 62 300.5 69 287 69H75C64.6 82.6 38 92 26 95Z"
                            fill="white" stroke="#87AD19" strokeWidth="2"/>
                        <foreignObject x="10" y="10" width="285" height="50">
                            <input className="speech"
                                   type="text"
                                   placeholder="Hier eingeben"
                                   value={name}
                                   onChange={handleInputChange}/>
                        </foreignObject>
                    </svg>
                </div>

                <button className="mainButton save"
                        onClick={handleSubmitCreatNewCat}>
                    <img className="thumbsUp" src={PawCheck} alt="PawCheck"/>
                    <span className="text">weiter</span>
                </button>
            </div>
            <div className="peakingCat">
                <img src={NameCat} alt="peaking cat"/>
            </div>
        </>
    );
}