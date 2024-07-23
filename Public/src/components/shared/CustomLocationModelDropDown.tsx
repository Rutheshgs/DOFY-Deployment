import { IonChip, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { close, locationOutline } from "ionicons/icons";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { onKeyDown, restrictInput } from "../helper/Helper";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    defaultShow: boolean,
    data: Array<any>,
    stateData: Array<any>,
    placeholder?: any,
    getId?: any,
    dropDownClassName?: string,
    dropDownId?: string,
    defaultValues?: any,
    customValue?: number
    suggestionsClassName?: string,
    setSearchKeyWord?: any,
    setNotValidLocation?: any
    setSearchKeyWordErr?: any
    bgColor?: "Yes" | "No",
    selectedCity?: string,
    setSelectedCity?: any,
    searchKeyword?: any,
    selectedCityHandler: any
}

export const CustomLocationModelDropDown = React.forwardRef(({ defaultShow, label, selectedCityHandler, stateData, dropDownClassName, customValue, searchKeyword, selectedCity, setSelectedCity, suggestionsClassName, setSearchKeyWordErr, setSearchKeyWord, setNotValidLocation, dropDownId, placeholder, data, getId, bgColor, ...rest }: inputProps, ref) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState<Array<any>>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [preventOnchange, setPreventOnchange] = useState(true);
    const [input, setInput] = useState<any>(customValue);

    const onChangeValue = (userInput: any) => {
        setSearchKeyWord(userInput);
        setSearchKeyWordErr("");
        setNotValidLocation(false);
        setInput(userInput);
        const unLinked = data.filter(
            (suggestion) =>
                suggestion.Name.toLowerCase().indexOf(userInput?.toString().toLowerCase()) > -1 ||
                suggestion.Code.toLowerCase().indexOf(userInput?.toString().toLowerCase()) > -1
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
        setSearchKeyWord(e.target.innerText);
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
            <ul className={`suggestions ${suggestionsClassName}`}>
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
            {selectedCity ?
                <IonChip onClick={() => { setSelectedCity(""); selectedCityHandler("") }} color="primary" className="selected-city">
                    <IonIcon icon={locationOutline} color="primary" size="small" />
                    <IonLabel>{stateData.find(it => it.Identifier === selectedCity)?.Name}</IonLabel>
                    <IonIcon icon={close} />
                </IonChip>
                :
                <IonChip color="primary" className="selected-city">
                    <IonIcon icon={locationOutline} color="primary" size="small" />
                    <IonLabel>All location</IonLabel>
                </IonChip>
            }
            <IonItem className={`${bgColor === "No" ? "custom-bg" : "bg-color-white"} cursor-pointer ${dropDownClassName}`} onClick={() => { setShowSuggestions(true); setFilteredSuggestions(data) }}>
                {/* {selectedCity ?
                    null
                    :
                    <IonLabel position="fixed">{label}</IonLabel>
                } */}
                <IonInput id="autosearch-input" type="number" placeholder={label} inputMode="numeric" onKeyDown={onKeyDown} className="auto-search-input" value={input} onIonChange={(e) => { onChangeValue(e.detail.value); restrictInput(e, 6) }} ref={ref as any} {...rest as any}></IonInput>
            </IonItem>
            {showSuggestions && <SuggestionsListComponent />}
        </>
    );
});
