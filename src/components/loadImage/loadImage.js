const loadImage = (ref,type,hock) => {
	const i = document.createElement('img');
	i.src = ref;
	i.setAttribute('class', type);
	i.setAttribute('data-ads-type', type);
	hock.appendChild(i);
};

export { loadImage };


// function loadImage(ref, type, hock) {
//     var i = document.createElement('img');
//     i.src = ref;
//     i.setAttribute('class', type);
//     i.setAttribute('data-ads-type', type);
//     hock.appendChild(i);
// }

// export { loadImage };
