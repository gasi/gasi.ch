// Description: String extensions

// Takes a string, convert first character of each word
// to uppercase, remaining text of word to lowercase
//
String.prototype.titleize = function(){
	var a = this.split(/\s+/g);
	var p = /(\w)(\w*)/;
    for (i=0;i<a.length;i ++) {
        var parts = a[i].match(p);
        var first = parts[1].toUpperCase();
        var rest  = parts[2].toLowerCase();
        a[i] = first + rest;
    }
	return a.join(' ');
}

NYTD = window.NYTD || {};

// PUBLISHER/OBSERVER
NYTD.EventPublisher = Class.create({

  initialize: function(){
    this.observers = [];
  },

  register: function(observer) {
    this.observers.push(observer);
  },

  unregister: function(observer) {
    this.observers = this.observers.without(observer);
  },

  notifyObservers: function(event,data) {
    for (var i = 0, observers = this.observers; i < observers.length; i++) {
      observers[i].update({event:event,data:data})
    };
  }
})/*
*    script.aculo.us resizable-1.1.js, Sat Dec 22th 2007
*
*    Orginal: http://script.aculo.us/
*
*    Scriptaculous extension 2007 "Vasil Popovski" => vas_popovski@hotmail.com
*    Extension based on Scriptaculous dragdrop.js by Thomas Fuchs
*
*  This extenssion is freely distributable under the terms of an MIT-style license.
*/

var Resizables = {
  resizers: [],
  observers: [],

  register: function(resizable) {
    if(this.resizers.length == 0) {
      this.eventMouseUp   = this.endResize.bindAsEventListener(this);
      this.eventMouseMove = this.updateResize.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);

      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.resizers.push(resizable);
  },

  unregister: function(resizable) {
    this.resizers = this.resizers.reject(function(r) { return r==resizable });
    if(this.resizers.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },

  activate: function(resizable) {
    if(resizable.options.delay) {
      this._timeout = setTimeout(function() {
        Resizables._timeout = null;
        window.focus();
        Resizables.activeResizable = resizable;
      }.bind(this), resizable.options.delay);
    } else {
      window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
      this.activeResizable = resizable;
    }
  },
  deactivate: function() {
    this.activeResizable = null;
  },
  updateResize: function(event) {
    if(!this.activeResizable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
     if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;
    this.activeResizable.updateResize(event, pointer);
  },
  endResize: function(event) {
    if(this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    if(!this.activeResizable) return;
    this._lastPointer = null;
    this.activeResizable.endResize(event);
    this.activeResizable = null;
  },

  keyPress: function(event) {
    if(this.activeResizable)
      this.activeResizable.keyPress(event);
  },

  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },

  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element });
    this._cacheObserverCallbacks();
  },

  notify: function(eventName, resizable, event) {  // 'onStart', 'onEnd', 'onDrag'
    if(this[eventName+'Count'] > 0)
      this.observers.each( function(o) {
        if(o[eventName]) o[eventName](eventName, resizable, event);
      });
    if(resizable.options[eventName]) resizable.options[eventName](resizable, event);
  },

  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onResize'].each( function(eventName) {
      Resizables[eventName+'Count'] = Resizables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
}

var Resizable = Class.create();
Resizable._resizing    = {};

Resizable.prototype = {
  initialize: function(element) {
    var defaults = {
      handle: false,

      endeffect: function(element) {
        var toOpacity = typeof element._opacity == 'number' ? element._opacity : 1.0;
        new Effect.Opacity(element, {duration:0.2, from:0.7, to:toOpacity,
          queue: {scope:'_resizable', position:'end'},
          afterFinish: function(){
            Resizable._resizing[element] = false
          }
        });
      },
      zindex: 1000,
      revert: false,
      snap: false,  // false, or xy or [x,y] or function(x,y){ return [x,y] }
      delay: 0
    };

    if(!arguments[1] || typeof arguments[1].endeffect == 'undefined')
      Object.extend(defaults, {
        starteffect: function(element) {
          element._opacity = Element.getOpacity(element);
          Resizable._resizing[element] = true;
          new Effect.Opacity(element, {duration:0.2, from:element._opacity, to:0.7});
        }
      });

    var options = Object.extend(defaults, arguments[1] || {});
    this.element = $(element);

    if(options.handle && (typeof options.handle == 'string'))
      this.handle = this.element.down('.'+options.handle, 0);

    if(!this.handle) this.handle = $(options.handle);
    if(!this.handle) this.handle = this.element;

    Element.makePositioned(this.element); // fix IE
    this.delta    = this.currentDelta();
    this.options  = options;
    this.resizing = false;

    this.eventMouseDown = this.initResize.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);

    Resizables.register(this);
  },
   reverteffect: function(element, horizontal, vertical) {
       var horiz = this._edim[0] - horizontal;
        var vert = this._edim[1] - vertical;
        new Effect.ReSize(element, {direction:'vert', amount:vert});
        new Effect.ReSize(element, {direction:'horizontal', amount:horiz});
    },

  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Resizables.unregister(this);
  },

  currentDelta: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },
  initResize: function(event) {
    if(typeof Resizable._resizing[this.element] != 'undefined' &&
      Resizable._resizing[this.element]) return;
    if(Event.isLeftClick(event)) {
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if((tag_name = src.tagName.toUpperCase()) && (
        tag_name=='INPUT' ||
        tag_name=='SELECT' ||
        tag_name=='OPTION' ||
        tag_name=='BUTTON' ||
        tag_name=='TEXTAREA')) return;

      var pointer = [Event.pointerX(event), Event.pointerY(event)];
          this._initialX = pointer[0];
          this._initialY = pointer[1];
          var dim = Element.getDimensions(this.element);

          this._edim = [dim.width,dim.height];
          this._min = [1,1];
          this._max = [0,0];
      var pos = Position.cumulativeOffset(this.element);
      this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });

        if(this.options.preserveRatio){
            this._ratio = dim.width / dim.height;
        }

        if(this.options.bind == true || this.options.flip){
            this._parentDim = Element.getDimensions(this.element.parentNode);
            this._cop = Position.cumulativeOffset(this.element.parentNode);
            this._coe = Position.cumulativeOffset(this.element);
                    this.elementOffset = [this._coe[0]-this._cop[0], this._coe[1]-this._cop[1]];
            if(this.options.flip){
                var margins = [parseInt(Element.getStyle(this.element, 'margin-left')) || "0",
                               parseInt(Element.getStyle(this.element,'margin-top')) || "0"];

                this.element.setStyle({overflow:'hidden'});
                this._mc = [(this._edim[0]-(this._initialX-(this._coe[0]))),
                            (this._edim[1]-(this._initialY-(this._coe[1])))];
                this._inf = Position.positionedOffset(this.element);
                //ie fix:
                this._inf[0] -= this.element.parentNode != document.body ? this._cop[0] : 0;
                this._inf[1] -= this.element.parentNode != document.body ? this._cop[1] : 0;
            }
        }
        if(this.options.min){
            if(this.options.min instanceof Array){
                this._min = this._min.map(function(v,i){return (this.options.min[i] > 0 ? this.options.min[i] : 1);}.bind(this));
            }
            else
                this._min = this._min.map(function(v,i){return (this.options.min > 0 ? this.options.min : 1);}.bind(this));
        }
        if(this.options.max){
            if(this.options.max instanceof Array){
                this._max = this._max.map(function(v,i){ return (this.options.max[i] >= this._min[i]) ? this.options.max[i] : 0; }.bind(this));
            }
            else
                this._max = this._max.map(function(v,i){ return (this.options.max >= this._min[i]) ? this.options.max : 0; }.bind(this));
        }

      Resizables.activate(this);
      Event.stop(event);
    }
  },

  startResize: function(event) {
    this.resizing = true;
    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }
    if(this.options.ghosting) {
      // If element has margin-left/right/top/bottom set all sort of problems occurs regarding the elements starting position
      // and final position especially in IE (more problems when also snap and ghosting are initiated together)
      // (similar happens in Draggable - might need fixing there as well??)
      // next few lines SOLVE the problem (works for every combination: position:absolute+offset || relative+margins etc.)
      this._clone = this.element.cloneNode(true);
      this.element.parentNode.insertBefore(this._clone, this.element);
      var style = this._clone.style;
      Position.absolutize(this._clone);
      // partial IE margin fix (if another element is below it in IE it looses its position i.e. offset on bottom is reset)
      if(navigator.appName.indexOf('Microsoft') != -1 && parseInt(Element.getStyle(this.element, 'margin-top')) > 0){
         this.element.style.top = style.marginTop;
      }
      //
      style.margin = '0px';
    }
    Resizables.notify('onStart', this, event);

    if(this.options.starteffect) this.options.starteffect(this.element);
  },
  updateResize: function(event, pointer) {
   if(!this.resizing) this.startResize(event);

    Resizables.notify('onResize', this, event);
    this.draw(pointer);
    if(this.options.change) this.options.change(this);

    Event.stop(event);
  },

  finishResize: function(event, success) {
    this.resizing = false;
    if(this.options.ghosting) {
      if(navigator.appName.indexOf('Microsoft') != -1 && parseInt(Element.getStyle(this.element, 'margin-top')) > 0)
          this.element.style.top = this._clone.style.marginTop;
      Element.remove(this._clone);
      this._clone = null;
    }
    Resizables.notify('onEnd', this, event);
    var revert = this.options.revert;
    if(revert && typeof revert == 'function') revert = revert(this.element);

    if(revert && this.reverteffect) {
        var dim = Element.getDimensions(this.element);
        this.reverteffect(this.element, dim.width, dim.height);//d[1]-this.delta[1], d[0]-this.delta[0]
    }
    if(this.options.zindex)
      this.element.style.zIndex = this.originalZ;

    if(this.options.endeffect)
      this.options.endeffect(this.element);

    Resizables.deactivate(this);
  },

  keyPress: function(event) {
    if(event.keyCode!=Event.KEY_ESC) return;
    this.finishResize(event, false);
    Event.stop(event);
  },

  endResize: function(event) {
    if(!this.resizing) return;
    this.finishResize(event, true);
    Event.stop(event);
  },

  draw: function(point) {
      var pos = Position.cumulativeOffset(this.element);
    var d = this.currentDelta();
            pos[0] -= d[0];
            pos[1] -= d[1];

        var p = [0,1].map(function(i){
          return (point[i]-pos[i]-this.offset[i])
        }.bind(this));

    var l_width = p[0] + this._edim[0] - d[0];
    var l_height = p[1] + this._edim[1] - d[1];

    p[0] = (l_width > this._min[0]) ? l_width : this._min[0];
    p[1] = (l_height > this._min[1]) ? l_height : this._min[1];

    if(this.options.snap) {
        if(typeof this.options.snap == 'function') {
            p = this.options.snap(p[0],p[1],this);
          }
          else {
          if(this.options.snap instanceof Array) {
            p = p.map( function(v, i) {
            // IF Javascript alert activated in IE throws error if one of the snap values is 0 : [20,0]
            // or if this map functions returns 0 for i-th element
            // Same happens in Draggable (needs to be patched??)
            var dim = Math.round(v/this.options.snap[i])*this.options.snap[i];
            return (this.options.snap[i] > 0) ? ((dim > this._min[i]) ? dim : this._min[i]) : this._edim[i];
            }.bind(this))
          }
          else {
            p = p.map( function(v,i) {
            var dim = Math.round(v/this.options.snap)*this.options.snap-d[i];
            return (this.options.snap > 0) ? ((dim > this._min[i]) ? dim : this._min[i]) : this._edim[i] }.bind(this))
          }
        }
    }

    if(this.options.bind){
        if(this._parentDim.width <= p[0]+this.elementOffset[0])
            p[0] = this._parentDim.width - this.elementOffset[0] - 2;
        if(this._parentDim.height <= p[1]+this.elementOffset[1])
            p[1] = this._parentDim.height - this.elementOffset[1] - 2;
    }

    if(this.options.min){
        p[0] = p[0] > this._min[0] ? p[0] : this._min[0];
        p[1] = p[1] > this._min[1] ? p[1] : this._min[1];
    }
    if(this.options.max){
        p[0] = p[0] < this._max[0] ? p[0] : (this._max[0] > 0 ? this._max[0] : p[0]);
        p[1] = p[1] < this._max[1] ? p[1] : (this._max[1] > 0 ? this._max[1] : p[1]);
    }

    var style = this.element.style;
    if(this.options.flip){
        var r1 = (point[0]+this._mc[0]);
        var r2 = (point[1]+this._mc[1]);
        if(r1 <= this._coe[0]){
            style.left = r1-this._cop[0]+"px";//this._mc[0]
            p[0] = this._coe[0] - this.element.offsetLeft;
        }
        else
            style.left = this._inf[0]+'px';
        if(r2 <= this._coe[1]){
            style.top = r2-this._cop[1]+"px";//this._mc[0]
            p[1] = this._coe[1] - this.element.offsetTop;
        }
        else
            style.top = this._inf[1]+'px';
    }

    if(this.options.preserveRatio){
        p[0] = this._ratio * p[1];
    }

    if((!this.options.constraint) || (this.options.constraint=='horizontal')){
        style.width = p[0]+"px";
    }
    if((!this.options.constraint) || (this.options.constraint=='vertical')){
         style.height = p[1]+"px";
    }
    if(style.visibility=="hidden") style.visibility = ""; // fix gecko rendering
  }
}

// script.aculo.us EffectResize.js

// Copyright(c) 2007 - Frost Innovation AS, http://ajaxwidgets.com
//
// EffectResize.js is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

/* Helper Effect for resizing elements...
 */
Effect.ReSize = Class.create();
Object.extend(Object.extend(Effect.ReSize.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = element;
    if(!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ amount: 100, direction: 'vert', toSize:null }, arguments[1] || {});
    if( options.direction == 'vert' )
      this.originalSize = options.originalSize || parseInt(this.element.style.height);
    else
      this.originalSize = options.originalSize || parseInt(this.element.style.width);

    if( options.toSize != null )
      options.amount = options.toSize - this.originalSize;

    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if(this.element.getStyle('display')=='none') { this.cancel(); return; }
  },
  update: function(position) {
    if( this.options.direction == 'vert' ){
      this.element.setStyle({height: this.originalSize+(this.options.amount*position)+'px'});
    } else {
      this.element.setStyle({width: this.originalSize+(this.options.amount*position)+'px'});
    }
  },
  finish: function(){
    if( this.options.direction == 'vert' ){
      this.element.setStyle({height: this.originalSize+this.options.amount+'px'});
    } else {
      this.element.setStyle({width: this.originalSize+this.options.amount+'px'});
    }
  }
});/*  FROM Prototype-UI
*
*  Prototype-UI is freely distributable under the terms of an MIT-style license.
*  For details, see the PrototypeUI web site: http://www.prototype-ui.com/
*
*--------------------------------------------------------------------------*/

