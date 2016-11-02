function getScreenInfo() {
    var w = window.screen.width;
    var h = window.screen.height;
    return 'w:' + w + ' h:' + h;
}

export { getScreenInfo };
