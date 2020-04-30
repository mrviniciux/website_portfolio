export function index(companies){
    return {type:'LIST_COMPANIES', companies};
}

export function show(company){
    return {type:'SHOW_COMPANY', company};
}

export function create(company){
    return {type:'CREATE_COMPANY', company};
}

export function createSuccess(){
    return {type:'CREATE_SUCCESS', companies};
}

export function destroySuccess(){
    return {type:'DESTROY_SUCCESS', companies};
}