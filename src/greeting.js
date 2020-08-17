import { login } from './login.js';
export function consumer (){
    console.log('this is consumer');
    let root = document.getElementById('root');
    root.innerText = 'Hello You';
}