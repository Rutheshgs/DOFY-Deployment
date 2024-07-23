import { useEffect, useRef, useState } from 'react';
import { IonAlert, IonContent, IonPage, isPlatform } from '@ionic/react';

import CarousalHeader from '../../components/carousalheader/CarousalHeader';
import Footer from '../../components/footer/Footer';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import Testimonial from '../../components/testimonial/Testimonial';
import OurVideos from '../../components/ourvideos/OurVideos';
import OurWorks from '../../components/ourworks/OurWorks';
import SelectYourDevice from '../../components/selectyourdevice/SelectYourDevice';
import WhyChooseUs from '../../components/whychooseus/WhyChooseUs';
import MetaTags from '../../components/metatags/MetaTags';
import { DeviceNameChangeReset } from '../../features/reducers/devicename/DeviceName.Reducers';
import { App } from '@capacitor/app';

function Home() {

    let dispatch = useTypedDispatch();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [isShow, setIsShow] = useState(true);

    const contentRef = useRef<HTMLIonContentElement | null>(null);

    const scrollToTop = () => {
        contentRef.current && contentRef.current.scrollToTop();
    };

    const backtoExit = () => {
        App.exitApp();
    }

    App.addListener("backButton", () => {
        if (window.location.pathname.includes("home")) {
            setIsAlertOpen(true);
        }
    });

    useEffect(() => {
        dispatch(DeviceNameChangeReset());
        scrollToTop();
    }, [dispatch]);

    return (
        <IonPage>
            <IonContent scrollEvents={true} ref={contentRef}>
                <MetaTags pageName={'Home'} />
                <CarousalHeader />
                <SelectYourDevice />
                <WhyChooseUs />
                <Testimonial />
                {isShow && <OurVideos setIsShow={setIsShow} />}
                <OurWorks />
                {isPlatform("android") || isPlatform("ios") ? <></> :
                    <Footer />
                }
                <IonAlert isOpen={isAlertOpen}
                    onDidDismiss={() => setIsAlertOpen(false)}
                    header={"Confirmation"}
                    subHeader={"Are you sure to want exit this app?"}
                    buttons={[{
                        text: "Yes",
                        handler: () => backtoExit()
                    }, {
                        text: "Cancel",
                        handler: () => setIsAlertOpen(false)
                    }]}
                />
            </IonContent>
        </IonPage>
    )
}

export default Home