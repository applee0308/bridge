function imageBeacon(src, type) {
	// var beacon = document.createElement('img');
    var beacon = new Image(1, 1);
    beacon.style.display = 'none';
    beacon.setAttribute('data-type-info', type);
    beacon.src = src;
    var b = document.getElementsByTagName('body')[0];
    b.appendChild(beacon);
}

export { imageBeacon };
