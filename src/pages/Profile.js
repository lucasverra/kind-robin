import React from 'react';

import {Layout} from '../components/index';
import {isLoggedIn, logIn} from '../services/auth';

export default class Profile extends React.Component {
    componentDidMount(){
       
    }

    handlePreference = (preferences) =>{
        
    } 

    handleLogin = () => {
        logIn('t@t.com', '123')
        // set eamail one signal
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