if (Prototype.Browser.IE) {
  Prototype.Browser.IEVersion = parseFloat(navigator.appVersion.split(';')[1].strip().split(' ')[1]);
  Prototype.Browser.IE6 =  Prototype.Browser.IEVersion == 6;
  Prototype.Browser.IE7 =  Prototype.Browser.IEVersion == 7;
}

Element.addMethods({
  getScrollDimensions: function(element) {
    return {
      width:  element.scrollWidth,
      height: element.scrollHeight
    }
  },

  getScrollOffset: function(element) {
    return Element._returnOffset(element.scrollLeft, element.scrollTop);
  },

  setScrollOffset: function(element, offset) {
    element = $(element);
    if (arguments.length == 3)
    offset = { left: offset, top: arguments[2] };
    element.scrollLeft = offset.left;
    element.scrollTop  = offset.top;
    return element;
  },

  // returns "clean" numerical style (without "px") or null if style can not be resolved
  // or is not numeric
  getNumStyle: function(element, style) {
    var value = parseFloat($(element).getStyle(style));
    return isNaN(value) ? null : value;
  },

  // by Tobie Langel (http://tobielangel.com/2007/5/22/prototype-quick-tip)
  appendText: function(element, text) {
    element = $(element);
    text = String.interpret(text);
    element.appendChild(document.createTextNode(text));
    return element;
  }
});

Shadow = Class.create({


  /*
    Method: initialize
      Constructor, adds shadow elements to the DOM if element is in the DOM.
      Element MUST BE in ABSOLUTE position.

    Parameters:
      element - DOM element
      options - Hashmap of options
        - theme (default: mac_shadow)
        - focus (default: true)
        - zIndex (default: 100)

    Returns:
      this
  */
  initialize: function(element, options) {
    this.options = Object.extend({
      theme: "drop_shadow",
      focus: false,
      zIndex: 100
    }, options)
    this.element = $(element);
    this.create();
    if (Object.isElement(this.element.parentNode))
      this.render();
  },

  /*
    Method: destroy
      Destructor, removes elements from the DOM
  */
  destroy: function() {
    if (this.shadow.parentNode)
      this.remove();
  },

  // Group: Size and Position
  /*
    Method: setPosition
      Sets top/left shadow position in pixels

    Parameters:
      top -  top position in pixel
      left - left position in pixel

    Returns:
      this
  */
  setPosition: function(top, left) {
    if (this.shadowSize) {
      var shadowStyle = this.shadow.style;

      shadowStyle.top  = parseInt(top)  - this.shadowSize.top  + this.shadowShift.top + 'px';
      shadowStyle.left = parseInt(left) - this.shadowSize.left + this.shadowShift.left+ 'px';
    }
    return this;
  },

  /*
    Method: setSize
      Sets width/height shadow in pixels

    Parameters:
      width  - width in pixel
      height - height in pixel

    Returns:
      this
  */
  setSize: function(width, height) {
    if (this.shadowSize) {
      var w = parseInt(width) + this.shadowSize.width - this.shadowShift.width + "px";
      this.shadow.style.width = w;
      var h =  parseInt(height) - this.shadowShift.height + "px";

      // this.shadowContents[1].style.height = h;
      this.shadowContents[1].childElements().each(function(e) {e.style.height = h});
      this.shadowContents.each(function(item){ item.style.width = w});
    }
    return this;
  },

  /*
    Method: setBounds
      Sets shadow bounds in pixels

    Parameters:
      bounds - an Hash {top:, left:, width:, height:}

    Returns:
      this
  */
  setBounds: function(bounds) {
    return this.setPosition(bounds.top, bounds.left).setSize(bounds.width, bounds.height);
  },

  /*
    Method: setZIndex
      Sets shadow z-index

    Parameters:
      zIndex - zIndex value

    Returns:
      this
  */
  setZIndex: function(zIndex) {
    this.shadow.style.zIndex = zIndex;
    return this;
  },

   // Group: Render
  /*
    Method: show
      Displays shadow

    Returns:
      this
  */
  show: function() {
   this.shadow.show();
   return this;
  },

  /*
    Method: hide
      Hides shadow

    Returns:
      this
  */
  hide: function() {
    this.shadow.hide();
    return this;
  },

  /*
    Method: remove
      Removes shadow from the DOM

    Returns:
      this
  */
  remove: function() {
    this.shadow.remove();
    return this;
  },

  // Group: Status
  /*
    Method: focus
      Focus shadow.

      Change shadow shift. Shift values are set in CSS file as margin and padding of shadow_container
      to add visual information of shadow status.

    Returns:
      this
  */
  focus: function() {
    this.options.focus = true;
    this.updateShadow();
    return this;
  },

  /*
    Method: blur
      Blurs shadow.

      Change shadow shift. Shift values are set in CSS file as margin and padding of shadow_container
      to add visual information of shadow status.

    Returns:
      this
  */
  blur: function() {
    this.options.focus = false;
    this.updateShadow();
    return this;
  },

  // Private Functions
  // Adds shadow elements to DOM, computes shadow size and displays it
  render: function() {
    if (this.element.parentNode && !Object.isElement(this.shadow.parentNode)) {
      this.element.parentNode.appendChild(this.shadow);
      this.computeSize();
      this.setBounds(Object.extend(this.element.getDimensions(), this.getElementPosition()));
      this.shadow.show();
    }
    return this;
  },

  // Creates HTML elements without inserting them into the DOM
  create: function() {
    var zIndex = this.element.getStyle('zIndex');
    if (!zIndex)
      this.element.setStyle({zIndex: this.options.zIndex});
    zIndex = (zIndex || this.options.zIndex) - 1;

    this.shadowContents = new Array(3);
    this.shadowContents[0] = new Element("div")
      .insert(new Element("div", {className: "shadow_center_wrapper"}).insert(new Element("div", {className: "n_shadow"})))
      .insert(new Element("div", {className: "shadow_right ne_shadow"}))
      .insert(new Element("div", {className: "shadow_left nw_shadow"}));

    this.shadowContents[1] = new Element("div")
      .insert(new Element("div", {className: "shadow_center_wrapper c_shadow"}))
      .insert(new Element("div", {className: "shadow_right e_shadow"}))
      .insert(new Element("div", {className: "shadow_left w_shadow"}));
    this.centerElements = this.shadowContents[1].childElements();

    this.shadowContents[2] = new Element("div")
      .insert(new Element("div", {className: "shadow_center_wrapper"}).insert(new Element("div", {className: "s_shadow"})))
      .insert(new Element("div", {className: "shadow_right se_shadow"}))
      .insert(new Element("div", {className: "shadow_left sw_shadow"}));

    this.shadow = new Element("div", {className: "shadow_container " + this.options.theme,
                                      style: "position:absolute; top:-10000px; left:-10000px; display:none; z-index:" + zIndex })
      .insert(this.shadowContents[0])
      .insert(this.shadowContents[1])
      .insert(this.shadowContents[2]);
  },

  // Compute shadow size
  computeSize: function() {
    if (this.focusedShadowShift)
      return;
    this.shadow.show();

    // Trick to get shadow shift designed in CSS as padding
    var content = this.shadowContents[1].select("div.c_shadow").first();
    this.unfocusedShadowShift = {};
    this.focusedShadowShift = {};

    $w("top left bottom right").each(function(pos) {this.unfocusedShadowShift[pos] = content.getNumStyle("padding-" + pos) || 0}.bind(this));
    this.unfocusedShadowShift.width  = this.unfocusedShadowShift.left + this.unfocusedShadowShift.right;
    this.unfocusedShadowShift.height = this.unfocusedShadowShift.top + this.unfocusedShadowShift.bottom;

    $w("top left bottom right").each(function(pos) {this.focusedShadowShift[pos] = content.getNumStyle("margin-" + pos) || 0}.bind(this));
    this.focusedShadowShift.width  = this.focusedShadowShift.left + this.focusedShadowShift.right;
    this.focusedShadowShift.height = this.focusedShadowShift.top + this.focusedShadowShift.bottom;

    this.shadowShift = this.options.focus ? this.focusedShadowShift : this.unfocusedShadowShift;

    // Get shadow size
    this.shadowSize  = {top:    this.shadowContents[0].childElements()[1].getNumStyle("height"),
                        left:   this.shadowContents[0].childElements()[1].getNumStyle("width"),
                        bottom: this.shadowContents[2].childElements()[1].getNumStyle("height"),
                        right:  this.shadowContents[0].childElements()[2].getNumStyle("width")};

    this.shadowSize.width  = this.shadowSize.left + this.shadowSize.right;
    this.shadowSize.height = this.shadowSize.top + this.shadowSize.bottom;

    // Remove padding
    content.setStyle("padding:0; margin:0");
    this.shadow.hide();
  },

  // Update shadow size (called when it changes from focused to blur and vice-versa)
  updateShadow: function() {
    this.shadowShift = this.options.focus ? this.focusedShadowShift : this.unfocusedShadowShift;
    var shadowStyle = this.shadow.style, pos  = this.getElementPosition(), size = this.element.getDimensions();

    shadowStyle.top  =  pos.top    - this.shadowSize.top   + this.shadowShift.top   + 'px';
    shadowStyle.left  = pos.left   - this.shadowSize.left  + this.shadowShift.left  + 'px';
    shadowStyle.width = size.width + this.shadowSize.width - this.shadowShift.width + "px";
    var h = size.height - this.shadowShift.height + "px";
    this.centerElements.each(function(e) {e.style.height = h});

    var w = size.width + this.shadowSize.width - this.shadowShift.width+ "px";
    this.shadowContents.each(function(item) { item.style.width = w });
  },

  // Get element position in integer values
  getElementPosition: function() {
    return {top: this.element.getNumStyle("top"), left: this.element.getNumStyle("left")}
  }
});/**
 * Copyright (c) 2006, David Spurr (http://www.defusion.org.uk/)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     * Neither the name of the David Spurr nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * http://www.opensource.org/licenses/bsd-license.php
 *
 * See scriptaculous.js for full scriptaculous licence
 */

