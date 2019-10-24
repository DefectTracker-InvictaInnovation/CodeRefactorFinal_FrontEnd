import React from 'react';
import { Route, Switch,Router,Redirect} from 'react-router-dom';
import Dashboard from './Dashboard/index';
import './App.css';
import WrappedNormalLoginForm from './../App/Login/index';
import {Layout,notification} from 'antd';

import { getCurrentUser,login,getcuruser,getUserProfile } from './Login/util/ApiUtil';
import history from './Login/util/history';
import axios from "axios";
import PrivateRoute from './Login/util/PrivateRoute';
import DefectDashboard from './../DashboardComponent/DefectDashboard';
//required("../../scss/style.scss");
// import Login from '';
import { ACCESS_TOKEN } from '../../constants/index';
import { ROLE_NAME } from '../../constants/index';
import { IS_AUTHENTICATED } from '../../constants/index';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
isAuthenticated: false,
      isLoading: false,
      loggedin:false,
      path:"/",
    
      
    }
    // this.handleLogout = this.handleLogout.bind(this);
     this.loadCurrentUser = this.loadCurrentUser.bind(this);
   
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    console.log("ffffffffffffffff")
    getCurrentUser()
    .then(response => {
      console.log("ffffffffffffffff"+response.data)
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false,
        status:true,
        
      });
    }).catch(error => {
      this.setState({
       
        isLoading: false
      });  
    });

   
//     getCurrentAdmin()
//     .then(response => {
      
//       this.setState({
//         currentAdmin: response,
//         value: response.json()
       
//       });
    
//     });
 }
//  getuser(props){
//    console.log(props.currentUser.name)

//  }
getuser=()=>{
  let token=localStorage.getItem(ACCESS_TOKEN);
  axios.get("http://localhost:8085/loginservice/api/auth/user/me" ,
   { headers: {"Authorization" : `Bearer ${token}`} })
.then(res => {
  this.setState({
    currentUser: res.data.username,
    isAuthenticated: true,
    isLoading: false,
    status:true,
    
  });
console.log(res.data);

});

}

  componentDidMount() {

    // this.setState({isAuthenticated:true})
    console.log('authenticated: '+this.state.isAuthenticated);
  getcuruser().then(res=>{
    console.log(res.data)
  });
    this.getuser();
    this.loadCurrentUser();
    getCurrentUser();
console.log(localStorage.getItem(IS_AUTHENTICATED))

// getUserProfile(this.state.currentUser) .then(response => {
//   console.log("sffdffff"+response.data);
 
// })
  
   }

  // handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
  //   localStorage.removeItem(ACCESS_TOKEN);

  //   this.setState({
  //     currentUser: null,
  //     isAuthenticated: false
  //   });

  //   this.props.history.push(redirectTo);
    
  //   notification[notificationType]({
  //     message: 'Defect Tracker',
  //     description: description,
  //   });
  // }

  handleLogin() {
   
    notification.success({
      message: 'Defect Tracker',
      description: "You're successfully logged in.",
      
    });
    console.log("hhhhh"+localStorage.getItem(ACCESS_TOKEN))
    this.getuser();
    // login()
    // .then(response => {
    //   console.log("ffffffffffffffff"+response.data)
    // });
    
    this.setState({
      loggedin:true
    })

    if(localStorage.getItem(IS_AUTHENTICATED)){

if(localStorage.getItem(ROLE_NAME)==='ROLE_HR'){
  console.log("ROLE_ADMIN")
  history.push('/home');
}else if(localStorage.getItem(ROLE_NAME)==='ROLE_QA'){
  history.push('/dashboard/defect');
  console.log("ROLE_QA")
}
else if(localStorage.getItem(ROLE_NAME)==='ROLE_PM'){
  history.push('/dashboard/projectmanager');
  console.log("ROLE_PM")
}
else if(localStorage.getItem(ROLE_NAME)==='ROLE_DEVELOPER'){
  history.push('/dashboard/developer');
  console.log("ROLE_DEVELOPER")
}
else if(localStorage.getItem(ROLE_NAME)==='ROLE_HR'){
  history.push('/dashboard/product');
  console.log("ROLE_HR")
}
else if(localStorage.getItem(ROLE_NAME)==='ROLE_PRODUCT_ADMIN'){
  history.push('/productadministration');
  console.log("ROLE_DEVELOPER")
}
     
     }
  
    
  }


  render() {
    const { loggedIn } = this.state;
  return( 
  <div>
    
  
<Switch>


   <Route exact path="/login" 
    render={(props) => <WrappedNormalLoginForm onLogin={this.handleLogin} {...props} />}> 
          
        </Route> 
        {/* <Route path='/' component={Dashboard}/> */}
      
       <PrivateRoute 
        authenticated={this.state.isAuthenticated} 
        path="/" 
        component={Dashboard}
        currentUser={this.state.currentUser} 
        handleLogout={this.handleLogout} >
        </PrivateRoute>

       

</Switch>
</div>
  )}
}

export default  App;