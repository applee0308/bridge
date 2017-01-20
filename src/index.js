require('es6-promise').polyfill();

import axios from 'axios';
import Swiper from 'swiper';

import { vars } from './components/vars/vars.js';
import { hock } from './components/hock/hock.js';
import { loadImage } from './components/loadImage/loadImage.js';
import { loadVideo } from './components/loadVideo/loadVideo.js';
import { getScript } from './components/getScript/getScript.js';
import { screenInfo } from './components/screenInfo/screenInfo.js';

import { imageBeacon } from './components/imageBeacon/imageBeacon.js';
import { createInputElement } from './components/createInputElement/createInputElement.js';
import { createHockName } from './components/createHockName/createHockName.js';

import { eventUtil } from './utils/eventUtil.js';
import { cvurl, storeurl } from './utils/url.js';
import { utils } from './utils/utils.js';

var adosUrl = vars.adosUrl || '';

var hockName = createHockName();

hock(hockName[0]);
axios.get(adosUrl, {
  params: {
    destType: vars.destType,
    siteCode: vars.siteCode,
    channelPage: vars.channelPage,
    scrren_width: screenInfo.getScreenWidth(),
    scrren_height: screenInfo.getScreenHeight()
  },
  withCredentials: true
})

.then(function(response) {
  if (!utils.isArray(response.data)) {
    const stgtype = response.data.strategyType; // 策略类型 1：图片 2：HTML5 3：视频 4：APK
    const arrCkUrl = response.data.ckUrl.split(';') || null; // 点击量检测(包括第三方检测和平台检测)
    const arrPvUrl = response.data.pvUrl.split(';') || null; // 第三方PV检测
    const skipUrl = response.data.skipUrl; // 策略跳转地址
    const adId = response.data.adId; // 广告唯一标识
    const inputName = hockName + '-ID'; // 存储广告名
    if (response.data.isOk == 'ok') {
      imageBeacon(storeurl + '?adId=' + response.data.adId + '&siteCode=' + vars.siteCode + '&channelPage=' + vars.channelPage + '&destType=' + vars.destType, 'os-pv');
      if (arrPvUrl[0] !== "") {
        for (let i = arrPvUrl.length - 1; i >= 0; i--) {
          imageBeacon(arrPvUrl[i], 'pv');
        }
      } else {
        console.info('no 3rd pv');
      }
      if (stgtype == 2) {
        createInputElement('_ADOS_H5_ID_', response.data.adId);
      } else {
        createInputElement(inputName, response.data.adId);
      }
    }

    let paramOfadid = null;
    if (stgtype == 2) {
      paramOfadid = document.getElementById('_ADOS_H5_ID_').value;
    } else {
      paramOfadid = document.getElementById(inputName).value;
    }

    let adosXhrParams = {
      destType: vars.destType,
      siteCode: vars.siteCode,
      channelPage: vars.channelPage,
      scrren_width: screenInfo.getScreenWidth(),
      scrren_height: screenInfo.getScreenHeight(),
      adId: paramOfadid
    };

    switch (stgtype) {
      case (1):

        let stopOfimage = true;
        const nameOfimage = hockName + '-S';

        loadImage(response.data.ideaUrl, nameOfimage, adId, document.getElementById(hockName[0]));
        const image = document.getElementById(nameOfimage);
        utils.addClass(image, 'forck');
        if ((vars.destType) == 'wap') {
          image.style.width = '100%';
        }
        eventUtil.addHandler(image, 'click', function() {
          if (stopOfimage) {
            console.log(this.getAttribute("data-ads-id"));
            if (skipUrl == "") {
              console.log('no skip url');
            } else {
              if (arrCkUrl[0] == "") {
                console.log('no 3 ck');
              } else {
                for (let i = arrCkUrl.length - 1; i >= 0; i--) {
                  imageBeacon(arrCkUrl[i], 'ck');
                }
              }
              axios.get(cvurl, {
                params: adosXhrParams
              }).then(function(response) {
                location.href = skipUrl;
              }).catch(function(error) {
                console.log(error);
              });
            }
          }
          stopOfimage = false;
        });
        break;
      case (2):
        var activityUrl = response.data.activityUrl;
        var arrActivityUrl = _activityUrl.split(',');
        createInputElement('_ADOS_ADTAG_', response.data.advertiserTag);

        function bar() {
          console.log('JS of behavior must be lated');
        }

        function foo() {
          var h = document.getElementById(hockName[0]);
          h.innerHTML = str;
          var nodeOfScript = h.getElementsByTagName('script');
          var scriptStr = '';
          for (let i = nodeOfScript.length - 1; i >= 0; i--) {
            scriptStr += nodeOfScript[i].innerHTML;
          }
          eval(scriptStr);
          console.log('JS for create DOM is ready');
          if (_arrActivityUrl[1]) {
            getScript(arrActivityUrl[1], document.getElementsByTagName('body')[0], bar);
          } else {
            console.log('no more js');
            return;
          }
        }
        getScript(arrActivityUrl[0], document.getElementById(hockName[0]), foo);
        break;
      case (3):
        let stopOfvideo = true;
        const nameOfvideo = hockName + '-V';
        loadVideo(response.data.ideaUrl, nameOfvideo, document.getElementById(hockName[0]));
        const video = document.getElementsByClassName(nameOfvideo)[0];
        utils.addClass(video, 'forck');
        video.style.width = '100%';
        eventUtil.addHandler(video, 'click', function() {
          if (stopOfvideo) {
            if (skipUrl == "") {
              console.log('no skip url');
            } else {
              if (arrCkUrl[0] == "") {
                console.log('no 3 ck');
              } else {
                for (let i = arrCkUrl.length - 1; i >= 0; i--) {
                  imageBeacon(arrCkUrl[i], 'ck');
                }
              }
              axios.get(cvurl, {
                params: adosXhrParams
              }).then(function(response) {
                location.href = skipUrl;
              }).catch(function(error) {
                console.log(error);
              });
            }
          }
          stopOfvideo = false;
        });
        break;
      case (4):
        const nameOfapk = hockName + '-A';
        const apkUrl = response.data.apkUrl; // APK download link
        loadImage(response.data.ideaUrl, nameOfapk, document.getElementById(hockName[0]));
        const apk = document.getElementsByClassName(nameOfapk)[0];
        utils.addClass(apk, 'forck');
        apk.style.width = '100%';
        if (response.data.downloadType == 1) {
          axios.get(response.data.downloadUrl, {
            params: adosXhrParams
          }).then(function(response) {
            window.location.href = apkUrl;
          }).catch(function(error) {
            console.log(error);
          });
        } else {
          eventUtil.addHandler(apk, 'click', function() {
            axios.get(response.data.downloadUrl, {
              params: adosXhrParams
            }).then(function(response) {
              window.location.href = apkUrl;
            }).catch(function(error) {
              console.log(error);
            });
          });
        }
        break;
      default:
        console.warn('Response error');
    }
  } else {
    const stgtype = response.data[0].strategyType;
    const h = document.getElementById(hockName[0]);
    switch (stgtype) {
      case (5):
        let swiperStr = ``;
        let swiperPvUrlStr = '';
        let swiperArrayOfPv = null;
        for (let i = 0; i < response.data.length; i++) {
          swiperStr += `<div class="swiper-slide"><img class="single-slide-ados forck forck-${response.data[i].adId}" data-id="${response.data[i].adId}" data-url="${response.data[i].skipUrl}" src='${response.data[i].ideaUrl}' alt="" style="width:100%"/></div>`;
          imageBeacon(storeurl + '?adId=' + response.data[i].adId + '&siteCode=' + vars.siteCode + '&channelPage=' + vars.channelPage + '&destType=' + vars.destType, 'os-pv');
          const pvUrl = response.data[i].pvUrl;
          swiperPvUrlStr += (pvUrl + ';');
        }
        swiperArrayOfPv = swiperPvUrlStr.split(';');
        for (let i = 0; i < swiperArrayOfPv.length; i++) {
          if (swiperArrayOfPv[i] !== '') {
            imageBeacon(swiperArrayOfPv[i], 'third-pv');
          }
        }
        h.innerHTML = `
				<style>#adosSwiper{}#adosSwiper .swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;z-index:1}#adosSwiper .swiper-container-no-flexbox .swiper-slide{float:left}#adosSwiper .swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-moz-box-orient:vertical;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}#adosSwiper .swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}#adosSwiper .swiper-container-android .swiper-slide,#adosSwiper .swiper-wrapper{-webkit-transform:translate3d(0px, 0, 0);-moz-transform:translate3d(0px, 0, 0);-o-transform:translate(0px, 0px);-ms-transform:translate3d(0px, 0, 0);transform:translate3d(0px, 0, 0)}#adosSwiper .swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap}#adosSwiper .swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}#adosSwiper .swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative}#adosSwiper .swiper-container-autoheight,#adosSwiper .swiper-container-autoheight .swiper-slide{height:auto}#adosSwiper .swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-transition-property:-webkit-transform, height;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;-webkit-transition-property:height, -webkit-transform;transition-property:height, -webkit-transform;transition-property:transform, height;transition-property:transform, height, -webkit-transform}#adosSwiper .swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}#adosSwiper .swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}#adosSwiper .swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}#adosSwiper .swiper-button-next,#adosSwiper .swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}#adosSwiper .swiper-button-next.swiper-button-disabled,#adosSwiper .swiper-button-prev.swiper-button-disabled{opacity:0.35;cursor:auto;pointer-events:none}#adosSwiper .swiper-button-prev,#adosSwiper .swiper-container-rtl .swiper-button-next{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");left:10px;right:auto}#adosSwiper .swiper-button-prev.swiper-button-black,#adosSwiper .swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")}#adosSwiper .swiper-button-prev.swiper-button-white,#adosSwiper .swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")}#adosSwiper .swiper-button-next,#adosSwiper .swiper-container-rtl .swiper-button-prev{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");right:10px;left:auto}#adosSwiper .swiper-button-next.swiper-button-black,#adosSwiper .swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")}#adosSwiper .swiper-button-next.swiper-button-white,#adosSwiper .swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")}#adosSwiper .swiper-pagination{position:absolute;text-align:center;-webkit-transition:300ms;-moz-transition:300ms;-o-transition:300ms;transition:300ms;-webkit-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);z-index:10}#adosSwiper .swiper-pagination.swiper-pagination-hidden{opacity:0}#adosSwiper .swiper-container-horizontal>.swiper-pagination-bullets,#adosSwiper .swiper-pagination-custom,#adosSwiper .swiper-pagination-fraction{bottom:10px;left:0;width:100%}#adosSwiper .swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:0.2}#adosSwiper button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}#adosSwiper .swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}#adosSwiper .swiper-pagination-white .swiper-pagination-bullet{background:#fff}#adosSwiper .swiper-pagination-bullet-active{opacity:1;background:#007aff}#adosSwiper .swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}#adosSwiper .swiper-pagination-black .swiper-pagination-bullet-active{background:#000}#adosSwiper .swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0px, -50%, 0);-moz-transform:translate3d(0px, -50%, 0);-o-transform:translate(0px, -50%);-ms-transform:translate3d(0px, -50%, 0);transform:translate3d(0px, -50%, 0)}#adosSwiper .swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}#adosSwiper .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}#adosSwiper .swiper-pagination-progress{background:rgba(0, 0, 0, 0.25);position:absolute}#adosSwiper .swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;-o-transform-origin:left top;transform-origin:left top}#adosSwiper .swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;-moz-transform-origin:right top;-ms-transform-origin:right top;-o-transform-origin:right top;transform-origin:right top}#adosSwiper .swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}#adosSwiper .swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}#adosSwiper .swiper-pagination-progress.swiper-pagination-white{background:rgba(255, 255, 255, 0.5)}#adosSwiper .swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}#adosSwiper .swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}#adosSwiper .swiper-container-3d{-webkit-perspective:1200px;-moz-perspective:1200px;-o-perspective:1200px;perspective:1200px}#adosSwiper .swiper-container-3d .swiper-cube-shadow,#adosSwiper .swiper-container-3d .swiper-slide,#adosSwiper .swiper-container-3d .swiper-slide-shadow-bottom,#adosSwiper .swiper-container-3d .swiper-slide-shadow-left,#adosSwiper .swiper-container-3d .swiper-slide-shadow-right,#adosSwiper .swiper-container-3d .swiper-slide-shadow-top,#adosSwiper .swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d}#adosSwiper .swiper-container-3d .swiper-slide-shadow-bottom,#adosSwiper .swiper-container-3d .swiper-slide-shadow-left,#adosSwiper .swiper-container-3d .swiper-slide-shadow-right,#adosSwiper .swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}#adosSwiper .swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(transparent));background-image:-webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), transparent);background-image:-moz-linear-gradient(right, rgba(0, 0, 0, 0.5), transparent);background-image:-o-linear-gradient(right, rgba(0, 0, 0, 0.5), transparent);background-image:linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent)}#adosSwiper .swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));background-image:-webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), transparent);background-image:-moz-linear-gradient(left, rgba(0, 0, 0, 0.5), transparent);background-image:-o-linear-gradient(left, rgba(0, 0, 0, 0.5), transparent);background-image:linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent)}#adosSwiper .swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(transparent));background-image:-webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), transparent);background-image:-moz-linear-gradient(bottom, rgba(0, 0, 0, 0.5), transparent);background-image:-o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), transparent);background-image:linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)}#adosSwiper .swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));background-image:-webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), transparent);background-image:-moz-linear-gradient(top, rgba(0, 0, 0, 0.5), transparent);background-image:-o-linear-gradient(top, rgba(0, 0, 0, 0.5), transparent);background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)}#adosSwiper .swiper-container-coverflow .swiper-wrapper,#adosSwiper .swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}#adosSwiper .swiper-container-cube,#adosSwiper .swiper-container-flip{overflow:visible}#adosSwiper .swiper-container-cube .swiper-slide,#adosSwiper .swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden;z-index:1}#adosSwiper .swiper-container-cube .swiper-slide .swiper-slide,#adosSwiper .swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}#adosSwiper .swiper-container-cube .swiper-slide-active,#adosSwiper .swiper-container-cube .swiper-slide-active .swiper-slide-active,#adosSwiper .swiper-container-flip .swiper-slide-active,#adosSwiper .swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}#adosSwiper .swiper-container-cube .swiper-slide-shadow-bottom,#adosSwiper .swiper-container-cube .swiper-slide-shadow-left,#adosSwiper .swiper-container-cube .swiper-slide-shadow-right,#adosSwiper .swiper-container-cube .swiper-slide-shadow-top,#adosSwiper .swiper-container-flip .swiper-slide-shadow-bottom,#adosSwiper .swiper-container-flip .swiper-slide-shadow-left,#adosSwiper .swiper-container-flip .swiper-slide-shadow-right,#adosSwiper .swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}#adosSwiper .swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}#adosSwiper .swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-moz-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}#adosSwiper .swiper-container-cube .swiper-slide-active,#adosSwiper .swiper-container-cube .swiper-slide-next,#adosSwiper .swiper-container-cube .swiper-slide-next+.swiper-slide,#adosSwiper .swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}#adosSwiper .swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;background:#000;opacity:0.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}#adosSwiper .swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}#adosSwiper .swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}#adosSwiper .swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}#adosSwiper .swiper-container-fade .swiper-slide-active,#adosSwiper .swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}#adosSwiper .swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;text-align:center}#adosSwiper .swiper-zoom-container>canvas,#adosSwiper .swiper-zoom-container>img,#adosSwiper .swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}#adosSwiper .swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0, 0, 0, 0.1)}#adosSwiper .swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}#adosSwiper .swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}#adosSwiper .swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0, 0, 0, 0.5);border-radius:10px;left:0;top:0}#adosSwiper .swiper-scrollbar-cursor-drag{cursor:move}#adosSwiper .swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-moz-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12, end) infinite;-moz-animation:swiper-preloader-spin 1s steps(12, end) infinite;animation:swiper-preloader-spin 1s steps(12, end) infinite}#adosSwiper .swiper-lazy-preloader:after{display:block;content:"";width:100%;height:100%;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");background-position:50%;-webkit-background-size:100%;background-size:100%;background-repeat:no-repeat}#adosSwiper .swiper-lazy-preloader-white:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")}@-webkit-keyframes swiper-preloader-spin{to{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style>
				<div id="adosSwiper">
					<div class="swiper-container" id="adosSwiperContainer">
						<div class="swiper-wrapper">
							${ swiperStr }
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>`;
        // swiper init
        const adosSwiper = new Swiper('#adosSwiperContainer', {
          loop: true,
          autoplay: 3500,
          pagination: '.swiper-pagination'
        });
        // handle click
        const singleSlideArray = Array.prototype.slice.call(document.getElementsByClassName('single-slide-ados'));
        for (let i = 0; i < singleSlideArray.length; i++) {
          eventUtil.addHandler(singleSlideArray[i], 'click', function() {
            let swiperXhrParams = {
              destType: vars.destType,
              siteCode: vars.siteCode,
              channelPage: vars.channelPage,
              scrren_width: screenInfo.getScreenWidth(),
              scrren_height: screenInfo.getScreenHeight(),
              adId: this.dataset.id
            };
            let that = this;
            axios.get(cvurl, {
              params: swiperXhrParams
            }).then(function(response) {
              location.href = that.dataset.url;
            }).catch(function(error) {
              console.log(error);
            });
          });
        }
        break;
      case (6):
        console.log('point');
        let entryPointStr = ``;
        let entryPointPvUrlStr = '';
        let entryPointArrayOfPv = null;
        for (let i = 0; i < response.data.length; i++) {
          entryPointStr += `
					<li>
						<div class="item single-entrypoint-ados forck forck-${response.data[i].adId}" data-id="${response.data[i].adId}" data-url="${response.data[i].skipUrl}">
							<div class="media">
								<img  src='${response.data[i].ideaUrl}' alt="">
							</div>
							<div class="summary">${response.data[i].adName}</div>
						</div>
					</li>`;
          imageBeacon(storeurl + '?adId=' + response.data[i].adId + '&siteCode=' + vars.siteCode + '&channelPage=' + vars.channelPage + '&destType=' + vars.destType, 'os-pv');
          const pvUrl = response.data[i].pvUrl;
          entryPointPvUrlStr += (pvUrl + ';');
        }
        entryPointArrayOfPv = entryPointPvUrlStr.split(';');
        // 3rd pv link
        for (let i = 0; i < entryPointArrayOfPv.length; i++) {
          if (entryPointArrayOfPv[i] !== '') {
            imageBeacon(entryPointArrayOfPv[i], 'third-pv');
          }
        }
        h.innerHTML = `
				<style>#__adosEntryPoint{padding:0 2%;background:#ececec}#__adosEntryPoint ul{margin:0;list-style:none;padding:0}#__adosEntryPoint ul li{float:left;width:20%;margin:10px auto;padding:0}#__adosEntryPoint ul li .item{text-align:center;margin:0 auto}#__adosEntryPoint ul li .item img{width:50px;height:50px;border-radius:50%}#__adosEntryPoint ul li .item .summary{text-align:center;margin:4px 0;font-size:13px;color:#b29f6b}#__adosEntryPoint:after,#__adosEntryPoint:before{display:table;content:" "}#__adosEntryPoint:after{clear:both}</style>
				<div id="__adosEntryPoint">
					<ul>
						${ entryPointStr }
					</ul>
				</div>
				`;
        const singleEntryPointArray = Array.prototype.slice.call(document.getElementsByClassName('single-entrypoint-ados'));
        for (let i = 0; i < singleEntryPointArray.length; i++) {
          eventUtil.addHandler(singleEntryPointArray[i], 'click', function() {
            let entrypointXhrParams = {
              destType: vars.destType,
              siteCode: vars.siteCode,
              channelPage: vars.channelPage,
              scrren_width: screenInfo.getScreenWidth(),
              scrren_height: screenInfo.getScreenHeight(),
              adId: this.dataset.id
            };
            let that = this;
            axios.get(cvurl, {
              params: entrypointXhrParams
            }).then(function(response) {
              location.href = that.dataset.url;
            }).catch(function(error) {
              console.log(error);
            });
          });
        }
        break;
      default:
        console.warn('Response error');
    }
  }
})

.catch(function(error) {
  console.log(error);
});
