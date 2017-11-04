
export function GET_TIME() {

    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

export function GET_DATE() {


    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var week = new Array("日", "一", "二", "三", "四", "五", "六");

    return month + "月" + day + "日" + " 星期" + week[new Date().getDay()];
}

export function GET_WELCOME() {

    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    if (hour < 6) {
        return '夜深了'
    }
    else if (hour < 9) {
        return '早上好'
    }
    else if (hour < 12) {
        return '上午好'
    }
    else if (hour < 14) {
        return '中午好'
    }
    else if (hour < 17) {
        return '下午好'
    }
    else if (hour < 19) {
        return '傍晚好'
    }
    else if (hour < 22) {
        return '晚上好'
    }
    else {
        return '夜里好'
    }
}