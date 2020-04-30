import React from 'react';
import {PageLoader} from '../components/Loading/PageLoader';
import { withAuthSync } from '../utils/auth';
import {ProfileOptions} from '../components/ProfileOptions';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {pageLoading: true}
  }

  componentDidMount(){
    this.setState({pageLoading: false});
  }

  render() {
    return (
      <div id="main">
        {this.state.pageLoading ? <PageLoader/> : ""}
        <ProfileOptions/>
      </div>
    );
  }
}


// Dashboard.getInitialProps = async (ctx) => {
//   // Must validate JWT
//   // If the JWT is invalid it must redirect
//   // back to the main page. You can do that
//   // with Router from 'next/router
//   await handleAuthSSR(ctx);
//
//   // Must return an object
//   return {}
// };
export default withAuthSync(Dashboard);