const loadImage = (ref, type, id, hock) => {
    const i = document.createElement('img');
    i.src = ref;
    i.setAttribute('id', type);
    i.setAttribute('class', type);
    i.setAttribute('data-ads-id', id);
    hock.appendChild(i);
};

export { loadImage };
