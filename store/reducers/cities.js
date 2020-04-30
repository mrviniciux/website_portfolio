export default function cities(state = {cities: [], loading: false}, action) {
    switch (action.type) {
      case 'LIST_CITIES':
        return {...state, loading: false, cities: action.cities};
      case 'FETCH_CITIES':
        return {...state, loading: true, cities: action.cities};
      default:
        return state
    }
}