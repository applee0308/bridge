require('es6-promise').polyfill();

import axios from 'axios';

import { hock } from './components/hock/hock.js';
import { loadImage } from './components/loadImage/loadImage.js';
import { loadVideo } from './components/loadVideo/loadVideo.js';
import { getScript } from './components/getScript/getScript.js';
import { screenInfo } from './components/screenInfo/screenInfo.js';

import { imageBeacon } from './components/imageBeacon/imageBeacon.js';
import { createInputElement } from './components/createInputElement/createInputElement.js';

import { eventUtil } from './utils/eventUtil.js';
import { cvurl, storeurl } from './utils/url.js';
import { utils } from './utils/utils.js';

var adosUrl = __FIXURL__ || 'http://192.168.110.9:8082/publish/ads/pv';

hock();
// 'http://192.168.110.9:8082/mgr/strategy/previewGd'
axios.get(adosUrl, {
    params: {
        destType: __DESTTYPE__,
        siteCode: __SITECODE__,
        channelPage: __CHANNELPAGE__,
        scrren_width: screenInfo.getScreenWidth(),
        scrren_height: screenInfo.getScreenHeight()
        // strategyId: idforSearch
    },
    withCredentials: true
})

.then(function(response) {

    var _stgStyle = response.data.strategyType;
    var _arrCkUrl = response.data.ckUrl.split(';') || null;
    var _arrPvUrl = response.data.pvUrl.split(';') || null;
    var _lenOfArrCkUrl = _arrCkUrl.length;
    var _skipUrl = response.data.skipUrl;

    if (response.data.isOk) {
        createInputElement('_ADOS_ADID_', response.data.adId);
        imageBeacon(storeurl + '?adId=' + response.data.adId + '&siteCode=' + __SITECODE__ + '&channelPage=' + __CHANNELPAGE__ + '&destType=' + __DESTTYPE__, 'store');
    }

    if (_arrPvUrl[0] !== "") {
        for (var i = _arrPvUrl.length - 1; i >= 0; i--) {
            imageBeacon(_arrPvUrl[i], 'pv');
        }
    } else {
        console.info('no 3rd pv');
    }

    let _adosXhrParams = {
        destType: __DESTTYPE__,
        siteCode: __SITECODE__,
        channelPage: __CHANNELPAGE__,
        scrren_width: screenInfo.getScreenWidth(),
        scrren_height: screenInfo.getScreenHeight(),
        adId: document.getElementById('_ADOS_ADID_').value
    };

    switch (_stgStyle) {
        case (1):
            loadImage(response.data.ideaUrl, '_s_');
            var _s_ = document.getElementsByClassName('_s_')[0];
            utils.addClass(_s_, 'forck');
            var _stop = true;
            if (__DESTTYPE__ == 'wap') {
                _s_.style.width = '100%';
            }
            eventUtil.addHandler(_s_, 'click', function() {
                if (_stop) {
                    _stop = false;
                    if (_skipUrl == "") {
                        console.log('no skip url');
                    } else {
                        if (_arrCkUrl[0] == "") {
                            console.log('no 3 ck');
                        } else {
                            for (let i = _arrCkUrl.length - 1; i >= 0; i--) {
                                imageBeacon(_arrCkUrl[i], 'ck');
                            }
                        }
                        axios.get(cvurl, {
                            params: _adosXhrParams
                        }).then(function(response) {
                            location.href = _skipUrl;
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                }
            });
            break;
        case (2):
            var _activityUrl = response.data.activityUrl;
            var _arrActivityUrl = _activityUrl.split(',');
            createInputElement('_ADOS_ADTAG_', response.data.advertiserTag);

            function bar() {
                console.log('JS of behavior must be lated');
            }

            function foo() {
                var h = document.getElementById('_ADOS_');
                h.innerHTML = str;
                var nodeOfScript = h.getElementsByTagName('script');
                var scriptStr = '';
                for (let i = nodeOfScript.length - 1; i >= 0; i--) {
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
            loadVideo(response.data.ideaUrl, '_v_');
            var _v_ = document.getElementsByClassName('_v_')[0];
            utils.addClass(_v_, 'forck');
            _v_.style.width = '100%';
            var _vflag = true;
            eventUtil.addHandler(_v_, 'click', function() {
                if (_vflag) {
                    if (_skipUrl == "") {
                        console.log('no skip url');
                    } else {
                        if (_arrCkUrl[0] == "") {
                            console.log('no 3 ck');
                        } else {
                            for (let i = _arrCkUrl.length - 1; i >= 0; i--) {
                                imageBeacon(_arrCkUrl[i], 'ck');
                            }
                        }
                        axios.get(cvurl, {
                            params: _adosXhrParams
                        }).then(function(response) {
                            location.href = _skipUrl;
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                    imageBeacon(_arrCkUrl[0], 'ck');
                }
                _vflag = false;
            });
            break;
        case (4):
            var _apkUrl = response.data.apkUrl; // APK download link
            loadImage(response.data.ideaUrl, '_a_');
            var _a_ = document.getElementsByClassName('_a_')[0];
            utils.addClass(_a_, 'forck');
            _a_.style.width = '100%';
            if (response.data.downloadType == 1) {
                axios.get(response.data.downloadUrl, {
                    params: _adosXhrParams
                }).then(function(response) {
                    window.location.href = _apkUrl;
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                eventUtil.addHandler(_a_, 'click', function() {
                    axios.get(response.data.downloadUrl, {
                        params: _adosXhrParams
                    }).then(function(response) {
                        window.location.href = _apkUrl;
                    }).catch(function(error) {
                        console.log(error);
                    });
                });
            }
            break;
        default:
            console.warn('Response error');
    }
})

.catch(function(error) {
    console.log(error);
});
