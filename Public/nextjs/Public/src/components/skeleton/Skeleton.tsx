
export const Skeleton = (colSizeMd?: string, colSize?: string, colSizeLg?: string, colSizeXl?: string, colSizeXs?: string) => {

    const skeletonLength = 25;

    return (
        Array.from({ length: skeletonLength }).map((val, index) => {
            return <ion-col size={colSize ? colSize : "6"} size-md={colSizeMd ? colSizeMd : "2"} key={index} size-lg={colSizeLg ? colSizeLg : "4"}
                size-xl={colSizeXl ? colSizeXl : "4"} size-xs={colSizeXs ? colSizeXs : "4"}>
                <ion-card class="bg-color-white">
                    <ion-card-header>
                        <ion-skeleton-text animated ></ion-skeleton-text>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-thumbnail class="bg-color-white">
                            <ion-skeleton-text></ion-skeleton-text>
                        </ion-thumbnail>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        })
    )
}