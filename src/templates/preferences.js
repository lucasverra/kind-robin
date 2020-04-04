import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import { Redirect } from '@reach/router' // highlight-line
import {isLoggedIn, logIn} from '../services/auth';


export default class Post extends React.Component {
    componentDidMount(){
       
    }

    handleLogin = () => {
        logIn('t@t.com', '123')
        // set eamail one signal
    }

    render() {
        if(!isLoggedIn()){
            return window.location.replace(`/signup`)
        }
        return (
            <Layout {...this.props}>
              ok
            </Layout>
        );
    }
}
