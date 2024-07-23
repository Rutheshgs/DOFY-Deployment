import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { JSX as LocalJSX, isPlatform } from '@ionic/core'
import { JSX as IoniconsJSX } from 'ionicons'
import { HTMLAttributes, ReactText, useEffect, useState } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';

import { SplashScreen } from '@capacitor/splash-screen';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { AppUpdate } from "@robingenz/capacitor-app-update";

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

import 'swiper/css';

import "@/components/selectvariant/SelectVariant.css";

// provider store

import { Provider } from "react-redux"
import { store } from '@/features/store/Store';

import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { HelperConstant } from '@/components/helper/HelperConstant'
import { IOSDevice, androidDevice, findBrowser, findWindow, isMobilePlatform } from '@/components/helper/Helper'
import MasterServices from '@/services/Master.Services'

import AppHandler from '@/components/apphandler/AppHandler'
import Profile from '@/components/profile/Profile'
import BottomNavigation from '@/components/bottomnavigation/BottomNavigation'

const AppUpdateUI = dynamic(() => import('@/components/appupdateUI/AppUpdateUI'), { ssr: false });
const Header = dynamic(() => import('@/components/header/Header'), { ssr: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type ToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'ref' | 'className'> & {
    class?: string;
    key?: ReactText;
    ref?: any;
  }
}

declare global {
  export namespace JSX {
    interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements> { }
  }
}

type AppUpdateProps = { Android_Version: string, IOS_Version: string, Android_Forced_Update: boolean, IOS_Forced_Update: boolean }

export default function Apps({ Component, pageProps, emotionCache }: MyAppProps) {

  emotionCache = clientSideEmotionCache;

  const [flexibleUpdate, setFlexibleUpdate] = useState(false);
  const [forcedUpdate, setForcedUpdate] = useState(false);

  let notNowUpdate = findWindow() && window.localStorage.getItem(HelperConstant.noUpdate);

  const performImmediateUpdate = async () => {
    setForcedUpdate(true);
    setFlexibleUpdate(false);
    if (findWindow())
      localStorage.removeItem(HelperConstant.noUpdate);
  };

  const startFlexibleUpdate = async () => {
    setForcedUpdate(false);
    setFlexibleUpdate(true);
  };

  const noUpdate = async () => {
    setForcedUpdate(false);
    setFlexibleUpdate(false);
    if (findWindow())
      window.localStorage.setItem(HelperConstant.noUpdate, HelperConstant.noUpdate);
  };

  const dailyUpdateHandler = () => {
    if (findWindow()) {
      const hours = HelperConstant.updateTime;
      const setHoursLimit = hours * 60 * 60 * 1000;
      const now = new Date().getTime() as any;
      const setupTime = localStorage.getItem('setupTime');

      if (setupTime == null) {
        localStorage.setItem('setupTime', now);
      } else {
        if (now - parseInt(setupTime) > setHoursLimit) {
          localStorage.removeItem(HelperConstant.noUpdate);
          localStorage.setItem('setupTime', now);
        }
      }
    }
  }

  const checkAppVersion = async (data: AppUpdateProps) => {
    await AppUpdate.getAppUpdateInfo().then((res) => {
      if ((res.currentVersion !== (androidDevice() ? data.Android_Version : IOSDevice() ? data.IOS_Version : null) && (androidDevice() ? data.Android_Forced_Update : IOSDevice() ? data.IOS_Forced_Update : false) === true)) {
        return performImmediateUpdate();
      }
      if ((res.currentVersion !== (androidDevice() ? data.Android_Version : IOSDevice() ? data.IOS_Version : null) && (androidDevice() ? data.Android_Forced_Update : IOSDevice() ? data.IOS_Forced_Update : false) === false)) {
        return startFlexibleUpdate();
      }
      else {
        return noUpdate();
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  const getAppUpdate = () => {
    MasterServices.GetAppUpdate().then((res) => {
      if (res.status === 200) {
        checkAppVersion(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    if (findBrowser()) {
      SplashScreen.hide();
      if (isPlatform("android") || isPlatform("ios")) {
        dailyUpdateHandler();
        if (!notNowUpdate) {
          getAppUpdate();
        }
      };
    }

  }, []);

  useEffect(() => {
    if (findBrowser()) {
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        const UTM = event.url.split('dofy.in/home/').pop();
        if (UTM) {
          localStorage.setItem("UTM", UTM);
        }
      });
    }
  }, []);

  useEffect(() => {

    if (findBrowser()) {
      const captureUTM = () => {
        let UTM = window.location.hash;
        if (UTM) {
          localStorage.setItem("UTM", UTM);
        }
      }
      if (!isMobilePlatform()) {
        captureUTM();
      }
    }
  }, []);

  useEffect(() => {

    document.addEventListener('click', function handleClickOutsideBox(event) {
      const box = document.getElementById('mySidenav') as any;

      if (!box.contains(event.target) && box!.style.width.includes('300')) {
        box!.style.width = '0px';
      }
    });
  }, []);

  useEffect(() => {
    ionDefineCustomElements(window);
  })

  return <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      {(forcedUpdate || flexibleUpdate) && <AppUpdateUI forcedUpdate={forcedUpdate} flexibleUpdate={flexibleUpdate} noUpdate={noUpdate} />}
      <AppHandler />
      <Header />
      <div id="mySidenav" className="sidenav">
        <Profile />
      </div>
      <Component {...pageProps} />
      <BottomNavigation />
    </CacheProvider>
  </Provider >
}