export function doAuth(profile){
  return {type:'PROCESSING', profile};
}

export function logged(profile){
  return {type:'PROFILE',profile};
}

export function loginError(profile){
  return {type:'ERROR', profile};
}

export function loginDone(profile){
  return {type:'DONE', profile};
}

export function logout(profile){
  return {type:'DONE', profile};
}
