export default function companies(state = [], action) {
    switch (action.type) {
      case 'LIST_COMPANIES':
        return action.companies;
      case 'CREATE_SUCCESS':
        return action.companies;
      case 'DESTROY_SUCCESS':
        return action.companies;
      default:
        return state
    }
}