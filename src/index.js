import axios from 'axios';

import { hock } from './components/hock/hock.js';
import { loadImage } from './components/loadImage/loadImage.js';
import { loadVideo } from './components/loadVideo/loadVideo.js';
import { getScript } from './components/getScript/getScript.js';
import { screenInfo } from './components/screenInfo/screenInfo.js';

import { eventUtil } from './utils/eventUtil.js';

var DirUrl = __FIXURL__ || 'http://192.168.110.9:8082/publish/ads/pv';

hock();

axios.get(DirUrl, {
    params: {
        destType: __DESTTYPE__,
        siteCode: __SITECODE__,
        channelPage: __CHANNELPAGE__,
        scrren_width: screenInfo.getScreenWidth(),
        scrren_height: screenInfo.getScreenHeight()
    }
})

.then(function(response) {
    if (response.data.isOk) {
        console.log('OK');
    }
    var _stgStyle = response.data.strategyType;
    switch (_stgStyle) {
        case (1):
            loadImage(response.data.ideaUrl, 's');
            break;
        case (2):
            var _activityUrl = response.data.activityUrl;
            var _arrActivityUrl = _activityUrl.split(',');
            function bar() {
                console.log('JS of behavior must be lated');
            }

            function foo() {
                var h = document.querySelector('#_ADOS_');
                h.innerHTML = str;
                var nodeOfScript = h.getElementsByTagName('script');
                var scriptStr = '';
                for (var i = nodeOfScript.length - 1; i >= 0; i--) {
                    scriptStr += nodeOfScript[i].innerHTML;
                }
                eval(scriptStr);
                console.log('JS for create DOM is ready');
                if (_arrActivityUrl[1]) {
                    getScript(_arrActivityUrl[1], document.getElementsByTagName('body')[0], bar);
                } else {
                    console.log('no more js');
                    return;
                }
            }
            getScript(_arrActivityUrl[0], document.querySelector('#_ADOS_'), foo);
            break;
        case (3):
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
