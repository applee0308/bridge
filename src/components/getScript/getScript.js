const getScript = (url, hock, callback) => {
    const h = hock;
    const script = document.createElement("script");
    script.src = url;
    let done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
        }
    };
    h.appendChild(script);
};

export { getScript };
