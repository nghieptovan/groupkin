import * as _ from 'lodash';
import localStore from 'src/utils/local-storage'

const default_length = 0;
const google_length = 70;
const google_content_length = 160;
const tag_length = 3;

const REACT_APP_UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;
// saostar.vn
// catscdn.vn

function checkExternalLink(data){
    // let pattern = data.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g);
    // change to detect a href only
    let pattern = data.match(/<a([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>/g);
    if(_.some(pattern, function(pat) {
        return !pat.includes('saostar.vn');
    })){
        if(_.some(pattern, function(pat) {
            return !pat.includes('catscdn.vn');
        })){
            return true;
        }else{
            return false;
        }


    }else{
        // console.log('false');
        return false
    }
}

function checkNhayCam(data){
    let  tu_nhay_cam = [];
    if(localStore.getE('_banword')){
        tu_nhay_cam = _.split(localStore.getE('_banword'), ',');
    }
    let count = 0;
    tu_nhay_cam.forEach(wrd => {
        if(data.includes(wrd)){
            count++;
            console.log('alert');
        }
    });
    return count > 0;
}

function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
}

const checkCondition = props => {
    const { type, content: { title, title_google, url, keyword, description, description_google,
        content, img_ver, img_hor, categories, tags, contentpenname, primary_category, pr_type }, ignoreList } = props;
    let isFalse = false;
    switch (type) {

        case 'title':

            if (title && title_google && url && keyword) {
                if (title.length == default_length || (title_google.length > google_length || title_google.length === default_length) || url.length == default_length || keyword.length == default_length) {
                    return true
                }
            } else {
                return true;
            }
            break;
        case 'description':
            if (description.length == default_length || description_google.length > google_content_length) {
                return true
            }
            break;
        case 'content':
            if (content.length == default_length) {
                return true
            }
            
            break;
        case 'contentlink':
            let _user = localStore.get('_user');

            if(checkExternalLink(content)){
                if(_user.can_pr && pr_type > 0){
                    return false;
                }else{
                    return true
                }
            }
                break;
        case 'nhaycam':
            _user = localStore.get('_user');
            if(checkNhayCam(title + " " + title_google + " " + description + " " + description_google + " " + content)){
                if(_user.no_banword && pr_type > 0){
                    return false;
                }else{
                    return true
                }
            }
                break;
        case 'thumbnail':
            if (img_ver.length == default_length || img_hor.length == default_length) {
                return true
            }
            break;
        case 'category':
            if ((categories.length == default_length) || !primary_category) {
                return true
            }
            break;

        case 'tag':
            if (tags && tags.length < tag_length) {
                return true
            }
            break;
        case 'penname':
            if (!ignoreList.includes("penname")) {
                if (!contentpenname) {
                    return true
                }
            }
            break;
        default:
            isFalse = false;
            break;
    }
    return isFalse;
}

export default checkCondition

