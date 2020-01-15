import {Injectable} from '@angular/core';

interface sessionkeys {
    userKey: string;
    userValue: string;
}

@Injectable({providedIn : 'root'} )
export class SessionStorage {
    constructor () {}
    
    hasKey(){
        if (sessionStorage.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    getKey (){
        if (sessionStorage.length > 0) {
            for (let i = 0; i < sessionStorage.length; i++){
                let key = sessionStorage.key(i);
                let value = sessionStorage.getItem(key);
                console.log('GOT THE KEY')
                return ({userKey : key, userValue : value})
              }
          } else {
            return ({userKey : undefined, userValue : undefined})
          }
    }

    setKey (userKey: string , userValue: string) {
        let key = userKey;
        sessionStorage.setItem(key, userValue);
        console.log('SET THE KEY')
    }

    deleteKey () {
        console.log('DELETED THE KEY')
        sessionStorage.clear();
    }

}