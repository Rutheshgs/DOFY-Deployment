import { IonCol, IonContent, IonGrid, IonIcon, IonRow, IonButton, IonRouterLink, IonPage, IonAlert, IonCard, IonText } from "@ionic/react";
import { createOutline, trash } from 'ionicons/icons';
import { useEffect, useMemo, useState } from "react";

import { CustomDataTable } from "../../../components/shared/custom-data-table/CustomDataTable";
import ReactTooltip from 'react-tooltip';
import SeriesModelServices from "../../../services/SeriesModel.Services";
import { ISeriesModel } from "../../../models/Series.Model";
import { useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";

function SeriesModelDashBoard() {
    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);
    let RowsPerPage = useTypedSelector(state => state.FilterDataReducers.RowsPerPage);

    const [dashbord, setDashbord] = useState<Array<ISeriesModel>>([]);
    const [recordsCount, setRecordsCount] = useState<number>(0);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [value] = useState<any>({});
    const [deletevalue, setdeletevalue] = useState();
    const [Search, setSearch] = useState([]);

    useMemo(() => dashbord, [dashbord]);
    const columns = useMemo(
        () => [
            {
                name: "SeriesModel",
                width: "100%",
                style: "padding:0px",
                selector: (row: any) => row.Id,
                cell: (row: any, index: any, column: any, id: any) => {
                    const item = row;
                    return (
                        <IonCard style={{ width: '100%' }} className="db-cardcontent" >
                            <IonRow>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="2" sizeXs="9" className="ion-align-self-center ud_name">
                                    <IonText>
                                        {item.ProductTypeName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="1" sizeMd="1.5" sizeXs="3" className="ion-align-self-center">
                                    <IonText>
                                        {item.BrandMasterName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="2" sizeXs="8" className="ion-align-self-center">
                                    <IonText>
                                        {item.Name}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="4" sizeLg="5" sizeMd="4.5" sizeXs="12" className="ion-align-self-center">
                                    <IonText>
                                        {item.OsTypeName}
                                    </IonText>
                                </IonCol>
                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeXs="10" className="ion-align-self-center">
                                        <IonRouterLink routerLink={`SeriesModel/${row.Id}`}>
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
        SeriesModelServices.GetSeriesModelList({
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

    function deleteSeries(id: any) {
        SeriesModelServices.Remove(id).then((res) => {
            if (res.status === 200) {
                setDashbord(dashbord.filter((item) => item.id !== id))
                window.location.href = "/SeriesModelDashbord";
            }
        }).catch(e => {
            console.log(e);
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
                            <CustomDataTable headerText={'SeriesModel'} data={dashbord} columns={columns}
                                pagination={true} height={'500px'} addRouteLink={'/SeriesModel'} setsearchData={(e: any) => handleFilter(e)} RecordsCount={recordsCount}>
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
                                        handler: () => deleteSeries(deletevalue)

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

export default SeriesModelDashBoard;
