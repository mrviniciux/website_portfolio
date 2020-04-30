export default function auth(state = {email: '', password: '', loading: false}, action) {
  switch (action.type) {
    case 'PROFILE':
      return {...state, loading: true, profile: action.profile};
    case 'ERROR':
      return {...state, loading: false, profile: action.profile};
    case 'PROCESSING':
      return {...state, loading: true,  profile: action.profile};
    case 'DONE':
      return {...state, loading: false,  profile: action.profile};
    case 'LOGOUT':
      return {...state, loading: false,  profile: action.profile};
    default:
      return state
  }
}