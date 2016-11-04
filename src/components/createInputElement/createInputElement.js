function createInputElement(id, val, hock = document.getElementsByTagName('body')[0]) {
    var h = hock;
    var input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', 'hidden');
    input.value = val;
    h.appendChild(input);
}

export { createInputElement };
