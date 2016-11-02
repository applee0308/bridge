var eventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, hander);
        } else {
            element['on' + type] = handler;
        }
    }
};

export { eventUtil };
