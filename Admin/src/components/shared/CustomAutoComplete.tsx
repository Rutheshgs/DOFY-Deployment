import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { onKeyDown, restrictInput } from "../helper/Helper";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    defaultShow: boolean,
    data: Array<any>,
    placeholder?: any,
    getId?: any,
    dropDownClassName?: string,
    dropDownId?: string,
    defaultValues?: any,
    customValue?: number
}

export const CustomAutoComplete = React.forwardRef(({ defaultShow, label, dropDownClassName, customValue, dropDownId, placeholder, data, getId, ...rest }: inputProps, ref) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState<Array<any>>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [preventOnchange, setPreventOnchange] = useState(true);
    const [input, setInput] = useState<any>(customValue);

    const onChangeValue = (userInput: any) => {
        setInput(userInput);
        const unLinked = data.filter(
            (suggestion) =>
                suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1 ||
                suggestion.Code.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        if (userInput && preventOnchange) {
            setShowSuggestions(true)
            getId(userInput);
        }

        setFilteredSuggestions(unLinked);
    };

    const onClick = (e: any, index: any) => {
        setShowSuggestions(false);
        setPreventOnchange(false);
        setInput(e.target.innerText);
        getId(e.target.value);
        setFilteredSuggestions([]);
        setActiveSuggestionIndex(index);
    };

    useEffect(() => {
        const autoInput = document.getElementById('autosearch-input');

        autoInput?.addEventListener("focusin", () => {
            setShowSuggestions(true);
        });

        autoInput?.addEventListener('focusout', () => {
            setTimeout(() => { setShowSuggestions(false) }, 200);
        });

        return () => {
            autoInput?.removeEventListener("focusin", () => {
                setShowSuggestions(true);
            });
            autoInput?.removeEventListener('focusout', () => {
                setShowSuggestions(false);
            });
        }
    }, []);

    useEffect(() => {
        setFilteredSuggestions(data);
    }, [data]);

    const SuggestionsListComponent = () => {
        return (
            <ul className="suggestions">
                {(filteredSuggestions.length > 0) ?
                    filteredSuggestions.map((suggestion, index) => {
                        let className;
                        if (customValue ? parseInt(suggestion.Code) === customValue : index === activeSuggestionIndex) {
                            className = "suggestion-active";
                        }
                        return (
                            <li className={`${className}`} id="auto-search-list" value={suggestion.Id} key={index} onClick={(e) => onClick(e, index)}>
                                {suggestion.Code}
                            </li>
                        );
                    }) :
                    <li>No Data!</li>
                }
            </ul>
        )
    };
    return (
        <>
            <IonItem className="bg-color-white cursor-pointer" onClick={() => { setShowSuggestions(true); setFilteredSuggestions(data) }}>
                <IonLabel position="fixed">{label}</IonLabel>
                <IonInput id="autosearch-input" type="number" onKeyDown={onKeyDown} className="auto-search-input" value={input} onIonChange={(e) => { onChangeValue(e.detail.value); restrictInput(e, 6) }} ref={ref as any} {...rest as any}></IonInput>
            </IonItem>
            {showSuggestions && <SuggestionsListComponent />}
        </>
    );
});

