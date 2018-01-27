import React from 'react';
import styles from './SideDrawer.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedStyles = [styles.SideDrawer, styles.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.close}/>
            <div className={attachedStyles.join(' ')} onClick={props.close}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
    );
};

export default sideDrawer;