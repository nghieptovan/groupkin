class StorageService {
  constructor() {}
  /**
   * @returns {response}
   */
  
  set(key, data, encrypt){
    if(typeof sessionStorage == 'undefined') return;

    let _data = JSON.stringify(data);
    if(encrypt){
      try {
        _data = btoa(_data);
      } catch (error) {
        sessionStorage.removeItem(key);
      }
      
    }
    try {
      sessionStorage.setItem(key, _data);  
    } catch (error) {
      sessionStorage.removeItem(key);
      return false;
    }
    return true;
  }

  get(key, decode){
    if(typeof sessionStorage == 'undefined') return;
    
    let data = sessionStorage.getItem(key)
    if(!data){
      return null;
    }
    if(decode){
      try {
        data = atob(data);  
      } catch (error) {
        sessionStorage.removeItem(key)
      }
    }
    
    try {
      return JSON.parse(data);
    } catch (error) {
      sessionStorage.removeItem(key);
      return null;
    }
  }

  delete(key){
    if(typeof sessionStorage == 'undefined') return;
    sessionStorage.removeItem(key);
  }
}

export default new StorageService();