/* tab */
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property]
	}
	return destination
};

function contains(root, el) {
	if (!el) {
		return false
	}
	if (root.compareDocumentPosition) return root === el || !!(root.compareDocumentPosition(el) & 16);
	if (root.contains && el.nodeType === 1) {
		return root.contains(el) && root !== el
	}
	while ((el = el.parentNode))
		if (el === root) return true;
	return false
};

function getElementsByClassName(className, element) {
	var children = (element || document).getElementsByTagName('*');
	var elements = [];
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var classNames = child.className.split(' ');
		for (var j = 0; j < classNames.length; j++) {
			if (classNames[j] == className) {
				elements.push(child);
				break
			}
		}
	}
	return elements
};

function addEventSimple(obj, evt, fn) {
	if (obj.addEventListener) obj.addEventListener(evt, fn, false);
	else if (obj.attachEvent) obj.attachEvent("on" + evt, fn)
};
var Bind = function(object, fun) {
	var args = Array.prototype.slice.call(arguments).slice(2);
	return function() {
		return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)))
	}
};
var Tween = {
	Quart: {
		easeOut: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b
		}
	}
};
var CurrentStyle = function(element) {
	return element.currentStyle || document.defaultView.getComputedStyle(element, null)
};
var tabs = function(id, cls, options) {
	this.container = document.getElementById(id);
	this.panel = getElementsByClassName(cls, this.container);
	this.count = this.panel.length;
	this.slider = getElementsByClassName("bd", this.container)[0];
	this.Tween = Tween.Quart.easeOut;
	this.t = this.b = this.c = 0;
	this.timer = null;
	this.index = 0;
	this.setOptions(options);
	this.trigger = this.options.trigger === false ? false : document.getElementById(id).getElementsByTagName("ul")[0].getElementsByTagName("li");
	this.onStart = this.options.onStart;
	this.event = this.options.event;
	this.timeout = this.options.timeout;
	this.onFinish = this.options.onFinish;
	this.change = this.options.change;
	this.duration = this.options.duration;
	this.auto = this.options.auto;
	this.pause = this.options.pause;
	this.stop = false;
	this.init()
};
tabs.prototype = {
	init: function() {
		this.panel[0].className += " " + this.options.disCls;
		if (this.options.animation) {
			this.container.className += " " + this.options.animation
		}
		if (this.options.animatio && this.options.animation == "fade") {
			this.switchTo(0)
		}
		if(this.trigger){
			this.trigger[0].className += " " + this.options.currCls;
			for (var i = 0; i < this.count; i++) {
				(function(index, that) {
					addEventSimple(that.trigger[index], that.options.event, function() {
						clearTimeout(that.timer);
						that.timer = setTimeout(function() {
							that.switchTo(index)
						}, that.timeout)
					})
				})(i, this)
			}
		}
		if (this.options.auto) {
			(function(that) {
				addEventSimple(that.container, "mouseout", function(e) {
					clearTimeout(that.timer);
					evt = e || window.event;
					relateNode = evt.relatedTarget || evt.toElement;
					if (!contains(that.container, relateNode)) {
						that.auto = true;
						that.timer = setTimeout(Bind(that, that.next), that.pause)
					}
				});
				addEventSimple(that.container, "mouseover", function() {
					if (that.auto) {
						that.auto = false
					}
				})
			})(this)
		}
		if (this.auto) {
			this.timer = setTimeout(Bind(this, this.next), this.pause)
		}
	},
	setOptions: function(options) {
		this.options = {
			timeout: 100,
			currCls: "on",
			disCls: "dis",
			event: "mouseover",
			duration: 25,
			change: 350,
			auto: false,
			onFinish: function() {},
			animation: null,
			pause: 3000
		};
		Extend(this.options, options || {})
	},
	stopSwitch : function(){
		this.stop = true;
	},
	goonSwitch : function(){
		this.stop = false;
	},
	switchTo: function(n) {
		if(this.stop) return false;
		clearTimeout(this.timer);
		n < 0 && (n = this.count - 1) || n >= this.count && (n = 0);
		if (this.index == n) {
			return
		}
		if(this.trigger){
			this.trigger[this.index].className = this.trigger[this.index].className.replace(this.options.currCls, "");
			this.trigger[n].className += " " + this.options.currCls;
		}
		if (!this.options.animation) {
			this.panel[this.index].className = this.panel[this.index].className.replace(this.options.disCls, "")
		};
		if (this.options.animation && (this.options.animation == "slide")) {
			this.target = -Math.abs(this.change) * n;
			this.t = 0;
			this.b = parseInt(CurrentStyle(this.slider)["left"]);
			this.c = this.target - this.b;
			this.slide()
		} else if (this.options.animation && (this.options.animation == "fade")) {
			this.panel[n].style.zIndex = 2;
			this.fade(this.panel[this.index], 0, 3);
			this.panel[this.index].style.zIndex = 1;
			this.fade(this.panel[n], 100, 3);
			this.panel[n].style.zIndex = 3
		} else {
			this.panel[n].className += " " + this.options.disCls;
			if (this.auto) {
				this.timer = setTimeout(Bind(this, this.next), this.pause)
			}
		}
		this.onFinish(this.index, n, this.panel[n]);
		this.index = n
	},
	next: function() {
		var n = this.index + 1;
		this.switchTo(n)
	},
	prev: function() {
		var n = this.index - 1;
		this.switchTo(n)
	},
	slide: function() {
		if (this.c && this.t < this.duration) {
			this.slider.style.left = Math.round(this.Tween(this.t++, this.b, this.c, this.duration)) + 'px';
			setTimeout(Bind(this, this.slide), 10)
		} else {
			this.slider.style.left = this.target + 'px';
			if (this.auto) {
				this.timer = setTimeout(Bind(this, this.next), this.pause)
			}
		}
	},
	fade: function(element, transparency, speed, callback) {
		if (typeof(element) == 'string') element = document.getElementById(element);
		if (!element.effect) {
			element.effect = {};
			element.effect.fade = 0
		}
		clearInterval(element.effect.fade);
		var speed = speed || 1;
		var start = (function(elem) {
			var alpha;
			if (navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
				alpha = elem.currentStyle.filter.indexOf("opacity=") >= 0 ? (parseFloat(elem.currentStyle.filter.match(/opacity=([^)]*)/)[1])) + '' : '100'
			} else {
				alpha = 100 * elem.ownerDocument.defaultView.getComputedStyle(elem, null)['opacity']
			}
			return alpha
		})(element);
		var self = this;
		element.effect.fade = setInterval(function() {
			start = start < transparency ? Math.min(start + speed, transparency) : Math.max(start - speed, transparency);
			element.style.opacity = start / 100;
			element.style.filter = 'alpha(opacity=' + start + ')';
			if (Math.round(start) == transparency) {
				element.style.opacity = transparency / 100;
				element.style.filter = 'alpha(opacity=' + transparency + ')';
				clearInterval(element.effect.fade);
				if (self.auto && transparency == 100) {
					self.timer = setTimeout(Bind(self, self.next), self.pause)
				}
			}
		}, 20)
	}
}; /*  |xGv00|4c7b30d82293a08ce31ebe111d1c8b4d */