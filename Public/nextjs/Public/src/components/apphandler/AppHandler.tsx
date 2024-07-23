import React, { useEffect } from 'react'
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { findBrowser } from '../helper/Helper';
import { findDeviceDetail } from '@/features/reducers/finddevice/FindDevice.Reducers';

function AppHandler() {
    const dispatch = useTypedDispatch();

    const xtraSmallScreen = findBrowser() && window.matchMedia("(max-width:375px)") as any;
    const smallScreen = findBrowser() && window.matchMedia("(max-width:576px)") as any;
    const tabletPortrait = findBrowser() && window.matchMedia("(max-width:1024px)") as any;
    const mediumScreen = findBrowser() && window.matchMedia("(max-width:1024px) and (min-width:577px)") as any;
    const largeScreen = findBrowser() && window.matchMedia("(max-width:1919px) and (min-width:1025px)") as any;
    const extraLargeScreen = findBrowser() && window.matchMedia("(min-width:1920px)") as any;

    useEffect(() => {

        const isSmallMobileDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "smallmobile" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "smallmobile" }));
            }
        }

        const isMobileDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "mobile" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "mobile" }));
            }
        }

        const isTabletDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "tablet" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "tablet" }));
            }
        }

        const isTabletPortraitDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "tabletportrait" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "tabletportrait" }));
            }
        }

        const isDesktopDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "desktop" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "desktop" }));
            }
        }

        const extraLargeScreenDevice = (e: { matches: any; }) => {
            if (e.matches) {
                dispatch(findDeviceDetail({ payload: true, type: "extralarge" }));
            }
            else {
                dispatch(findDeviceDetail({ payload: false, type: "extralarge" }));
            }
        }

        if (findBrowser()) {
            xtraSmallScreen.addListener(isSmallMobileDevice);
            smallScreen.addListener(isMobileDevice);
            mediumScreen.addListener(isTabletDevice);
            tabletPortrait.addListener(isTabletPortraitDevice);
            largeScreen.addListener(isDesktopDevice);
            extraLargeScreen.addListener(extraLargeScreenDevice);

            isSmallMobileDevice(xtraSmallScreen);
            isMobileDevice(smallScreen);
            isTabletDevice(mediumScreen);
            isTabletPortraitDevice(tabletPortrait);
            isDesktopDevice(largeScreen);
            extraLargeScreenDevice(extraLargeScreen);
        }

        return () => {
            if (findBrowser()) {
                xtraSmallScreen.removeListener(isSmallMobileDevice);
                smallScreen.removeListener(isMobileDevice);
                mediumScreen.removeListener(isTabletDevice);
                tabletPortrait.removeListener(isTabletPortraitDevice);
                largeScreen.removeListener(isDesktopDevice);
                extraLargeScreen.removeListener(extraLargeScreenDevice);
            }
        }

    }, [xtraSmallScreen, smallScreen, mediumScreen, tabletPortrait, largeScreen, extraLargeScreen, dispatch]);

    return (
        <></>
    )
}

export default AppHandler