# bridge

webpack

ADOS[广告投放系统]与Portal[广告平台]

将生成的广告[广告资源来源于CND]渲染值Portal。

### H5广告接口

#### URL

[PrefixedUrl] + '/publish/h5act/common'

<<<<<<< HEAD
#### getCookie
=======
#### handleCookie
>>>>>>> 1d35f64f5db82ea904f937d2d891c9d8591dbddb

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
<<<<<<< HEAD
}
=======
};
>>>>>>> 1d35f64f5db82ea904f937d2d891c9d8591dbddb
</code></pre>

#### params
<pre><code>
{
<<<<<<< HEAD
    mediaCode: __SITECODE__,
    spaceCode: __CHANNELPAGE__,
    identity: document.getElementById('_ADOS_ADTAG_').value,
    adId: document.getElementById('_ADOS_ADID_').value,
    formSeri: JSON.stringify(obj) // 表单序列化数据
    mobile: cookie形式[可以不传值]
=======
	mediaCode: __SITECODE__,
	spaceCode: __CHANNELPAGE__,
	identity: document.getElementById('_ADOS_ADTAG_').value,
	adId: document.getElementById('_ADOS_ADID_').value,
	formSeri: JSON.stringify(obj) // 表单序列化数据
	mobile: cookie形式[可以不传值]
>>>>>>> 1d35f64f5db82ea904f937d2d891c9d8591dbddb
}
</code></pre>

### 抽奖接口

#### URL

[PrefixedUrl] + '/publish/h5act/lottery'

#### params
<pre><code>
{
<<<<<<< HEAD
    mediaCode: __SITECODE__,
    spaceCode: __CHANNELPAGE__,
    adId: document.getElementById('_ADOS_ADID_').value,
    mobile: cookie形式[可以不传值]
=======
	mediaCode: __SITECODE__,
	spaceCode: __CHANNELPAGE__,
	adId: document.getElementById('_ADOS_ADID_').value,
	mobile: cookie形式[可以不传值]
>>>>>>> 1d35f64f5db82ea904f937d2d891c9d8591dbddb
}
</code></pre>

###测试

yarn add

yarn run dev

###发布

yarn run install
