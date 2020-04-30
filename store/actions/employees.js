export function index(employees){
    return {type:'LIST_EMPLOYEES', employees};
}

export function show(employees){
    return {type:'SHOW_EMPLOYEE', employees};
}

export function createSuccess(){
    return {type:'CREATE_SUCCESS', employees};
}

export function destroySuccess(){
    return {type:'DESTROY_SUCCESS', employees};
}