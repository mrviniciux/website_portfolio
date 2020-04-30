import axios from 'axios';
import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import {apiUrl} from "../config/ApiConfig";

export const login = async (header) => {
  cookie.set('token', header.token);
  cookie.set('uid', header.uid);
  cookie.set('client', header.client);

  localStorage["username"] = header.name; 
  localStorage["profile"] = header.profile; 

  Router.push('/dashboard')
}

export const getLoginInfo = () =>{
  return {"token": cookie.get('token'), "uid": cookie.get('uid'), "client": cookie.get('client')}
};

export const getSessionInfo = () =>{
  return {"access-token": cookie.get('token'), "uid": cookie.get('uid'), "client": cookie.get('client')}
};

export const logout = () => {
  cookie.remove('token');
  cookie.remove('uid');
  cookie.remove('client');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const headers = auth(ctx);

      console.log("headers: "+JSON.stringify(headers));

      try {
        const request = await axios.get(apiUrl + "/admins", { headers: headers});

        const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx))

        return { ...componentProps, headers }
      } catch(e){

        return dispatch => {
          if (ctx.res) {
            ctx.res.writeHead(302, {
              Location: '/login'
            });
            ctx.res.end()
          } else {
            Router.push('/login')
          }
        }

      }
    }

    constructor (props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { token } = nextCookie(ctx);
  const { uid } = nextCookie(ctx);
  const { client } = nextCookie(ctx);
  const headers = {
    "access-token": token,
    "uid": uid,
    "client": client
  };

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && (!token || !uid || !client)) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end();

    return
  }

  // We already checked for server. This should only happen on client.
  if (!token || !uid || !client) {
    Router.push('/login')
  }

  return {"access-token": token, "uid": uid, "client": client}
}