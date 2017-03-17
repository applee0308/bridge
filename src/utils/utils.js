var utils = {
  /**
   * [addClass Give a el a className]
   * @param {[dom el]} obj [Target Element]
   * @param {[str]} cls [Class name]
   */
  addClass: function(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
  },
  /**
   * [hasClass el has a classname ?]
   * @param  {[dom el]}  obj [Target element]
   * @param  {[str]}  cls [Class name]
   * @return {Boolean}     [description]
   */
  hasClass: function(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  /**
   * [addHandler Event handler]
   * @param {[dom el]} element [Event target]
   * @param {[str]} type    [Event type]
   * @param {[func]} handler [callback]
   */
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

export { utils };
