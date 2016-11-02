var screenInfo = {
    getScreenWidth: function() {
        var w = window.screen.width;
        return w;
    },
    getScreenHeight: function() {
        var h = window.screen.height;
        return h;
    }
};

export { screenInfo };
