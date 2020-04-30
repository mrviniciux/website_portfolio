export default function employees(state = [], action) {
    switch (action.type) {
      case 'LIST_EMPLOYEES':
        return action.employees;
      case 'CREATE_SUCCESS':
        return action.employees;
      case 'DESTROY_SUCCESS':
        return action.employees;
      default:
        return state
    }
}