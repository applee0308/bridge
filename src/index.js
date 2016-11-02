import axios from 'axios';

import { hock } from './components/hock/hock.js';
import { getScreenInfo } from './components/getScreenInfo/getScreenInfo.js';
import { loadImage } from './components/loadImage/loadImage.js';
import { loadVideo } from './components/loadVideo/loadVideo.js';
import { getScript } from './components/getScript/getScript.js';

import { eventUtil } from './utils/eventUtil.js';

let DirUrl = __FIXURL__ || 'http://192.168.110.9:8082/publish/ads/pv';

hock();

axios.get(DirUrl, {
    params: {
        destType: __DESTTYPE__,
        siteCode: __SITECODE__,
        channelPage: __CHANNELPAGE__,
        screenInfo: getScreenInfo()
    }
})

.then(function(response) {
    if (response.data.isOk) {
        console.log('OK');
    }
    let _stgStyle = response.data.strategyType;
    switch (_stgStyle) {
        case (1):
            loadImage(response.data.ideaUrl, 's');
            break;
        case (2):
            // loadImage(response.data.ideaUrl, 'apk');
            console.log(2);
            break;
        case (3):
            console.log(3);
            loadVideo(response.data.ideaUrl, 'v');
            break;
        case (4):
            loadImage(response.data.ideaUrl, 'a');
            if (response.data.downloadType == 1) {
                location.href = response.data.apkUrl;
            } else {
                var _d = document.getElementsByClassName('a')[0];
                alert('点击图片下载');
                eventUtil.addHandler(_d, 'click', function() {
                    location.href = response.data.apkUrl;
                });
            }
            break;
        default:
            console.warn('未正确返回');
    }
})

.catch(function(error) {
    console.log(error);
});


function bar() {
    console.log('JS of behavior must be lated');
}

function foo() {
    var h = document.querySelector('#_ADOS_');
    h.innerHTML = str;
    // var nodeOfScript = h.getElementsByTagName('script');
    // var scriptStr = '';
    // for (var i = nodeOfScript.length - 1; i >= 0; i--) {
    //     scriptStr += nodeOfScript[i].innerHTML;
    // }
    // eval(scriptStr);
    console.log('JS for create DOM is ready');
}


// function f() {
//     getScript('compiled.js', document.querySelector('#_ADOS_'), foo);
// }
// function e() {
//     getScript('http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js', document.getElementsByTagName('body')[0], bar);
// }

// f();
// e();
