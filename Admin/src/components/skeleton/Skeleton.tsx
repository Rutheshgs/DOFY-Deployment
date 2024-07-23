import { IonCol, IonCard, IonCardHeader, IonSkeletonText, IonCardContent, IonThumbnail } from "@ionic/react";


export const Skeleton = (colSizeMd?: string, colSize?: string) => {

    const skeletonLength = 25;

    return (
        Array.from({ length: skeletonLength }).map((val, index) => {
            return <IonCol size={colSize ? colSize : "6"} sizeMd={colSizeMd ? colSizeMd : "2"} key={index} >
                <IonCard >
                    <IonCardHeader>
                        <IonSkeletonText animated ></IonSkeletonText>
                    </IonCardHeader>
                    <IonCardContent >
                        <IonThumbnail >
                            <IonSkeletonText ></IonSkeletonText>
                        </IonThumbnail>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        })
    )
}