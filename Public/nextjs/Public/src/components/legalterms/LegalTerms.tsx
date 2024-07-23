import { useState } from 'react';
import "./LegalTerms.css";
import { getUserLanguage, getUserLocationForParam } from '../helper/Helper';
import Language from "./legalterms.json"
import { useRouter } from 'next/router';
import { type } from 'os';

type Props = {
    language: "in_en" | "ae_en" | "ae_ar"
}

function LegalTerms({ language }: Props) {
    const [link] = useState();
    let router = useRouter();
    let dataLocalization = Language[language];

    return (
        <ion-grid >
            <ion-row class='justify-content-center' >
                <ion-col size-lg='2'>
                    < ion-card class='lt_termcondition-card' onClick={() => router.push(`/${getUserLanguage()}/terms-of-use`)}>
                        <ion-label class='lt_termsuse'>{dataLocalization.Terms_and_Condition}</ion-label>
                    </ion-card>
                </ion-col>
                <ion-col size-lg='2'>
                    <ion-card class='lt_termcondition-card' onClick={() => router.push(`/${getUserLanguage()}/privacy-policy`)}>
                        <ion-label class='lt_termsuse'>{dataLocalization.Privacy_Policy}</ion-label>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    )
}

export default LegalTerms