function getSysInfo() {
    var isWin7, isVista, isWin2003, isWinXp, isWin2000, isWindows, isMac, isAir, isLinux, sys;
    var ua = navigator.userAgent.toLowerCase();
    isWin7 = ua.indexOf("nt 6.1") > -1;
    isVista = ua.indexOf("nt 6.0") > -1;
    isWin2003 = ua.indexOf("nt 5.2") > -1;
    isWinXp = ua.indexOf("nt 5.1") > -1;
    isWin2000 = ua.indexOf("nt 5.0") > -1;
    isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1);
    isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1);
    isAir = (ua.indexOf("adobeair") != -1);
    isLinux = (ua.indexOf("linux") != -1);
    var broser = "";
    if (isWin7) {
        sys = "Windows 7";
    } else if (isVista) {
        sys = "Vista";
    } else if (isWinXp) {
        sys = "Windows xp";
    } else if (isWin2003) {
        sys = "Windows 2003";
    } else if (isWin2000) {
        sys = "Windows 2000";
    } else if (isWindows) {
        sys = "Windows";
    } else if (isMac) {
        sys = "Macintosh";
    } else if (isAir) {
        sys = "Adobeair";
    } else if (isLinux) {
        sys = "Linux";
    } else {
        sys = "Unknow";
    }
    return sys;
}

export default getSysInfo;
