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
import '../../assets/css/App.css';
import {makeStyles} from "@mui/styles";
import bgImage from "../../images/icarus_bg.jpg";

const useStyles = makeStyles(() => ({
    background: {
        flex: 1,
        background: `url(${bgImage}) repeat center center`,
    },
}));

function Login(props) {

    const classes = useStyles();

    const [showLogin, setShowLogin] = useState(true);

    const [openDialogForgotPwd, setOpenDialogForgotPwd] = useState(false);

    const [userData, setUserData] = useState({});

    const [forgotPasswordData, setForgotPasswordData] = useState({});

    const [signUpData, setSignUpData] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
    }, []);


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

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    if (props.isLoggedIn) {
        return <Redirect to={dashboard}/>;
    }
    return (
        <div className="App">
            <SnackbarSuccess/>
            <SnackbarFailed />
            <div className={classes.background}>
                {
                    showLogin ?
                    <LoginForm
                        user={userData}
                        onInputChange={handleChangeUserData}
                        onSubmit={handleLogin}
                        onForgotPasswordClick={handleForgotPasswordClick}
                        onClickShowPassword={handleClickShowPassword}
                        showPassword={showPassword}
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
                }
            />
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