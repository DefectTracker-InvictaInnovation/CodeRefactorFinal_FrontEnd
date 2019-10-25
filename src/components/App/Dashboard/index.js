import React from 'react';
import {Layout,notification} from 'antd';
import {Route, Switch} from 'react-router-dom'
import './index.css';
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';

// Dashboard Components
import DefectDashboard from '../../DashboardComponent/DefectDashboard';
//import ProductDashboard from '../DashboardComponent/ProductDashboard';
import ProductDashboard from '../../DashboardComponent/ProductDashboard'
import CompanyDashboard from '../../DashboardComponent/CompanyDashboard';
import DeveloperDashboard from '../../DashboardComponent/DeveloperDashboard'
import ProjectManagerDashboard from '../../DashboardComponent/ProjectManagerDashboard';
import CompanyComponent from '../../CompanyComponent';
import DefectComponent from '../../DefectComponent';
import HRAllocationComponent from '../../HRAllocationComponent';
import EmployeeComponent from '../../EmployeeComponent';
import ModuleComponent from '../../ModuleComponent';
import DefectStatusFlowComponent from '../../WorkFlow/DefectStatusFlow';
import DefectRolesFlowComponent from '../../WorkFlow/DefectRolesFlow';
import ProjectManageAllocation from '../../ProjectAllocationComponent';
import ProjectComponent from '../../ProjectComponent';
import CompanyPrivilege from '../../PrivilegeComponent/CompanyPrivilege';
import ProjectPrivilege from '../../PrivilegeComponent/ProjectPrivilege';
import QAPrivilege from '../../PrivilegeComponent/QALeadPrivilege';
import TechLeadPrivilege from '../../PrivilegeComponent/TechLeadPrivilege';
import QADashboard from '../../DashboardComponent/QADashboard';
import PriorityConfig from '../../SettingComponent/Config/PriorityConfig';
import SeverityConfig from '../../SettingComponent/Config/SeverityConfig';
import DefectStatusConfig from '../../SettingComponent/Config/StatusConfig';
import DefectTypeConfig from '../../SettingComponent/Config/DefectTypeConfig';
import AuditLog from '../../SettingComponent/GeneralConfiguration/AuditLog';
import LookAndFeel from '../../SettingComponent/GeneralConfiguration/LookAndFeel';
import GeneralSetting from '../../SettingComponent/GeneralConfiguration/GeneralSetting';
import CompanyAdministration from '../../CompanyAdministrationComponent/';
import ProfileScreen from '../../SettingComponent/ProfileScreen';
import ProductAdministration from '../../ProductAdministration';
import Configuration from '../../CompanyComponent/Configuration';
import ProjectConfigurePrivilege from '../../PrivilegeComponent/ProjectConfigurePrivilege';


import DefectTypeConfigcom from '../../CompanyComponent/ConfigTable/DefectTypeConfig';
import PriorityConfigcom from '../../CompanyComponent/ConfigTable/PriorityConfig';
import SeverityConfigcom from '../../CompanyComponent/ConfigTable/SeverityConfig';
import DefectStatusConfigcom from '../../CompanyComponent/ConfigTable/StatusConfig';
import Profile from '../User/Profile';
import PrivateRoute from '../Login/util/PrivateRoute';
import { ROLE_NAME } from '../../../constants/index';
import { IS_AUTHENTICATED } from '../../../constants/index';

import {getUserProfile} from '../Login/util/ApiUtil';
//for logout

import { ACCESS_TOKEN ,CURRENT_USER} from '../../../constants/index';
import { isEmptyStatement } from '@babel/types';
import { fromJS } from 'immutable';
// Company Components


const {Content, Footer} = Layout;
const PropsRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => <Component {...props} />}/>
    );
  };
  
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          currentUser: null,
         isAuthenticated:true,
          isLoading: false,
          role:'',
          user:'',
          logginStatus: true
        }

        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
          ];
           this.handleLogout = this.handleLogout.bind(this);
           this.warn = this.warn.bind(this);
           this.logout = this.logout.bind(this);
           this.resetTimeout = this.resetTimeout.bind(this);
       
           for (var i in this.events) {
             window.addEventListener(this.events[i], this.resetTimeout);
           }
       
           this.setTimeout();
        }
//    state={
//        isAuthenticated:""
//    }
clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    // this.warnTimeout = setTimeout(this.warn, 16 * 1000);

    this.logoutTimeout = setTimeout(this.handleLogout ,1800 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You will be logged out automatically in 1 minute.");
  }

  logout() {
    // Send a logout request to the API
    console.log("Sending a logout request to the API...");
    this.setState({ logginStatus: false });
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }


        handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(IS_AUTHENTICATED);
            localStorage.removeItem(ROLE_NAME);
            localStorage.removeItem(CURRENT_USER);

            this.setState({
              currentUser: null,
             
            });
        
            this.props.history.push(redirectTo);
            
            notification[notificationType]({
              message: 'Defect Tracker',
              description: description,
            });
            this.destroy();
          }
          componentDidMount(){
            console.log(localStorage.getItem(ROLE_NAME));
            console.log(localStorage.getItem(IS_AUTHENTICATED));
            console.log(localStorage.getItem(CURRENT_USER));

             const username = this.currentUser;
            // if(localStorage.getItem(ACCESS_TOKEN).length>0){
                  this.setState({
                    isAuthenticated:"true",
                    role:localStorage.getItem(ROLE_NAME)
                  })
            //   }
              this.gett();
            

              getUserProfile(localStorage.getItem(CURRENT_USER)) .then(response => {
                console.log(response.data);
                  this.setState({
                      user: response.data.currentUser,
                      isLoading: false
                  });
              })
              console.log(this.state.user);
          }
          gett(){
            console.log(this.state.isAuthenticated);
          }
    render() {
        return (
            <Layout style={{
                minHeight: '100vh'
            }}>
                
                <Route exact path="/">
                    <SiderComponent/>
                </Route>

                <Layout>
                <Route path="/" 
                  render={(props) => <HeaderComponent   isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)} 
                  currentUser={localStorage.getItem(CURRENT_USER)} 
                 
                      handleLogout={()=>this.handleLogout()} {...props} />}>
                </Route>
                    {/* <Route path="/">
                        <HeaderComponent/>
                    </Route> */}

                    <Content
                        style={{
                        margin: '24px 16px 0'
                    }}>

                        <Switch>

                        {/* <Route path="/home" 
                  render={(props) => <CompanyDashboard history={this.props.history} {...props} />}></Route> */}
