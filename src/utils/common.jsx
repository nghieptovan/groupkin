import StorageService from '../services/StorageService';
import localStore from '../utils/local-storage'
import moment from 'moment';
import { CONSTS } from '../config/Constant';
export const removeWpTags = (content) => {
    let result = content.replace(/<!-- wp:paragraph -->/g, "");
    result = result.replace(/<!-- \/wp:paragraph -->/g,"")
    result = result.replace(/<!-- wp:image (.+) -->$/gm,"")
    result = result.replace(/<!-- \/wp:image -->$/gm,"")
    result = result.replace(/<!-- \/wp:image -->$/gm,"")
    result = result.replace(/<!-- wp:heading -->$/gm,"")
    result = result.replace(/<!-- \/wp:heading -->$/gm,"")
    result = result.replace(/<!-- wp:core-embed\/youtube \/-->$/gm,"")
    return result || "";
}

export const removeUselessChar = (content) => {
    let result = content.replace(/-------/g, "-");
    result = result.replace(/------/g,"-");
    result = result.replace(/-----/g,"-");
    result = result.replace(/----/g,"-");
    result = result.replace(/---/g,"-");
    result = result.replace(/--/g,"-");
    result = result.replace(/--/g,"-");
    result = result.replace(/`/g,"");
    result = result.replace(/‘/g,"");
    return result.replace(/\s+/g, ' ').trim() || "";
}

export const udpateLogPost = (action) => {
    let time =  moment().format('HH:mm DD/MM/YYYY');
    let ip = localStore.get(CONSTS.STORE_KEYS.USER.IP);
    let name = StorageService.get(CONSTS.STORE_KEYS.USER.PROFILE);
    return `${time} - ${ip} - ${name.username} - ${action},`;
}
