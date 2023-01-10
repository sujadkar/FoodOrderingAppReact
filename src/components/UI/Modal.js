import classes from './Modal.module.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content} onClick={props.onClose}>{props.children}</div>
    </div>
}

const portalElements = document.getElementById("overlays");

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}></Backdrop>,portalElements)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElements)}
    </Fragment>
}

export default Modal;