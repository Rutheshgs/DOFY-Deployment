import { IonGrid, IonRow, IonCol, IonText, IonContent, IonPage, IonRouterLink } from '@ionic/react';

import policy from '../../../assets/images/policy.png';
import LegalTerms from '../../../components/legalterms/LegalTerms';
import Footer from '../../../components/footer/Footer';

import "./CookiePolicy.css";

import { CustomImg } from '../../../components/shared/CustomImage';

function CookiePolicy() {
    return (
        <IonPage>
            <IonContent >
                <IonGrid className='p-0 cp-grid'>
                    <IonRow className='cp-header-row '>
                        <IonCol sizeLg='10' sizeXs='8' className='cp-padding'>
                            <IonText className='cp-header-text'>Cookie Policy</IonText>
                        </IonCol>
                        <IonCol sizeLg='2' sizeXs='4'>
                            <CustomImg src={policy} className='cp-img' alt='policy'/>
                        </IonCol>
                    </IonRow>
                    <IonRow className='cp-row'>
                        <IonCol>
                            <IonRow>
                                <IonCol ></IonCol>
                            </IonRow>
                            <IonRow  >
                                <IonCol sizeLg='3' sizeXs='12' >
                                    <LegalTerms />
                                </IonCol>
                                <IonCol sizeLg='9' sizeXs='12' className='cp-text cp-header-padding'>
                                    <IonText> Invent SoftLabs (India) Private Limited (Dofy) uses cookies.<br />
                                        at &nbsp;<IonRouterLink href='#'>https://www.Dofy.in</IonRouterLink>&nbsp;
                                        (the Website) to distinguish you from other users of this Website. This helps us to provide you with a good experience when you browse our Website and also allows us to improve our Website. By using this Website, you consent to our use of cookies in accordance with this Cookie Notice. You will have seen a pop up to this effect on your first visit to the Website. Although it will not usually appear on subsequent visits, you may withdraw your consent at any time by following the instructions below, including by changing your browser settings so that cookies from this Website cannot be placed on your device. Please note that some of the services on the Website will not function so well if cookies are disabled. After your initial visit to the Website we may change the cookies we use. This cookies policy will always allow you to know who is placing cookies, for what purpose and give you the means to disable them so you should check it from time to time.<br /><br />
                                        <b>What is a Cookie?</b><br /><br />
                                        A cookie is a small file of letters and numbers that are sent to and stored on your computer, smartphone or other device for accessing the internet, whenever you visit a site. Cookies are useful because they allow a website to recognize a user’s device.<br /><br />
                                        We use cookies for a variety of reasons, such as letting you navigate between pages efficiently, remembering your preferences and generally improving the user experience. Session cookies are deleted automatically when you close your browser and persistent cookies remain on your device after the browser is closed (for example to remember your user preferences when you return to the site).<br /><br />
                                        <b>How and Why the Website Uses Cookies</b><br /><br />
                                        The cookies we use are completely safe. In fact, many of them are used purely to provide important security features such as protecting your data. Overall, cookies help us provide you with a better Website and service, by enabling us to monitor which pages you find useful and which you do not.<br /><br />
                                        We use cookies to safeguard your privacy when you’re browsing the Website. We also use them to give you the best experience when you visit this Website. By using cookies, we can make it easier for you to do many things, such as managing your accounts, policies, or login details, and selecting for products and services. Cookies can also allow us to tailor the content of this Website so we can show you services or adverts we think you may be interested in.<br /><br />
                                        We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page traffic and improve our website and services in order to tailor it to user needs. We only use this information for statistical analysis purposes and then the data is removed from the system. Finally, we use analytics cookies, including third party analytics cookies, to help us make the Website better for those who visit it regularly. They help us work out what users like
                                        and don’t like and how we can improve things for you.<br /><br />
                                        <b>What Cookies Do We Use On Our Website ?</b><br /><br />
                                        Essential or “strictly necessary” cookies: as you might guess, essential cookies enable essential functionality of the site to work, for example ensuring that you can move between pages on the Website securely. This category of cookies cannot be disabled. For example, session cookies needed to transmit the Website, authentication cookies, and security cookies. We use the following cookies:</IonText><br /><br />
                                    <IonRow className='cp-ion-border'>
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>
                                            <b>Cookie Name</b>
                                        </IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>
                                            <b>What does it do?</b>
                                        </IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>
                                            <b>Retention Period</b>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_ga</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Registers a unique ID that is used to generate statistical data on how the visitor uses the website.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>2 years</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_gat</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Used by Google Analytics to throttle request rate</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>1 day</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_gid</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Registers a unique ID that is used to generate statistical data on how the visitor uses the website.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>1 day</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_hjid</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Sets a unique ID for the session. This allows the website to obtain data on visitor behaviour for statistical purposes.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>__widgetsettings</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Collects data on user behaviour and interaction in order to optimize the website and make advertisement on the website more relevant.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Persistant</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_fbp</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Used by Facebook to deliver a series of advertisement products such as real time bidding from third party advertisers.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>3 months</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>_hjIncludedInSample</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Determines if the user’s navigation should be registered in a certain statistical place holder.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>AA003</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Collects information on visitor behaviour on multiple websites. This information is used on the website, in order to optimize the relevance of advertisement.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>3 months</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>ads/ga-audiences</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Used by Google AdWords to re-engage visitors that are likely to convert to customers based on the visitor’s online behaviour across websites.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>GPS</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Registers a unique ID on mobile devices to enable tracking based on geographical GPS location.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>1 days</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>https://Dofy.in/</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Sets a unique ID for the visitor, that allows third party advertisers to target the visitor with relevant advertisement. This pairing service is provided by third party advertisement hubs, which facilitates real-time bidding for advertisers.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>i/jot/syndication</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Used by twitter.Pixel Tracker</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>IDE</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Used by Google DoubleClick to register and report the website user’s actions after viewing or clicking one of the advertiser’s ads with the purpose of measuring the efficacy of an ad and to present targeted ads to the user.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>1 year</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>VISITOR_INFO1_LIVE</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Tries to estimate the users’ bandwidth on pages with integrated YouTube videos.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>179 days</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>YSC</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Registers a unique ID to keep statistics of what videos from YouTube the user has seen.</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-cast-installed</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-connected-devices</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-device-id</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>	Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Persistent</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-fast-check-period</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-session-app</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>yt-remote-session-name</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Stores the user’s video player preferences using embedded YouTube video</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonText>Website functionality cookies: We make use of cookies to provide you with certain functionality. For example, to remember choices you make and to provide you with enhanced and more personalized features. These cookies are not used to transfer your browsing on other sites. We use the following:</IonText>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'><b>Cookie Name</b></IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'><b>What does it do?</b></IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'><b>Retention Period</b></IonCol>
                                    </IonRow>
                                    <IonRow >
                                        <IonCol className='cp-col' sizeLg='4' sizeXs='4'>lang</IonCol>
                                        <IonCol className='cp-col' sizeLg='6' sizeXs='4'>Remembers the user’s selected language version of a website</IonCol>
                                        <IonCol className='cp-col' sizeLg='2' sizeXs='4'>Session</IonCol>
                                    </IonRow>
                                    <IonText>Social media cookies: These cookies allow users to share our Website or materials on social media sites. Because these cookies are not within our control, you should refer to their respective privacy policies to understand how they work.<br /><br />
                                        <b> Use of IP Addresses and Web Logs</b><br /><br />
                                        We may also use your IP address and browser type to help diagnose problems with our server, to administer our Website and to improve the service we offer to you. An IP address is a numeric code that identifies your computer on the internet. Your IP address might also be used to gather broad demographic information. We may perform IP lookups to determine which domain you are coming from (e.g. google.com) to more accurately gauge our users’ demographics.<br /><br />
                                        <b>Keeping your Personal Information Safe</b><br /><br />
                                        Our cookies do not store personal information such as your name, address, phone number or email in a format that can be read by others. The cookies we use cannot read or search your computer, smartphone or web-enabled device to obtain information about you or your family, or read any material kept on your hard drive. We do use a small number of cookies that store encrypted versions of information where you have asked us to, such as the Login OTP created to identify you as you navigate through pages whilst you are active on the Website.<br /><br />
                                        <b>How to Manage Cookies Through the Browser?</b><br /><br />
                                        The ability to enable, disable or delete cookies can be completed at browser level. In order to do this, follow the instructions provided by your browser (usually located within the “Help”, “Tools” or “Edit” facility). Disabling a cookie or category of cookie does not delete the cookie from your browser; you will need to do this yourself from your browser. If you have disabled one or more cookies, we may still use information collected from cookies prior to your disabled preference being set, however, we will stop using the disabled cookie to collect any further information. Please note that if you activate the setting on your browser that allows you to refuse the setting of all or some cookies (including essential cookies) you may not be able to access all or parts of our Website.<br /><br />
                                        <b>Cookies Policy Does Not Cover Third Party Websites</b><br /><br />
                                        When we include links to other websites, please bear in mind they will have their own privacy and cookie policies that will govern the use of any information you submit. We recommend you read their policies as we are not responsible or liable for their privacy practices.<br /><br />
                                        <b>Changes To The Cookies Policy</b><br /><br />
                                        We may update this cookies policy and we would encourage you to review the policy from time to time to stay informed of how we are using cookies. This cookies policy was last updated on 15 th May 2020.</IonText><br />
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default CookiePolicy