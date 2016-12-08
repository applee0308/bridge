var utils = {
    addClass: function(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },
    hasClass: function(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
};

export { utils };
