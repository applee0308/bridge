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

var adosUrl = __FIXURL__ || 'http://192.168.110.9:8082/publish/ads/pv';

hock();

axios.get(adosUrl, {
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
        createInputElement('_ADOS_ADID_', response.data.adId);
        imageBeacon(response.data.pvUrl, 'pv');
    }
    var _stgStyle = response.data.strategyType;
    var _arrCkUrl = response.data.ckUrl.split(';');
    var _skipUrl = response.data.skipUrl;
    switch (_stgStyle) {
        case (1):
            loadImage(response.data.ideaUrl, '_s_');
            var _s_ = document.getElementsByClassName('_s_')[0];
            var _sflag = true;
            eventUtil.addHandler(_s_, 'click', function() {
                if (_sflag) {
                    imageBeacon(_arrCkUrl[0], 'ck');
                    axios.get(_arrCkUrl[1], {
                        params: {
                            destType: __DESTTYPE__,
                            siteCode: __SITECODE__,
                            channelPage: __CHANNELPAGE__,
                            scrren_width: screenInfo.getScreenWidth(),
                            scrren_height: screenInfo.getScreenHeight(),
                            adId: document.getElementById('_ADOS_ADID_').value
                        }
                    }).then(function(response) {
                        console.log('simple ad xhr');
                        location.href = _skipUrl;
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                _sflag = false;
            });
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
            loadVideo(response.data.ideaUrl, '_v_');
            var _v_ = document.getElementsByClassName('_v_')[0];
            var _vflag = true;
            eventUtil.addHandler(_v_, 'click', function() {
                if (_vflag) {
                    imageBeacon(_arrCkUrl[0], 'ck');
                    axios.get(_arrCkUrl[1], {
                        params: {
                            destType: __DESTTYPE__,
                            siteCode: __SITECODE__,
                            channelPage: __CHANNELPAGE__,
                            scrren_width: screenInfo.getScreenWidth(),
                            scrren_height: screenInfo.getScreenHeight(),
                            adId: document.getElementById('_ADOS_ADID_').value
                        }
                    }).then(function(response) {
                        console.log(response.data);
                        console.log('video xhr');
                        location.href = _skipUrl;
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                _vflag = false;
            });
            break;
        case (4):
            loadImage(response.data.ideaUrl, '_a_');
            if (response.data.downloadType == 1) {
                axios.get(response.data.downloadUrl, {
                    params: {
                        destType: __DESTTYPE__,
                        siteCode: __SITECODE__,
                        channelPage: __CHANNELPAGE__,
                        scrren_width: screenInfo.getScreenWidth(),
                        scrren_height: screenInfo.getScreenHeight(),
                        adId: document.getElementById('_ADOS_ADID_').value
                    }
                }).then(function(response) {
                    console.log('apk xhr');
                    location.href = response.data.apkUrl;
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                var _a_ = document.getElementsByClassName('_a_')[0];
                eventUtil.addHandler(_a_, 'click', function() {
                    axios.get(response.data.downloadUrl, {
                        params: {
                            destType: __DESTTYPE__,
                            siteCode: __SITECODE__,
                            channelPage: __CHANNELPAGE__,
                            scrren_width: screenInfo.getScreenWidth(),
                            scrren_height: screenInfo.getScreenHeight(),
                            adId: document.getElementById('_ADOS_ADID_').value
                        }
                    }).then(function(response) {
                        console.log('apk xhr');
                        location.href = response.data.apkUrl;
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
