const loadVideo = (ref, type, hock) => {
    const hasVideo = !!(document.createElement('video').canPlayType);
    if (hasVideo) {
        const v = document.createElement('video');
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

};

export { loadVideo };
