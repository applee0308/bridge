const cvurl = 'http://pub.wiportal.cn/publish/ads/click';

// testing environment
const mappingUrl = '192.168.110.9:8091/publish/cookieserver/mapping';

//production environment
// const mappingUrl = 'http://pub.wiportal.cn/publish/cookieserver/mapping';

// const domSrc = window['__domSrc__'];

const fixUrl = window['__FIXURL__'];

const defaultImgUrl = {
  mobile: 'http://adcdn.wiplatform.com/storage/data/services/tongbu/wap-default.jpg',
  desktop: 'http://adcdn.wiplatform.com/storage/data/services/tongbu/web-default.png'
}

export { cvurl, mappingUrl, fixUrl, defaultImgUrl };
