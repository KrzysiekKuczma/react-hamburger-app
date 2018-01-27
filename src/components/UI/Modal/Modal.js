import React, { Component } from 'react';
import styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nexState) {
            return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
    }
    render() {
        return <Aux>
            <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
            <div
                className={styles.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-150vh)',
                    opacity: this.props.show ? '1' : '0',
                }}
            >
                {this.props.children}
            </div>
        </Aux>
    }
}

export default Modal;