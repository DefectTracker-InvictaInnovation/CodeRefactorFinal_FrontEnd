import { API_BASE_URL,LOGIN_API_BASE_URL, ACCESS_TOKEN,API_BASE_URL_USER } from './../../../../constants/index';
import axios from "axios";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
       
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            console.log(json)
            return json;
        })
    );
};


export function login(loginRequest) {
    return request({
        url: LOGIN_API_BASE_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
   
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url:  "http://localhost:8085/loginservice/api/auth/user/me",
        method: 'GET'
    });
}

export function getCurrentAdmin() {
    // if(!localStorage.getItem(ACCESS_TOKEN)) {
    //     return Promise.reject("No access token set.");
    // }

    return request({
        url: API_BASE_URL + "/user/ad",
        method: 'GET'
    });
    
}
export function getUserProfile(username) {
    console.log("1111111111111111111")
    http://localhost:8085/loginservice/api/auth/users/praveen
    return axios.get(" http://localhost:8085/loginservice/api/auth/users/"+ username )
}

export function getcuruser(){
    let token=localStorage.getItem(ACCESS_TOKEN);
   return  axios.get("http://localhost:8085/loginservice/api/auth/user/me" ,
   { headers: {"Authorization" : `Bearer ${token}`} })
   

   
}

