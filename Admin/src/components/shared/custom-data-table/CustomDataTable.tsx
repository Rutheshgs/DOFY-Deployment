import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonModal, IonRow, IonSearchbar, IonText, IonToggle } from '@ionic/react';
import { addOutline, closeSharp, gridOutline, funnelOutline, chevronForwardOutline, chevronBackOutline, playSkipForwardOutline, playSkipBackOutline, closeCircleOutline } from 'ionicons/icons';

import Filter from '../../filter/Filter';
import DataTable, { createTheme } from 'react-data-table-component';
import ReactTooltip from 'react-tooltip';

import MasterService from '../../../services/Master.Services';
import MasterServices from '../../../services/Master.Services';
import SellServices from '../../../services/Sell.Services';
import ProductTypeServices from '../../../services/ProductType.Services';
import { IGetOrdersByRiderModel } from '../../../models/GetOrdersByRider.Model';

import "./CustomDataTable.css";

import { useTypedDispatch, useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';
import { FilterDataId } from '../../../features/reducers/filterdata/FilterData.Reducers';

import { CustomImg } from '../CustomImage';
import { getPersonId } from '../../helper/TokenHelper';
import { getStatusIds } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';

import FileSaver from 'file-saver';
import moment from 'moment';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    columns: Array<any>,
    data: Array<any>,
    height: any,
    pagination?: any,
    headerText?: any,
    addRouteLink?: any,
    addRouterLink?: any,
    noBorder?: boolean,
    productTypeId?: any,
    filterShow?: any,
    setsearchData?: any,
    onClickSell?: any,
    onClickRepair?: any,
    RecordsCount: number
    setIspublic?: any,
    customPaginationEnable?: "Yes" | "No",
    isSeo?: boolean
}

interface Param {
    orderId: string
}

