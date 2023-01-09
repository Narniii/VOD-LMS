import { makeCancelable, SITE_URL, findInArray } from "../utils/utils";

const LOCALHOST = false;
class APIHandler {
    constructor() {
        this.request = this.request.bind(this);
    }
    request(path, isPost = false, data = {}, token) {
        if (path[0] === '/')
            path = path.substring(1);
        if (token) {
            var h = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        else {
            var h = {
                'Content-Type': 'application/json',
            }
        }
        var options = {
            headers: h,
            method: isPost ? 'POST' : 'GET',
        };
        if (isPost)
            options.body = JSON.stringify(data);
        return makeCancelable(new Promise((resolve, reject) => {
            var url = (LOCALHOST ? 'http://localhost:8283/api/' : 'https://api.aqua.ir:8283/') + path;
            fetch(url, options).then((response => response.json())).then((response) => {
                setTimeout(() => {
                    resolve(response);
                }, 500);
            }).catch((err) => {
                setTimeout(() => {
                    reject(err.toString());
                }, 500);
            });
        }));
    }
}
const API = new APIHandler();
export default API;
