import { IonMenu, } from '@ionic/react';
import Profile from '../../pages/profile/Profile';

const Menu: React.FC = () => {

  return (
    <IonMenu contentId='main' type="overlay" side='end' className='z-index-1'>
      <Profile />
    </IonMenu>
  );
};

export default Menu;
