class LocalStorageLS {
    constructor() {
        this.set = function (a, b) {

            if (typeof (Storage) !== "undefined") {
                return localStorage.setItem(a, JSON.stringify(b));
            }
            else {
                return 'NO STORAGE';
            }
        };
        this.get = function (a) {
            if (typeof (Storage) !== "undefined") {
                if(localStorage.getItem(a)){
                    return JSON.parse(localStorage.getItem(a));
                }else{
                    return 'NO STORAGE';
                }
                
            }
            else {
                return 'NO STORAGE';
            }
        };
        this.setE = function (a, b) {
            
            if (typeof (Storage) !== "undefined") {
                return localStorage.setItem(a, btoa(JSON.stringify(b)));
            }
            else {
                return 'NO STORAGE';
            }
        };
        this.getE = function (a) {
            if (typeof (Storage) !== "undefined") {
                return JSON.parse(atob(localStorage.getItem(a)));
            }
            else {
                return 'NO STORAGE';
            }
        };

        this.remove = function (a) {
            if (typeof (Storage) !== "undefined") {
                return localStorage.removeItem(a);
            }
            else {
                return 'NO STORAGE';
            }
        };
        return this;
    }
}
const LS = new LocalStorageLS();
export default LS;
