import { IonCol, IonContent, IonGrid, IonIcon, IonRow, IonButton, IonRouterLink, IonPage, IonAlert, IonCard, IonText } from "@ionic/react";
import { createOutline, trash } from 'ionicons/icons';
import { useEffect, useMemo, useState } from "react";

import { CustomDataTable } from "../../../components/shared/custom-data-table/CustomDataTable";
import ReactTooltip from 'react-tooltip';
import ModelVariantServices from "../../../services/ModelVariant.Services";
import { IModelVariantModel } from "../../../models/ModelVarient.Model";
import { useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";

function ModelVarientDashbord() {
    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);
    let RowsPerPage = useTypedSelector(state => state.FilterDataReducers.RowsPerPage);

    const [dashbord, setDashbord] = useState<Array<IModelVariantModel>>([]);
    const [recordsCount, setRecordsCount] = useState<number>(0);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [value] = useState<any>({});
    const [deletevalue, setdeletevalue] = useState();
    const [Search, setSearch] = useState([]);

    useMemo(() => dashbord, [dashbord]);
    const columns = useMemo(
        () => [
            {
                name: "ModelVariant",
                width: "100%",
                style: "padding:0px",
                selector: (row: any) => row.Id,
                cell: (row: any, index: any, column: any, id: any) => {
                    const item = row;
                    return (
                        <IonCard style={{ width: '100%' }} className="db-cardcontent" >
                            <IonRow>
                                <IonCol sizeXl="1" sizeLg="1" sizeMd="1.5" sizeXs="9" className="ion-align-self-center ud_name">
                                    <IonText>
                                        {item.ProductTypeName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="1" sizeLg="1" sizeMd="1.5" sizeXs="3" className="ion-align-self-center">
                                    <IonText>
                                        {item.BrandMasterName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="3" sizeXs="8" className="ion-align-self-center">
                                    <IonText>
                                        {item.SeriesModelName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="1.5" sizeXs="12" className="ion-align-self-center">
                                    <IonText>
                                        {item.Name}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="1" sizeXs="12" className="ion-align-self-center">
                                    <IonText>
                                        {item.ProductCategoryName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="1.5" sizeXs="12" className="ion-align-self-center">
                                    <IonText>
                                        {item.ThresholdCategoryName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeXs="10" className="ion-align-self-center">
                                    <IonRouterLink routerLink={`ModelVarient/${row.Id}`}>
                                        <IonButton size="small" color="primary" data-tip="Edit" className="ud_edit-button">
                                            <IonIcon icon={createOutline} size="small" />
                                        </IonButton>
                                        <ReactTooltip />
                                    </IonRouterLink>
                                </IonCol>
                                <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeXs="2" className="ion-align-self-center">
                                    <IonButton size="small" color="danger" data-tip="Delete" className="ud_edit-button" onClick={() => { handler(row) }}>
                                        <IonIcon icon={trash} title='Delete' />
                                    </IonButton>
                                    <ReactTooltip />
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    )
                }
            }
        ], []
    )

    const handler = (data: any) => {
        setIsAlertOpen(true);
        setdeletevalue(data.Id);
    }

    const getDashbord = () => {
        ModelVariantServices.GetModelVariantList({
            OffsetStart: OffsetStart,
            RowsPerPage: RowsPerPage,
            SortOrder: '',
            SortOrderColumn: '',
            SearchText: null,
        }).then(res => {
            if (res.status === 200) {
                setDashbord(res.data.Items);
                setSearch(res.data.Items);
                setRecordsCount(res.data.RecordsCount);
            }
        });
    }

    function deleteVariant(id: any) {
        ModelVariantServices.Remove(id).then((res) => {
            if (res.status === 200) {
                setDashbord(dashbord.filter((item) => item.id !== id))
                window.location.href = "/ModelVarientDashbord";
            }
        });
    }

    const handleFilter = (text: any) => {
        if (text !== '') {
            const newData: any = dashbord.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(text.toLowerCase())
            });
            setDashbord(newData);
        } else {
            setDashbord(Search);
        }
    };

    useEffect(() => {
        getDashbord();
    }, [OffsetStart, RowsPerPage]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow style={{ marginTop: '50px' }}>
                        <IonCol size="12">
                            <CustomDataTable headerText={'ModelVariant'} data={dashbord} columns={columns}
                                pagination={true} height={'500px'} addRouteLink={'/ModelVarient'} setsearchData={(e: any) => handleFilter(e)} RecordsCount={recordsCount}>
                            </CustomDataTable>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="2" >
                            <IonAlert isOpen={isAlertOpen}
                                id={value}
                                key={value.Id}
                                onDidDismiss={() => setIsAlertOpen(false)}
                                header={"Confirmation"}
                                subHeader={"Are you sure you want to Delete?"}
                                buttons={
                                    [{
                                        text: "Yes",
                                        handler: () => deleteVariant(deletevalue)

                                    }, {
                                        text: "Cancel",
                                        handler: () => setIsAlertOpen(false)
                                    }]
                                }
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default ModelVarientDashbord;
