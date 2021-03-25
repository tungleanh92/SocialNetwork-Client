import React, { useState, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./../../styles/css/main.min.css";
import "./../../styles/css/style.less";
import "./../../styles/css/color.less";
import "./../../styles/css/responsive.css";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import * as actions from "./../../states/duck/pages/loginPage/actions"

function reducer(state, action) {
    switch (action.type) {
        case 'change_name':
            return { ...state, name: action.value };
        case 'change_username':
            return { ...state, username: action.value };
        case 'change_password':
            return { ...state, password: action.value };
        case 'change_gender':
            return { ...state, gender: action.value };
        case 'change_email':
            return { ...state, email: action.value };
        default:
            throw new Error();
    }
}

let reg = {
    name: "",
    username: "",
    password: "",
    gender: "male",
    email: ""
}

const AuthenPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [account, dispatch] = useReducer(reducer, reg);
    const [gender, setGender] = useState("male");
    const [status, setStatus] = useState('');
    function onOpenReg() {
        setRegister(true);
    }
    function onChangeGender(e) {
        setGender(e.target.value)
        dispatch({ type: "change_gender", value: e.target.value })
    }
    function responseFacebook(response) {
        reg = {
            userId: response.id,
            name: response.name,
            username: "",
            password: "",
            gender: "",
            email: response.email
        }
        dispatched(actions.signUp(reg))
        setTimeout(() => {
            history.push('/newsfeed')
        }, 500);
    }
    function responseGoogle(response) {
        reg = {
            userId: response.googleId,
            name: response.profileObj.name,
            username: "",
            password: "",
            gender: "",
            email: response.profileObj.email
        }
        dispatched(actions.signUp(reg))
        setTimeout(() => {
            history.push('/newsfeed')
        }, 500);
    }

    const dispatched = useDispatch();
    function onRegister() {
        dispatched(actions.signUp(account))
    }
    let tokenOrStatus = useSelector(state => state.tokenOrStatus);
    useEffect(() => {
        setStatus(tokenOrStatus)
    }, [tokenOrStatus])

    let history = useHistory()
    function onLogin() {
        setTimeout(() => {
            history.push('/newsfeed')
        }, 500);
        dispatched(actions.logIn(username, password))
    }
    return (
        <div className="theme-layout">
            <div className="row">
                <div className="container-fluid pdng0">
                    <div className="row merged">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="land-featurearea">
                                <div className="land-meta">
                                    <h1>Winku</h1>
                                    <p>
                                        Winku is free to use for as long as you want with two active projects.
                                    </p>
                                    <div className="friend-logo">
                                        <span><img src={require("./../../styles/images/wink.png")} alt="" /></span>
                                    </div>
                                    <a href="/" title="" className="folow-me">Follow Us on</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className={`${register ? "show" : ""} login-reg-bg`}>
                                <div className="log-reg-area sign">
                                    <h2 className="log-title">Login</h2>
                                    <p>Don’t use Winku Yet? <a href="/" title="">Take the tour</a> or <a href="/" title="">Join now</a></p>
                                    <form method="post">
                                        <div className="form-group">
                                            <input type="text" id="input" value={username} required="required" onChange={(e) => setUsername(e.target.value)} />
                                            <label className="control-label" value={password}>Username</label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required="required" onChange={(e) => setPassword(e.target.value)} />
                                            <label className="control-label">Password</label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" required /><i className="check-box"></i>Always Remember Me.
                                            </label>
                                        </div>
                                        <a href="/" title="" className="forgot-pwd">Forgot Password?</a>

                                        <FacebookLogin
                                            appId="263978318460257"
                                            autoLoad={true}
                                            fields="name,email,picture"
                                            icon="fa-facebook"
                                            callback={responseFacebook} />
                                        <GoogleLogin
                                            clientId="517159803884-bltpd56kmq64id44io9jpro0qj63ong5.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                        {
                                            status.status === 401 ?
                                                <p style={{ color: "red" }}>{status.data.msg}</p>
                                                :
                                                <></>
                                        }
                                        <div className="submit-btns">
                                            <button className="mtr-btn signin" type="button" onClick={() => onLogin()}><span>Login</span></button>
                                            <button className="mtr-btn signup" type="button" onClick={() => onOpenReg()}><span>Register</span></button>
                                        </div>
                                    </form>
                                </div>
                                <div className="log-reg-area reg">
                                    <h2 className="log-title">Register</h2>
                                    <p>
                                        Don’t use Winku Yet? <a href="/" title="">Take the tour</a> or <a href="/" title="">Join now</a>
                                    </p>
                                    <form method="post">
                                        <div className="form-group">
                                            <input type="text" value={account.name} required="required" onChange={(e) => dispatch({ type: "change_name", value: e.target.value })} />
                                            <label className="control-label">First & Last Name</label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={account.username} required="required" onChange={(e) => dispatch({ type: "change_username", value: e.target.value })} />
                                            <label className="control-label">User Name</label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" value={account.password} required="required" onChange={(e) => dispatch({ type: "change_password", value: e.target.value })} />
                                            <label className="control-label">Password</label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="form-radio">
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" value="male" checked={gender === "male"} onChange={(e) => onChangeGender(e)} name="radio" defaultChecked="checked" /><i className="check-box"></i>Male
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" value="female" checked={gender === "female"} onChange={(e) => onChangeGender(e)} name="radio" /><i className="check-box"></i>Female
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={account.email} required="required" onChange={(e) => dispatch({ type: "change_email", value: e.target.value })} />
                                            <label className="control-label"><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6c29010d05002c">Email</a></label><i className="mtrl-select"></i>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" required /><i className="check-box"></i>Accept Terms & Conditions ?
                                    </label>
                                        </div>
                                        <a href="/" title="" className="already-have" onClick={() => setRegister(false)}>Already have an account</a>
                                        {
                                            status.status === 422 ?
                                                <p style={{ color: "red" }}>{status.data.msg}</p>
                                                :
                                                status.status === 200 ?
                                                    <p style={{ color: "green" }}>{status}</p>
                                                    :
                                                    <></>
                                        }
                                        <div className="submit-btns">
                                            <button className="mtr-btn signup" type="button" onClick={() => onRegister()}><span>Register</span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthenPage;