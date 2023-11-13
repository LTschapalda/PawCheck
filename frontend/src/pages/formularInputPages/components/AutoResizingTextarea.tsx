import { ChangeEvent, useRef } from "react";

type AutoResizingTextareaProps = {
    readonly value: string | "";
    readonly placeholder: string;
    readonly onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
            onInput={adjustHeight}
        />
    );
}

