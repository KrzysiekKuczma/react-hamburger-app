import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

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
            <Toolbar toggleDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer}
                close={this.sideDrawerClosedHandler}
            />
            <main className={classes.content}>{this.props.children}</main>
        </Aux>
    }
};

export default Layout;