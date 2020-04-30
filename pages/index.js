//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import { withAuthSync } from '../utils/auth';


class Index extends React.Component {


  render(){
    return (
      <div>
        main
      </div>
    );
  }
}
//
// Index.getInitialProps = async (ctx) => {
//   // Must validate JWT
//   // If the JWT is invalid it must redirect
//   // back to the main page. You can do that
//   // with Router from 'next/router
//   await handleAuthSSR(ctx);
//
//   // Must return an object
//   return {}
// };

export default withAuthSync(Index);