var CropDraggable=Class.create();
Object.extend(Object.extend(CropDraggable.prototype,Draggable.prototype),{initialize:function(_1){
this.options=Object.extend({drawMethod:function(){
}},arguments[1]||{});
this.element=$(_1);
this.handle=this.element;
this.delta=this.currentDelta();
this.dragging=false;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.handle,"mousedown",this.eventMouseDown);
Draggables.register(this);
},draw:function(_2){
var _3=Position.cumulativeOffset(this.element);
var d=this.currentDelta();
_3[0]-=d[0];
_3[1]-=d[1];
var p=[0,1].map(function(i){
return (_2[i]-_3[i]-this.offset[i]);
}.bind(this));
this.options.drawMethod(p);
}});
var Cropper={};
Cropper.Img=Class.create();
Cropper.Img.prototype={initialize:function(_7,_8){
this.options=Object.extend({ratioDim:{x:0,y:0},minWidth:0,minHeight:0,displayOnInit:false,onEndCrop:Prototype.emptyFunction,captureKeys:true,onloadCoords:null,maxWidth:0,maxHeight:0},_8||{});
this.img=$(_7);
this.clickCoords={x:0,y:0};
this.dragging=false;
this.resizing=false;
this.isWebKit=/Konqueror|Safari|KHTML/.test(navigator.userAgent);
this.isIE=/MSIE/.test(navigator.userAgent);
this.isOpera8=/Opera\s[1-8]/.test(navigator.userAgent);
this.ratioX=0;
this.ratioY=0;
this.attached=false;
this.fixedWidth=(this.options.maxWidth>0&&(this.options.minWidth>=this.options.maxWidth));
this.fixedHeight=(this.options.maxHeight>0&&(this.options.minHeight>=this.options.maxHeight));
if(typeof this.img=="undefined"){
return;
}
if(this.options.ratioDim.x>0&&this.options.ratioDim.y>0){
var _c=this.getGCD(this.options.ratioDim.x,this.options.ratioDim.y);
this.ratioX=this.options.ratioDim.x/_c;
this.ratioY=this.options.ratioDim.y/_c;
}
this.subInitialize();
if(this.img.complete){
this.onLoad();
}else{
Event.observe(this.img,"load",this.onLoad.bindAsEventListener(this));
}
},getGCD:function(a,b){
if(b==0){
return a;
}
return this.getGCD(b,a%b);
},onLoad:function(){
var _f="imgCrop_";
var _10=this.img.parentNode;
var _11="";
if(this.isOpera8){
_11=" opera8";
}
this.imgWrap=Builder.node("div",{"class":_f+"wrap"+_11});
this.north=Builder.node("div",{"class":_f+"overlay "+_f+"north"},[Builder.node("span")]);
this.east=Builder.node("div",{"class":_f+"overlay "+_f+"east"},[Builder.node("span")]);
this.south=Builder.node("div",{"class":_f+"overlay "+_f+"south"},[Builder.node("span")]);
this.west=Builder.node("div",{"class":_f+"overlay "+_f+"west"},[Builder.node("span")]);
var _12=[this.north,this.east,this.south,this.west];
this.dragArea=Builder.node("div",{"class":_f+"dragArea"},_12);
this.handleN=Builder.node("div",{"class":_f+"handle "+_f+"handleN"});
this.handleNE=Builder.node("div",{"class":_f+"handle "+_f+"handleNE"});
this.handleE=Builder.node("div",{"class":_f+"handle "+_f+"handleE"});
this.handleSE=Builder.node("div",{"class":_f+"handle "+_f+"handleSE"});
this.handleS=Builder.node("div",{"class":_f+"handle "+_f+"handleS"});
this.handleSW=Builder.node("div",{"class":_f+"handle "+_f+"handleSW"});
this.handleW=Builder.node("div",{"class":_f+"handle "+_f+"handleW"});
this.handleNW=Builder.node("div",{"class":_f+"handle "+_f+"handleNW"});
this.selArea=Builder.node("div",{"class":_f+"selArea"},[Builder.node("div",{"class":_f+"marqueeHoriz "+_f+"marqueeNorth"},[Builder.node("span")]),Builder.node("div",{"class":_f+"marqueeVert "+_f+"marqueeEast"},[Builder.node("span")]),Builder.node("div",{"class":_f+"marqueeHoriz "+_f+"marqueeSouth"},[Builder.node("span")]),Builder.node("div",{"class":_f+"marqueeVert "+_f+"marqueeWest"},[Builder.node("span")]),this.handleN,this.handleNE,this.handleE,this.handleSE,this.handleS,this.handleSW,this.handleW,this.handleNW,Builder.node("div",{"class":_f+"clickArea"})]);
this.imgWrap.appendChild(this.img);
this.imgWrap.appendChild(this.dragArea);
this.dragArea.appendChild(this.selArea);
this.dragArea.appendChild(Builder.node("div",{"class":_f+"clickArea"}));
_10.appendChild(this.imgWrap);
this.startDragBind=this.startDrag.bindAsEventListener(this);
Event.observe(this.dragArea,"mousedown",this.startDragBind);
this.onDragBind=this.onDrag.bindAsEventListener(this);
Event.observe(document,"mousemove",this.onDragBind);
this.endCropBind=this.endCrop.bindAsEventListener(this);
Event.observe(document,"mouseup",this.endCropBind);
this.resizeBind=this.startResize.bindAsEventListener(this);
this.handles=[this.handleN,this.handleNE,this.handleE,this.handleSE,this.handleS,this.handleSW,this.handleW,this.handleNW];
this.registerHandles(true);
if(this.options.captureKeys){
this.keysBind=this.handleKeys.bindAsEventListener(this);
Event.observe(document,"keypress",this.keysBind);
}
new CropDraggable(this.selArea,{drawMethod:this.moveArea.bindAsEventListener(this)});
this.setParams();
},registerHandles:function(_13){
for(var i=0;i<this.handles.length;i++){
var _15=$(this.handles[i]);
if(_13){
var _16=false;
if(this.fixedWidth&&this.fixedHeight){
_16=true;
}else{
if(this.fixedWidth||this.fixedHeight){
var _17=_15.className.match(/([S|N][E|W])$/);
var _18=_15.className.match(/(E|W)$/);
var _19=_15.className.match(/(N|S)$/);
if(_17){
_16=true;
}else{
if(this.fixedWidth&&_18){
_16=true;
}else{
if(this.fixedHeight&&_19){
_16=true;
}
}
}
}
}
if(_16){
_15.hide();
}else{
Event.observe(_15,"mousedown",this.resizeBind);
}
}else{
_15.show();
Event.stopObserving(_15,"mousedown",this.resizeBind);
}
}
},setParams:function(){
this.imgW=this.img.width;
this.imgH=this.img.height;
$(this.north).setStyle({height:0});
$(this.east).setStyle({width:0,height:0});
$(this.south).setStyle({height:0});
$(this.west).setStyle({width:0,height:0});
$(this.imgWrap).setStyle({"width":this.imgW+"px","height":this.imgH+"px"});
$(this.selArea).hide();
var _1a={x1:0,y1:0,x2:0,y2:0};
var _1b=false;
if(this.options.onloadCoords!=null){
_1a=this.cloneCoords(this.options.onloadCoords);
_1b=true;
}else{
if(this.options.ratioDim.x>0&&this.options.ratioDim.y>0){
_1a.x1=Math.ceil((this.imgW-this.options.ratioDim.x)/2);
_1a.y1=Math.ceil((this.imgH-this.options.ratioDim.y)/2);
_1a.x2=_1a.x1+this.options.ratioDim.x;
_1a.y2=_1a.y1+this.options.ratioDim.y;
_1b=true;
}
}
this.setAreaCoords(_1a,false,false,1);
if(this.options.displayOnInit&&_1b){
this.selArea.show();
this.drawArea();
this.endCrop();
}
this.attached=true;
},remove:function(){
if(this.attached){
this.attached=false;
this.imgWrap.parentNode.insertBefore(this.img,this.imgWrap);
this.imgWrap.parentNode.removeChild(this.imgWrap);
Event.stopObserving(this.dragArea,"mousedown",this.startDragBind);
Event.stopObserving(document,"mousemove",this.onDragBind);
Event.stopObserving(document,"mouseup",this.endCropBind);
this.registerHandles(false);
if(this.options.captureKeys){
Event.stopObserving(document,"keypress",this.keysBind);
}
}
},reset:function(){
if(!this.attached){
this.onLoad();
}else{
this.setParams();
}
this.endCrop();
},handleKeys:function(e){
var dir={x:0,y:0};
if(!this.dragging){
switch(e.keyCode){
case (37):
dir.x=-1;
break;
case (38):
dir.y=-1;
break;
case (39):
dir.x=1;
break;
case (40):
dir.y=1;
break;
}
if(dir.x!=0||dir.y!=0){
if(e.shiftKey){
dir.x*=10;
dir.y*=10;
}
this.moveArea([this.areaCoords.x1+dir.x,this.areaCoords.y1+dir.y]);
Event.stop(e);
}
}
},calcW:function(){
return (this.areaCoords.x2-this.areaCoords.x1);
},calcH:function(){
return (this.areaCoords.y2-this.areaCoords.y1);
},moveArea:function(_1e){
this.setAreaCoords({x1:_1e[0],y1:_1e[1],x2:_1e[0]+this.calcW(),y2:_1e[1]+this.calcH()},true,false);
this.drawArea();
},cloneCoords:function(_1f){
return {x1:_1f.x1,y1:_1f.y1,x2:_1f.x2,y2:_1f.y2};
},setAreaCoords:function(_20,_21,_22,_23,_24){
if(_21){
var _25=_20.x2-_20.x1;
var _26=_20.y2-_20.y1;
if(_20.x1<0){
_20.x1=0;
_20.x2=_25;
}
if(_20.y1<0){
_20.y1=0;
_20.y2=_26;
}
if(_20.x2>this.imgW){
_20.x2=this.imgW;
_20.x1=this.imgW-_25;
}
if(_20.y2>this.imgH){
_20.y2=this.imgH;
_20.y1=this.imgH-_26;
}
}else{
if(_20.x1<0){
_20.x1=0;
}
if(_20.y1<0){
_20.y1=0;
}
if(_20.x2>this.imgW){
_20.x2=this.imgW;
}
if(_20.y2>this.imgH){
_20.y2=this.imgH;
}
if(_23!=null){
if(this.ratioX>0){
this.applyRatio(_20,{x:this.ratioX,y:this.ratioY},_23,_24);
}else{
if(_22){
this.applyRatio(_20,{x:1,y:1},_23,_24);
}
}
var _27=[this.options.minWidth,this.options.minHeight];
var _28=[this.options.maxWidth,this.options.maxHeight];
if(_27[0]>0||_27[1]>0||_28[0]>0||_28[1]>0){
var _29={a1:_20.x1,a2:_20.x2};
var _2a={a1:_20.y1,a2:_20.y2};
var _2b={min:0,max:this.imgW};
var _2c={min:0,max:this.imgH};
if((_27[0]!=0||_27[1]!=0)&&_22){
if(_27[0]>0){
_27[1]=_27[0];
}else{
if(_27[1]>0){
_27[0]=_27[1];
}
}
}
if((_28[0]!=0||_28[0]!=0)&&_22){
if(_28[0]>0&&_28[0]<=_28[1]){
_28[1]=_28[0];
}else{
if(_28[1]>0&&_28[1]<=_28[0]){
_28[0]=_28[1];
}
}
}
if(_27[0]>0){
this.applyDimRestriction(_29,_27[0],_23.x,_2b,"min");
}
if(_27[1]>1){
this.applyDimRestriction(_2a,_27[1],_23.y,_2c,"min");
}
if(_28[0]>0){
this.applyDimRestriction(_29,_28[0],_23.x,_2b,"max");
}
if(_28[1]>1){
this.applyDimRestriction(_2a,_28[1],_23.y,_2c,"max");
}
_20={x1:_29.a1,y1:_2a.a1,x2:_29.a2,y2:_2a.a2};
}
}
}
this.areaCoords=_20;
},applyDimRestriction:function(_2d,val,_2f,_30,_31){
var _32;
if(_31=="min"){
_32=((_2d.a2-_2d.a1)<val);
}else{
_32=((_2d.a2-_2d.a1)>val);
}
if(_32){
if(_2f==1){
_2d.a2=_2d.a1+val;
}else{
_2d.a1=_2d.a2-val;
}
if(_2d.a1<_30.min){
_2d.a1=_30.min;
_2d.a2=val;
}else{
if(_2d.a2>_30.max){
_2d.a1=_30.max-val;
_2d.a2=_30.max;
}
}
}
},applyRatio:function(_33,_34,_35,_36){
var _37;
if(_36=="N"||_36=="S"){
_37=this.applyRatioToAxis({a1:_33.y1,b1:_33.x1,a2:_33.y2,b2:_33.x2},{a:_34.y,b:_34.x},{a:_35.y,b:_35.x},{min:0,max:this.imgW});
_33.x1=_37.b1;
_33.y1=_37.a1;
_33.x2=_37.b2;
_33.y2=_37.a2;
}else{
_37=this.applyRatioToAxis({a1:_33.x1,b1:_33.y1,a2:_33.x2,b2:_33.y2},{a:_34.x,b:_34.y},{a:_35.x,b:_35.y},{min:0,max:this.imgH});
_33.x1=_37.a1;
_33.y1=_37.b1;
_33.x2=_37.a2;
_33.y2=_37.b2;
}
},applyRatioToAxis:function(_38,_39,_3a,_3b){
var _3c=Object.extend(_38,{});
var _3d=_3c.a2-_3c.a1;
var _3e=Math.floor(_3d*_39.b/_39.a);
var _3f;
var _40;
var _41=null;
if(_3a.b==1){
_3f=_3c.b1+_3e;
if(_3f>_3b.max){
_3f=_3b.max;
_41=_3f-_3c.b1;
}
_3c.b2=_3f;
}else{
_3f=_3c.b2-_3e;
if(_3f<_3b.min){
_3f=_3b.min;
_41=_3f+_3c.b2;
}
_3c.b1=_3f;
}
if(_41!=null){
_40=Math.floor(_41*_39.a/_39.b);
if(_3a.a==1){
_3c.a2=_3c.a1+_40;
}else{
_3c.a1=_3c.a1=_3c.a2-_40;
}
}
return _3c;
},drawArea:function(){
var _42=this.calcW();
var _43=this.calcH();
var px="px";
var _45=[this.areaCoords.x1+px,this.areaCoords.y1+px,_42+px,_43+px,this.areaCoords.x2+px,this.areaCoords.y2+px,(this.img.width-this.areaCoords.x2)+px,(this.img.height-this.areaCoords.y2)+px];
var _46=this.selArea.style;
_46.left=_45[0];
_46.top=_45[1];
_46.width=_45[2];
_46.height=_45[3];
var _47=Math.ceil((_42-6)/2)+px;
var _48=Math.ceil((_43-6)/2)+px;
this.handleN.style.left=_47;
this.handleE.style.top=_48;
this.handleS.style.left=_47;
this.handleW.style.top=_48;
this.north.style.height=_45[1];
var _49=this.east.style;
_49.top=_45[1];
_49.height=_45[3];
_49.left=_45[4];
_49.width=_45[6];
var _4a=this.south.style;
_4a.top=_45[5];
_4a.height=_45[7];
var _4b=this.west.style;
_4b.top=_45[1];
_4b.height=_45[3];
_4b.width=_45[0];
this.subDrawArea();
this.forceReRender();
},forceReRender:function(){
if(this.isIE||this.isWebKit){
var n=document.createTextNode(" ");
var d,el,fixEL,i;
if(this.isIE){
fixEl=this.selArea;
}else{
if(this.isWebKit){
fixEl=document.getElementsByClassName("imgCrop_marqueeSouth",this.imgWrap)[0];
d=Builder.node("div","");
d.style.visibility="hidden";
var _4e=["SE","S","SW"];
for(i=0;i<_4e.length;i++){
el=document.getElementsByClassName("imgCrop_handle"+_4e[i],this.selArea)[0];
if(el.childNodes.length){
el.removeChild(el.childNodes[0]);
}
el.appendChild(d);
}
}
}
fixEl.appendChild(n);
fixEl.removeChild(n);
}
},startResize:function(e){
this.startCoords=this.cloneCoords(this.areaCoords);
this.resizing=true;
this.resizeHandle=Event.element(e).classNames().toString().replace(/([^N|NE|E|SE|S|SW|W|NW])+/,"");
Event.stop(e);
},startDrag:function(e){
this.selArea.show();
this.clickCoords=this.getCurPos(e);
this.setAreaCoords({x1:this.clickCoords.x,y1:this.clickCoords.y,x2:this.clickCoords.x,y2:this.clickCoords.y},false,false,null);
this.dragging=true;
this.onDrag(e);
Event.stop(e);
},getCurPos:function(e){
var el=this.imgWrap,wrapOffsets=Position.cumulativeOffset(el);
while(el.nodeName!="BODY"){
wrapOffsets[1]-=el.scrollTop||0;
wrapOffsets[0]-=el.scrollLeft||0;
el=el.parentNode;
}
return curPos={x:Event.pointerX(e)-wrapOffsets[0],y:Event.pointerY(e)-wrapOffsets[1]};
},onDrag:function(e){
if(this.dragging||this.resizing){
var _54=null;
var _55=this.getCurPos(e);
var _56=this.cloneCoords(this.areaCoords);
var _57={x:1,y:1};
if(this.dragging){
if(_55.x<this.clickCoords.x){
_57.x=-1;
}
if(_55.y<this.clickCoords.y){
_57.y=-1;
}
this.transformCoords(_55.x,this.clickCoords.x,_56,"x");
this.transformCoords(_55.y,this.clickCoords.y,_56,"y");
}else{
if(this.resizing){
_54=this.resizeHandle;
if(_54.match(/E/)){
this.transformCoords(_55.x,this.startCoords.x1,_56,"x");
if(_55.x<this.startCoords.x1){
_57.x=-1;
}
}else{
if(_54.match(/W/)){
this.transformCoords(_55.x,this.startCoords.x2,_56,"x");
if(_55.x<this.startCoords.x2){
_57.x=-1;
}
}
}
if(_54.match(/N/)){
this.transformCoords(_55.y,this.startCoords.y2,_56,"y");
if(_55.y<this.startCoords.y2){
_57.y=-1;
}
}else{
if(_54.match(/S/)){
this.transformCoords(_55.y,this.startCoords.y1,_56,"y");
if(_55.y<this.startCoords.y1){
_57.y=-1;
}
}
}
}
}
this.setAreaCoords(_56,false,e.shiftKey,_57,_54);
this.drawArea();
Event.stop(e);
}
},transformCoords:function(_58,_59,_5a,_5b){
var _5c=[_58,_59];
if(_58>_59){
_5c.reverse();
}
_5a[_5b+"1"]=_5c[0];
_5a[_5b+"2"]=_5c[1];
},endCrop:function(){
this.dragging=false;
this.resizing=false;
this.options.onEndCrop(this.areaCoords,{width:this.calcW(),height:this.calcH()});
},subInitialize:function(){
},subDrawArea:function(){
}};
Cropper.ImgWithPreview=Class.create();
Object.extend(Object.extend(Cropper.ImgWithPreview.prototype,Cropper.Img.prototype),{subInitialize:function(){
this.hasPreviewImg=false;
if(typeof (this.options.previewWrap)!="undefined"&&this.options.minWidth>0&&this.options.minHeight>0){
this.previewWrap=$(this.options.previewWrap);
this.previewImg=this.img.cloneNode(false);
this.previewImg.id="imgCrop_"+this.previewImg.id;
this.options.displayOnInit=true;
this.hasPreviewImg=true;
this.previewWrap.addClassName("imgCrop_previewWrap");
this.previewWrap.setStyle({width:this.options.minWidth+"px",height:this.options.minHeight+"px"});
this.previewWrap.appendChild(this.previewImg);
}
},subDrawArea:function(){
if(this.hasPreviewImg){
var _5d=this.calcW();
var _5e=this.calcH();
var _5f={x:this.imgW/_5d,y:this.imgH/_5e};
var _60={x:_5d/this.options.minWidth,y:_5e/this.options.minHeight};
var _61={w:Math.ceil(this.options.minWidth*_5f.x)+"px",h:Math.ceil(this.options.minHeight*_5f.y)+"px",x:"-"+Math.ceil(this.areaCoords.x1/_60.x)+"px",y:"-"+Math.ceil(this.areaCoords.y1/_60.y)+"px"};
var _62=this.previewImg.style;
_62.width=_61.w;
_62.height=_61.h;
_62.left=_61.x;
_62.top=_61.y;
}
}});

