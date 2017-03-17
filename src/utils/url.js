// env cfg file => can use fixed url [that is better].
// testing environment  => 192.168.110.9:8091
// production environment => http://pub.wiportal.cn

const cvurl = '192.168.110.9:8091/publish/ads/click';
// const mappingUrl = 'http://pub.wiportal.cn/publish/ads/click';
const mappingUrl = '192.168.110.9:8091/publish/cookieserver/mapping';
// const mappingUrl = 'http://pub.wiportal.cn/publish/cookieserver/mapping';

// const domSrc = window['__domSrc__'];

const fixUrl = window['__FIXURL__'];

const defaultImgUrl = {
  mobile: 'http://adcdn.wiplatform.com/storage/data/services/tongbu/wap-default.jpg',
  desktop: 'http://adcdn.wiplatform.com/storage/data/services/tongbu/web-default.png'
}
const vedioAnalysis = ['http://g.cn.miaozhen.com/x/k=2038301&p=74x95&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=', 'http://g.cn.miaozhen.com/x/k=2038301&p=74x96&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=', 'http://g.cn.miaozhen.com/x/k=2038301&p=74x97&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=', 'http://g.cn.miaozhen.com/x/k=2038301&p=74x98&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=', 'http://g.cn.miaozhen.com/x/k=2038301&p=74x99&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=']

export { cvurl, mappingUrl, fixUrl, defaultImgUrl, vedioAnalysis };
