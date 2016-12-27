const createInputElement = (id, val, hock = document.getElementsByTagName('body')[0]) => {
    const h = hock;
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', 'hidden');
    input.value = val;
    h.appendChild(input);
};

export { createInputElement };
