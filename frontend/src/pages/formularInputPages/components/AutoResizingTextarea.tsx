import { ChangeEvent, useRef } from "react";

type AutoResizingTextareaProps = {
    value: string | "";
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AutoResizingTextarea(
    props: AutoResizingTextareaProps
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={props.value}
            onChange={(e) => {
                props.onChange(e);
                adjustHeight();
            }}
            placeholder={props.placeholder}
            onInput={adjustHeight} // Hier wird die Höhe bei jedem Input angepasst
            style={{ overflowY: "hidden" }} // Damit keine sichtbare Scrollleiste vorhanden ist
        />
    );
}

