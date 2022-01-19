import Cookies from 'js-cookie'
class CookiesService {
    constructor() {}
    /**
     * @returns {response}
     */
    
    set(key, data, encrypt = false, expiredIn = 1) {
        
      let _data = JSON.stringify(data);
      if(encrypt){
        try {
          _data = btoa(_data);
        } catch (error) {
            Cookies.remove(key);
        }        
      }

      try {
        Cookies.set(key, _data, {
            expires: expiredIn
        });
      } catch (error) {
        Cookies.remove(key);
        return false;
      }
      return true;
    }
  
    get(key, decode){
      
      let data = Cookies.get(key)
      if(!data){
        return null;
      }
      if(decode){
        try {
          data = atob(data);  
        } catch (error) {
            Cookies.remove(key)
        }
      }
      
      try {
        return JSON.parse(data);
      } catch (error) {
        Cookies.remove(key);
        return null;
      }
    }
  
    delete(key){
      Cookies.remove(key);
    }
  }
  
  export default new CookiesService();
