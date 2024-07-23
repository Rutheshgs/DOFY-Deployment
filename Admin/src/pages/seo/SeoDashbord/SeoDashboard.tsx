import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRouterLink, IonRow } from '@ionic/react'
import { createOutline } from 'ionicons/icons'
import { useEffect, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { CustomDataTable } from '../../../components/shared/custom-data-table/CustomDataTable'
import { ISeoModel } from '../../../models/Seo.Model'
import SeoServices from '../../../services/Seo.Services'
import { getLocalStorage, isValidUserAuthenticate } from '../../../components/helper/Helper'
import { getDecodedAccessToken } from '../../../components/helper/TokenHelper'

function SeoDashboard() {
    const [dashbord, setDashbord] = useState<Array<ISeoModel>>([]);
    const [searchText, setSearchText] = useState("");
    // const [isAlertOpen, setIsAlertOpen] = useState(false);
    useMemo(() => dashbord, [dashbord]);

    // const handler = (data: any) => (
    //     setIsAlertOpen(true)
    // )

    const columns = useMemo(() => [

        {
            name: 'Page Name',
            selector: (row: any) => row.PageName,
            sortable: true,
            width: "30%",
        },
        {
            name: 'Title',
            selector: (row: any) => row.Title,
            sortable: true,
            width: "60%",
        },
        // {
        //     name: 'Description',
        //     selector: (row: any) => row.Description,
        //     sortable: true,
        //     width: "30%",
        // },
        {
            name: 'Actions',
            selector: (row: any) => row.id,
            width: "10%",
            cell: (row: any, index: any, column: any, id: any) => {
                return (
                    <IonRow>
                        <IonCol sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="6">
                            <IonRouterLink routerLink={`Seo/${row.Id}`}>
                                <IonButton size="small" color="primary" data-tip="Edit">
                                    <IonIcon icon={createOutline} size="small" />
                                </IonButton>
                                <ReactTooltip />
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
                )
            }
        }
    ],
        []);
    useEffect(() => {
        const getSeoList = () => {
            SeoServices.GetList().then((res: any) => {
                if (res.status === 200) {
                    if (searchText) {
                        let data = res.data.filter((item: { [x: string]: string }) => item['PageName'] && item['PageName'].toLowerCase().includes(searchText.toLowerCase()));
                        setDashbord(data);
                    }
                    else {
                        setDashbord(res.data);
                    }
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        isValidUserAuthenticate(getDecodedAccessToken(getLocalStorage().Token));
        getSeoList();
    }, [searchText]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid className="home-bg-color p-0">
                    <IonRow>
                        <IonCol sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                            <CustomDataTable isSeo={true} headerText={"SEO LIST"} data={dashbord} columns={columns}
                                pagination={false} height={'500px'} setsearchData={setSearchText} RecordsCount={dashbord.length}></CustomDataTable>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default SeoDashboard;