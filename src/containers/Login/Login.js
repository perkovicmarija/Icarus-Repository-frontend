import React, { useState, useEffect } from 'react';

import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SnackbarSuccess from '../../components/core/Snackbar/SnackbarSuccess';
import SnackbarFailed from '../../components/core/Snackbar/SnackbarFailed';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPwdDialogForm from './ForgotPwdDialogForm';
import DialogFormFrame from '../../components/core/Dialog/DialogFormFrame';
import authAction from '../../redux/auth/authActions';
import { dashboard } from '../../consts/routePaths';
import Image from '../../assets/img/datenn-c-white.png';
import '../../assets/css/App.css';

function Login(props) {

    const [showLogin, setShowLogin] = useState(true);

    const [openDialogForgotPwd, setOpenDialogForgotPwd] = useState(false);

    const [userData, setUserData] = useState({});

    const [forgotPasswordData, setForgotPasswordData] = useState({})

    const [signUpData, setSignUpData] = useState({})

    useEffect(() => {
    }, []);

    const [pageClassLogin, setPageClassLogin] = useState("PageSwitcher__Item PageSwitcher__Item--Active");

    const [pageClassSignUp, setPageClassSignUp] = useState("PageSwitcher__Item");

    const  handleChangeUserData = (event) => {
        const {name, value} = event.target;
        let userDataClone = Object.assign({}, userData);
        userDataClone[name] = value;
        setUserData(userDataClone);
    }

    const handleChangeSignUpData = (name, event) => {
        let signUpDataClone = Object.assign({}, signUpData);
        signUpDataClone[name] = event.target.value;
        setSignUpData(signUpDataClone);
    }

    const handleChangeForgotPwdData = (name, event) => {
        let forgotPasswordDataClone = Object.assign({}, forgotPasswordData);
        forgotPasswordDataClone[name] = event.target.value;
        setForgotPasswordData(forgotPasswordDataClone);
    }

    function handleLogin() {
        props.authAction.login(userData);
    }

    function handleSignUp() {
        props.authAction.signUp(signUpData);
    }

    function handleSwitch(e) {
        let name = e.target.name;
        let value = true;
        if (name === "signUp") {
            value = false;
            setPageClassLogin("PageSwitcher__Item");
            setPageClassSignUp("PageSwitcher__Item PageSwitcher__Item--Active");

        }
        else {
            setPageClassLogin("PageSwitcher__Item PageSwitcher__Item--Active");
            setPageClassSignUp("PageSwitcher__Item");
        }
        setShowLogin(value);

    }

    function handleForgotPasswordClick() {
        setOpenDialogForgotPwd(true);
    }

    function handleCloseDialogForgotPwd() {
        setOpenDialogForgotPwd(false);
    }

    function handleSubmitForgotPwd() {
        setOpenDialogForgotPwd(false);

        props.authAction.forgotUserPassword(forgotPasswordData);
    }

    if (props.isLoggedIn) {
        return <Redirect to={dashboard}/>;
    }
    return (
        <div className="App">
            <SnackbarSuccess/>
            <SnackbarFailed />
            <div className="App__Aside verticalContainer">

                <img alt="#" className="verticalItem" src={Image}/>

            </div>
            <div className="App__Form">

                <div className="PageSwitcher">
                    <a name="login" className={pageClassLogin} onClick={handleSwitch}>Login</a>
                    <a name="signUp" className={pageClassSignUp}
                       onClick={handleSwitch}>Sign up</a>
                </div>


                {showLogin ?
                    <LoginForm
                        user={userData}
                        onInputChange={handleChangeUserData}
                        onSubmit={handleLogin}
                        onForgotPasswordClick={handleForgotPasswordClick}
                    />
                    :
                    <SignUpForm
                        signUpData={signUpData}
                        onInputChange={handleChangeSignUpData}
                        onSubmit={handleSignUp}
                    />
                }
            </div>

            <DialogFormFrame
                onClose={handleCloseDialogForgotPwd}
                title="Forgot your password?"
                open={openDialogForgotPwd}
                formComponent={
                    <ForgotPwdDialogForm
                        onClose={handleCloseDialogForgotPwd}
                        email={forgotPasswordData.email}
                        onInputChange={handleChangeForgotPwdData}
                        onSubmit={handleSubmitForgotPwd}
                    />
                } />
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.Auth.token !== null,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);