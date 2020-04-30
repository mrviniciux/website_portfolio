import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {stringUppercase, stringLowercase, truncateString, blobToFile, convertURLtoBlob} from '../../utils/helpers';

describe('Uppercase and lowercase functions', () => {

    it('should return uppercase of a string', () => {
        const str = stringUppercase('adf324fnjnlkablNkjfBhhbHB');
        expect(str).toBe(str.toUpperCase());
    });
      
    it('should return lowercase of a string', () => {
        const str = stringLowercase('adf324fnjnlkablNkjfBhhbHB');
        expect(str).toBe(str.toLowerCase());
    });
      
    it('should return only the first char as Uppercase', () => {
        const str = stringUppercase('adf324fnjnlkablNkjfBhhbHB', true);
        expect(str).toBe(str.charAt(0).toUpperCase() + str.slice(1));
    });
      
    it('should return only the first char as Lowercase', () => {
        const str = stringLowercase('adf324fnjnlkablNkjfBhhbHB', true);
        expect(str).toBe(str.charAt(0).toLowerCase() + str.slice(1));
    });

});

describe('Truncate', () => { 
    it('should return str truncated with "..." concatenated to the end of str.', () => {
        const str = truncateString("LOREM IPSUM NODOR 077 122 311", 10)
        expect(str).toBe("LOREM IPSU...");
    });
});

describe('Truncate', () => { 
    it('should return str truncated with "..." concatenated to the end of str.', () => {
        const str = truncateString("LOREM IPSUM NODOR 077 122 311", 10)
        expect(str).toBe("LOREM IPSU...");
    });
});

describe('Blob operations', () => {
    it('should return a File type parsing a Blob', () => {
        const name = "MyBlob";
        const aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
        const oMyBlob = new Blob(aFileParts, {type : 'text/html'}); 
        const fileFromBlob = blobToFile(oMyBlob, name, 'text/html');
        
        expect(fileFromBlob).toBeInstanceOf(File);
        expect(fileFromBlob.name).toBe(name);
    });

    //TODO convertURLtoBlob
    global.URL.createObjectURL = jest.fn();
    it('should return a Blob from URL', async () => {
        const request = await convertURLtoBlob('https://i.imgur.com/IxMphAS.jpg', 'test');
        expect(request).toBeInstanceOf(Blob)
    });
});




