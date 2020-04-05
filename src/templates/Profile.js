import React from 'react';

import {Layout} from '../components/index';
import {isLoggedIn} from '../services/auth';

export default class Profile extends React.Component {
    componentDidMount(){
       
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