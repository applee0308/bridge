function loadImage(ref, type, hock = document.getElementById('_ADOS_')) {
    var i = document.createElement('img');
    i.src = ref;
    i.setAttribute('class', type);
    i.setAttribute('data-ads-type', type);
    hock.appendChild(i);
}

export { loadImage };