/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.Text = {
  infoTitle: 'Join the network of Times readers!',
  infoText: 'Follow friends, co-workers, journalists and other Times readers. Discover and share articles, blog posts, multimedia and reader comments. <a href="http://timespeople.nytimes.com/packages/html/timespeople/faq/" title="TimesPeople Frequently Asked Questions">Read the TimesPeople FAQ</a> to learn more. <br><br>Already  a member of TimesPeople? Log in now. Not yet a member? Register now.',
  sharingText: 'When you share your activity, other members will be able to see your recommendations, comments, ratings and more.  <a href="http://timespeople.nytimes.com/packages/html/timespeople/faq/#13" title="TimesPeople Frequently Asked Questions">Read the TimesPeople FAQ</a> to learn more about sharing.',
  imageCopyrightText: 'Your image must comply with our <a href="http://www.nytimes.com/ref/membercenter/help/agree.html#discussions">Member Agreement</a>. By clicking save, you certify that you have the right to modify and distribute this image.',
  feedbackText: 'Questions? Comments? <a href="mailto:timespeople@nytimes.com"> Contact us.</a> | <a href="http://timespeople.nytimes.com/packages/html/timespeople/faq/#3" title="TimesPeople Privacy Policy">Privacy Policy</a>',
  welcomeTitle: 'Welcome to TimesPeople!',
  welcomeText: 'Now you can share recommendations, ratings and comments with other New York Times readers.<br><br> To start building your network, you can search for other members, select from a list of suggested users, or import your e-mail contacts.',
  searchTitle: 'Search for People',
  adText: '<iframe class="TP_tile_ad" width="88" height="31" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" src="'+TimesPeople.Config.ad_host+'/packages/html/timespeople/ad.html"></iframe>',
  sharingNoticeText: 'When you turn sharing back on, other members will be able to see your recommendations, comments, ratings and other activity — even activities that occurred while sharing was turned off. You can remove specific items from your public activities feed by clicking the "X" next to an item on the My Activities page.',
  faqAndPrivacyLinks: '<a href="http://timespeople.nytimes.com/packages/html/timespeople/faq/" title="TimesPeople Frequently Asked Questions">FAQ</a> | <a href="http://timespeople.nytimes.com/packages/html/timespeople/faq/#3" title="TimesPeople Privacy Policy">Privacy Policy</a> | <a href="http://www.nytimes.com/ref/membercenter/help/agree.html#discussions">Member Agreement</a>'
};/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/
// the current user

TimesPeople.Ajax = TimesPeople.Ajax || Ajax;

TimesPeople.User = Class.create({

  initialize: function() {
    if (TimesPeople.User.caller != TimesPeople.User.getInstance) {
      throw new Error("There is no public constructor for TimesPeople.User.");
    }

    this.newRecord = true;
    this.tpMember = false;
    this.publisher = new NYTD.EventPublisher();
    this.attributes = {
      userpage: TimesPeople.Config.host + '/view/user/',
      picURL: TimesPeople.Config.image_host + TimesPeople.Config.image_path + 'none.png',
      displayname:''
    };
    this.newsfeed = {};
  },

  register: function(observer) {
    this.publisher.register(observer);
  },

  unregister: function(observer) {
    this.publisher.unregister(observer);
  },

  login: function(credentials) {
    var url = TimesPeople.Config.service + 'login';
    var instance = this;
    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: credentials,
      onSuccess: function(response) {
        if (!response) {
          instance.requestAttributes();
        } else {
          instance.processResponse(response);
        }

        instance.newRecord = false;
        instance.publisher.notifyObservers('user logged in', instance);
      },
      on401: function(response) {
        // bad login/password should be here
      },
      on403: function(response) {
        var data = response.responseText.evalJSON();
        instance.update({uid:data.uid});
        instance.requestDefaultFeed();
        instance.publisher.notifyObservers('user successfully logged in but not registered', instance);
      },
      on500: function(response) {
        var data = response.responseText.evalJSON();
        TimesPeople.console.error(data.error_message);
        instance.publisher.notifyObservers('user login failed', data);
      },
      onComplete: function(response) {
        instance.newRecord = false;
        if(!response) {
          instance.requestAttributes();
        }
      }

    });
  },

  requestAttributes: function() {
    var url = TimesPeople.Config.service + 'user';
    var instance = this;
    new TimesPeople.Ajax.Request(url, {
      method: 'get',
      onSuccess: function(response) {
        instance.processResponse(response);
        instance.tpMember = true;
      },
      on401: function(response) {
        instance.requestDefaultFeed();
        instance.publisher.notifyObservers('no user info', null);
      },
      on403: function(response) {
        var data = response.responseText.evalJSON();
        instance.update({uid:data.uid});
        instance.requestDefaultFeed();
        instance.publisher.notifyObservers('user not registered', instance);
      },
      on500: function(response) {
        throw('Server error requesting user attributes');
      },
      onComplete: function(response) {
        instance.newRecord = false;
      }

    });
  },

  requestDefaultFeed: function() {
    this.newsfeed =  TimesPeople.DefaultFeed;
    this.publisher.notifyObservers('user followees actions updated');
  },

  processResponse: function(response) {
    var data = response.responseText.evalJSON();
    //TODO should this merge or overwrite?
    try{
      this.newsfeed = data.newsfeed;
      this.update(data.profile);
    } catch(e) {
      TimesPeople.console.error(e);
    }

  },

  update: function(attributes) {
    Object.extend(this.attributes, attributes);
    this.publisher.notifyObservers('attributes updated', this)
  },

  save: function(callback) {
    if (! this.isValid()) {
      this.publisher.notifyObservers('user could not be saved', {errors:[{"code":null,"message":"Display Name cannot be blank.","field":"displayname"}]});
      return false;
    } else {
      var instance = this;
      callback = callback || Prototype.emptyFunction;
      var url = TimesPeople.Config.service + 'update';
      var userInfo = $H(this.attributes);
      new TimesPeople.Ajax.Request(url, {
        method: 'post',
        parameters: {profile: Object.toJSON(userInfo)},
        onSuccess: function(response) {
          TimesPeople.console.log('Saved user!');
          instance.newRecord = false;
          if (!instance.attributes.uid && response) {
            instance.processResponse(response);
          }
          callback();
          instance.publisher.notifyObservers('user saved', instance);
        },
        on403: function(response) {
          // TODO
          var data = response.responseText.evalJSON();
          TimesPeople.console.error(data.errorMessage);
        },
        on412: function(response) {
          // TODO
          var data = response.responseText.evalJSON();
          TimesPeople.console.error(data.errorMessage);
          instance.publisher.notifyObservers('user could not be saved', data);
        },
        on500: function(response) {
          // TODO
          TimesPeople.console.error('error saving user', response.responseText);
          var data = response.responseText.evalJSON();
          instance.publisher.notifyObservers('user could not be saved', data);
        }
      });

      return true;
    }

    delete this.attributes.email;
    delete this.attributes.password1;
    delete this.attributes.password2;
  },

  requestFollowees: function() {
    var url = TimesPeople.Config.service + 'following';
    var instance = this;
    new TimesPeople.Ajax.Request(url, {
      method: 'get',
      onSuccess: function(response) {
        var data = response.responseText.evalJSON();
        data = data.compact();
        for (var objects=[], i=0, l=data.length; i < l; i++) {
          objects.push(new TimesPeople.Person(data[i]));
          instance.attributes.followees = objects;
        };
        instance.publisher.notifyObservers('followees updated', objects);
      }
    });
  },

  addFollowee: function(uid) {
    this.attributes.following_count++;
    var url = TimesPeople.Config.service + 'following/add';
    var instance = this;

    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: {ids: Object.toJSON([uid])},
      onSuccess: function(response) {
        TimesPeople.console.log('Saved user!');
        instance.publisher.notifyObservers('followee added', uid);
        instance.requestAttributes();
      },
      on403: function(response) {
        // TODO
      },
      on412: function(response) {
        // TODO
      },
      on500: function(response) {
        // TODO
      }
    });
  },

  removeFollowee: function(uid) {
    this.attributes.following_count--;
    var url = TimesPeople.Config.service + 'following/remove';
    var instance = this;
    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: {ids: Object.toJSON([uid])},
      onSuccess: function(response) {
        TimesPeople.console.log('Saved user!');
        instance.attributes.followees = instance.attributes.followees && instance.attributes.followees.reject(function(f){
          return f.uid == uid;
        });
        instance.publisher.notifyObservers('followee removed', uid);
        instance.requestAttributes();
      },
      on403: function(response) {
        // TODO
      },
      on412: function(response) {
        // TODO
      },
      on500: function(response) {
        // TODO
      }
    });
  },

  updateImage: function() {
    this.attributes.picURL = (this.imagePath() + '/cropped-#{uid}.jpg?'   + Math.random().toString()).interpolate(this.attributes);
    this.save();
    this.publisher.notifyObservers.bind(this.publisher).delay(1, 'user image updated', this);
  },

  updateFullSizeImage: function() {
    this.attributes.fullpicURL = (this.imagePath() + '/uncropped-#{uid}.jpg?' + Math.random().toString()).interpolate(this.attributes);
    this.save();

    this.publisher.notifyObservers.bind(this.publisher).delay(1, 'user full size image updated', this);
  },

  invite: function(emails) {
    var instance = this;
    var url = TimesPeople.Config.service + 'user/invite';
    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: {emails: Object.toJSON(emails)},
      onSuccess: function(response) {
        TimesPeople.console.log('invitations sent', response);
        instance.requestAttributes();
        instance.publisher.notifyObservers('invitations sent', {});
      },
      on500: function(response) {
        // TODO
        TimesPeople.console.error('error sending invitations', response.responseText);
        var data = response.responseText.evalJSON();
        instance.requestAttributes();
        instance.publisher.notifyObservers('error sending invitations', data);
      }
    });
  },

  isFollowing: function(user) {
    if (!this.attributes.followees || this.attributes.followees.length == 0) return false;
    return this.attributes.followees.any(function(f){
      return f.uid == user.uid;
    });
  },

  isTimesPeopleMember: function() {
    return this.tpMember;
  },

  isNYTMember: function() {
    return Object.isNumber(this.attributes.uid);
  },

  isNewMember: function() {
    // FIXME
    return this.attributes.following_count == 0;
  },

  isValid: function() {
   if('displayname' in this.attributes) {
     return Object.isString(this.attributes.displayname) &&
            !this.attributes.displayname.blank();
   } else {
     return true;
   }
  },

  getImportPageURI: function() {
    if (!this.attributes.uid) return;
    return TimesPeople.Config.host + '/view/user/' + this.attributes.uid + '/findimport.html';
  },

  getSuggestionsPageURI: function() {
    if (!this.attributes.uid) return;
    return TimesPeople.Config.host + '/view/user/' + this.attributes.uid + '/findsuggest.html';
  },

  getSearchPageURI: function(args) {
    if (!this.attributes.uid) return;
    return TimesPeople.Config.host + '/view/user/' + this.attributes.uid + '/findpeople.html';
  },

  imagePath: function() {
    return TimesPeople.User.imageHost + '/' + TimesPeople.User.idToPartitionedPath(this.attributes.uid);
  }

});



// class members
Object.extend(TimesPeople.User,{
  imageHost: TimesPeople.Config.user_image_host,
  getInstance: function() {
    if (this.__instance__ == null) {
      this.__instance__ = new TimesPeople.User();
    }
    return this.__instance__;
  },

  create: function(attributes) {
    var url = TimesPeople.Config.service + 'register';
    var instance = TimesPeople.User.getInstance();
    if(instance.attributes.uid) {
      attributes.uid = instance.attributes.uid;
    }
    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: {profile: Object.toJSON(attributes)},
      onSuccess: function(response) {
        TimesPeople.console.log('Created user!');
        instance.newRecord = false;
        if (!response) {
          instance.requestAttributes();
          return;
        }

        instance.processResponse(response);
        instance.publisher.notifyObservers('user created', instance);
        instance.publisher.notifyObservers('user saved', instance);
        instance.publisher.notifyObservers('user logged in', instance);
      },
      on403: function(response) {
        // TODO
        var data = response.responseText.evalJSON();
        TimesPeople.console.error(data.errorMessage);
      },
      on412: function(response) {
        // TODO
        var data = response.responseText.evalJSON();
        TimesPeople.console.error(data.errorMessage);
        instance.publisher.notifyObservers('user could not be created', data);
      },
      on500: function(response) {
        // TODO
        TimesPeople.console.error('error saving user', response.responseText);
        var data = response.responseText.evalJSON();
        instance.publisher.notifyObservers('user could not be created', data);
      }
    });
  },

  idToPartitionedPath: function(id) {
    return id.toString().replace(/(\d{4}(?=\d))/g, '$1/');
  }

});

/*------------------------------- DEPRECATED -------------------------------*/


Object.extend(TimesPeople.User.prototype, {
  requestFriends: function() {
    TimesPeople.console.log('TimesPeople.User#requestFriends is deprecated. Please use requestFollowees instead');
    this.requestFollowees();
  },

  addFriend: function(uid) {
    TimesPeople.console.log('TimesPeople.User#addFriend is deprecated. Please use addFollowee instead');
    this.addFollowee(uid);
  },

  removeFriend: function(uid) {
    TimesPeople.console.log('TimesPeople.User#removeFriend is deprecated. Please use addFollowee instead');
    this.removeFollowee(uid);
  }
})/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

//Person (NOT the current user)

TimesPeople.Person = function(attributes) {
  Object.extend(this, attributes);
  this.picURL = this.picURL || TimesPeople.Config.image_host + TimesPeople.Config.image_path + 'none.png';
  this.userpage = TimesPeople.Config.host + '/view/user/' + this.uid;
};

