import { Toast } from 'antd-mobile';
import { translateParams } from './util';
import config from '../config.json';

let prefix = '/website';

function parseJSON(response) {
    if (response) {
        return response.json();
    }
    return null;
}

function checkStatus(response) {
    const status = response.status;
    if (status >= 200 && status < 300) {
        return response;
    } else if (status === 302) {
        return null;
    } else {
        const error = new Error(response.statusText);
        throw error;
    }
}

/* 统一错误处理，如果不希望弹出错误信息，请在调用ajax请求时，options配置传入{noErrorWarning: true} 即可 */
function commonError(err) {
    const status = err && err.response ? err.response.status : '';
    console.log('status:::::::::', err);
    if (status === 401) {
        // window.location.href = '/login';
        window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
    } else if (status === 403) {
        window.location.href = '/access/forbidden';
    } else if (status === 404) {
        console.log('资源404');
        window.location.href = '/404';
    } else {
        if (err.response) {
            // message.destroy();
            try {
                Toast.info(err.response.statusText, 1);
            } catch (e) {
                Toast.info('系统发生未知错误!', 1);
            }
        } else {
            Toast.info(err.msg || '系统发生未知错误!', 1);
        }
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options, isForm = false) {
    // 默认配置
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    const ct = isForm ? 'application/x-www-form-urlencoded' : 'application/json'
    const defaultOptions = {
        method: 'GET',
        headers: {
            // Cookie : document.cookie,
            'Content-Type': ct,
            'ACCESS-TOKEN': `${accessToken}`,
            // from: '4'
            // Authorize: `${accessToken}`
        },
        // credentials:'include',
        noErrorWarning: false,
        noContentType: false
    };
    const headers = Object.assign({}, defaultOptions.headers, options ? options.headers : undefined);
    const newOptions = { ...defaultOptions, ...options, headers };
    if (newOptions.noContentType) {
        delete newOptions.headers['Content-Type'];
    }
    console.log('url=', url);
    if (url.startsWith('/Website/')) {
        url = url.substring(8);
        url = prefix + url
    } else if(url.startsWith('/api/')){
        url = prefix + url
    }
    console.log(prefix);
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
            if (data.code + '' !== '0') {
                if (+data.code === -10) {
                    Toast.info('登录失效请重新登录!', 1);
                    localStorage.removeItem('userInfo')
                    localStorage.setItem("redirectUrl", window.location)
                    // window.location.href = '/login'
                    window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
                }
                if (!newOptions.noErrorWarning) {
                    commonError(data);
                }
            }
            return data;
        })
        .catch((err) => {
            if (!newOptions.noErrorWarning) {
                commonError(err);
            }
        });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [params]  The parameters we want to pass to "fetch"
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export const HTTPGet = (url, params, options) => {
    if (params) {
        const paramString = translateParams(params);
        if (paramString) {
            url = `${url}?${paramString}`;
        }
    }
    return request(url, options);
}

export const HTTPPost = (url, data, isForm = false, options) => {
    const newOptions = Object.assign({}, {
        body: isForm ? data : JSON.stringify(data),
        method: 'POST',
    }, { ...options });
    console.log('nn=', newOptions)
    return request(url, newOptions, isForm);
}

export const HTTPPut = (url, data, options) => {
    const newOptions = Object.assign({}, {
        body: JSON.stringify(data),
        method: 'PUT',
    }, options);
    return request(url, newOptions);
}

export const HTTPDelete = (url, params, options) => {
    if (params) {
        const paramString = translateParams(params);
        if (paramString) {
            url = `${url}?${paramString}`;
        }
    }
    const newOptions = Object.assign({}, { method: 'DELETE', options });
    return request(url, newOptions);
}