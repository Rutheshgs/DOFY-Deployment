import { useEffect, useMemo, useState } from "react";
import { IonCol, IonContent, IonGrid, IonIcon, IonRow, IonButton, IonRouterLink, IonPage, IonAlert, IonCard, IonText, IonLoading } from "@ionic/react";
import { trash, createOutline, eye } from 'ionicons/icons';

import './UserDashbord.css';
import ReactTooltip from 'react-tooltip';

import PersonalDetailsServices from "../../../services/PersonalDetails.Services";
import { IUserModel } from "../../../models/User.Model";

import { CustomDataTable } from "../../../components/shared/custom-data-table/CustomDataTable";
import { countrycodenumber, getLocalStorage, isValidUser, isValidUserAuthenticate } from "../../../components/helper/Helper";
import { getDecodedAccessToken } from "../../../components/helper/TokenHelper";
import { HelperConstant } from "../../../components/helper/HelperConstant";

import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { FilterDataId } from "../../../features/reducers/filterdata/FilterData.Reducers";

function UserDashbord() {

    const dispatch = useTypedDispatch();

    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);
    let RowsPerPage = useTypedSelector(state => state.FilterDataReducers.RowsPerPage);

    const [dashbord, setDashbord] = useState<Array<IUserModel>>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [value] = useState<any>({});
    const [recordsCount, setRecordsCount] = useState<number>(0);
    const [deletevalue, setdeletevalue] = useState();
    const [IsPublic, setIsPublic] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<any>();
    const [loading, setLoading] = useState(true);

    useMemo(() => dashbord, [dashbord]);

    const handler = (data: any) => {
        setIsAlertOpen(true);
        setdeletevalue(data.Id);
    }

    const handleFilter = (text: any) => {
        setSearchText(text);
        dispatch(FilterDataId({ payload: 0, type: "OffsetStart" }));
    };

    const columns = useMemo(
        () => [
            {
                name: "Users Data",
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
                                        {item.FirstName}<br />
                                        {item.LastName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="1" sizeMd="1.5" sizeXs="3" className="ion-align-self-center">
                                    <IonText>
                                        {item.UserRoleName}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeMd="2" sizeXs="8" className="ion-align-self-center">
                                    <IonText>
                                        {
                                            countrycodenumber(item.Mobile)
                                        }
                                        {item.Mobile}
                                    </IonText>
                                </IonCol>
                                <IonCol sizeXl="4" sizeLg="5" sizeMd="4.5" sizeXs="12" className="ion-align-self-center">
                                    <IonText>
                                        {item.Email}
                                    </IonText>
                                </IonCol>
                                {item.UserRoleName === HelperConstant.UserRoleName.Public ?
                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeXs="10" className="ion-align-self-center">
                                        <IonRouterLink routerLink={`View/${row.Id}`}>
                                            <IonButton size="small" color="primary" data-tip="Preview" className="ud_edit-button">
                                                <IonIcon icon={eye} size="small" />
                                            </IonButton>
                                            <ReactTooltip />
                                        </IonRouterLink>
                                    </IonCol> :
                                    <IonCol sizeXl="1" sizeLg="1" sizeMd="1" sizeXs="10" className="ion-align-self-center">
                                        <IonRouterLink routerLink={`User/${row.Id}`}>
                                            <IonButton size="small" color="primary" data-tip="Edit" className="ud_edit-button">
                                                <IonIcon icon={createOutline} size="small" />
                                            </IonButton>
                                            <ReactTooltip />
                                        </IonRouterLink>
                                    </IonCol>
                                }
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

    const getDashbord = () => {
        PersonalDetailsServices.GetPersonList({
            OffsetStart: OffsetStart,
            RowsPerPage: RowsPerPage,
            SortOrder: '',
            SortOrderColumn: '',
            SearchText: searchText,
            IsPublic: IsPublic
        }).then(res => {
            if (res.status === 200) {
                setDashbord(res.data.Items);
                setRecordsCount(res.data.RecordsCount);
                setLoading(false);
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    function deleteUser(Id: any) {
        PersonalDetailsServices.remove(Id).then((res) => {
            if (res.status === 200) {
                setDashbord(dashbord.filter((item) => item.Id !== Id))
                window.location.href = "/UserDashbord";
            }
        });
    }

    useEffect(() => {
        isValidUser(getDecodedAccessToken(getLocalStorage().Token));
        isValidUserAuthenticate(getDecodedAccessToken(getLocalStorage().Token));
        getDashbord();
    }, [IsPublic, OffsetStart, RowsPerPage, searchText]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow style={{ marginTop: '50px' }}>
                        <IonCol size="12">
                            {loading === false ?
                                <CustomDataTable headerText={'USER LIST'} data={dashbord} columns={columns} setIspublic={setIsPublic}
                                    pagination={true} height={'1000px'} addRouteLink={'/user'} setsearchData={handleFilter} RecordsCount={recordsCount}>
                                </CustomDataTable>
                                :
                                <IonLoading
                                    cssClass='custom-loading'
                                    isOpen={true}
                                    message={'Please Wait...'}
                                    spinner={"bubbles"}
                                />
                            }
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
                                        handler: () => deleteUser(deletevalue)

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

export default UserDashbord;
