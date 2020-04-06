import React from 'react';

import {Layout} from '../components/index';
import {isLoggedIn} from '../services/auth';

export default class Profile extends React.Component {
    componentDidMount(){
        var OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
        OneSignal.init({
            appId: "2267b1d7-ec2c-4e4e-8ded-ade2a7ff194d",
          });
          OneSignal.setDefaultNotificationUrl("https://kind-robin-60456.netlify.com/profile");
          //OneSignal.setEmail("a@b.com");
          //OneSignal.sendTag("toto", "titi"); 
        });
    }

    handlePreference = (preferences) =>{
        
    } 

    render() {
        if(!isLoggedIn()){
            if (typeof window !== `undefined`) window.location.replace(`/Login`)
        }
        return (
            <Layout {...this.props}>
              ok
            </Layout>
        );
    }
}
