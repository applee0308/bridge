var utils = {
    addClass(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },
    hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    isArray(obj) {
    	return Object.prototype.toString.call(obj) === '[object Array]';
    }
};

export { utils };
