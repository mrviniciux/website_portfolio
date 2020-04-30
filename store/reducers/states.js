export default function states(state = {states: [], loading: false}, action) {
    switch (action.type) {
      case 'LIST_STATES':
        return {...state, loading: false, states: action.states};
      case 'FETCH_STATES':
        return {...state, loading: true, states: action.states};
      default:
        return state
    }
}