// class members
Object.extend(TimesPeople.Person, {

  search: function(term, callback) {
    var callback = callback || Prototype.emptyFunction;
    var url = TimesPeople.Config.service + 'search?search_term=' + encodeURIComponent(term);
    new TimesPeople.Ajax.Request(url, {
      method: 'get',
      onSuccess: function(response) {
        var data = response.responseText.evalJSON();
        for (var objects=[], i=0, l=data.length; i < l; i++) {
          objects.push(new TimesPeople.Person(data[i]));
        };
        callback(objects);
      }
    });
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.Activity = Class.create({
  initialize: function(verb, object, object_desc, object_url, object_thumbnail_url, object_type) {
    if (! TimesPeople.Activity.verbs.include(verb)) {throw('"'+verb+'" is not in the list of accepted verbs');}

    var object_desc = object_desc || TimesPeople.Page.description  || '';
    var object_type = object_type || TimesPeople.Page.type         || 'article';

    var source = 'nytimes.com';

    this.userid               = TimesPeople.user.attributes.uid;
    this.verb                 = verb;
    this.object               = object;
    this.object_desc          = object_desc.truncate(300).stripTags();

    this.object_type          = object_type;
    this.object_url           = object_url || this.sanitizeUrl();
    this.object_thumbnail_url = object_thumbnail_url || this.getThumbnail();
    this.visible              = 1;
    this.source               = source;

    TimesPeople.user.newsfeed.unshift(this.makeDisplayReady());

    if (this.save()){
      return this;
    } else {
      return false;
    }

  },

  makeDisplayReady: function() {
     TimesPeople.console.log('makeDisplayReady');

     this.actorDisplayname = 'You';
     this.date_updated   = new Date().toString();
     this.picURL = TimesPeople.user.attributes.picURL;
     TimesPeople.console.log('out of makeDisplayReady');
     return this;

   },

   getThumbnail: function() {
     var thumb = '';
     var meta  = $$('meta[name="thumbnail"]')[0] || $$('meta[name="url_thumb"]')[0] || false;

     if(meta) {
       var content = meta.getAttribute('content');
       if (!content.startsWith('http')) {
         thumb = TimesPeople.Config.image_host+'/'+content;
       } else {
         thumb = content;
       }
     }
     return thumb;
   },

   sanitizeUrl: function() {
     //	Start with a broad sweep by hostname
     //	then handle specific exeptions and cases

     var startWith = (location.href.indexOf("?")>0) ? "&" : "?";

     switch(location.hostname) {
       case 'www.nytimes.com':
       return location.href.split('?')[0]+'?src=tp';
       break;
       case 'community.nytimes.com':
       return location.href+startWith+'src=tp';
       break;
       case 'query.nytimes.com':
       return location.href+startWith+'src=tp';
       break;
       case 'travel.nytimes.com':
       return location.href+startWith+'&src=tp';
       break;
       case 'movies.nytimes.com':
       return location.href+startWith+'&src=tp';
       break;
       default:
       return location.href.split('?')[0]+'?src=tp';
     }
   },

   save: function() {
     var url = TimesPeople.Config.service + 'activity/post';
     new TimesPeople.Ajax.Request(url, {
       method: 'post',
       parameters: {activities:  Object.toJSON([this])},
       onSuccess: function(response) {
         TimesPeople.console.log('Saved action!');
         TimesPeople.Activity.notifyObservers('action saved');
       }
     });
   }
});


//class members
Object.extend(TimesPeople.Activity, NYTD.EventPublisher.prototype);
Object.extend(TimesPeople.Activity,{

  observers: [],
  verbs:     ["read", "commented", "rated", "reviewed", "recommended", "suggested", "saved", "shared", "browsed", "listened to", "posted", "viewed"],

  hide: function(id) {
    var url   = TimesPeople.Config.service + 'activity/hide';
    new TimesPeople.Ajax.Request(url, {
      method: 'post',
      parameters: {activity_id: id},
      onSuccess: function(response) {
        TimesPeople.Activity.notifyObservers('action hidden');
      }
    });
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.Page = {

	isReady: function() {
		return 'WT' in window;
	},

	initialize: function() {
	/*
		Run standard presets for the current page.
	*/
		TimesPeople.console.log("Has init. Doing presets");

		this.getType();
		this.section     = this.getSection();
		this.subsection  = this.getSubSection();
		this.title       = this.getTitle();
		this.description = this.getDescription();

		return true;
	},

	getSection: function() {
		var section = $$('meta[name="CG"]')[0];
		if (section)
		{
			return section.getAttribute("content").toLowerCase();
		}
		return '';
	},

	getSubSection: function() {
		if (this.type == "article" || this.type == "multimedia")
		{
			var subsection = $$('meta[name="SCG"]')[0];
			if (subsection)
			{
				return subsection.getAttribute("content").toLowerCase();
			}
		}
		return '';
	},

	getType: function() {

		var metaSearch, metaExists;
		var mList, mTagPage;
		var keepGoing = true;
		var pos = 0;
	/*
		Get the top level page type
	*/
		while (keepGoing && (pos < TimesPeople.Config.Page.Group.length))
		{
			metaSearch = TimesPeople.Config.Page.Group[pos];
			metaExists = $$('meta[name="' + metaSearch.value + '"]')[0];

			if (metaExists != undefined)
			{
				keepGoing  = false;
				this.group = (metaSearch.alias != undefined) ? metaSearch.alias : metaExists.getAttribute("content").toLowerCase();
				this.type  = this.group;
				mList      = TimesPeople.Config.Page.Type[TimesPeople.Page.group];

				$H(mList).keys().each(function(key)
				{
					mTagPage = $$('meta[name="' + key + '"]')[0];

					if (mTagPage != undefined)
					{
						mList[key].each(function(mItem, index) {

							if (mItem.value == mTagPage.getAttribute("content").toLowerCase())
							{
								TimesPeople.Page.type = (mItem.alias != undefined) ? mItem.alias : mItem.value;
								return this.type;
							}
						});
					}
				});
			}
			pos++;
		}

		return this.type;
	},

	getTitle:  function () {
	/*
		Get the standard page title depending on what group and type it belongs to.
	*/
		var title = '';

		if (TimesPeople.Config.Page.Description[this.group] != undefined)
		{
			if (TimesPeople.Config.Page.Title[this.group][this.type] != undefined)
			{
				title = this.getEmbeddedValue(TimesPeople.Config.Page.Title[this.group][this.type]);
			}
			else
			{
				title = this.getEmbeddedValue(TimesPeople.Config.Page.Title[this.group]['default']);
			}
		}

    //  Failsafe
        if (title == undefined || title == '') {
            title = document.title;

	        var removeThese = [' - NYTimes.com', ' - The New York Times', ' - New York Times',
	                           ' - NY Times Health Information', ' - NY Times Health' ];

	        removeThese.all(function(removeThis) {
	            title = title.replace(removeThis, '');
	        });
        }

		return title;
	},

	getDescription: function() {
	/*
		Get the standard page description depending on what group and type it belongs to.
	*/
		var description = '';

		if (TimesPeople.Config.Page.Description[this.group] != undefined)
		{
			if (TimesPeople.Config.Page.Description[this.group][this.type] != undefined)
			{
				description = this.getEmbeddedValue(TimesPeople.Config.Page.Description[this.group][this.type]);
			}
			else
			{
				description = this.getEmbeddedValue(TimesPeople.Config.Page.Description[this.group]['default']);
			}
			description = (description == undefined) ? '' : description;
		}	
		return description;
	},
	
	getEmbeddedValue: function(cssSelectorList) {
		var result = '';
		if (cssSelectorList)
		{
			cssSelectorList.each(function(trySelector){
				var embDesc = $$(trySelector)[0];
				if (embDesc != undefined)
				{
					var embValue;
					if (trySelector.indexOf("meta")>-1)
					{
						embValue = embDesc.getAttribute("content");
					}
					else
					{
						embValue = embDesc.innerHTML;
					}

					if (embValue != "")
					{
						result = embValue.stripTags().replace(/\n/g,'').strip().truncate(250);
						throw $break;
					}
				}
			});
		}
		return result;
	}
	
};
/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.Panel = Class.create({

  initialize: function(parent, element, tabcontent, options) {
    this.options = {
      title: '',
      shadow: true,
      resizable: false,
      position: 'left',
      target: $(document.body)
    };
    this.options = Object.extend(this.options, options || {});
    this.parent = parent;
    this.element = $(element).addClassName('timespeople_panel');
    this.container = new Element('div', {'class': 'TP_panel_container'});
    this.tab = new Element('div', {'class':'toggleTab active'});
    this.tab.addClassName(this.options.position + '_arrow');
    this.tab.setStyle(this.options.position + ':-158px;position:absolute;display:none').update('<h4>' + tabcontent + '</h4>');
    this.element.insert({top:this.tab});
    this.element.insert(this.container);
    this.options.target.insert(this.element);
    this.draw = this.draw.wrap(function(proceed){
      proceed();
      var ad = this.element.down('.tp_tile_ad_container');
      if (ad) ad.innerHTML = TimesPeople.Text.adText;
    })
  },

  draw: function() {
  },

  open: function() {
    TimesPeople.console.log('opening panel');
    if (this.parent.open_panel) this.parent.open_panel.close();
    if (this.tab) this.tab.show();
    this.element.show();
    if (this.options.shadow) {
      this.shadow = new Shadow(this.element);
    }
    this.parent.open_panel = this;
  },

  close: function() {
    TimesPeople.console.log('closing panel');
    this.element.hide();
    var ad = this.element.down('.tp_tile_ad_container');
    if (ad) ad.innerHTML = '';
    if (this.tab) this.tab.hide();
    if (this.shadow) {
      this.shadow.destroy();
      delete this.shadow;
    }
    this.parent.open_panel = null;
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.firstRunView = {

  initialize: function(parent) {
    this.parent = parent;
    this.controller = TimesPeople.ToolbarController;
    this.user = TimesPeople.User.getInstance();
    return this;
  },


  drawFirstRun: function() {
    var html = '<h4>Welcome to TimesPeople</h4><a id="TP_infolink" class="toolbar_button"  onclick="return false">What&rsquo;s this?</a>';
    $('TP_user').update(html);
    $('TP_people').update(this.buildFirstStep()).addClassName('firstrun');

    this.controller.minimizedView.button.update('<a>TimesPeople</a>');

    this.user.newsfeed = this.user.newsfeed || [];
    Event.observe($('TP_infolink'), 'click', this.openInfo.bind(this), true);
    if ($('TP_get_started_button')) $('TP_get_started_button').observe('click', this.onClickGetStarted.bindAsEventListener(this), true);
    $('TP_minimize_button_guest').observe('click', this.onClickMinimize.bindAsEventListener(this), true);
  },

  buildFirstStep: function() {
    return '<button  id="TP_get_started_button" class="appButtonSmall"><span>Get Started</span></button>&nbsp;&nbsp;<a id="TP_minimize_button_guest" class="toolbar_button">No, thanks</a>';
  },

  openInfo: function() {
    this.parent.drawInfo();
  },

  onClickGetStarted: function() {
    window.location = TimesPeople.Config.get_started_uri;
  },

  onClickMinimize: function(event) {
    this.parent.minimize();
    event.stop();
  }

};/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.FeedView = Class.create({

  initialize: function(element, parent) {
    this.parent = parent;
    this.element = $(element).addClassName('timespeople_panel').show();
    this.user = TimesPeople.User.getInstance();
    this.user.register(this);
    TimesPeople.Activity.register(this);

    // TimesPeople.console.log('instantiate', TimesPeople.FeedContentView)
    this.feedcontent = new TimesPeople.FeedContentView(this.element.down('.TP_feed_content'));
    this.feedHeight = '232px'; //so the feed doesn't cover the article headline and tools //document.viewport.getHeight()/2 + 'px';
    var feedLink = $('TP_feed_toggle');
    if (feedLink) {
      Event.observe(feedLink, "click", this.toggleFeed.bind(this), true);
    }
  },

  onResize: function() {
    this.shadow.updateShadow();
  },

  drawFeed: function(length) {
    TimesPeople.console.log('drawing main feed', this.feedcontent);
    this.feedcontent.draw(length);
  },

  teaseFeed: function() {
    this.element.addClassName('tease');
  },

  unteaseFeed: function() {
    this.element.removeClassName('tease');
  },

  toggleFeed: function() {
    TimesPeople.console.log('toggle feed');

    $('TP_feed_toggle').toggleClassName('open');

    if (this.element.hasClassName('open')) {
      this.close();
    } else {
      this.open();
    }
  },

  // TODO can this inherit Panel instead??
  open: function(height) {
    this.drawFeed();
    this.element.style.height = (height || this.feedHeight);
    this.shadow = new Shadow(this.element);
    var ad = $('TP_feed_tab').down('.tp_tile_ad_container');
    if (ad) ad.innerHTML = TimesPeople.Text.adText;

    $('TP_feed_tab').addClassName('active').show().setStyle({visibility:'visible'});
    this.element.addClassName('open').setStyle({top:'35px'});
    this.resizable = this.resizable || new Resizable('TP_feed',{constraint:'vertical', handle: 'TP_feed_handle', starteffect: null, endeffect: this.shadow.updateShadow.bind(this.shadow), min: 40});
    Resizables.addObserver(this);
    this.onResize();
    if (this.parent.open_panel) this.parent.open_panel.close();
    this.parent.open_panel = this;
  },

  close: function() {
    this.feedHeight = this.element.style.height || this.feedHeight;
    this.element.style.height = null;
    this.element.removeClassName('open').setStyle({top:'0'});
    var ad = $('TP_feed_tab').down('.tp_tile_ad_container');
    if (ad) ad.innerHTML = '';

    $('TP_feed_toggle').removeClassName('open');
    $('TP_feed_tab').removeClassName('active').hide();
    this.shadow.destroy();
    TimesPeople.console.log('destroy shadow');
    delete this.shadow;
    this.parent.open_panel = null;
  },

  update: function(msg) {
    switch(msg.event) {
    case 'action saved':
    case 'user followees actions updated':
      TimesPeople.console.log('user followees actions updated');
      this.drawFeed();
      break;
    }
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.FeedContentView = Class.create({

  initialize: function(element, data) {
    this.element = element;
    this.data = data || TimesPeople.user.newsfeed;
    // TimesPeople.console.log(this.data)
  },

  draw: function(length,data) {
    this.data = data || TimesPeople.user.newsfeed;
    this.element.update(this.buildFeed(length));
  },

  //TODO optimize
  buildFeed: function(length) {
    var actions = this.data;
    if (!actions || !actions.length) return;

    length = length || actions.length;
    var html = [];
    html.push('<table>');
    for (var i=0; i < length; i++) {
      if (i == 25) break;
      html.push(this.buildFeedItem(actions[i])
      );
    }
    html.push('</table>');
    // TimesPeople.console.log(TimesPeople.user.attributes)
    return html.join('').interpolate(TimesPeople.user.attributes);
  },

  buildFeedItem: function(action) {
    action = Object.clone(action);
    action.actorDisplayname = action.actorDisplayname || action.user_displayname;
    var d = new Date(action.date_updated);

    if (d == "Invalid Date" || isNaN(d)) {
      var dateStr = action.date_updated.replace(/-/g, '/');
      d = new Date(dateStr);
    }


    if (d.getDate() == new Date().getDate()) {
      var mhours = d.getHours();
      var hours = mhours > 12 ? mhours - 12 : mhours;
      var minutes = d.getMinutes().toPaddedString(2);
      var period = mhours < 12 ? 'am' : 'pm';
      action.date = hours + ':' + minutes + ' ' + period;
    } else {
      action.date = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()] + ' ' + d.getDate();
    }

    if (action.verb == 'commented') {
      action.verb = 'commented on';
    }

    action.object_type = action.object_type.toLowerCase();



    if(action.verb) {
      action.article = action.object_type.charAt(0).match(/[aeiou]/ig) ? 'an' : 'a';
      action.punctuation = ':'
    }
    else {
      action.punctuation = '';
    }

    if (action.object_type == 'user') {
      action.article = '';
      action.object_type = '';
      action.punctuation = '';
    }

    var string_length = (action.actorDisplayname + action.verb + action.article + action.object_type).length + 5;
    action.truncated_object = action.object.truncate(80 - string_length);
    action.you = action.actorId == TimesPeople.user.attributes.uid ? 'you' : '';
    action.userpage = TimesPeople.Config.host + '/view/user/' + action.actorId;
    var action_html = ('\
    <tr>\
      <td class="TP_avatar_cell">\
        <a href="#{userpage}"><img class="TP_avatar #{you}" src="#{picURL}" width="20" height="20"></a>\
      </td>\
      <td>\
        <span class="TP_story"><a href="#{userpage}">#{actorDisplayname}</a> #{verb} #{article} #{object_type}#{punctuation} </span>\
        <span class="TP_object"><a origin="tp" href="#{object_url}" title="#{object}">#{truncated_object}</a></span>\
      </td>\
      <td class="timestamp">#{date}</td>\
    </tr>\
    ').interpolate(action);
    return action_html;
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.SettingsPanelView = Class.create(TimesPeople.Panel, {

  initialize: function($super, parent, target) {
    var element = document.createElement('div');
    element.id = 'TP_settings_pane';
    target.appendChild(element);
    $super(parent, element, 'Settings', {target: target});
    TimesPeople.user.register(this);
    this.draw();
  },

  draw: function() {
    this.container.update(this.buildContent());
    var TP_pic_form = $('TP_pic_form');
    Event.observe(TP_pic_form,'submit', function(){}, true);
    Event.observe(TP_pic_form['profileImg'],'change', this.submitImage.bindAsEventListener(this), true);
    Event.observe($('TP_sharing_on'),"click", this.updateSharing, true);
    Event.observe($('TP_sharing_off'),"click", this.updateSharing, true);
    Event.observe($('TP_done_settings'),"click", this.close.bind(this), true);
    Event.observe($('TP_name_and_location_edit_button'), "click", this.toggleNameAndLocationForm.bind(this), true);
    Event.observe($('TP_name_and_location_form'), "submit", this.onSubmitNameAndLocationForm.bindAsEventListener(this), true)
  },

  buildContent: function() {
    var user = TimesPeople.user;
    user.attributes.sharing_on  = user.attributes.sharing ? 'checked="checked"' : '';
    user.attributes.sharing_off = user.attributes.sharing ? '' : 'checked="checked"';
    var html =
    [
    '<div class="inset">',
      '<div class="module wrap first">',
        '<div class="wrap">',
        '<div class="tp_tile_ad_container"></div>',
        '<div id="TP_name_and_location"><h3 style="display:inline">#{displayname}</h3>&nbsp;&nbsp;<span id="TP_location">#{location}</span>&nbsp;&nbsp;<button id="TP_name_and_location_edit_button" class="appButton appButtonSmall"><span>Edit</span></button></div>',
        '<form id="TP_name_and_location_form" style="display:none">',
          '<input type="text" class="text" name="displayname" value="#{displayname}">&nbsp;&nbsp;',
          '<input type="text" class="text" name="location" value="#{location}">&nbsp;&nbsp;',
          '<button id="TP_save_name_and_location_button" type="submit" class="appButton appButtonSmall"><span>Save</span></button>',
        '</form>',
        '</div>',
        '<div class="column" id="TP_profile">',
          '<div class="wrap">',
            '<div id="previewArea" style="display:none"></div>',
            '<div class="TP_avatar"><a href="#{userpage}"><img class="you" src="#{picURL}" width="64" height="64"></a></div>',
            '<h4>Change Image</h4>',
            '<form id="TP_pic_form" enctype="multipart/form-data" action="' + TimesPeople.Config.image_service + '" method="post">',
            '<input class="input" style="width:200px;font-size:11px;font-family: Arial, Helvetica, sans-serif;" type="file" name="profileImg" />',
            '<input type="hidden" name="userId" value="#{uid}" />',
            '<input type="hidden" name="MAX_FILE_SIZE" value="2097152">',
            '</form>',
            '<form id="cropImageForm" style="display:none" action="' + TimesPeople.Config.image_service + '" method="POST">',
            '<input type="hidden" name="x1" id="x1" />',
            '<input type="hidden" name="y1" id="y1" />',
            '<input type="hidden" name="x2" id="x2" />',
            '<input type="hidden" name="y2" id="y2" />',
            '<input type="hidden" name="width" id="width" />',
            '<input type="hidden" name="height" id="height" />',
            '<input type="hidden" name="userId" value="#{uid}" />',
            '<div class="right">',
            '<button id="TP_crop_button" type="button" class="appButton"><span>Save</span></button>',
            '</div>',
            '</form>',
          '</div>',
          '<div id="imageWell" class="imageWell wrap" style="display:none">',
          '</div>',
          '<p id="imageCopyrightText" style="display:none"><small>#{imageCopyrightText}</small></p>'.interpolate(TimesPeople.Text),
        '</div>',
        '<div class="column last" id="TP_sharing">',
          '<div class="wrap">',
          '<h4 style="float:left">Turn Sharing...</h4>',
          '<fieldset id="TP_sharing_buttons">',
          '<input type="radio" id="TP_sharing_on" name="sharing" value="1" #{sharing_on}> on &nbsp;&nbsp; <input type="radio" id="TP_sharing_off" name="sharing" value="0" #{sharing_off}> off ',
          '</fieldset>',
          '</div>',
          '<p>#{sharingText}</p>'.interpolate(TimesPeople.Text),
          this.buildFacebookControl(),
        '</div>',
      '</div>',
      '<div class="module wrap">',
      '<button id="TP_done_settings" style="vertical-align:middle; float:right" class="appButton"><span>Close</span></button>',
      '<p><small>#{feedbackText}</small></p>'.interpolate(TimesPeople.Text),
      '</div>',
    '</div>'
    ].join('').interpolate(user.attributes);

    delete user.attributes.sharing_on;
    delete user.attributes.sharing_off;

    return html;
  },

  buildFacebookControl: function() {
    return '<p style="clear:left"><a href="http://apps.facebook.com/timespeople/" target="_blank"><img src="http://graphics8.nytimes.com/images/article/functions/facebook.gif" alt="Facebook logo"> TimesPeople on Facebook</a></p>';
  },

  updateSharing: function() {
    var value = parseInt(this.value, 10);
    if (value == 1) {
      if (confirm(TimesPeople.Text.sharingNoticeText)) {
        TimesPeople.user.attributes.sharing = value;
        TimesPeople.user.save();
      }
      else {
        this.checked = '';
        $('TP_sharing_off').checked = 'checked';
      }
    }
    else {
      TimesPeople.user.attributes.sharing = value;
      TimesPeople.user.save();
    }
  },

  updateLocation: function(form, value) {
    TimesPeople.user.update({location: value.truncate(32)});
    TimesPeople.user.save();
  },

  submitImage: function(event) {
    var element = event.element();
    var form = element.up('form');
    form.requestThroughIframe({
      onComplete: this.onImageSubmitted.bind(this)
    });
    Event.stop(event);
  },

  onImageSubmitted: function() {
    TimesPeople.user.updateFullSizeImage();
  },

  loadFullSizeImage: function() {
    var img = new Element('img',{id:'croppingImg', src: TimesPeople.user.attributes.fullpicURL});
    $('imageWell').appendChild(img);

    //bug in cropper.js library, a blank cropper loads before the img has loaded
    if (Prototype.Browser.WebKit) {
      img.observe('load', this.initializeCropper.bind(this), true);
    } else {
      this.initializeCropper();
    };
  },

  initializeCropper: function() {
    if (this.cropper) {
      this.cropper.previewWrap.update('').show();
      delete this.cropper;
    }
    this.cropper = new Cropper.ImgWithPreview(
      'croppingImg',
      {
        minWidth: 64,
        minHeight: 64,
        ratioDim: { x: 64, y: 64 },
        displayOnInit: true,
        onEndCrop: this.onEndCrop,
        previewWrap: 'previewArea',
        onloadCoords: { x1: 10, y1: 10, x2: 74, y2: 74 }
      }
    );

    this.cropper.previewWrap.show();
    $('TP_pic_form').hide();
    $('TP_profile').down('.TP_avatar').hide();
    $('cropImageForm').show();
    $('imageCopyrightText').show();
    $('TP_profile').down('.imageWell').show();
    this.shadow.updateShadow();
    $('TP_crop_button').observe('click', this.submitCoords.bindAsEventListener(this), true);

  },

  resetCropper: function() {
    $('croppingImg').show();
    $('cropImageForm').show();
    this.cropper.previewWrap.show();
    this.cropper.reset();
    $('TP_profile').down('.TP_avatar').hide();
    this.shadow.updateShadow();
  },

  removeCropper: function() {
    TimesPeople.user.updateImage();
    $('croppingImg').hide();
    $('cropImageForm').hide();
    $('imageCopyrightText').hide();
    $('TP_pic_form').show();
    $('TP_profile').down('.imageWell').hide();
    this.cropper.remove();
    this.shadow.updateShadow();
  },

  submitCoords: function(event) {
    var element = event.element();
    var form = element.up('form');
    form.requestThroughIframe({
      onComplete: this.removeCropper.bind(this)
    });
    Event.stop(event);
  },

  onEndCrop: function(coords, dimensions) {
    $( 'x1' ).value = coords.x1;
    $( 'y1' ).value = coords.y1;
    $( 'x2' ).value = coords.x2;
    $( 'y2' ).value = coords.y2;
    $( 'width' ).value = dimensions.width;
    $( 'height' ).value = dimensions.height;
  },

  toggleNameAndLocationForm: function(event) {
    [$('TP_name_and_location'), $('TP_name_and_location_form')].invoke('toggle');
  },

  onSubmitNameAndLocationForm: function(event) {
    var name_and_location = $('TP_name_and_location_form').serialize(true);

    for (i in name_and_location) {
      name_and_location[i] = name_and_location[i].stripScripts().unescapeHTML();
    }

    Object.extend(TimesPeople.user.attributes, name_and_location);
    TimesPeople.user.save();
    this.toggleNameAndLocationForm();
    event.stop();
  },

  update: function(msg) {
    switch(msg.event) {
    case 'user saved':
      // FIXME quick hack, don't let the ui redraw if the cropper is on screen. Means location updates won't display during image editing.
      if(!this.cropper) {
        this.draw();
      }
      break;
    case 'user full size image updated':
      this.loadFullSizeImage();
      break;
    case 'user image updated':
      this.cropper.previewWrap.hide();
      $('TP_profile').down('.TP_avatar').show();
      break;
    }
  }

});
/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.userView = Class.create({

  initialize: function(parent) {
    this.parent = parent;
    this.user = TimesPeople.user;
  },

  buildUser: function() {
    var template_object = {};
    Object.extend(template_object, this.user.attributes);
    template_object.displayname = new String(template_object.displayname).truncate(15);
    return [
      '<a href="#{userpage}"><img class="TP_avatar you" src="#{picURL}" width="30" height="30"></a>',
      '<h4 class="display_name"><a href="#{userpage}">#{displayname}</a></h4>',
      '<span class="toolbar_button"><a id="TP_settingsLink">Settings</a> | <a href="#{userpage}">My Activity</a></span>'
    ].join('').interpolate(template_object);
  },

  drawUser: function() {
    $('TP_user').update(this.buildUser());
    var settingsLink = $('TP_settingsLink');
    if (settingsLink) Event.observe(settingsLink, 'click', this.onClickSettings.bindAsEventListener(this), true);
  },

  buildPeople: function() {
    var number = this.user.attributes.following_count;
    var people = (number == 1) ? 'Person' : 'People';
    return '<div style="float:left;width:85px"><h4><span class="TP_people_count">' + number + '</span> '+ people +' </h4><a id="TP_searchLink" class="toolbar_button">Add / Remove</a></div>';
  },

  buildSharing: function() {
    var status =  this.user.attributes.sharing ? 'ON' : 'OFF';
    return '<div style="float:right;width:55px"><h4>Sharing</h4><span class="'+status+' toolbar_button">'+status+'</span></div>';
  },

  buildMinimizeButton: function() {
    return '<div id="TP_minimize_button">×</div>';
  },

  drawPeople: function() {
    $('TP_people').removeClassName('firstrun').update(this.buildPeople() /*+ this.buildSharing()*/ + this.buildMinimizeButton());
    var searchLink = $('TP_searchLink');
    if (searchLink) Event.observe(searchLink, 'click', this.onClickAddRemove.bindAsEventListener(this) , true);

    var minimizeButton = $('TP_minimize_button');
    if(minimizeButton) minimizeButton.observe('click', this.parent.minimize.bind(this.parent));
  },

  onClickSettings: function(event) {
    this.parent.drawSettings();
    event.stop();
  },

  onClickAddRemove: function(event) {
    this.parent.drawPeople();
    event.stop();
  },

  update: function(msg) {
    switch(msg.event) {
    case 'attributes updated':
    case 'user saved':
      TimesPeople.console.log('update user and user count view!');
      this.drawUser();
      this.drawPeople();
      break;
    }
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.FolloweesPanelView = Class.create(TimesPeople.Panel, {

  initialize: function($super, parent, target) {
    var element = $('TP_followees_panel') || new Element('div', {id: 'TP_followees_panel'});
    target.appendChild(element);
    $super(parent, element, 'People', {position:'right', target: target});

    this.title = TimesPeople.user.isNewMember() ? TimesPeople.Text.welcomeTitle : TimesPeople.Text.searchTitle;

    this.container.update(NYTD.Template(this.template, this));

    this.searchView = new TimesPeople.SearchView('TP_search_view', parent);
    this.searchView.draw();

    this.events = {
      clickRemoveButton: this.removeFollowee.bindAsEventListener(this),
      clickCloseButton: this.close.bindAsEventListener(this),
      mouseOverRow: this.toggleHighlight.bindAsEventListener(this),
      mouseOutRow: this.toggleHighlight.bindAsEventListener(this)
    };

    Event.observe($('TP_close_search'), "click", this.events.clickCloseButton, true);
  },

  template:'\
  <div class="wrap inset">\
    <div class="wrap row">\
      <div class="column">\
        <h4><%= title %></h4>\
        <div id="TP_search_view"></div>\
      </div>\
      <div class="column last">\
        <div class="tp_tile_ad_container"></div>\
        <h4>Your People</h4>\
        <div id="TP_followees_pane">\
          <p>You have...</p>\
          <div class="scrollbox">\
            <table height="100%"><tr><td align="center" valign="middle">\
              <object width="24" height="24" type="application/x-shockwave-flash" data="<%= TimesPeople.Config.image_host %>/images/apps/timespeople/spinner.swf">\
                <param name="movie" value="<%= TimesPeople.Config.image_host %>/images/apps/timespeople/spinner.swf"/><param name="WMode" value="Transparent"/>\
              </object>\
            </td></tr></table>\
          </div>\
        </div>\
      </div>\
    </div>\
    <div class="wrap row">\
      <div class="right"><button class="appButton" id="TP_close_search"><span>Close</span></button></div>\
      <p><strong><a href="<%= TimesPeople.user.getImportPageURI() %>">Import e-mail contacts »</a></strong><br>\
      <strong><a href="<%= TimesPeople.user.getSuggestionsPageURI() %>">Check suggested users »</a></strong></p>\
    </div>\
  </div>\
  ',

  followeesTemplate:'\
    <p>You have <strong class="TP_people_count"><%= TimesPeople.user.attributes.following_count %></strong> People</p>\
    <div class="scrollbox">\
      <table>\
          <% for (var i = 0, f; f = followees[i]; i++) { %>\
            <tr id="TP_followee_<%= f.uid %>">\
              <td class="TP_avatar_cell"><a href="<%= f.userpage %>"><img class="TP_avatar" src="<%= f.picURL %>" width="16" height="16"></a></td>\
              <td class="TP_displayname_cell"><span class="TP_story"><%= f.displayname.truncate(18) %></span></td>\
              <td class="TP_location_cell"><span class="TP_status"><%= f.location.truncate(12) %></span></td>\
              <td class="TP_button_cell"><input type="image" style="display:none" name="users[]" value="<%= f.uid %>" src="<%= TimesPeople.Config.image_host + TimesPeople.Config.image_path %>delete.gif"></td>\
            </tr>\
          <% }; %>\
      </table>\
    </div>\
  ',

  updateFollowees: function(followees) {
    this.followees = followees;
    var followeesPane = $('TP_followees_pane');
    followeesPane.innerHTML = NYTD.Template(this.followeesTemplate, this);

    // TODO event delegation
    $$('#TP_followees_pane tr').each(function(row) {
      row = $(row);
      row.observe('mouseover',this.events.mouseOverRow, true);
      row.observe('mouseout',this.events.mouseOutRow, true);
    }.bind(this));
    var buttons = $$('#TP_followees_pane input[type="image"]');
    for (var i=0, l = buttons.length; i < l; i++) {
      buttons[i].observe('click', this.events.clickRemoveButton, true);
    };
    this.shadow.updateShadow();
  },

  open: function($super) {
    TimesPeople.user.register(this);
    TimesPeople.user.requestFollowees();
    $('TP_feed_tab').setStyle({visibility:'hidden'});
    $super();
    var search_field = $('TP_search_term');
    if(search_field) {search_field.focus();}
  },

  close: function($super, event) {
    TimesPeople.user.unregister(this);
    TimesPeople.user.requestAttributes();
    $super();
    event.stop();
  },

  toggleHighlight: function(event) {
    var row = event.element().up('tr').toggleClassName('highlight');
    row.down('input[type=image]').toggle();
  },

  personAdded: function() {
    TimesPeople.user.requestFollowees();
  },

  removeFollowee: function(event) {
    var element = event.element();
    element.stopObserving('click', this.events.clickRemoveButton, true);
    var uid = parseInt(element.value, 10);
    TimesPeople.user.removeFollowee(uid);
  },

  personRemoved : function(uid) {
    $('TP_followee_' + uid).remove();
    $$('.TP_people_count').invoke('update', TimesPeople.user.attributes.following_count);
    TimesPeople.user.requestAttributes();
  },

  update: function(msg) {
    switch(msg.event) {
    case 'attributes updated':
      break;
    case 'followees updated':
      this.updateFollowees(msg.data);
      break;
    case 'followee removed':
      this.personRemoved(msg.data);
      break;
    }
  }

})/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.SearchView = Class.create({

  initialize: function(container, controller){
    this.container = $(container);
    this.controller = controller;
    TimesPeople.user.register(this)
  },

  draw: function() {
    this.container.update(this.buildSearch());
    this.bootSearch();
  },

  buildSearch: function() {
    return [
    '<form id="TP_search" onsubmit="return false">',
    '<input class="text" id="TP_search_term" name="term" value="">',
    // '<input type="image" src="http://graphics8.nytimes.com/images/global/global_search/search_button40x19.gif" alt="Search" id="TP_search_button">',
    '<input type="image" src="'+ TimesPeople.Config.image_host + '/images/apps/buttons/search.gif" alt="Search" id="TP_search_button">',
    '</form>',
    (function(){ return TimesPeople.user.isNewMember() ? '<p id="TP_welcome_text" style="margin-top:10px;height:123px">#{welcomeText}</p>'.interpolate(TimesPeople.Text) : '<div id="TP_search_results" class="scrollbox"></div>'})()
    ].join('');
  },

  bootSearch: function() {
    $('TP_search').observe('submit', this.onSubmitSearch.bindAsEventListener(this), true);
  },

  buildResult: function(user) {
    var str = '<tr id="TP_search_result_#{uid}"><td><a href="#{userpage}"><img class="TP_avatar" src="#{picURL}" width="16" height="16"> ' +
           '<span class="TP_story">#{displayname}</span> <span class="TP_status">#{location}</span></a></td>' +
           this.buildAddButton(user) +
           '</tr>';
    return str.interpolate(user);
  },

  buildResult: function(user) {
    //TODO duplicate template
    return ('<tr id="TP_search_result_#{uid}">' +
             '<td class="TP_avatar_cell"><a href="#{userpage}"><img class="TP_avatar" src="#{picURL}" width="16" height="16"></a></td>' +
             '<td class="TP_displayname_cell"><span class="TP_story">#{displayname}</span></td>' +
             '<td class="TP_location_cell"><span class="TP_status">#{location}</span></td>' +
             this.buildAddButton(user) +
           '</tr>').interpolate(user);
  },

  buildAddButton: function(user) {
    // FIXME no followees here...
    if (! TimesPeople.user.isFollowing(user)) {
      return '<td class="TP_button_cell"><input type="image" name="users[]" value="#{uid}" src="'+ TimesPeople.Config.image_host + TimesPeople.Config.image_path +'add.gif"></td>';
    } else {
      return '<td class="TP_button_cell"></td>';
    }

  },

  drawSearchResults: function(users) {
    var welcomeText = $('TP_welcome_text');
    if (welcomeText)  {
      welcomeText.replace('<div id="TP_search_results" class="scrollbox"></div>');
    }
    var html = [];
    html.push('<table>');

    if(users.length == 0) {
      html.push('<tr><td><p>No results</p></td></tr>');
    } else {
      for (var i=0; i < users.length; i++) {
        var user = this.buildResult(users[i]);
        html.push(user);
      }
    }

    html.push('</table>');

    $('TP_search_results').innerHTML = html.join('');
    var buttons = $$('#TP_search_results input[type="image"]');
    for (var i=0; i < buttons.length; i++) {
      Event.observe(buttons[i], "click", this.addFollowee.bindAsEventListener(this), true);
    };

  },

  addFollowee: function(event) {
    var element = event.element();
    var uid = parseInt(element.value, 10);
    TimesPeople.user.addFollowee(uid);
  },

  addedFollowee: function(uid) {
    this.remove(uid);
    this.controller.people_panel.personAdded();
  },

  remove: function(uid) {
    TimesPeople.console.log('searchView: remove', uid);
    var result_for_uid = $('TP_search_result_' + uid);
    result_for_uid && result_for_uid.remove();
  },

  onSubmitSearch: function(event) {
    var form = event.element();
    var values = form.serialize(true);
    var results = $('TP_search_results');
    if(results) results.update('');
    TimesPeople.Person.search(values.term, this.drawSearchResults.bind(this));
  },

  update: function(msg) {
    switch(msg.event) {
    case 'followee added':
      if (this.controller.open_panel === this.controller.people_panel) {
        this.addedFollowee(msg.data);
      }
      break;
    }
  }


});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.InfoPanelView = Class.create(TimesPeople.Panel, {

  initialize: function($super, parent, target) {
    var element = new Element('div', {id:'TP_info_pane'});

    $super(parent, element, 'What is TimesPeople?', {target: target});

    this.container.update(this.buildContent());

    var get_started_button = element.down('.TP_get_started_button');
    get_started_button.observe("click", this.onClickGetStarted.bind(this), true);

    element.down('.info_close_button').observe('mousedown', this.close.bind(this), true);
  },

  buildContent: function() {
    var html = '\
      <div class="inset wrap">\
        <div class="tp_tile_ad_container"></div>\
        <h3>#{infoTitle}</h3>\
        <div class="wrap"><p>#{infoText}</p></div>\
        <div class="right"><button class="appButton TP_get_started_button"><span>Get Started</span></button></div>\
        <button class="appButton info_close_button"><span>Close</span></button>\
      </div>';
    return html.interpolate(TimesPeople.Text);
  },

  onClickGetStarted: function() {
    window.location = TimesPeople.Config.get_started_uri;
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.Form = Class.create({

  messages: {'-6': 'E-mail address already registered.', '-4': 'Incorrect Login'},

  initialize: function(form) {
    this.element = $(form);
    this.element.focusFirstElement();
  },

  showErrors: function(errors) {
    var form = this.element;
    this.clearErrors();

    for (var i = 0, error; error = errors[i]; i++) {
      var text = this.messages[error.code.toString()] || error.message;
      var message = new Element('p', {'class':'error'}).update(text);
      if (error.field) {
        form[error.field].addClassName('error');
        form[error.field].insert({after: message});
      } else {
        form.insert({top: message});
      }
    };

  },

  clearErrors: function() {
    var form = this.element;
    form.getElementsBySelector('input.error').invoke('removeClassName', 'error');
    form.getElementsBySelector('p.error').invoke('remove');
  }

});

// Class methods
Object.extend(TimesPeople.Form, {
  control: function(label,control) {
    return '<div class="TP_control"><div class="label_container"><label>'+label+'</label></div><div class="control_container">'+control+'</div></div>';
  }
});

Element.addMethods('form', {
  requestThroughIframe: function(form, options) {
    form = $(form); options = Object.clone(options || { });
    var frameId = 'FormRequestIframe';
    var iframe = new Element('iframe', {id: frameId, name: frameId, style: 'position:absolute; top:-1000px;left:-1000px'});
    form.target = frameId;
    document.body.appendChild(iframe);

    var uploadHandler = function() {
       iframe.stopObserving('load', uploadHandler);
       if (Object.isFunction(options.onComplete)) options.onComplete();
       setTimeout(iframe.remove.bind(iframe),100);
    };

    iframe.observe('load', uploadHandler);
    form.submit();
  }
});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.ToolbarView = Class.create({

  initialize: function() {
    this.open_panel = null;
  },

  template:' \
    <div id="TP_container" class="TP_env"> \
      <div id="TP_inner"> \
        <div id="TP_people" class="toggleTab"></div> \
        <div id="TP_user" class="toggleTab"></div> \
        <div id="TP_feed_tab" class="toggleTab" style="display:none"> \
          <div class="tp_tile_ad_container"></div> \
          <h4>Latest Activity</h4> \
        </div> \
        <div id="TP_feed" style="display:none"> \
          <div id="TP_feed_content" class="TP_feed_content"></div> \
          <div id="TP_feed_handle"> \
            <div class="TP_groove"></div> \
          </div> \
        </div> \
        <div id="TP_feed_toggle"></div> \
        <div style="display: none;" id="TP_spinner"> \
          <object width="24" height="24" data="'+TimesPeople.Config.image_host + TimesPeople.Config.image_path+'spinner.swf" type="application/x-shockwave-flash"> \
            <param value="'+TimesPeople.Config.image_host + TimesPeople.Config.image_path+'spinner.swf" name="movie"/> \
            <param value="Transparent" name="WMode"/> \
          </object> \
        </div> \
      </div> \
    </div> \
    <div id="TP_container_shadow" class="s_shadow"></div>'
  ,

  draw: function() {
    if (this.drawn) return;
    [$('TP_container'), $('TP_container_shadow')].compact().invoke('remove');
    $(document.body).insert({top:this.template})
    this.inner_container = $('TP_inner');
    this.drawn = true;
    //FIXME depends on toolbar template
    this.feedView = new TimesPeople.FeedView('TP_feed', this);
    this.registerAjaxIndicator();
  },

  registerAjaxIndicator: function() {
    var spinner = $('TP_spinner');
    Ajax.Responders.register({
      onCreate: function() {
        spinner.show();
      },
      onComplete: function() {
        spinner.hide();
      }
    });
  },

  drawMemberToolbar: function() {

    if (!TimesPeople.user.isTimesPeopleMember()) {
      $$('.toolbar_button').invoke('hide');
      this.hiddenLinks = true
    } else if (this.hiddenLinks) {
      $$('.toolbar_button').invoke('show');
      delete this.hiddenLinks;
    }

    TimesPeople.Activity.register(this.feedView);
    this.feedView.drawFeed(1);
    if (TimesPeople.firstrun) {
      this.drawPeople();
      TimesPeople.firstrun = false;
    }
    var container = $('TP_container');
    var shadow = $('TP_container_shadow');
    // workaround to successfuly reset the toolbar to fixed position in IE6
    container.style.position = '';
    container.style.top = '0%';
    container.style.top = '';
    shadow.style.position = '';
    shadow.style.top = '0%';
    shadow.style.top = '';
  },

  drawGuestToolbar: function() {
    if (window.location.href == TimesPeople.Config.get_started_uri) {
      this.drawGetStartedToolbar();
      return;
    }
    if (this.open_panel) this.open_panel.close();
    this.firstRunView = TimesPeople.firstRunView.initialize(this);
    this.firstRunView.drawFirstRun();
    $('TP_container').setStyle({position:'absolute', top: '0%'});
    $('TP_container_shadow').setStyle({position:'absolute', top: '0%'}).style.top = '30px';
  },

  drawGetStartedToolbar: function() {
    TimesPeople.user.update({following_count:0, displayname: 'Your Name'});
    $('TP_minimize_button').hide();
  },

  drawInfo: function() {
    this.info_panel = this.info_panel || new TimesPeople.InfoPanelView(this, this.inner_container);
    this.info_panel.open();
  },

  drawSettings: function() {
    this.settings_panel = this.settings_panel || new TimesPeople.SettingsPanelView(this,  this.inner_container);
    this.settings_panel.open();
  },

  drawPeople: function() {
    this.people_panel = this.people_panel || new TimesPeople.FolloweesPanelView(this,  this.inner_container);
    this.people_panel.open();
  },

  minimize: function() {
    if (!this.minimized) {
      if (this.open_panel) this.open_panel.close();
      var page = $(document.body);
      this.minimized = true;
      TimesPeople.ToolbarController.stateStore.add({minimized:'YES'});
      page.morph('padding-top:13px', {duration:0.5});
      $('TP_container').morph('top:-37px',{duration:0.5});
      $('TP_container_shadow').morph('top:-15px',{duration:0.5});
      this.minimizedView.toggle();
    }
  },

  restore: function() {
    TimesPeople.console.log('restore!');

    if (this.minimized) {
      var page = $(document.body);
      this.minimized = false;
      TimesPeople.ToolbarController.stateStore.add({minimized:'NO'});

      if (!TimesPeople.ToolbarController.initialized) {
        TimesPeople.ToolbarController.initialize();
      }
      page.morph('padding-top:51px', {duration:0.5});
      //TODO can we do this in one element + onFinished?
      $('TP_container').morph('top:0px', {duration:0.5});
      $('TP_container_shadow').morph('top:30px', {duration:0.5});
      window.setTimeout(function(){
        $('TP_container').style.top = '';
        $('TP_container_shadow').style.top = '';
      }, 600)
      this.minimizedView.toggle();
    }
  },

  update: function(msg) {
    switch(msg.event) {
    case "attributes updated":
      this.drawMemberToolbar();
      break;
    case "user saved":
      this.drawMemberToolbar();
      break;
    case "followees updated":
      break;
    case "user not registered":
      this.drawGuestToolbar();
      break;
    case "no user info":
      this.drawGuestToolbar();
    case "opened panel":
      if (this.open_panel) this.open_panel.close();
      this.open_panel = msg.data;
      break;
    case "closed panel":
      this.open_panel = null;
      if (TimesPeople.firstrun) this.drawGuestToolbar();
      break;
    case "user image updated":
      var user = msg.data;
      $$('img.you').invoke('writeAttribute', 'src', user.attributes.picURL);
      break;
    }
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.MemberToolsItemView = Class.create({

  initialize: function(toolbar) {
    this.toolbar = toolbar;
    this.toolbar.minimizedView = this;

    // TODO optimize template
    var memberTools = $('memberTools');
    var memberLinks = $('memberLinks');
    if(memberTools) {
      memberTools.insert('<li id="TP_restore_button" style="display:none"><a>TimesPeople</a></li>');
      var login_iframe = memberTools.down('iframe');
      if(login_iframe) {
        memberTools.setStyle({paddingTop:'0'});
        login_iframe.setStyle({
          width: '400px',
          position: 'relative',
          top: '2px',
          marginRight: '-4px'
        });
      }
    }
    else if(memberLinks){
      memberLinks.insert('- <a id="TP_restore_button" style="display:none">TimesPeople</a>');
    }
    else {
      var page = $('shell') || $(document.body);
      page.insert({top:'<a id="TP_restore_button" style="display:none;position: absolute; top: -15px; right: 0pt;font-family: Arial, Helvetica, sans-serif;font-size:10px;">TimesPeople</a>'});
    }

    this.button = $('TP_restore_button');
    this.button.observe('click', this.toolbar.restore.bind(this.toolbar));
  },

  toggle: function() {
    this.button.toggle();
  },

  show: function() {
    this.button.show();
  }

});/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.ToolbarController = {

  initialize: function() {
    TimesPeople.Ajax = Ajax;
    this.toolbarView = new TimesPeople.ToolbarView();
    this.minimizedView = new TimesPeople.MemberToolsItemView(this.toolbarView);
    this.stateStore = NYTD.Cookies.getOrCreate('tpstate');
    this.run();
  },

  run: function() {
    if (this.stateStore.lookup('minimized') == 'YES') {
      this.runMinimized();
    }
    else {
      this.runMaximized();
    }
  },

  runMinimized: function() {
    this.toolbarView.minimized = true;
    this.minimizedView.show();
  },

  runMaximized: function() {
    //TODO remove global user
    TimesPeople.user = TimesPeople.User.getInstance();
    TimesPeople.user.register(this.toolbarView);
    this.toolbarView.draw();
    this.initialized = true;
    this.userView = new TimesPeople.userView(this.toolbarView);
    TimesPeople.user.register(this.userView);
    TimesPeople.user.requestAttributes();
  }

};/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.ActivityCollectionController = {

    initialize: function() {
      if (TimesPeople.Page.isReady()) {
        this.user = TimesPeople.User.getInstance();
        if(this.user.newRecord) {
          this.user.register(TimesPeople.ActivityCollectionController);
        }
        else {
          if(this.user.isTimesPeopleMember()) {
            this.listen();
          }
        }
      }
      else {
        arguments.callee.attempts = arguments.callee.attempts || 0;
        if (arguments.callee.attempts < 5) {
          arguments.callee.bind(this).defer();
          arguments.callee.attempts++;
        }
      }
    },

    update: function(msg) {
      switch(msg.event) {
      case "attributes updated":
        TimesPeople.console.log('attributes updated', this);
        this.listen();
        this.user.unregister(TimesPeople.ActivityCollectionController);
        break;
      }
    },

    assign: function(activity, fn) {
      if (Object.isFunction(fn)) {
        fn = fn.wrap(function(proceed){
          new TimesPeople.Activity('recommended', TimesPeople.Page.title);
          proceed();
        });
      }
    },

    listen: function() {

    	if (this.listening) return;

    	var headline   = "";
    	var text       = "";
    	this.listening = true;

		if (TimesPeople.Page.initialize())
		{
			this.draw();
		}
    },

	draw: function() {
/*
	Common across page groups
*/
		if (TimesPeople.Page.group!=undefined)
		{

			switch (TimesPeople.Page.group){
				case "article":	
					this.addRecommend();
					this.addRecommend({key: "div.nextArticleLink", target: "div.nextArticleLink", type: "span", style: "float:right;", position: "first", html: "<a class='timespeople_recommend_link' href='javascript:void(0);' style='background-image:url(__ICON__); background-repeat:no-repeat; padding:0 0 3px 20px; font-size:1em;'>Recommend</a>"});
					this.addComments();
					break;
				case "topic":

					if (TimesPeople.Page.section == "business")
					{
						this.addRecommend({ key: "#breadcrumbs", target: "#breadcrumbs", type: "span", style: "float:right", position: "first", html: "<a class='timespeople_recommend_link' style='color:#333; padding:1px 0 3px 20px; font-size:1em; text-transform:uppercase; background-image:url(__ICON__); background-repeat: no-repeat;' href='javascript:void(0);'>Recommend</a>" });		//	Verifed on Dev for: regular, travel, health (has issues on some + potential ad conflict)
					}
					else
					{
						this.addRecommend();
					}

					break;
				case "multimedia":
					this.addRecommend();
					break;
				case "venue":	
					this.addRecommend();
					this.addRate();
					this.addComments();
					break;
				case "community":
					this.addRecommend();
					this.addRate();
					this.addComments();
					break;
				default :
				//	nothing
			}
/*
		Unique to specific pages
*/
			switch (TimesPeople.Page.type){
				case "blog post":	
					this.addRecommend();
					this.addComments();
					break;
				case "travel guide":
					this.addComments();
					break;
				case "movie guide":
					this.addRate();
					break;
			}

			return true;
		}
		return false;
	},

	addRecommend: function(custom) {

		var icon_host    = TimesPeople.Config.image_host + "/images/global/icons/";	// "http://graphics8.nytimes.com/images/global/icons/";
		var icon         = (TimesPeople.Page.type == 'slide show') ? icon_host + "recommend_dark.gif" : icon_host + "recommend.gif";
		var btnRecommend;

		if (arguments.length==1) {
			btnRecommend = arguments[0]
		} else {
			if (TimesPeople.Config.Action.Recommend[TimesPeople.Page.group] != undefined)
			{
				if (TimesPeople.Config.Action.Recommend[TimesPeople.Page.group][TimesPeople.Page.type] != undefined)
				{
					btnRecommend = TimesPeople.Config.Action.Recommend[TimesPeople.Page.group][TimesPeople.Page.type];
				}
				else
				{
					btnRecommend = TimesPeople.Config.Action.Recommend[TimesPeople.Page.group]['default'];
				}
			}
		}

		TimesPeople.console.log("Trying to add Recommend button");

	//	Attach event
		function btnTrack(e) {
			var btnTarget = e.target;
			Event.stopObserving(btnTarget,'click', btnTrack, true);
			btnTarget.innerHTML = 'Thanks!';
			new TimesPeople.Activity('recommended', TimesPeople.Page.title);
			window.setTimeout(btnClear, 3000);
			return false;
		}

		function btnClear() {
			var recommend_btns = $$('a.timespeople_recommend_link');
			if (recommend_btns.length>0){
				for (e = 0; e < recommend_btns.length; e++ ) {
					Element.remove(recommend_btns[e]);
				}
			}
		}

		if (btnRecommend)
		{
			var btnKey = $$(btnRecommend.key)[0];

			if (btnKey)
			{
				var btnTarget = $$(btnRecommend.target)[0];
				if (btnTarget)
				{
					var btn = new Element(btnRecommend.type, {style: btnRecommend.style});
					btn.innerHTML = btnRecommend.html.replace(/__ICON__/g, icon);
					btn.className = "timespeople_btn_recommend";

					if (btnRecommend.position == "first") {
						btnTarget.insert({top:btn});
					} else {
						btnTarget.insert({bottom:btn});
					}

					Event.observe(btn, 'click', btnTrack, true);
				}
			}

		}
		return;
	},

	addRate: function() {
		TimesPeople.console.log("Trying to add Ratings");

		var isRatable  = ($$('div.readerRating')[0]) ? true : false;
		var hasRateDiv = ($$('div.subListB')[0])     ? true : false;

		if (isRatable && hasRateDiv)
		{
			var title  = '';
			var review = '';

			if (TimesPeople.Page.section=='movies') {
				switch(TimesPeople.Page.group)
				{
					case 'article':
						title  = TimesPeople.Page.getEmbeddedValue(['div.header h1']);
						review = TimesPeople.Page.getEmbeddedValue(['p:not(p:empty)']);
						break;
					case 'topic':
						title  = TimesPeople.Page.getEmbeddedValue(["meta[name='MTI']"]);
						review = TimesPeople.Page.getEmbeddedValue(["p.review"]);
						break;
					case 'community':
						title  = TimesPeople.Page.getEmbeddedValue(["meta[name='MTI']"]);
						review = TimesPeople.Page.getEmbeddedValue(['div.reviewText']);
				}
			} else if (TimesPeople.Page.section=='travel') {
				title  = TimesPeople.Page.getEmbeddedValue(["div.bColumn h5"]);
				review = TimesPeople.Page.getEmbeddedValue(['div.bColumn p']);
			}

			if (title!='' && review!='') {
				TimesPeople.console.log("Adding events to images");
				var imageList = $$('div.subListB')[0].select('img');
				imageList.each(function(img){
					Event.observe(img, 'click', function(event) {
						new TimesPeople.Activity('rated', title, review.stripTags().truncate(250));
					});
				});	
			}
		}
	},
	
	addComments: function() {
	
		TimesPeople.console.log("Trying to add for Comments");

		if (TimesPeople.Page.type=="article")
		{
/*
		Comment Overflow page
*/
			var metaPST    = $$("meta[name='PST']")[0];

			if (metaPST != undefined)
			{
				var contentPST = metaPST.getAttribute('content');
			
				if (contentPST=="Comments Overflow")
				{

				//	Article Comments
					if ($('comment')) {
						var submitButton  = $$('input[alt="submit"]')[0];
						Event.observe(submitButton, 'click', function(event) {
							var comment = $$('#comment textarea')[0].value;
							new TimesPeople.Activity('commented', TimesPeople.Page.title, comment);
						});
					}

				//	Recommend an Article Comment
					var allComments = $$('div.sequence');

					if (allComments.length>0) {
						$$('a[href="#"]').each(function(button){
							if (button.innerHTML.toLowerCase()=="recommend")
							{
								var divBody   = button.up('div.body');
								var comment   = divBody.innerHTML.truncate(140).stripTags();
								var commentNo = divBody.down('span.feedback').id;
								var url       = location.href.split('?')[0]+"?permid="+commentNo+"&src=tp#comment"+commentNo;

								Event.observe(button, 'click', function(event) {
									new TimesPeople.Activity('recommended', TimesPeople.Page.title, comment, url, '', 'comment');
								});
							}
						});
					}
				}
				else if (contentPST=="Blog Post")
				{
				//  Blog: Comments
					if ($('submit-comment')) {
						$('submit-comment').observe('click', function(e) {
							new TimesPeople.Activity('commented', TimesPeople.Page.title, $('comment').value);
						}, true);
					}
				}
			}
		}

		if (TimesPeople.Page.type=="blog post")
		{
		//  Blog: Comments
			if ($('submit-comment')) {
				$('submit-comment').observe('click', function(e) {
					new TimesPeople.Activity('commented', TimesPeople.Page.title, $('comment').value);
				}, true);
			}
		}
/*
	Check in Travel Topics and on Venues
*/
		if (TimesPeople.Page.group=="topic" || TimesPeople.Page.group=="venue")
		{
		//  Comment: Travel Topic (aka suggestion)
			TimesPeople.console.log("Adding for " + TimesPeople.Page.group);

			if ($('shareSuggestions')) {
				var form = $$('#shareSuggestions form')[0];
				if (form) {
					form.observe("submit",  function(e) {
						if ($F('suggestion')){
							new TimesPeople.Activity('reviewed', TimesPeople.Page.title, $('suggestion').value.stripTags().truncate(250));
						}
					}, true);
				}
			}
		}
/*
	Movie Reviews
*/
		if (TimesPeople.Page.group=="community")
		{
			if ($('submitReviews')) {
				var movieForm = $$('#submitReviews form')[0];
				if (movieForm) {
					movieForm.observe("submit",  function(e) {
						var movTitle  = $('reviewtitle').value;
						var movText   = $('suggestion').value;
						new TimesPeople.Activity('reviewed', movTitle, movText);
					}, true);
				} else {
					TimesPeople.console.log("Movie Revie: No form found");
				}
				return false;
			}
		}
	},

	addOthers:function() {
		// ndy
	}
};
/*
$Id: build.js 15918 2009-03-11 00:25:45Z santep $
(c) 2008 The New York Times Company
*/

TimesPeople.run = function(){
  if(document.body && document.body.firstChild){
    TimesPeople.ToolbarController.initialize();
    Ajax.Responders.register({
      onCreate: function(request) {
        if (RegExp(TimesPeople.Config.service).test(request.url) && request.method == 'post') {
          Object.extend(request.parameters, { version: TimesPeople.version, RMID: TimesPeople.Config.RMID });
          request.options.postBody = Object.toQueryString(request.parameters);
        }
      }
    });
  }
  else {
    setTimeout(TimesPeople.run, 10);
  }
}

Event.observe(window, 'load', function() {
	TimesPeople.ActivityCollectionController.initialize();
});

TimesPeople.run();

// Tue Mar 10 18:33:05 EDT 2009
