import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react'
import React from 'react'

function Header() {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonText>DOFY FROM ADMIN</IonText>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Header