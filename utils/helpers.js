import {apiUrl} from "../config/ApiConfig";

const fetch = require("node-fetch");

export function stringUppercase(str, onlyFirstLetter){
    if(onlyFirstLetter){
        return str.charAt(0).toUpperCase() + str.slice(1); 
    } else {
        return str.toUpperCase(); 
    }  
}

export function stringLowercase(str, onlyFirstLetter){
    if(onlyFirstLetter){
        return str.charAt(0).toLowerCase() + str.slice(1); 
    } else {
        return str.toLowerCase(); 
    }
}

export function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}

export function blobToFile(theBlob, fileName, type){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return new File([theBlob], fileName, {type: type});
}

export const convertURLtoBlob = (url, name) => {
     return fetch(url).then((response) => response.blob()).then(myBlob => {
            const objectURL = URL.createObjectURL(myBlob);
            let file = blobToFile(myBlob, name);
            file.url = apiUrl + "/" + url;
            return file;
        });
}