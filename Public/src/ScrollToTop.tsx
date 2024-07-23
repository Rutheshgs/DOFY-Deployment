import { IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { arrowUpCircle } from 'ionicons/icons';

const ScrollToTop: React.FC = (props: any) => {
    const [showScroll, setShowScroll] = useState(true);
    const location = useLocation();

    const checkScrollTop = () => {
        console.log('check scroll');
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log('test' + window.screenY);
            if (window.scrollY > 400) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        });
    }, []);

    const windowScrollToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            {props.children}
            <IonIcon color='warning' className='scroll-to-top' hidden={!showScroll}
                icon={arrowUpCircle} onClick={() => windowScrollToTop()}>
            </IonIcon>
        </>
    )
};

export default withRouter(ScrollToTop);

function unlisten() {
    throw new Error("Function not implemented.");
}
