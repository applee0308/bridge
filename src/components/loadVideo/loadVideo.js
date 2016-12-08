function loadVideo(ref, type, hock = document.getElementById('_ADOS_')) {
    var hasVideo = !!(document.createElement('video').canPlayType);
    if (hasVideo) {
        var v = document.createElement('video');
        v.src = ref;
        v.setAttribute('class', type);
        v.setAttribute('data-ads-type', type);
        v.setAttribute('controls', 'controls');
        v.setAttribute('preload', 'preload');
        v.setAttribute('muted', true);
        v.setAttribute('playsinline', true);
        v.setAttribute('autoplay', 'autoplay');
        hock.appendChild(v);
    } else {
        alert('您的浏览器不支持在线视频播放功能！');
    }

}

export { loadVideo };
