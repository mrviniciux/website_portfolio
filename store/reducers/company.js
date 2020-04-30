export default function company(state = {}, action) {
    switch (action.type) {
      case 'SHOW_COMPANY':
        return action.company;
      case 'CREATE_COMPANY':
          return action.company;
      case 'CREATE_SUCCESS':
        return action.company;
      case 'DESTROY_SUCCESS':
        return action.company;
      default:
        return state
    }
}