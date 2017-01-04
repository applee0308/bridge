# bridge

webpack

ADOS[广告投放系统]与Portal[广告平台]

将生成的广告[广告资源来源于CND]渲染值Portal。

### H5广告接口

#### URL

[PrefixedUrl] + '/h5act/common'

#### handleCookie

#### params
<pre><code>
function getCookie(name) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    } else {
        return '';
    }
};
</code></pre>

#### params
<pre><code>
{
	mediaCode: __SITECODE__,
	spaceCode: __CHANNELPAGE__,
	identity: document.getElementById('_ADOS_ADTAG_'),
	adId: document.getElementById('_ADOS_ADID_'),
	formSeri: JSON.stringify(obj) // 表单序列化数据
	mobile: cookie形式[可以不传值]
}
</code></pre>

### 抽奖接口

#### URL

[PrefixedUrl] + '/h5act/lottery'

#### params
<pre><code>
{
	mediaCode: __SITECODE__,
	spaceCode: __CHANNELPAGE__,
	adId: document.getElementById('_ADOS_ADID_'),
	mobile: cookie形式[可以不传值]
}
</code></pre>

###测试

yarn add

yarn run dev

###发布

yarn run install
