import { IonCol, IonCard, IonCardHeader, IonSkeletonText, IonCardContent, IonThumbnail } from "@ionic/react";


export const Skeleton = (colSizeMd?: string, colSize?: string, colSizeLg?: string, colSizeXl?: string, colSizeXs?: string) => {

    const skeletonLength = 25;

    return (
        Array.from({ length: skeletonLength }).map((val, index) => {
            return <IonCol size={colSize ? colSize : "6"} sizeMd={colSizeMd ? colSizeMd : "2"} key={index} sizeLg={colSizeLg ? colSizeLg : "4"}
                sizeXl={colSizeXl ? colSizeXl : "4"} sizeXs={colSizeXs ? colSizeXs : "4"}>
                <IonCard className="bg-color-white">
                    <IonCardHeader>
                        <IonSkeletonText animated ></IonSkeletonText>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonThumbnail className="bg-color-white">
                            <IonSkeletonText></IonSkeletonText>
                        </IonThumbnail>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        })
    )
}