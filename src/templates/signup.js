import React from 'react';

import {Layout} from '../components/index';
import { logIn} from '../services/auth';


export default class Post extends React.Component {
    componentDidMount(){
       
    }

    handleLogin = () => {
        logIn('t@t.com', '123')
    }

    render() {
        return (
            <Layout {...this.props}>
              <button onClick={this.handleLogin}> 
                  signup
              </button>
            </Layout>
        );
    }
}
