import { IonAccordion, IonAccordionGroup, IonBadge, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonText, isPlatform } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  analyticsOutline, peopleOutline, statsChart, statsChartOutline, closeCircleOutline, homeOutline, appsOutline,
  openOutline, bicycleOutline, checkmarkCircleOutline, closeOutline, warningOutline, walkOutline, chevronDown, readerOutline
} from 'ionicons/icons';

import { isRider, isSeo } from '../helper/TokenHelper';
import { CustomImg } from '../shared/CustomImage';
import { HelperConstant } from '../helper/HelperConstant';

import './Menu.css';
import SellServices from '../../services/Sell.Services';
import { IDashboardStats } from '../../models/DashboardStats.Model';
import { useEffect, useState } from 'react';
import { GetHome, getLocalStorage } from '../helper/Helper';

let logo = require("../../assets/images/dofy-logo-blue.png");

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  canShow?: boolean;
  childrenMenu: Array<any>;
}

type Props = {
  today: boolean
}

function Menu({ today }: Props) {

  const history = useHistory();

  const location = useLocation();
  const [DashboardStats, setDashboardStats] = useState<IDashboardStats>({} as IDashboardStats);

  const rider: boolean = isRider() ?? false;
  const seo: boolean = isSeo() ?? false;

  const appPages: AppPage[] = [
    {
      title: 'Home',
      url: '/Homepage',
      iosIcon: homeOutline,
      mdIcon: homeOutline,
      canShow: !seo,
      childrenMenu: []
    },
    {
      title: 'Orders',
      url: ``,
      iosIcon: readerOutline,
      mdIcon: readerOutline,
      canShow: (rider ? false : seo ? false : true),
      childrenMenu: [
        {
          title: 'All',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.AllOrders}`,
          iosIcon: appsOutline,
          mdIcon: appsOutline,
          count: DashboardStats.All,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'Open',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.OpenOrders}`,
          iosIcon: openOutline,
          mdIcon: openOutline,
          count: DashboardStats.Open,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'InProgress',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.InProgressOrders}`,
          iosIcon: bicycleOutline,
          mdIcon: bicycleOutline,
          count: DashboardStats.Inprogress,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'Completed',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.CompletedOrders}`,
          iosIcon: checkmarkCircleOutline,
          mdIcon: checkmarkCircleOutline,
          count: DashboardStats.Completed,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'Failed',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.FailedOrders}`,
          iosIcon: closeOutline,
          mdIcon: closeOutline,
          count: DashboardStats.Failed,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'CancelRequest',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.CancelRequestOrders}`,
          iosIcon: warningOutline,
          mdIcon: warningOutline,
          count: DashboardStats.CancelRequest,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'Cancelled',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.CancelledOrders}`,
          iosIcon: closeCircleOutline,
          mdIcon: closeCircleOutline,
          count: DashboardStats.Cancelled,
          canShow: (rider ? false : seo ? false : true),
        },
        {
          title: 'Pending',
          url: `/DashBoard/${HelperConstant.dashboardNameIndex.PendingOrders}`,
          iosIcon: walkOutline,
          mdIcon: walkOutline,
          count: DashboardStats.Pending,
          canShow: (rider ? false : seo ? false : true),
        },
      ]
    },
    {
      title: 'Orders',
      url: ``,
      iosIcon: readerOutline,
      mdIcon: readerOutline,
      canShow: rider,
      childrenMenu: [
        {
          title: 'InProgress Orders',
          url: `/technicianhistory/${HelperConstant.dashboardNameIndex.InProgressOrders}`,
          iosIcon: bicycleOutline,
          mdIcon: bicycleOutline,
          count: DashboardStats.Inprogress,
          canShow: rider
        },
        {
          title: 'Completed Orders',
          url: `/technicianhistory/${HelperConstant.dashboardNameIndex.CompletedOrders}`,
          iosIcon: checkmarkCircleOutline,
          mdIcon: checkmarkCircleOutline,
          count: DashboardStats.Completed,
          canShow: rider
        },
        {
          title: 'Failed Orders',
          url: `/technicianhistory/${HelperConstant.dashboardNameIndex.FailedOrders}`,
          iosIcon: closeOutline,
          mdIcon: closeOutline,
          count: DashboardStats.Failed,
          canShow: rider
        },

      ]
    },
    {
      title: 'Users',
      url: '/UserDashbord',
      iosIcon: peopleOutline,
      mdIcon: peopleOutline,
      canShow: (rider ? false : seo ? false : true),
      childrenMenu: []
    },
    {
      title: 'Product Value',
      url: '/ProductValue',
      iosIcon: statsChart,
      mdIcon: statsChartOutline,
      canShow: (rider ? false : seo ? false : true),
      childrenMenu: []
    },
    {
      title: 'Product Threshold',
      url: '/productthreshold',
      iosIcon: analyticsOutline,
      mdIcon: analyticsOutline,
      canShow: (rider ? false : seo ? false : true),
      childrenMenu: []
    },
    {
      title: 'SEO',
      url: '/SeoDashboard',
      iosIcon: peopleOutline,
      mdIcon: peopleOutline,
      canShow: (seo ? true : rider ? false : true),
      childrenMenu: []
    },
    {
      title: 'Report',
      url: ``,
      iosIcon: readerOutline,
      mdIcon: readerOutline,
      canShow: (isPlatform("capacitor") || rider) ? false : true,
      childrenMenu: [
        {
          title: 'Product Inventory List',
          url: `/ProductReport`,
          iosIcon: appsOutline,
          mdIcon: appsOutline,
          canShow: !rider,
        },
        // {
        //   title: 'Vendor Performance Report',
        //   url: `/PerformanceReport`,
        //   iosIcon: appsOutline,
        //   mdIcon: appsOutline,
        //   canShow: !rider,
        // },
      ]
    },
    // {
    //   title: 'ModelVarient',
    //   url: '/ModelVarientDashbord',
    //   iosIcon: peopleOutline,
    //   mdIcon: peopleOutline,
    //   canShow: !rider,
    //   childrenMenu: []
    // },
    // {
    //   title: 'SeriesModel',
    //   url: '/SeriesModelDashbord',
    //   iosIcon: phonePortraitOutline,
    //   mdIcon: phonePortraitOutline,
    //   canShow: !rider,
    //   childrenMenu: []
    // },
  ];
  // const logout = () => {
  //   localStorage.clear();
  //   window.location.href = "/";
  // }
  const dofylogobtn = () => {
    // if (!rider) {
    //   window.location.href = '/HomePage';
    // }
    // else {
    //   window.location.href = '/technicianhome';
    // }
    window.location.href = '/HomePage';
    // history.push('/HomePage')

  }

  const GetDashboardStatsData = (isToday: boolean) => {
    SellServices.GetDashboardStats(isToday).then(res => {
      if (res.status === 200) {
        setDashboardStats(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
    
  }

  const childrenPage = (url: any) => {
    if (url === "/ProductReport") {
      window.location.href = url
    }
    else {
      history.push(url);
    }
  }

  useEffect(() => {
    GetHome(getLocalStorage()?.Token, "login");
    GetDashboardStatsData(today);
  }, [today]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonButtons onClick={() => dofylogobtn()} className="dofylogo"  >
            <IonListHeader className='mt-4'>
              <CustomImg src={logo} alt='logo' className='db-headerlogo-ham' />
              <IonText className='menu-header-text'>( DO IT FOR YOU )</IonText>
            </IonListHeader>
          </IonButtons>
          <hr />
          {/* <IonItem className={location.pathname === appPage.url ? 'selected cursor-pointer' : 'cursor-pointer'} onClick={() => window.location.href = appPage.url} routerDirection="none" lines="none" detail={false} >
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem> */}
          <IonAccordionGroup>
            {appPages.filter(x => x.canShow)?.map((appPage, index) => {
              return (
                <IonAccordion key={index} value={appPage.title} toggleIcon={appPage.childrenMenu.length > 0 ? chevronDown : ""}>
                  <IonItem slot="header" className={location.pathname === appPage.url ? 'selected cursor-pointer' : 'cursor-pointer'} onClick={() => { if (appPage.childrenMenu.length === 0) window.location.href = appPage.url }} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                  {
                    appPage.childrenMenu.map((val, i) => (
                      <IonItem slot="content" style={{ fontSize: "13px", paddingLeft: "20px" }} lines='none' onClick={() => childrenPage(val.url)} className={`${location.pathname === val.url ? 'selected cursor-pointer' : 'cursor-pointer'}`} key={i}>
                        <IonIcon slot="start" ios={val.iosIcon} md={val.mdIcon} size="small" />
                        <IonLabel>{val.title}</IonLabel>
                        <IonBadge color="medium" slot='end'>{val?.count}</IonBadge>
                      </IonItem>
                    ))
                  }
                </IonAccordion>
              );
            })}
          </IonAccordionGroup>
        </IonList>
        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
      {/* <IonFooter>
        <IonRow>
          <IonCol size='12' className='ion-text-center cursor-pointer' onClick={logout}>
            <IonItem lines='none'>
            <IonIcon icon={logOut} slot="start"></IonIcon>
            <IonLabel className='profile-accordion-text'>
               Logout
            </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonFooter> */}
    </IonMenu >
  );
};

export default Menu;
