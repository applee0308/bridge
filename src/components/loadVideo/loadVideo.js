function loadVideo(ref, type, hock = document.getElementById('_ADOS_')) {
    var v = document.createElement('video');
    v.src = ref;
    v.setAttribute('class', type);
    v.setAttribute('data-ads-type', type);
    v.setAttribute('controls', 'controls');
    v.setAttribute('preload', 'preload');
    hock.appendChild(v);
}

export { loadVideo };
