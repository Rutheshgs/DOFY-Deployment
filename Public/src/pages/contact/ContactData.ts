import call from '../../assets/images/call.png';
import mail from '../../assets/images/mail.png';
import browser from '../../assets/images/browser.png'
import { isIn } from '../../components/helper/Helper';
export const ContactData = [
    {
        id: 1,
        image: call,
        name: isIn() ? '+91-7676320000' : ' +971-506340430',
        show: isIn() ? true : true
    },
    {
        id: 2,
        image: mail,
        name: isIn() ? 'customercare@dofy.in' : 'customercare@dofy.ae',
        show: isIn() ? true : true

    },
    // {
    //     id:3,
    //     image:browser,
    //     name:'dofy.in',
    //     show:isIn()?true : false
    // },
]