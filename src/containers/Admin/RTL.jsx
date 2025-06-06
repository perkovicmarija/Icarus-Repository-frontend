import React from "react";

import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from '@mui/styles';

import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import rtlStyle from "assets/jss/material-dashboard-react/layouts/rtlStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/rtl") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
        })}
    </Switch>
);

class RTL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: image,
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown ",
            mobileOpen: false,
            mainDrawerOpen: true
        };
    }

    handleImageClick = image => {
        this.setState({image: image});
    };
    handleColorClick = color => {
        this.setState({color: color});
    };
    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({fixedClasses: "dropdown show"});
        } else {
            this.setState({fixedClasses: "dropdown"});
        }
    };
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    handleMainDrawerToggle = () => {
        this.setState({mainDrawerOpen: !this.state.mainDrawerOpen});
    };

    getRoute() {
        return this.props.location.pathname !== "/admin/maps";
    }

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, ...rest} = this.props;
        const {mainDrawerOpen, mobileOpen} = this.state;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={"الإبداعية تيم"}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    handleMainDrawerToggle={this.handleMainDrawerToggle}
                    open={mobileOpen}
                    mainDrawerOpen={mainDrawerOpen}
                    color={this.state.color}
                    rtlActive
                    {...rest}
                />
                <div className={classNames(classes.mainPanel, {
                    [classes.mainPanelOpen]: mainDrawerOpen,
                    [classes.mainPanelClose]: !mainDrawerOpen
                })} ref="mainPanel">
                    <Navbar
                        routes={routes}
                        mainDrawerOpen={mainDrawerOpen}
                        handleDrawerToggle={this.handleDrawerToggle}
                        handleMainDrawerToggle={this.handleMainDrawerToggle}
                        rtlActive
                        {...rest}
                    />

                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>

                    <Footer/>
                    {/*<FixedPlugin
                        handleImageClick={this.handleImageClick}
                        handleColorClick={this.handleColorClick}
                        bgColor={this.state["color"]}
                        bgImage={this.state["image"]}
                        handleFixedClick={this.handleFixedClick}
                        fixedClasses={this.state.fixedClasses}
                        rtlActive
                    />*/}
                </div>
            </div>
        );
    }
}

RTL.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(rtlStyle)(RTL);
