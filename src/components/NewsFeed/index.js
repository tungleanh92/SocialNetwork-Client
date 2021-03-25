import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./../../styles/css/main.min.css";
import "./../../styles/css/style.less";
import "./../../styles/css/color.less";
import "./../../styles/css/responsive.css";
import * as actions from "./../../states/duck/pages/NewsFeed/actions"
import * as actionsPost from "./../../states/duck/pages/postManages/actions"
import * as actionsUser from "./../../states/duck/pages/userManages/actions"
import { Redirect } from "react-router-dom";
import { io } from "socket.io-client";
function onLogOut() {
    localStorage.removeItem('token');
}

function toDate(string) {
    let d = new Date(string);
    let mon = d.getMonth() + 1;
    return d.getDate() + "/" + mon + "/" + d.getFullYear();
}
let socket;
let room = 0;
const NewsFeed = () => {
    const ENDPOINT = 'http://localhost:8080'
    useEffect(() => {
        socket = io(ENDPOINT)
        console.log('useEffect');
        socket.emit("testConnect", (data) => {
            console.log('zxc');
            console.log(data);
            console.log(socket.connected);
        });
        // io.emit('join', "zxc")
    }, [])


    console.log('test0');
    let token = localStorage.getItem('token');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getAccountDetail({ token, token }));
        dispatch(actionsUser.showUsers());
    }, [token])
    const myAccount = useSelector(state => state.account);
    const otherAccount = useSelector(state => state.showUsers)
    console.log(myAccount);

    let tmp = [];
    const [post, setPost] = useState('');
    const [comment, setComment] = useState(tmp);
    const [chatBox, setChatBox] = useState(false);
    const [chatBoxName, setChatBoxName] = useState('');
    useEffect(() => {
        dispatch(actionsPost.createComment());
        dispatch(actionsPost.createPost({ content: post }));
    }, [])
    const getPost = useSelector(state => state.postManage);
    if (!token) {
        return <Redirect to="/" />
    }

    function onWritePost(value) {
        setPost(value);
    }
    function onPost() {
        dispatch(actionsPost.createPost({ content: post }));
        setPost('')
        setComment([...comment, { content: "" }]);
    }

    function onWriteComment(e, index) {
        if (comment && getPost) {
            tmp = Array(getPost.length).fill({ content: "" })
            setComment(tmp);
            const { name, value } = e.target;
            const list = [...comment];
            list[index][name] = value;
            setComment(list);
        }
    }
    function onPostComment(postId, index) {
        dispatch(actionsPost.createComment({ postId: postId, msg: comment[index].content }));
    }

    function renderComment(prop) {
        let comments = prop.cmt
        let eachPost = [];
        if (comments) {
            for (let i = 0; i < comments.length; i++) {
                eachPost.push(
                    <li>
                        <div className="comet-avatar">
                            <img src={require("./../../styles/images/userDefault.jpg")} alt="" />
                        </div>
                        <div className="we-comment">
                            <div className="coment-head">
                                <h5><a href="/" title>???</a></h5>
                                <span>{eachPost.createdAt}</span>
                                <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply" /></a>
                            </div>
                            <p>{comments[i].msg}</p>
                        </div>
                    </li>
                )
            }
        }
        return eachPost
    }

    let renderFriends = [];
    if (otherAccount) {
        otherAccount.map((eachUser, index) => {
            renderFriends.push(
                <li key={index}>
                    <figure>
                        <img src={require("./../../styles/images/userDefault.jpg")} alt="" />
                        <span className="status f-online" />
                    </figure>
                    <div className="friendz-meta">
                        <button onClick={() => onOpenChatBox(eachUser.fullname)}>{eachUser.fullname}</button>
                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a0d7c9ced4c5d2d3cfccc4c5d2e0c7cdc1c9cc8ec3cfcd">[email&nbsp;protected]</a></i>
                    </div>
                </li>
            )
        })
    }

    let renderPost = [];
    const sortedPostList = getPost.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).reverse()
    sortedPostList.map((eachPost, index) => {
        renderPost.push(
            <div key={index} className="central-meta item">
                <div className="user-post">
                    <div className="friend-info">
                        <figure>
                            <img src={require("./../../styles/images/userDefault.jpg")} alt="" />
                        </figure>
                        <div className="friend-name">
                            <ins><a href="/" title> {eachPost.username} </a></ins>
                            <span>Published: {toDate(eachPost.createdAt)}</span>
                        </div>
                        <div className="post-meta">
                            <img src="" alt="" />
                            <div className="description">
                                <p>{eachPost.content}</p>
                            </div>
                            <div className="we-video-info">
                                <ul>
                                    <li>
                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                            <i className="fa fa-comment" />
                                            <ins>{eachPost.commentsCount}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="like" data-toggle="tooltip" title="like">
                                            <i className="ti-heart" />
                                            <ins>{eachPost.likesCount}</ins>
                                        </span>
                                    </li>
                                    <li className="social-media">
                                        <div className="menu">
                                            <div className="btn trigger"><i className="fa fa-share-alt" /></div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-html5" /></a></div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-facebook" /></a></div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-google-plus" /></a></div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-twitter" /></a></div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-css3" /></a></div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-instagram" /></a>
                                                </div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-dribbble" /></a>
                                                </div>
                                            </div>
                                            <div className="rotater">
                                                <div className="btn btn-icon"><a href="#" title><i className="fa fa-pinterest" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="coment-area">
                        <ul className="we-comet">
                            {renderComment(eachPost)}
                            {/* <li>
                                <a href="#" title className="showmore underline">more comments</a>
                            </li> */}
                            <li className="post-comment">
                                <div className="comet-avatar">
                                    <img src={require("./../../styles/images/userDefault.jpg")} alt="" />
                                </div>
                                <div className="post-comt-box">
                                    <textarea name="content" value={comment[index] ? comment[index].content : ''} onChange={(e) => onWriteComment(e, index)} placeholder="Post your comment" />
                                    <div className="add-smiles">
                                        <span className="em em-expressionless" title="add icon" />
                                    </div>
                                    <div className="smiles-bunch">
                                        <i className="em em---1" />
                                        <i className="em em-smiley" />
                                        <i className="em em-anguished" />
                                        <i className="em em-laughing" />
                                        <i className="em em-angry" />
                                        <i className="em em-astonished" />
                                        <i className="em em-blush" />
                                        <i className="em em-disappointed" />
                                        <i className="em em-worried" />
                                        <i className="em em-kissing_heart" />
                                        <i className="em em-rage" />
                                        <i className="em em-stuck_out_tongue" />
                                    </div>
                                    <button onClick={() => onPostComment(eachPost.postId, index)} type="submit" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    })

    function onOpenChatBox(name) {
        setChatBoxName(name)
        setChatBox(true);
    }
    function onCloseChatBox() {
        setChatBox(false);
    }
    return (
        <div>
            <div className="theme-layout">
                <div className="responsive-header">
                    <div className="mh-head first Sticky">
                        <span className="mh-btns-left">
                            <a className href="/"><i className="fa fa-align-justify" /></a>
                        </span>
                        <span className="mh-text">
                            <a href="/" title="true"><img src="images/logo2.png" alt="" /></a>
                        </span>
                        <span className="mh-btns-right">
                            <a className="fa fa-sliders" href="/" />
                        </span>
                    </div>
                    <div className="mh-head second">
                        <form className="mh-form">
                            <input placeholder="search" />
                            <a href="/" className="fa fa-search" />
                        </form>
                    </div>
                    <nav id="menu" className="res-menu">
                        <ul>
                            <li><span>Home</span>
                                <ul>
                                    <li><a href="/" title>Home Social</a></li>
                                    <li><a href="/" title>Home Social 2</a></li>
                                    <li><a href="/" title>Home Company</a></li>
                                    <li><a href="/" title>Login page</a></li>
                                    <li><a href="/" title>Logout Page</a></li>
                                    <li><a href="/" title>news feed</a></li>
                                </ul>
                            </li>
                            <li><span>Time Line</span>
                                <ul>
                                    <li><a href="/" title>timeline</a></li>
                                    <li><a href="/" title>timeline friends</a></li>
                                    <li><a href="/" title>timeline groups</a></li>
                                    <li><a href="/" title>timeline pages</a></li>
                                    <li><a href="/" title>timeline photos</a></li>
                                    <li><a href="/" title>timeline videos</a></li>
                                    <li><a href="/" title>favourit page</a></li>
                                    <li><a href="/" title>groups page</a></li>
                                    <li><a href="/" title>Likes page</a></li>
                                    <li><a href="/" title>people nearby</a></li>
                                </ul>
                            </li>
                            <li><a href="about.html" title>about</a></li>
                            <li><a href="about-company.html" title>About Us2</a></li>
                            <li><a href="contact.html" title>contact</a></li>
                            <li><a href="contact-branches.html" title>Contact Us2</a></li>
                            <li><a href="widgets.html" title>Widgts</a></li>
                        </ul>
                    </nav>
                    <nav id="shoppingbag">
                        <div>
                            <div className>
                                <form method="post">
                                    <div className="setting-row">
                                        <span>use night mode</span>
                                        <input type="checkbox" id="nightmode" />
                                        <label htmlFor="nightmode" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Notifications</span>
                                        <input type="checkbox" id="switch2" />
                                        <label htmlFor="switch2" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Notification sound</span>
                                        <input type="checkbox" id="switch3" />
                                        <label htmlFor="switch3" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>My profile</span>
                                        <input type="checkbox" id="switch4" />
                                        <label htmlFor="switch4" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Show profile</span>
                                        <input type="checkbox" id="switch5" />
                                        <label htmlFor="switch5" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                </form>
                                <h4 className="panel-title">Account Setting</h4>
                                <form method="post">
                                    <div className="setting-row">
                                        <span>Sub users</span>
                                        <input type="checkbox" id="switch6" />
                                        <label htmlFor="switch6" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>personal account</span>
                                        <input type="checkbox" id="switch7" />
                                        <label htmlFor="switch7" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Business account</span>
                                        <input type="checkbox" id="switch8" />
                                        <label htmlFor="switch8" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Show me online</span>
                                        <input type="checkbox" id="switch9" />
                                        <label htmlFor="switch9" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Delete history</span>
                                        <input type="checkbox" id="switch10" />
                                        <label htmlFor="switch10" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                    <div className="setting-row">
                                        <span>Expose author name</span>
                                        <input type="checkbox" id="switch11" />
                                        <label htmlFor="switch11" data-on-label="ON" data-off-label="OFF" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>{/* responsive header */}
                <div className="topbar stick">
                    <div className="logo">
                        <a title href="/"><img src={require("./../../styles/images/logo.png")} alt="" /></a>
                    </div>
                    <div className="top-area">
                        <ul className="main-menu">
                            <li>
                                <a href="#" title>Home</a>
                                <ul>
                                    <li><a href="/" title>Home Social</a></li>
                                    <li><a href="/" title>Home Social 2</a></li>
                                    <li><a href="/" title>Home Company</a></li>
                                    <li><a href="/" title>Login page</a></li>
                                    <li><a href="/" title>Logout Page</a></li>
                                    <li><a href="/" title>news feed</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" title>timeline</a>
                                <ul>
                                    <li><a href="/" title>timeline</a></li>
                                    <li><a href="/" title>timeline friends</a></li>
                                    <li><a href="/" title>timeline groups</a></li>
                                    <li><a href="/" title>timeline pages</a></li>
                                    <li><a href="/" title>timeline photos</a></li>
                                    <li><a href="/" title>timeline videos</a></li>
                                    <li><a href="/" title>favourit page</a></li>
                                    <li><a href="/" title>groups page</a></li>
                                    <li><a href="/" title>Likes page</a></li>
                                    <li><a href="/" title>people nearby</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" title>account settings</a>
                                <ul>
                                    <li><a href="/" title>create fav page</a></li>
                                    <li><a href="/" title>edit account setting</a></li>
                                    <li><a href="/" title>edit-interest</a></li>
                                    <li><a href="/" title>edit-password</a></li>
                                    <li><a href="/" title>edit profile basics</a></li>
                                    <li><a href="/" title>edit work educations</a></li>
                                    <li><a href="/" title>message box</a></li>
                                    <li><a href="/" title>Inbox</a></li>
                                    <li><a href="/" title>notifications page</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" title>more pages</a>
                                <ul>
                                    <li><a href="404.html" title>404 error page</a></li>
                                    <li><a href="about.html" title>about</a></li>
                                    <li><a href="contact.html" title>contact</a></li>
                                    <li><a href="faq.html" title>faq's page</a></li>
                                    <li><a href="insights.html" title>insights</a></li>
                                    <li><a href="knowledge-base.html" title>knowledge base</a></li>
                                    <li><a href="widgets.html" title>Widgts</a></li>
                                </ul>
                            </li>
                            <li style={{ position: 'unset' }}>Hi {myAccount.fullname}</li>
                        </ul>
                        <ul className="setting-area">
                            <li>
                                <a href="#" title="Home" data-ripple><i className="ti-search" /></a>
                                <div className="searched">
                                    <form method="post" className="form-search">
                                        <input type="text" placeholder="Search Friend" />
                                        <button data-ripple><i className="ti-search" /></button>
                                    </form>
                                </div>
                            </li>
                            <li><a href="/" title="Home" data-ripple><i className="ti-home" /></a></li>
                            <li>
                                <a href="#" title="Notification" data-ripple>
                                    <i className="ti-bell" /><span>20</span>
                                </a>
                                <div className="dropdowns">
                                    <span>4 New Notifications</span>
                                    <ul className="drops-menu">
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-1.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>sarah Loren</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag green">New</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-2.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Jhon doe</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag red">Reply</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-3.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Andrew</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag blue">Unseen</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-4.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Tom cruse</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag">New</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-5.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Amy</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag">New</span>
                                        </li>
                                    </ul>
                                    <a href="/" title className="more-mesg">view more</a>
                                </div>
                            </li>
                            <li>
                                <a href="#" title="Messages" data-ripple><i className="ti-comment" /><span>12</span></a>
                                <div className="dropdowns">
                                    <span>5 New Messages</span>
                                    <ul className="drops-menu">
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-1.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>sarah Loren</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag green">New</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-2.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Jhon doe</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag red">Reply</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-3.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Andrew</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag blue">Unseen</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-4.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Tom cruse</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag">New</span>
                                        </li>
                                        <li>
                                            <a href="/" title>
                                                <img src="images/resources/thumb-5.jpg" alt="" />
                                                <div className="mesg-meta">
                                                    <h6>Amy</h6>
                                                    <span>Hi, how r u dear ...?</span>
                                                    <i>2 min ago</i>
                                                </div>
                                            </a>
                                            <span className="tag">New</span>
                                        </li>
                                    </ul>
                                    <a href="/" title className="more-mesg">view more</a>
                                </div>
                            </li>
                            <li><a href="#" title="Languages" data-ripple><i className="fa fa-globe" /></a>
                                <div className="dropdowns languages">
                                    <a href="#" title><i className="ti-check" />English</a>
                                    <a href="#" title>Arabic</a>
                                    <a href="#" title>Dutch</a>
                                    <a href="#" title>French</a>
                                </div>
                            </li>
                        </ul>
                        <div className="user-img">
                            <img src="images/resources/admin.jpg" alt="" />
                            <span className="status f-online" />
                            <div className="user-setting">
                                <a href="#" title><span className="status f-online" />online</a>
                                <a href="#" title><span className="status f-away" />away</a>
                                <a href="#" title><span className="status f-off" />offline</a>
                                <a href="#" title><i className="ti-user" /> view profile</a>
                                <a href="#" title><i className="ti-pencil-alt" />edit profile</a>
                                <a href="#" title><i className="ti-target" />activity log</a>
                                <a href="#" title><i className="ti-settings" />account setting</a>
                                <a href="#" title><i className="ti-power-off" />log out</a>
                            </div>
                        </div>
                        <span className="ti-menu main-menu" data-ripple />
                    </div>
                </div>{/* topbar */}

                {/* <section>
                    <div class="feature-photo">
                        <figure><img src={require("./../../styles/images/resources/timeline-1.jpg")} alt="" /></figure>
                        <div class="add-btn">
                            <span>1205 followers</span>
                            <a href="#" title="" data-ripple="">Add Friend</a>
                        </div>
                        <form class="edit-phto">
                            <i class="fa fa-camera-retro"></i>
                            <label class="fileContainer">
                                Edit Cover Photo
				                <input type="file" />
                            </label>
                        </form>
                        <div class="container-fluid">
                            <div class="row merged">
                                <div class="col-lg-2 col-sm-3">
                                    <div class="user-avatar">
                                        <figure>
                                            <img src={require("./../../styles/images/resources/user-avatar.jpg")} alt="" />
                                            <form class="edit-phto">
                                                <i class="fa fa-camera-retro"></i>
                                                <label class="fileContainer">
                                                    Edit Display Photo
										<input type="file" />
                                                </label>
                                            </form>
                                        </figure>
                                    </div>
                                </div>
                                <div class="col-lg-10 col-sm-9">
                                    <div class="timeline-info">
                                        <ul>
                                            <li class="admin-name">
                                                <h5>Janice Griffith</h5>
                                                <span>Group Admin</span>
                                            </li>
                                            <li>
                                                <a class="active" href="/" title="" data-ripple="">time line</a>
                                                <a class="" href="/" title="" data-ripple="">Photos</a>
                                                <a class="" href="/" title="" data-ripple="">Videos</a>
                                                <a class="" href="/" title="" data-ripple="">Friends</a>
                                                <a class="" href="/" title="" data-ripple="">Groups</a>
                                                <a class="" href="about.html" title="" data-ripple="">about</a>
                                                <a class="" href="#" title="" data-ripple="">more</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section>
                    <div className="gap gray-bg">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row" id="page-contents">
                                        <div className="col-lg-3">
                                            <aside className="sidebar static">
                                                <div className="widget">
                                                    <h4 className="widget-title">Shortcuts</h4>
                                                    <ul className="naves">
                                                        <li>
                                                            <i className="ti-clipboard" />
                                                            <a href="/" title>News feed</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-mouse-alt" />
                                                            <a href="/" title>Inbox</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-files" />
                                                            <a href="/" title>My pages</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-user" />
                                                            <a href="/" title>friends</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-image" />
                                                            <a href="/" title>images</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-video-camera" />
                                                            <a href="/" title>videos</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-comments-smiley" />
                                                            <a href="/" title>Messages</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-bell" />
                                                            <a href="/" title>Notifications</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-share" />
                                                            <a href="/" title>People Nearby</a>
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-bar-chart-o" />
                                                            <a href="insights.html" title>insights</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-power-off" />
                                                            <a href="/" onClick={() => onLogOut()} title>Logout</a>
                                                        </li>
                                                    </ul>
                                                </div>{/* Shortcuts */}
                                                <div className="widget">
                                                    <h4 className="widget-title">Recent Activity</h4>
                                                    {/* <ul className="activitiez">
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>10 hours Ago</i>
                                                                <span><a href="#" title>Commented on Video posted </a></span>
                                                                <h6>by <a href="/">black demon.</a></h6>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>30 Days Ago</i>
                                                                <span><a href="#" title>Posted your status. “Hello guys, how are you?”</a></span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>2 Years Ago</i>
                                                                <span><a href="#" title>Share a video on her timeline.</a></span>
                                                                <h6>"<a href="#">you are so funny mr.been.</a>"</h6>
                                                            </div>
                                                        </li>
                                                    </ul> */}
                                                </div>{/* recent activites */}
                                            </aside>
                                        </div>{/* sidebar */}

                                        <div className="col-lg-6">
                                            <div className="central-meta">
                                                <div className="new-postbox">
                                                    <figure>
                                                        <img src={require("./../../styles/images/resources/admin2.jpg")} alt="" />
                                                    </figure>
                                                    <div className="newpst-input">
                                                        <textarea value={post} onChange={(e) => onWritePost(e.target.value)} rows={2} placeholder="Write something" />
                                                        <div className="attachments">
                                                            <ul>
                                                                <li>
                                                                    <i className="fa fa-music" />
                                                                    <label className="fileContainer">
                                                                        <input type="file" />
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <i className="fa fa-image" />
                                                                    <label className="fileContainer">
                                                                        <input type="file" />
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <i className="fa fa-video-camera" />
                                                                    <label className="fileContainer">
                                                                        <input type="file" />
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <i className="fa fa-camera" />
                                                                    <label className="fileContainer">
                                                                        <input type="file" />
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <button className="createPost" onClick={() => onPost()}>Post</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>{/* add post new box */}

                                            <div className="loadMore">
                                                {renderPost}
                                            </div> {/*centerl meta*/}
                                        </div>

                                        <div className="col-lg-3">
                                            <aside className="sidebar static">
                                                {/* <div className="widget">
                                                    <h4 className="widget-title">Your page</h4>
                                                    <div className="your-page">
                                                        <figure>
                                                            <a href="#" title><img src="images/resources/friend-avatar9.jpg" alt="" /></a>
                                                        </figure>
                                                        <div className="page-meta">
                                                            <a href="#" title className="underline">My page</a>
                                                            <span><i className="ti-comment" /><a href="insight.html" title>Messages <em>9</em></a></span>
                                                            <span><i className="ti-bell" /><a href="insight.html" title>Notifications <em>2</em></a></span>
                                                        </div>
                                                        <div className="page-likes">
                                                            <ul className="nav nav-tabs likes-btn">
                                                                <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">likes</a></li>
                                                                <li className="nav-item"><a className href="#link2" data-toggle="tab">views</a></li>
                                                            </ul>
                                                            {/* Tab panes */}
                                                {/* <div className="tab-content">
                                                                <div className="tab-pane active fade show " id="link1">
                                                                    <span><i className="ti-heart" />884</span>
                                                                    <a href="#" title="weekly-likes">35 new likes this week</a>
                                                                    <div className="users-thumb-list">
                                                                        <a href="#" title="Anderw" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-1.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="frank" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-2.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Sara" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-3.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Amy" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-4.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Ema" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-5.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Sophie" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-6.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Maria" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-7.jpg" alt="" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane fade" id="link2">
                                                                    <span><i className="ti-eye" />440</span>
                                                                    <a href="#" title="weekly-likes">440 new views this week</a>
                                                                    <div className="users-thumb-list">
                                                                        <a href="#" title="Anderw" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-1.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="frank" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-2.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Sara" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-3.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Amy" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-4.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Ema" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-5.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Sophie" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-6.jpg" alt="" />
                                                                        </a>
                                                                        <a href="#" title="Maria" data-toggle="tooltip">
                                                                            <img src="images/resources/userlist-7.jpg" alt="" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>page like widget */}
                                                <div className="widget friend-list stick-widget">
                                                    <h4 className="widget-title">Friends</h4>
                                                    <div id="searchDir" />
                                                    <ul id="people-list" className="friendz-list">
                                                        {renderFriends}
                                                    </ul>
                                                    <div className={`${chatBox ? "show" : ""} chat-box`}>
                                                        <div className="chat-head">
                                                            <span className="status f-online" />
                                                            <h6>{chatBoxName}</h6>
                                                            <div className="more">
                                                                <span><i className="ti-more-alt" /></span>
                                                                <span className="close-mesage" onClick={() => onCloseChatBox()}><i className="ti-close" /></span>
                                                            </div>
                                                        </div>
                                                        <div className="chat-list">
                                                            <ul>
                                                                <li className="me">
                                                                    <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="" /></div>
                                                                    <div className="notification-event">
                                                                        <span className="chat-message-item">
                                                                            Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                        </span>
                                                                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                                                    </div>
                                                                </li>
                                                                <li className="you">
                                                                    <div className="chat-thumb"><img src="images/resources/chatlist2.jpg" alt="" /></div>
                                                                    <div className="notification-event">
                                                                        <span className="chat-message-item">
                                                                            Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                        </span>
                                                                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                                                    </div>
                                                                </li>
                                                                <li className="me">
                                                                    <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="" /></div>
                                                                    <div className="notification-event">
                                                                        <span className="chat-message-item">
                                                                            Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                                                        </span>
                                                                        <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <form className="text-box">
                                                                <textarea placeholder="Post enter to post..." />
                                                                <div className="add-smiles">
                                                                    <span title="add icon" className="em em-expressionless" />
                                                                </div>
                                                                <div className="smiles-bunch">
                                                                    <i className="em em---1" />
                                                                    <i className="em em-smiley" />
                                                                    <i className="em em-anguished" />
                                                                    <i className="em em-laughing" />
                                                                    <i className="em em-angry" />
                                                                    <i className="em em-astonished" />
                                                                    <i className="em em-blush" />
                                                                    <i className="em em-disappointed" />
                                                                    <i className="em em-worried" />
                                                                    <i className="em em-kissing_heart" />
                                                                    <i className="em em-rage" />
                                                                    <i className="em em-stuck_out_tongue" />
                                                                </div>
                                                                <button type="submit" />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>{/* friends list sidebar */}
                                                <div className="widget stick-widget">
                                                    <h4 className="widget-title">Who's follownig</h4>
                                                    {/* <ul className="followers">
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar2.jpg" alt="" /></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="/" title>Kelly Bill</a></h4>
                                                                <a href="#" title className="underline">Add Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar4.jpg" alt="" /></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="/" title>Issabel</a></h4>
                                                                <a href="#" title className="underline">Add Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar6.jpg" alt="" /></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="/" title>Andrew</a></h4>
                                                                <a href="#" title className="underline">Add Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar8.jpg" alt="" /></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="/" title>Sophia</a></h4>
                                                                <a href="#" title className="underline">Add Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar3.jpg" alt="" /></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="/" title>Allen</a></h4>
                                                                <a href="#" title className="underline">Add Friend</a>
                                                            </div>
                                                        </li>
                                                    </ul> */}
                                                </div>{/* who's following */}
                                            </aside>
                                        </div>{/* sidebar */}
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </section >

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="widget">
                                    <div className="foot-logo">
                                        <div className="logo">
                                            <a href="/" title><img src="images/logo.png" alt="" /></a>
                                        </div>
                                        <p>
                                            The trio took this simple idea and built it into the world’s leading carpooling platform.
                                        </p>
                                    </div>
                                    <ul className="location">
                                        <li>
                                            <i className="ti-map-alt" />
                                            <p>33 new montgomery st.750 san francisco, CA USA 94105.</p>
                                        </li>
                                        <li>
                                            <i className="ti-mobile" />
                                            <p>+1-56-346 345</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="widget">
                                    <div className="widget-title"><h4>follow</h4></div>
                                    <ul className="list-style">
                                        <li><i className="fa fa-facebook-square" /> <a href="https://web.facebook.com/shopcircut/" title>facebook</a></li>
                                        <li><i className="fa fa-twitter-square" /><a href="https://twitter.com/login?lang=en" title>twitter</a></li>
                                        <li><i className="fa fa-instagram" /><a href="https://www.instagram.com/?hl=en" title>instagram</a></li>
                                        <li><i className="fa fa-google-plus-square" /> <a href="https://plus.google.com/discover" title>Google+</a></li>
                                        <li><i className="fa fa-pinterest-square" /> <a href="https://www.pinterest.com/" title>Pintrest</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="widget">
                                    <div className="widget-title"><h4>Navigate</h4></div>
                                    <ul className="list-style">
                                        <li><a href="about.html" title>about us</a></li>
                                        <li><a href="contact.html" title>contact us</a></li>
                                        <li><a href="terms.html" title>terms &amp; Conditions</a></li>
                                        <li><a href="#" title>RSS syndication</a></li>
                                        <li><a href="sitemap.html" title>Sitemap</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="widget">
                                    <div className="widget-title"><h4>useful links</h4></div>
                                    <ul className="list-style">
                                        <li><a href="#" title>leasing</a></li>
                                        <li><a href="#" title>submit route</a></li>
                                        <li><a href="#" title>how does it work?</a></li>
                                        <li><a href="#" title>agent listings</a></li>
                                        <li><a href="#" title>view All</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="widget">
                                    <div className="widget-title"><h4>download apps</h4></div>
                                    <ul className="colla-apps">
                                        <li><a href="https://play.google.com/store?hl=en" title><i className="fa fa-android" />android</a></li>
                                        <li><a href="https://www.apple.com/lae/ios/app-store/" title><i className="ti-apple" />iPhone</a></li>
                                        <li><a href="https://www.microsoft.com/store/apps" title><i className="fa fa-windows" />Windows</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>{/* footer */}
                <div className="bottombar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <span className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></span>
                                <i><img src="images/credit-cards.png" alt="" /></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="side-panel">
                <h4 className="panel-title">General Setting</h4>
                <form method="post">
                    <div className="setting-row">
                        <span>use night mode</span>
                        <input type="checkbox" id="nightmode1" />
                        <label htmlFor="nightmode1" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Notifications</span>
                        <input type="checkbox" id="switch22" />
                        <label htmlFor="switch22" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Notification sound</span>
                        <input type="checkbox" id="switch33" />
                        <label htmlFor="switch33" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>My profile</span>
                        <input type="checkbox" id="switch44" />
                        <label htmlFor="switch44" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Show profile</span>
                        <input type="checkbox" id="switch55" />
                        <label htmlFor="switch55" data-on-label="ON" data-off-label="OFF" />
                    </div>
                </form>
                <h4 className="panel-title">Account Setting</h4>
                <form method="post">
                    <div className="setting-row">
                        <span>Sub users</span>
                        <input type="checkbox" id="switch66" />
                        <label htmlFor="switch66" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>personal account</span>
                        <input type="checkbox" id="switch77" />
                        <label htmlFor="switch77" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Business account</span>
                        <input type="checkbox" id="switch88" />
                        <label htmlFor="switch88" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Show me online</span>
                        <input type="checkbox" id="switch99" />
                        <label htmlFor="switch99" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Delete history</span>
                        <input type="checkbox" id="switch101" />
                        <label htmlFor="switch101" data-on-label="ON" data-off-label="OFF" />
                    </div>
                    <div className="setting-row">
                        <span>Expose author name</span>
                        <input type="checkbox" id="switch111" />
                        <label htmlFor="switch111" data-on-label="ON" data-off-label="OFF" />
                    </div>
                </form>
            </div>
        </div >
    )
}
export default NewsFeed;