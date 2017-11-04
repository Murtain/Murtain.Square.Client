import { message } from 'antd';

export function UserFriendlyError(code, return_message) {
    this.code = code;
    this.message = return_message;
}

export function NetWorkError(status) {
    this.status = status;
}

export function FetchError(return_message) {
    this.message = return_message;
}

export function FetchTimeoutError() {

}


export function toast(error) {

    if (error instanceof UserFriendlyError) {
        message.error(error.message);
    }

    if (error instanceof NetWorkError) {
        message.error('网络错误[' + error.status + ']');
    }

    if (error instanceof FetchError) {
        message.error('网络请求失败，请检查您的网络配置。');
    }

    if (error instanceof FetchTimeoutError) {
        message.error('网络超时，请稍候再试。');
    }

}