<Route path="/home" component={CompanyDashboard}/>
                            
                            {/* Dashboard Route*/}
                            {/* {this.state.role=='ROLE_USER' ?  <Route path="/dashboard/defect" component={DefectDashboard}/>:<Route path="/home" component={CompanyDashboard}/>} */}
                            <Route path="/dashboard/defect" component={DefectDashboard}/>

                            {/* <Route exact path='/'>
                                <CompanyDashboard/>
                            </Route> */}
                            {/* <PrivateRoute path='/dashboard/defect' 
                             component={DefectDashboard} authenticated={this.state.isAuthenticated} currentUser={this.props.currentUser}>
                                
                            </PrivateRoute> */}

<Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)} currentUser={localStorage.getItem(CURRENT_USER)} {...props}  />}>
                </Route>


                            <Route path='/dashboard/developer'>
                                <DeveloperDashboard/>
                            </Route>
                            <Route path='/dashboard/projectmanager'>
                                <ProjectManagerDashboard/>
                            </Route>
                            <Route path='/dashboard/qa'>
                                <QADashboard/>
                            </Route>
                            <Route path='/dashboard/product'>
                                <ProductDashboard/>
                            </Route>
                            
                            {/* Product Administration Route*/}
                            <Route path='/productadministration'>
                                <ProductAdministration/>
                            </Route>
                            
                            {/* Company Administration Route*/}
                            <Route path='/companyadministration'>
                                <CompanyAdministration/>
                            </Route>

                            {/* Defect Route*/}
                            <Route path='/defect'>
                                <DefectComponent/>
                            </Route>

                            {/* Company Route*/}
                            <Route exact path='/company'>
                                <CompanyComponent/>
                            </Route> 

                            
                            {/* Company Route New Add*/}
                            <Route exact path='/config'>
                                <Configuration/>
                            </Route> 

                            <Route exact path='/DefectType'>
                                <DefectTypeConfigcom/>
                            </Route> 

                            <Route exact path='/Priority'>
                                <PriorityConfigcom/>
                            </Route>

                            <Route exact path='/Severity'>
                                <SeverityConfigcom/>
                            </Route>

                            <Route exact path='/Status'>
                                <DefectStatusConfigcom/>
                            </Route>

                            {/* Company Route*/}
                            <Route exact path='/project'>
                                <ProjectComponent/>
                            </Route> 
                            
                            {/* HR Allocation Route*/}
                            <Route path='/company/hrallocation'>
                                <HRAllocationComponent/>
                            </Route>

                            {/* Employee Route*/}
                            <Route path='/company/employee'>
                                <EmployeeComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/module'>
                                <ModuleComponent/>
                            </Route>

                            {/* Module Route*/}
                            <Route path='/projectallocation'>
                                <ProjectManageAllocation/>
                            </Route>

                          

                                {/* General configuration -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                                <Route path='/config/priority'>
                                    <PriorityConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                                <Route path='/config/severity'>
                                    <SeverityConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                                <Route path='/config/defecttype'>
                                    <DefectTypeConfig/>
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                <Route path='/config/defectstatus'>
                                    <DefectStatusConfig/>
                                </Route>

                                {/* Additional Setting -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                                <Route path='/settings/auditlog'>
                                    <AuditLog/>
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                                <Route path='/settings/lookandfeel'>
                                    <LookAndFeel/>
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                                <Route path='/settings/generalsetting'>
                                    <GeneralSetting/>
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                <Route path='/settings/profilescreen'>
                                    <ProfileScreen/>
                                </Route>


                                {/* Privilege -----------------------------------*/}
                                {/* Setting -> Privilege -> Company Route*/}
                                <Route path='/privilege/company'>
                                    <CompanyPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> Project Route*/}
                                <Route path='/privilege/project'>
                                    <ProjectPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> QA Lead Route*/}
                                <Route path='/privilege/qalead'>
                                    <QAPrivilege/>
                                </Route>

                                {/* Setting -> Privilege -> Tech Lead Route*/}
                                <Route path='/privilege/techlead'>
                                    <TechLeadPrivilege/>
                                </Route>

                                <Route path='/privilege/projectConfig'>
                                    <ProjectConfigurePrivilege/>
                                </Route>



                                {/* Work Flow -----------------------------------*/}
                                {/* Setting -> Workflow -> DefectStatusFlow Route*/}
                                <Route path='/workflow/defectstatus'>
                                    <DefectStatusFlowComponent/>
                                </Route>

                                {/* Setting -> Workflow -> DefectRolesFlow Route*/}
                                <Route path='/workflow/defectroles'>
                                    <DefectRolesFlowComponent/>
                                </Route>

                        </Switch>

                    </Content>
                    <Footer
                        style={{
                        textAlign: 'center'
                    }}>
                        Defect Tracker ©2019 Created by SGIC
                    </Footer>
                </Layout>
            </Layout>

        );

    }
}

export default Dashboard;