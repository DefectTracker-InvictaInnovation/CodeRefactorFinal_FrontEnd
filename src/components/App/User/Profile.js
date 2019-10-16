import React, { Component } from 'react';
 import { Avatar, Tabs } from 'antd';
 import { getAvatarColor } from './Colors';
import './Profile.css';
import axios from "axios";
import {getUserProfile} from '../Login/util/ApiUtil';
const TabPane = Tabs.TabPane;


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        

        axios.get(" http://localhost:8085/loginservice/api/auth/users/"+ username,)
        .then(response => {
            console.log(response.data)
            this.setState({
                user: response.data,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });      
        console.log(this.state.user)  
     }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        console.log("sdddddddddddddddd"+username)
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        // if(this.state.isLoading) {
        //     return <LoadingIndicator />;
        // }

        // if(this.state.notFound) {
        //     return <NotFound />;
        // }

        // if(this.state.serverError) {
        //     return <ServerError />;
        // }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details" 
                            style={{
                                marginbottom: "44px",
                                paddingtop: "40px",
                                paddingbottom: "20px",
                                margin: "auto" ,
                                textalign: "center",
                             } }
                            >
                                <div className="user-avatar">
                              
                                    <Avatar className="user-avatar-circle"   
                                    style={{ backgroundColor: getAvatarColor(this.state.user.name), lineheight: "120px",fontsize: "40px", left: 0 ,width: "120px",
                                                height: "120px",
                                                borderradius: "60px",
                                                lineheight:"60px" 
                                            }}>
                                         {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name" style={{width:"180px"}}>
                                    {this.state.user.name}
                                    </div>
                                    <div className="username">
                                        @{this.state.user.username}
                                        </div>
                                    <div className="user-joined">
                                        {/* Joined {formatDate(this.state.user.joinedAt)} */}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                {/* <Tabs defaultActiveKey="1" 
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                   
                                </Tabs> */}
                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;