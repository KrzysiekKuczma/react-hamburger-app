import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render() {
        return <Aux>
            <Toolbar
                isAuth={this.props.isAuthenticated} 
                toggleDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer 
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer}
                close={this.sideDrawerClosedHandler}
            />
            <main className={styles.content}>{this.props.children}</main>
        </Aux>
    }
};
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
}

export default connect(mapStateToProps)(Layout);