export const CustomDataTable = React.forwardRef(({ columns, data, height, pagination, productTypeId, headerText, addRouteLink, addRouterLink, noBorder, filterShow, setsearchData, onClickSell, onClickRepair, RecordsCount, setIspublic, customPaginationEnable, isSeo, ...rest }: inputProps, ref) => {
    const dispatch = useTypedDispatch();

    const { orderId } = useParams<Param>();

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [cityName, setCityName] = useState('');
    const [RefetralcodeName, setRefetralcodeName] = useState('');
    const [gadgetName, setGadgetName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [modalName, setModalName] = useState('');

    let cityId = useTypedSelector(state => state.FilterDataReducers.CityId);
    let PromoCode = useTypedSelector(state => state.FilterDataReducers.PromoCode);
    let productId = useTypedSelector(state => state.FilterDataReducers.productId);
    let brandId = useTypedSelector(state => state.FilterDataReducers.BrandId);
    let modelId = useTypedSelector(state => state.FilterDataReducers.ModelId);
    let FromDate = useTypedSelector(state => state.FilterDataReducers.FromDate);
    let ToDate = useTypedSelector(state => state.FilterDataReducers.ToDate);
    let CompletedStartDate = useTypedSelector(state => state.FilterDataReducers.CompletedStartDate);
    let CompletedEndDate = useTypedSelector(state => state.FilterDataReducers.CompletedEndDate);
    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);

    CompletedStartDate = parseInt(orderId) === HelperConstant.dashboardNameIndex.CompletedOrders ? CompletedStartDate : null;
    CompletedEndDate = parseInt(orderId) === HelperConstant.dashboardNameIndex.CompletedOrders ? CompletedEndDate : null;

    // createTheme creates a new theme named solarized that overrides the build in dark theme
    createTheme('solarized', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    const customStyles = {
        table: {
            style: {
                borderColor: 'white',
            },
        },
        rows: {
            style: {
                borderColor: 'white',
            },
        },
        headRow: {
            style: {
                // display: 'none',
            },
        },
        headCells: {
            style: {
                // display: 'none', // override the cell padding for head cells
            },
        },
        cells: {
            style: {
                paddingLeft: '0px', // override the cell padding for data cells
                paddingRight: '0px',
            },
        },
    };

    const handleFilter = (textToFilter: any) => {
        // if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        // setFilterText('');
        setsearchData(textToFilter)
        // }
    };

    const filteredItems = data.filter(
        // item => item['FirstName'] && item['FirstName'].toLowerCase().includes(filterText.toLowerCase()),
        item => item
    );

    const [productType, setProductType] = useState<Array<any>>([]);
    // const [ProductTypeId, setproductTypeId] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [rowsPerPage] = useState<number>(10);

    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() - 90));

    const handlePaginationButtonClick = (state: number, type: "prev" | "next" | "fullPrev" | "fullNext") => {
        if (type === "prev") {
            dispatch(FilterDataId({ payload: (state - rowsPerPage), type: "OffsetStart" }));
            dispatch(FilterDataId({ payload: rowsPerPage, type: "RowsPerPage" }));
        }
        if (type === "next") {
            dispatch(FilterDataId({ payload: (state + rowsPerPage), type: "OffsetStart" }));
            dispatch(FilterDataId({ payload: rowsPerPage, type: "RowsPerPage" }));
        }
        if (type === "fullPrev") {
            dispatch(FilterDataId({ payload: 0, type: "OffsetStart" }));
            dispatch(FilterDataId({ payload: rowsPerPage, type: "RowsPerPage" }));
        }
        if (type === "fullNext") {
            dispatch(FilterDataId({ payload: (RecordsCount - (rowsPerPage - 1)), type: "OffsetStart" }));
            dispatch(FilterDataId({ payload: rowsPerPage, type: "RowsPerPage" }));
        }
    };

    const [ToggleData, setToggleData] = useState<boolean>()
    const toggleSwitch = (value: any) => {
        setIspublic(value);
        setToggleData(value);
    }

    const GetDistrictList = () => {
        MasterServices.GetDistrictList(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200 && cityId > 0) {
                let data = res.data.find((it: any) => it.Id === cityId);
                setCityName(data.Name);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetPromoCodes = () => {
        MasterServices.GetPromoCodes().then(res => {
            if (res.status === 200 && PromoCode > 0) {
                let data = res.data.find((it: any) => it.Id === PromoCode);
                setRefetralcodeName(data.Name);
            }
        }).catch(e => {
            console.log(e)
        })
    }

    const ProductTypeServicesData = () => {
        ProductTypeServices.GetList().then(res => {
            if (res.status === 200 && productId > 0) {
                let data = res.data.find((it: any) => it.Id === productId);
                setGadgetName(data.Name);
            }
        }).catch(res => {
            console.log(res);
        })
    }

    const GetBrandMasterByProductId = (ProductId: any) => {
        if (ProductId > 0) {
            MasterService.GetBrandMasterByProductId(ProductId, HelperConstant.serviceTypeId.SELL).then(res => {
                if (res.status === 200 && brandId > 0) {
                    let data = res.data.find((it: any) => it.Id === brandId);
                    setBrandName(data.Name);
                }
            });
        }
    }

    const GetSeriesModelByBrandMasterId = (brandId: any) => {
        if (brandId > 0) {
            MasterService.GetSeriesModelByBrandMasterId(brandId, HelperConstant.serviceTypeId.SELL).then(res => {
                if (res.status === 200 && modelId > 0) {
                    let data = res.data.find((it: any) => it.Id === modelId);
                    setModalName(data.Name);
                }
            }).catch(res => {
                console.log(res);
            });
        }
    }

    const resetHandler = (type: "ProductId" | "BrandId" | "ModelId" | "CityId" | "PromoCode" | "FromDate" | "ToDate" | "OffsetStart" | "RowsPerPage" | "CompletedStartDate" | "CompletedEndDate") => {
        if (type === "ProductId") {
            dispatch(FilterDataId({ payload: 0, type: type }));
        }
        if (type === "FromDate") {
            dispatch(FilterDataId({ payload: priorDate, type: type }));
        }
        else {
            dispatch(FilterDataId({ payload: null, type: type }));
        }
    }

    const downloadInvoice = () => {
        let data = {
            SortOrder: "",
            SortOrderColumn: "",
            ProductTypeId: productId ? productId : undefined,
            BrandMasterId: brandId ? brandId : undefined,
            SeriesModelId: modelId ? modelId : undefined,
            CityId: cityId ? cityId : undefined,
            ReferralCodeId: PromoCode ? PromoCode : undefined,
            FromDate: FromDate ? moment(FromDate).format('L') : null,
            ToDate: ToDate ? moment(ToDate).format('L') : null,
            CompletedStartDate: CompletedStartDate ? moment(CompletedStartDate).format('L') : null,
            CompletedEndDate: CompletedEndDate ? moment(CompletedEndDate).format('L') : null,
            PersonId: getPersonId(),
            StatusId: getStatusIds(parseInt(orderId))
        } as IGetOrdersByRiderModel;

        SellServices.DownloadOrdersList(data).then(res => {
            if (res.status === 200) {
                const csvContent = atob(res.data);
                const blob = new Blob([csvContent], { type: "data:application/octet-stream;base64" });
                const file = new File([blob], `DOFY_Orders_Invoice.csv`, { type: "data:application/octet-stream;base64" });
                FileSaver.saveAs(file);
            }
        });
    }

    useEffect(() => {
        const ProductTypeData = () => {
            MasterService.GetAllProductType().then(res => {
                if (res.status === 200) {
                    setProductType(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        ProductTypeData();
        GetDistrictList();
        GetPromoCodes();
        ProductTypeServicesData();
        GetBrandMasterByProductId(productId);
        GetSeriesModelByBrandMasterId(brandId);
    }, [cityId, PromoCode, productId, brandId, modelId, FromDate, ToDate, CompletedStartDate, CompletedEndDate]);

    useEffect(() => {
        if (parseInt(orderId) !== HelperConstant.dashboardNameIndex.CompletedOrders) {
            dispatch(FilterDataId({ payload: null, type: "CompletedStartDate" }));
            dispatch(FilterDataId({ payload: null, type: "CompletedEndDate" }));
        }
    }, [orderId]);

    const CustomPagination = () => {

        const handleFullPrevButtonClick = () => {
            handlePaginationButtonClick(OffsetStart, "fullPrev");
        };

        const handleBackButtonClick = () => {
            handlePaginationButtonClick(OffsetStart, "prev");
        };

        const handleNextButtonClick = () => {
            handlePaginationButtonClick(OffsetStart, "next");
        };

        const handleFullNextButtonClick = () => {
            handlePaginationButtonClick(OffsetStart, "fullNext");
        };

        const nextDisabled = (OffsetStart + rowsPerPage) >= RecordsCount;
        const previosDisabled = OffsetStart === 0;

        return (
            <IonItem lines='none' className='custom-pagination'>
                <IonText slot='end'>Rows per page : {rowsPerPage}</IonText>
                {(OffsetStart + rowsPerPage) >= RecordsCount ?
                    <IonText slot='end'>{OffsetStart + 1}-{RecordsCount} of {RecordsCount}</IonText>
                    :
                    <IonText slot='end'>{OffsetStart + 1}-{OffsetStart + rowsPerPage} of {RecordsCount}</IonText>
                }
                <IonButton slot='end' onClick={handleFullPrevButtonClick} disabled={previosDisabled} >
                    <IonIcon src={playSkipBackOutline} />
                </IonButton>
                <IonButton slot='end' onClick={handleBackButtonClick} disabled={previosDisabled} >
                    <IonIcon src={chevronBackOutline} />
                </IonButton>
                <IonButton slot='end' onClick={handleNextButtonClick} disabled={nextDisabled} >
                    <IonIcon src={chevronForwardOutline} />
                </IonButton>
                <IonButton slot='end' onClick={handleFullNextButtonClick} disabled={nextDisabled} >
                    <IonIcon src={playSkipForwardOutline} />
                </IonButton>
            </IonItem>
        );
    };

    return (
        <IonGrid>
            <IonRow>
                <IonCol sizeXl='6' sizeLg='6' sizeMd='6.2' sizeSm='12' sizeXs='12' className='ct_header-align'>
                    <IonText><h4><IonIcon size='small' icon={gridOutline} /> {headerText} - ({RecordsCount})</h4></IonText>
                    {(addRouterLink === "/DashBoard" || addRouterLink === "/technicianhistory") &&
                        <IonRow>
                            {cityId || modelId || brandId || productId || PromoCode || FromDate || ToDate || CompletedStartDate || CompletedEndDate ?
                                <IonCol sizeXl='3' sizeLg='3' sizeXs='2'><IonText color='medium'>Filter By:</IonText></IonCol>
                                :
                                null
                            }
                            <IonCol sizeXl='9' className='filter-by-col'>
                                {cityId !== null ?
                                    <IonBadge color='medium' className='ion-align-self-center'>
                                        <IonText>{cityName}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("CityId")} />
                                    </IonBadge>
                                    :
                                    null
                                }
                                {
                                    PromoCode !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>{RefetralcodeName}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("PromoCode")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    productId !== 0 ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>{gadgetName}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("ProductId")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    brandId !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>{brandName}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("BrandId")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    modelId !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>{modalName}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("ModelId")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    FromDate !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>From {moment(FromDate).format("DD-MMM-YYYY")}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            {moment(FromDate).format("DD-MMM-YYYY") != moment(priorDate).format("DD-MMM-YYYY") &&
                                                <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("FromDate")} />
                                            }
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    ToDate !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>To {moment(ToDate).format("DD-MMM-YYYY")}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("ToDate")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    CompletedStartDate !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>Completed From {moment(CompletedStartDate).format("DD-MMM-YYYY")}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("CompletedStartDate")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                                {
                                    CompletedEndDate !== null ?
                                        <IonBadge color='medium' className='ion-align-self-center'>
                                            <IonText>Completed To {moment(CompletedEndDate).format("DD-MMM-YYYY")}</IonText>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={closeCircleOutline} className="cursor-pointer" onClick={() => resetHandler("CompletedEndDate")} />
                                        </IonBadge>
                                        :
                                        null
                                }
                            </IonCol>
                        </IonRow>
                    }

                </IonCol>
                {addRouteLink === "/user" ?
                    <IonCol sizeXl='2' sizeSm='12' sizeXs='12'>
                        <IonItem>
                            <IonToggle onIonChange={(e) => toggleSwitch(e.detail.checked)} />
                            {ToggleData ?
                                <IonBadge>Public</IonBadge>
                                :
                                <IonBadge>Management</IonBadge>
                            }
                        </IonItem>
                    </IonCol> :
                    <IonCol sizeLg='2'></IonCol>
                }
                <IonCol sizeXl='4' sizeLg='4' sizeMd='5.8' sizeSm='12' sizeXs='12'>
                    <IonItem lines='none'>
                        <IonSearchbar placeholder={'Search Order'}
                            onIonChange={(e: any) => handleFilter(e.target.value)}>
                        </IonSearchbar>
                        <IonButtons style={{ marginTop: '5px' }}>
                            {showModal ?
                                <IonButton hidden={filterShow ? false : true} routerLink={filterShow} onClick={() => setShowModal(false)} color="default" size='small' data-tip="Close">
                                    <IonIcon icon={closeSharp} />
                                    <ReactTooltip />
                                </IonButton> :
                                <IonButton hidden={filterShow ? false : true} routerLink={filterShow} onClick={() => setShowModal(true)} color="default" size='small' data-tip="Filter">
                                    <IonIcon icon={funnelOutline} />
                                    <ReactTooltip />
                                </IonButton>
                            }
                        </IonButtons>

                        <IonButton color="primary" hidden={addRouteLink ? false : true} size="small" routerLink={addRouteLink} data-tip="Create">
                            <IonIcon icon={addOutline} /> CREATE
                        </IonButton>
                        {(addRouterLink === "/DashBoard" || addRouterLink === "/technicianhistory") ?
                            <IonButton onClick={() => downloadInvoice()} color="default" size='small' data-tip="Download">
                                <CustomImg style={{ height: "30px" }} src={require('../../../assets/images/excel.png')} alt="download-excel" />
                            </IonButton>
                            :
                            null
                        }
                        {/* <IonButton hidden={addRouterLink ? false : true} onClick={() => refresh()} size="small" color="light">
                            <IonIcon color="primary" icon={refreshCircle}></IonIcon>
                        </IonButton> */}
                        <ReactTooltip />
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                    {/* {showfilterlist === 1 ?
                        <Filter onClickSell={onClickSell} onClickRepair={onClickRepair} /> : ""
                    } */}
                    <IonModal isOpen={showModal} animated={true} swipeToClose={true} className="modal-filter"
                        onDidDismiss={() => setShowModal(false)}>
                        <IonGrid className='ion-padding' style={{ width: '100%' }}>
                            <IonContent>
                                <Filter onClickSell={onClickSell} onClickRepair={onClickRepair} />
                            </IonContent>
                        </IonGrid>
                    </IonModal>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="12">
                    <DataTable
                        className={`${isSeo ? 'overflow-hidden' : ""}`}
                        columns={columns}
                        data={filteredItems}
                        pagination={pagination}
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        fixedHeader={height ? true : false}
                        fixedHeaderScrollHeight={height}
                        theme=""
                        customStyles={noBorder ? customStyles : {}}
                        persistTableHead
                        paginationComponent={customPaginationEnable === "No" ? undefined : CustomPagination}
                    />
                </IonCol>
            </IonRow>
        </IonGrid>

    );
});


