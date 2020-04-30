export default function employee(state = {}, action) {
    switch (action.type) {
      case 'SHOW_EMPLOYEE':
        return action.employees;
      case 'CREATE_SUCCESS':
        return action.employees;
      case 'DESTROY_SUCCESS':
        return action.employees;
      default:
        return state
    }
}