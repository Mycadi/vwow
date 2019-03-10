/**
 * base.js
 * 作者: Peter Chan
 * 描述：这个是后台的公共类库，它为其它页面的JS提供一些公共函数
 * 
 */

(function() 
{
	var ANIMATE_KEY = "m_animateList";		/* 用来保存动画数据的属性值 */
	
	/**
	 * @param data:{} 要设置的值, 注意：值的单位要写清楚
	 * @param duration:number	过渡时间(数值，以毫秒计算，不用写单位)
	 * @param fn:function	动画完成后的执行的函数
	 * @param easing		动画执行的方式，现在只支持有过渡属性的浏览器
	 * @param initObj: {}	动画之前需要初始化的数据
	 * @param delay:number	延迟执行动画的时间(数值，以毫秒计算，不用写单位)
	 * 
	 */
	$.fn.uAnimate = function (data, duration, fn, easing, initObj, delay) 
	{
		var jThis = this;
		
		var vendor = __tranKey();
		if (vendor)
		{
			/* 保存原始数据，以便以后调用 */
			var dataObj = {};
			dataObj.m_data = data;
			dataObj.m_duration = (typeof duration == "number") ? duration : 600;
			dataObj.m_fn = fn;
			dataObj.m_easing = easing;
			dataObj.m_initObj = initObj;
			dataObj.m_delay = delay;
			
//			dataObj.m_handler = null;
//			dataObj.m_initTimerId = null;		/* 记录初始化计时器的ID(这两者是不能同时存在的) */
//			dataObj.m_cbTimerId = null;		/* 记录反馈函数计时器的ID */
			
			var target = jThis.get(0);
			if (target)
			{
				var dataList = target[ANIMATE_KEY];
				if (!dataList)
				{
					dataList = [];
					target[ANIMATE_KEY] = dataList;
				}
				
				dataList.push(dataObj);
				
				if (dataList.length <= 1)	/* 对于这个元素来说，当前没有动画在执行，所以要启动动画 */
				{
					__execAnimate(jThis);
				}
				else
				{
					//存在动画在执行，把原始数据放进队列里页，当动画执行到此时，会自动启动的
				}
			}
		}
		else
		{
			/* 使用jQuery原来的动画 */
			if (delay)
			{
				if (!initObj)
				{
					jThis.delay(delay).animate(data, duration, fn);
				}
				else
				{
					jThis.css(initObj).delay(delay).animate(data, duration, fn);
				}
			}
			else
			{
				if (!initObj)
				{
					jThis.animate(data, duration, fn);
				}
				else
				{
					jThis.css(initObj).animate(data, duration, fn);
				}
			}
			
		}
		
		return this;
	};
	
	/**
	 * 执行动画
	 * @param jTarget 执行动画的主体
	 * @param fromQueue 这个动画是否来队列
	 */
	function __execAnimate(jTarget, fromQueue)
	{
		var target = jTarget.get(0);
		var dataList = target[ANIMATE_KEY];
		if ((!dataList) || dataList.length <= 0)
		{
			return false;		/* 没有数据，退出 */
		}
		var dataObj = dataList[0];
		
		var vendor = __tranKey();
		
		var called = false;
		var timeout = dataObj.m_duration + 50;	/* 延迟点50ms, 以确保可以用系统的监听接收到事件完成 */
		var cssObj = {};
		if (typeof dataObj.m_delay == "number")
		{
			timeout += new Number(dataObj.m_delay);
			cssObj[vendor.delay] = dataObj.m_delay + "ms";
		}
		
		var handler = function(event)
		{
			/* 1: 来自于timer或来自于自己，其它的不要 */
			if (!event || jTarget.get(0) == event.target)
			{
				if (!called)	/* 保证只执行一次, 因为property有两个值或以上时，它会执行多次，并且向下派送 */
				{
					called = true;
					
					if (!event)	/* 来自timer，简单模拟实例化一个事件, 最常用还是target属性 */
					{
						/* 这个事件即使传回去也基本上也不会用，所以先注释 */
						/*
						if (document.createEvent)
						{
							event = document.createEvent('HTMLEvents');	
							event.initEvent('transitionend', false, true);
							event.target = jTarget.get(0);
						}
						else
						{
							event = {};
							event.target = jTarget.get(0);
						}
						console.log(12);
						*/
					}
					else
					{
						event.preventDefault();
						event.stopPropagation();
					}
					
					/* 把它放在fn.call后面，是因为jquery的动画要执行反馈函数后这个动画才算完成，所以这里与jQuery统一 */
					__uOff(jTarget, false, true, false);	
				}
				
				return false;	/* 禁止向下传递 */
			}
			else
			{
				// 不是自己的，不必理会
			}
		};
		
		if (dataObj.m_initObj || fromQueue)
		{
			if (dataObj.m_initObj)
			{
				jTarget.css(dataObj.m_initObj);
			}
			
			var restartAnimate = function()
			{
				/* 重新绑定 */
				target.addEventListener(vendor.cbFn, handler, false);
				var timerId = setTimeout(handler, timeout);	
				dataObj.m_handler = handler;
				dataObj.m_cbTimerId = timerId;
				if (!(dataObj.m_initTimerId))
				{
					delete dataObj.m_initTimerId;		
				}
				/* 重新设置 */
				var txtPro = '';
				var data = dataObj.m_data;
				for(var key in data)
				{
					txtPro += ',' + key;
					cssObj[key] = data[key];
				}
				if (txtPro)
				{
					txtPro = txtPro.substring(1);
				}
				
				cssObj[vendor.property] = txtPro;
				cssObj[vendor.duration] = dataObj.m_duration + "ms";
				if (dataObj.m_easing)
				{
					cssObj[vendor.timing] = dataObj.m_easing;
				}
				
				__setCss(jTarget, cssObj);
			};
			var initTimerId = setTimeout(restartAnimate, 20);	/* 为什么有初始化或都从队列中启动要采用setTimeout方法启动呢，因为程序若一条龙写下去，没有停顿给页面刷新，动画会立刻完成 */
			dataObj.m_initTimerId = initTimerId;
			if (!(dataObj.m_cbTimerId))
			{
				delete dataObj.m_cbTimerId;		
			}
			
			return false;		/* 退出,等待启动restartAnimate */
		}
		
		/* 重新绑定 */
		target.addEventListener(vendor.cbFn, handler, false);
		var timerId = setTimeout(handler, timeout);	
		dataObj.m_handler = handler;
		dataObj.m_cbTimerId = timerId;
		if (!(dataObj.m_initTimerId))
		{
			delete dataObj.m_initTimerId;		
		}
		
		var txtPro = '';
		for(var key in dataObj.m_data)
		{
			txtPro += ',' + key;
			cssObj[key] = dataObj.m_data[key];
		}
		if (txtPro)
		{
			txtPro = txtPro.substring(1);
		}
		
		cssObj[vendor.property] = txtPro;
		cssObj[vendor.duration] = dataObj.m_duration + "ms";
		if (dataObj.m_easing)
		{
			cssObj[vendor.timing] = dataObj.m_easing;
		}
		
		__setCss(jTarget, cssObj);
	
		
		
		target = null;
		dataList = null;
	}
	
//	function __request(fn)
//	{
//		var requestAnimationFrame = window.requestAnimationFrame
//		|| window.mozRequestAnimationFrame
//		|| window.webkitRequestAnimationFrame
//		|| window.msRequestAnimationFrame
//		|| window.oRequestAnimationFrame
//		|| function(callback) {
//		setTimeout(callback, 1000 / 60);
//		};
//		
//		requestAnimationFrame(fn);
//	}
	
	/* 扩展jQuery动画，把transition加进去 */
	function __tranKey() 
	{
		
//		return false;
		
		var vendor = arguments.callee.m_vendor;
		
		if (vendor == null)		/* 这是第一次访问, 整理出数据 */
		{
			vendor = false;		/* 初始化 */
			var elem = document.createElement('div');
			//elem.style.cssText = "transition-property: left; background: red;";
			var dummyStyle = elem.style;	/* 用(defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle);结果也是一样 */
			
		    var tmpVendor = {}, transitions, transforms;
		    
		    /*
		     * 判断事件是否存在
		     */
		    transitions = 
		    [
//		     	{name: "transition", property: "transitionProperty", duration: "transitionDuration", delay: "transitionDelay",
//		     		timing: "transitionTimingFunction", timingCss: "transition-timing-function", cbFn: "transitionend"},
//		     	{name: "webkitTransition", property: "webkitTransitionProperty", duration: "webkitTransitionDuration", delay: "webkitTransitionDelay",
//		     			timing: "webkitTransitionTimingFunction", timingCss: "-webkit-transition-timing-function", cbFn: "webkitTransitionEnd"},
//     			{name: "MozTransition", property: "MozTransitionProperty", duration: "MozTransitionDuration", delay: "MozTransitionDelay",
//		     		timing: "MozTransitionTimingFunction", timingCss: "-moz-transition-timing-function", cbFn: "transitionend"},	/* 不可用MozTransitionend, transitionend通过, bootstrap也是这么写的 */
//	     		{name: "OTransition", property: "OTransitionProperty", duration: "OTransitionDuration", delay: "OTransitionDelay",
//	     			timing: "OTransitionTimingFunction", timingCss: "-o-transition-timing-function", cbFn: "oTransitionEnd otransitionend"}		/* 测试: oTransitionEnd不能通过; otransitionend通过, bootstrap也是这么写的*/

				/* 对于最新的Opera[版本12.15]浏览器，它已经支持transition了，当然也支持OTransition,它的两个结束事件类型也是支持的["oTransitionEnd", "otransitionend"] */
				/* 
				 * 最后的"OTransition"的函数为什么不写成cbFn: "oTransitionEnd otransitionend"，而是选择使用其中一个呢？
				 * 这是因为addEventListener不支持一起监听，
				 * 还有：
				 * 1：最新的Opera浏览器，它已经支持transition，所以OTransition只是一个备用
				 * 2：代码要添加许多，不利于性能优化；
				 * 3：OTransition是低级Opera的属性，这些版本的Opera很少人用了这些版本，不必劳民伤财；
				 * 4：即使在低级浏览器中运行，没有触发结束事件，计时器到时间也会调用结束函数，不用出现错误
				 */	
				{name: "transition", property: "transition-property", duration: "transition-duration", delay: "transition-delay",
		     		timing: "transition-timing-function", cbFn: "transitionend"},
		     	{name: "webkitTransition", property: "-webkit-transition-property", duration: "-webkit-transition-duration", delay: "-webkit-transition-delay",
			     		timing: "-webkit-transition-timing-function", cbFn: "webkitTransitionEnd"},
     			{name: "MozTransition", property: "-moz-transition-property", duration: "-moz-transition-duration", delay: "-moz-transition-delay",
				     		timing: "-moz-transition-timing-function", cbFn: "transitionend"},
	     		{name: "OTransition", property: "-o-transition-property", duration: "-o-transition-duration", delay: "-o-transition-delay",
					     		timing: "-o-transition-timing-function", cbFn: "otransitionend"}		


		     ];
		    
		    /* 经测试，以上（包括注释的部分）属性在各自己的浏览器中都会出现，有的不只一个，
		     *  */
		    for (var i = 0; i < transitions.length; i++)
		    {
		    	var tmpTransition = transitions[i];
		    	if (tmpTransition.name in dummyStyle)
		    	{
		    		/* 记录所需要的值 */
		    		tmpVendor.name = tmpTransition.name;
		    		tmpVendor.property = tmpTransition.property;
		    		tmpVendor.duration = tmpTransition.duration;
		    		tmpVendor.delay = tmpTransition.delay;
		    		tmpVendor.timing = tmpTransition.timing;
		    		tmpVendor.cbFn = tmpTransition.cbFn;
		    		break;
		    	}
		    }
		    
		    
		    /* 有过渡效果特性 */
		    if (tmpVendor.name)
		    {
		    	vendor = tmpVendor;
				arguments.callee.m_vendor = vendor;
		    }
		    else
		    {
		    	tmpVendor = false;
		    	vendor = tmpVendor;
				arguments.callee.m_vendor = vendor;
		    }
		    
		    /* 释放内存 */
			transitions = null;
			transforms = null;
		}
		
		return vendor;
		
	}
	

	
	
	/** 设置样式 */
	function __setCss(jTarget, data)
	{
		jTarget.css(data);
	}
	/**
	 * 根据data传入来的style属性，取出当前的对应的值
	 * 取得元素节点的样式
	 */
	function __getCss(jTarget, data)
	{
		var target = jTarget.get(0);
		
		var doc = target.ownerDocument;
		var defaultView = doc.defaultView;
		var eStyle = (defaultView ? defaultView.getComputedStyle(target, null) : target.currentStyle);
		if (eStyle)
		{
			var newData = {};
			for (var key in data)
			{
				newData[key] = eStyle[key];
			}
			return newData;
		}
		else
		{
			throw "Exception in __getCss";
		}
	}
	
	
	/**
	 * 停止/取消动画
	 * @param target
	 * @param clearQueue 如果设置成true，则清空队列。可以立即结束动画。
	 * @param gotoEnd 当为true时，立即执行到最后，并且isForce无效
	 * @param isForce 对于当前的值,是否强制再次写上(此参暂时不可用,因为在测试过程中,若为false时,前页的动画没有禁止的话,动画路径不是预想中的那样)
	 */
	function __uOff(jTarget, clearQueue, gotoEnd, isForce)
	{
		var target = jTarget.get(0);
		var dataList = target[ANIMATE_KEY];
		if ((!dataList) || dataList.length <= 0)
		{
			return false;		/* 没有数据，退出 */
		}
		var curDataObj = dataList[0];
		
		
		var initTimerObj = target.m_initTimerObj;
		
		var vendor = __tranKey();
		
		/* 解除相应的绑定（或监听） */
		var initTimerId = curDataObj.m_initTimerId;
		if (initTimerId == null)	/* 不处于初始化过程,已启动监听了,所以要解除绑定 */
		{
			target.removeEventListener(vendor.cbFn, curDataObj.m_handler);
			clearTimeout(curDataObj.m_cbTimerId);
		}
		else	/* 处于初始化过程,取消初始化启动 */
		{
			clearTimeout(initTimerId);
		}
		
		if (gotoEnd)	/* 执行当前动画的反馈函数 */
		{
			var cssObj = {};
			cssObj[vendor.property] = "none";	/* 这个必须要使用none，否则动画有可能无法停止（空字符的话，chrome可以停止，IE11和FF都没有停止） */
			cssObj[vendor.duration] = "";
			if (typeof curDataObj.m_delay == 'number')
			{
				cssObj[vendor.delay] = "";
			}
			if (curDataObj.m_easing)
			{
				cssObj[vendor.timing] = "";
			}
//			var oldData = curDataObj.m_data;
//			for(var key in oldData)
//			{
//				cssObj[key] = oldData[key];
//			}
			__setCss(jTarget, cssObj);
			
			var fn = curDataObj.m_fn;
			if (fn)
			{
				fn.call(target);
			}
		}
		else
		{
			
//			if (isForce)	/* 定位在当前值 */
//			{
				var cssObj = {};
				cssObj[vendor.property] = "none";	/* 这个又可以为空，测试条件如上：原因不明 */
				cssObj[vendor.duration] = "";
				
				var oldData = curDataObj.m_data;
				var curData = __getCss(jTarget, oldData);
				for(var key in curData)
				{
					cssObj[key] = curData[key];
				}
				if (typeof curDataObj.m_delay == 'number')
				{
					cssObj[vendor.delay] = "";
				}
				if (curDataObj.m_easing)
				{
					cssObj[vendor.timing] = "";
				}
				__setCss(jTarget, cssObj);
//			}
			
		}
		
		if (clearQueue)		/* true: 停止当前动画,全部删除后面的队列 */
		{
			/* 释放内存 */
			for (var i = 0; i < dataList.length; i++)
			{
				var obj = dataList[i];
				if (obj.hasOwnProperty)
				{
					for (var key in obj)
					{
						if (obj.hasOwnProperty(key))
						{
							delete obj[key];
						}
					}
				}
			}
			target[ANIMATE_KEY] = null;		/* 前空动画队列 */
			
		}
		else	/* false: 停止当前动画,然后继续执行下一个动画(若存在) */
		{
			/* 释放内存 */
			var firstObj = dataList.shift();
			if (firstObj.hasOwnProperty)
			{
				for (var key in firstObj)
				{
					if (firstObj.hasOwnProperty(key))
					{
						delete firstObj[key];
					}
				}
			}
			
			/* 若存在,执行下一个动画 */
			if (dataList.length > 0)
			{
//				setTimeout(__execAnimate, 10, jTarget);
				__execAnimate(jTarget, true);
			}
		}
	}
	
	
	  /**
	   * 停止动画
	   * @param clearQueue:如果设置成true，则清空队列。可以立即结束动画。
	   * @param gotoEnd:让当前正在执行的动画立即完成，并且重设show和hide的原始样式，调用回调函数等。
	   * @param isForce 因为对CSS3的transition来说,若有后缀动画，不取消，效果会更好
	   */
	$.fn.uStop = function (clearQueue, gotoEnd, isForce) 
	{
		if (__tranKey())
		{
			__uOff(this, clearQueue, gotoEnd, isForce);
		}
		else
		{
			this.stop(clearQueue, gotoEnd);
		}
		return this;
	};
	
	/**
	 * 渐变显示
	 * @param duration:number	过渡时间(数值，以毫秒计算，不用写单位)
	 * @param fn:function	动画完成后的执行的函数
	 * @param easing		动画执行的方式，现在只支持有过渡属性的浏览器
	 * @param initObj: {}	动画之前需要初始化的数据
	 * @param delay:number	延迟执行动画的时间(数值，以毫秒计算，不用写单位)
	 * 
	 * 注: display的值有很多,但根据以后的经验,显示时全部都是用block
	 */
	$.fn.uFadeIn = function (duration, fn, easing, initObj, delay) 
	{
		var vendor = __tranKey();
		if (vendor)
		{
			var newInitObj = {};
			if (initObj)
			{
				for (var key in initObj)
				{
					newInitObj[key] = initObj[key];
				}
			}
			newInitObj['display'] = 'block';
			
			this.uAnimate({"opacity": 1}, duration, fn, easing, newInitObj, delay);
		}
		else
		{
			/* 使用jQuery原来的动画 */
			if (delay)
			{
				if (!initObj)
				{
					this.delay(delay).fadeIn(duration, fn);
				}
				else
				{
					this.css(initObj).delay(delay).fadeIn(duration, fn);
				}
			}
			else
			{
				if (!initObj)
				{
					this.fadeIn(duration, fn);
				}
				else
				{
					this.css(initObj).fadeIn(duration, fn);
				}
			}
		}
		return this;
	};
	
	/**
	 * 渐变消失
	 * @param duration:number	过渡时间(数值，以毫秒计算，不用写单位)
	 * @param fn:function	动画完成后的执行的函数
	 * @param easing		动画执行的方式，现在只支持有过渡属性的浏览器
	 * @param initObj: {}	动画之前需要初始化的数据
	 * @param delay:number	延迟执行动画的时间(数值，以毫秒计算，不用写单位)
	 * 
	 * 注: display的值有很多,但根据以后的经验,显示时全部都是用block
	 */
	$.fn.uFadeOut = function (duration, fn, easing, initObj, delay) 
	{
		var vendor = __tranKey();
		if (vendor)
		{
			var newInitObj = {};
			if (initObj)
			{
				for (var key in initObj)
				{
					newInitObj[key] = initObj[key];
				}
			}
			
			var newFn = function(event)
			{
				$(this).css("display", "none");
				fn.call(this, event);
			};
			
			this.uAnimate({"opacity": 0}, duration, newFn, easing, newInitObj, delay);
		}
		else
		{
			/* 使用jQuery原来的动画 */
			if (delay)
			{
				if (!initObj)
				{
					this.delay(delay).fadeOut(duration, fn);
				}
				else
				{
					this.css(initObj).delay(delay).fadeOut(duration, fn);
				}
			}
			else
			{
				if (!initObj)
				{
					this.fadeOut(duration, fn);
				}
				else
				{
					this.css(initObj).fadeOut(duration, fn);
				}
			}
		}
		return this;
	};
	
	/**
	   * 判断动画的状态(现在只支持判断动画是否正在执行)
	   * @param expr	暂时没有用处(不过传入参数时最好也写上':animated'),这样清晰表达意思,也为今后此函数扩展
	   */
	$.fn.uIs = function (expr) 
	{
		if (__tranKey())
		{
			var target = this.get(0);
			if (target)
			{
				var dataList = target[ANIMATE_KEY];
				if (dataList && dataList.length > 0)	/* 存在动画在执行  */
				{
					return true;
				}
			}
			return false;
		}
		else
		{
			expr = ":animated";
			return this.is(expr);
		}
	};
	
	$.support.tranVendor = __tranKey();
	/** -----------------------------  以上是对JQuery动画的扩展   ------------------------------------------------ */
	
	
	window.SBase =
	{		
		/**
		 * 页面加载完成,进行了进行初始化
		 * @param isAll true/false	true--全部加载，false--有选择性加载，默认为true
		 */
		init: function(isAll)		/* 只能执行一次 */
		{
			if (!(arguments.callee.m_hasExec))
			{
				arguments.callee.m_hasExec = true;	/* 记录这个函数已经执行过了 */
				
				
				
//				if (isAll == false)		/* 有选择性加载:只加载上面，退出 */
//				{
//					return;
//				}
//				
//				SFLink.init("idFLinkFrame", 940);
//				
//				$("#idBtn1").click(function(event){
//					var jBtnElem = $(this);
//					var txt = "<div style='height: 200px; margin-top: 10px;background:red;'></div>";
//					jBtnElem.parent().append(txt);
//				});
//				
//				$("#idBtn2").click(function(event){
//					var jBtnElem = $(this);
//					
//					jBtnElem.next().remove();
//				});
//				
//				SBase.tranKey();
			}
			else
			{
				throw "Only execute one time!";
			}
			
		},
		
		/**
	    * 路径前缀
	    * 注: 因为在移植过程中,服务器的路径设置过能有所不同,会导致一些连接问题,比如图片的路径 
	    */
		urlPrefix: function ()
		{
		    return "/";
		},
		
		/**  
		 * 判断浏览器是否IE7或IE7以下
		 */
		isLteIE7: function()
		{
			var isSupport = arguments.callee.m_isSupport;
			if (isSupport == null)
			{
				/* 最后面一定要有分号，因为若没有有的话,IE6/7/8中cssText返回值少了分号 会让你失望 */
				ptlm = "position:absolute;display:block;*display:none;top:0;left:0;width:1px;height:1px;margin:0;";	
				
				var container = document.createElement("div");
				container.style.cssText = ptlm;
				
				isSupport = container.style.display == "none" ? true: false;
				arguments.callee.m_isSupport = isSupport;
				
				container = null;
			}
			
			return isSupport;
		},
		
		/**
		 * 设置/取出window.location.hash的值,再解释键值,类似$_get
		 * @param obj 为一个对象时，为设置；obj 为null, 则为取值
		 * @returns object;		 取值时，返回一个对象; 设置时,返回为设置的字符串,包括#号 
		 */
		hash: function(obj)
		{
			if (!obj)
			{
				var hashObj = {};
				var hash = window.location.hash;
				if (typeof hash == "string" && hash)
				{
					hash = hash.substring(1);
					if (hash)
					{
						//hash = hash.replace(/(^\s*)|(\s*$)/g, "");
						var arr = hash.split("&");
						for (var i = 0; i < arr.length; i++)
						{
							var segment = arr[i];
							var kvArr = segment.split("=");
							if (kvArr.length == 2)
							{
								var key = (kvArr[0]).replace(/(^\s*)|(\s*$)/g, "");		/* 去年左右两边空格 */
								var value = (kvArr[1]).replace(/(^\s*)|(\s*$)/g, "");	/* 去年左右两边空格 */
								if (key && value)
								{
									hashObj[key] = unescape(value);
//									hashObj[key] = decodeURIComponent(value);
								}
							}
							
						}
					}
				}
				
				return hashObj;
			}
			else
			{
				var str = "";
				for (var key in obj)
				{
					if (obj[key])
					{
						str += "&" + key + "=" + escape(obj[key]);
//						str += "&" + key + "=" + encodeURIComponent(obj[key]);
					}
				}
				
				if (str)
				{
					str = str.substring(1);		/* 去掉最前面的&号 */
					str = "#" + str;
				}
				
				window.location.hash = str;
				return str;
			}
		},
		
	    /**
		 * 是否支持fixed属性
		 * @param event
		 * @returns
		 * 注：来自JQuery1.7
		 */
		hasFixed: function ()
		{
		    var isSupport = arguments.callee.m_isSupport;
		    if (isSupport == null)
		    {
		        /* 第一次使用这个函数 */
		        var container, outer, inner, table, td, testElement,
				conMarginTop = 1,
				ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
				vb = "visibility:hidden;border:0;",
				style = "style='" + ptlm + "border:5px solid #000;padding:0;'",
				html = "<div " + style + "><div></div></div>" +
								"<table " + style + " cellpadding='0' cellspacing='0'>" +
								"<tr><td></td></tr></table>";

		        // Reconstruct a container
		        body = document.getElementsByTagName("body")[0];
		        if (!body)
		        {
		            // Return for frameset docs that don't have a body
		            // These tests cannot be done
		            return;
		        }

		        container = document.createElement("div");
		        container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		        body.insertBefore(container, body.firstChild);

		        // Construct a test element
		        testElement = document.createElement("div");
		        testElement.style.cssText = ptlm + vb;

		        testElement.innerHTML = html;
		        container.appendChild(testElement);
		        outer = testElement.firstChild;
		        inner = outer.firstChild;
		        td = outer.nextSibling.firstChild.firstChild;

		        inner.style.position = "fixed";
		        inner.style.top = "20px";

		        // safari subtracts parent border width here which is 5px
		        isSupport = (inner.offsetTop === 20 || inner.offsetTop === 15);

		        body.removeChild(container);
		        testElement = container = null;

		        arguments.callee.m_isSupport = isSupport;
		    }

		    return isSupport;

		},
		
	    /**
		 * 若value要在页面中显示，为了能正确显示，过滤一些特殊字符
		 * @param value
		 * @param notEmpty 如果设置为true，那么返回值不能为空, 为空的话，用一个空格代替, 默认值为true
		 */
		filterTag: function (value, notEmpty)
		{
		    var temp = "";
		    if (typeof value == "string")
		    {
		        temp = value;
		        /* 以下三句，第一句位置不能改 */
		        /* 把全部＆换成(&amp;)	
				 * 原因：因为html ASCII都跟＆有关，把它变换过来就能在页面上正常显示了。
				 * 比如：若字符串是(&lt;),直接在页面上显示是不行的，所以把字符串变为(&amp;lt;),界面就能显示(&lt;).
				 */
		        temp = temp.replace(/&/g, "&amp;");
		        temp = temp.replace(/</g, "&lt;");		/* 把全部小于号换成&lt; */
		        temp = temp.replace(/>/g, "&gt;");		/* 把全部大于号换成&gt; */

		        temp = temp.replace(/'/g, "&#039;");		
		        temp = temp.replace(/"/g, "&quot;");		
		    }
		    if (((notEmpty == null) || (notEmpty == true)) && (!temp))
		    {
		        temp = "&nbsp;";
		    }
		    return temp;
		},
		
		/**
		 * 取出/设置经过setPholder设置的输入框的值
		 * @param value 若为字符串,则为设置值;否则它为取值
		 * 注意:
		 * 1.取值时它会删除左右两边的空格
		 * 2.当设置值时且不支持placeholder属性时,它会发出blur事件
		 */
		phVal: function(jElem, value)
		{
			if (typeof(value) == "string")	/* 设置 */
			{
				if (SBase.hasPholder())
				{
					jElem.val(value);
				}
				else
				{
					jElem.val(value).blur();
				}
				
				return value;
			}
			else	/* 取值 */
			{
				if (SBase.hasPholder())
				{
					return jElem.val();
				}
				else
				{
					var tempVal = jElem.val();
					tempVal = tempVal.replace(/(^\s*)|(\s*$)/g, "");		/* 取出key值，并去掉左右两的空格 */
					var placeholder = jElem.attr("placeholder");
					if (tempVal == placeholder)
					{
						tempVal = "";
					}
					return tempVal;
				}
			}
		},
		
		/** 
		 * 设置placeholder属性的入口 
		 * @param selector 只接受#id, .class
		 */
		setPholder: function (selector)
	    {
	        setPlaceHolder(selector);
	    },
	    
	    /* 
		 * 是否支持html5的位置标志符 
		 */
	    hasPholder: function ()
	    {
	        if (arguments.callee.m_value == null)
	        {
	            arguments.callee.m_value = ("placeholder" in document.createElement("input"));
	        }

	        return arguments.callee.m_value;
	    },
	    
	    /* 取出窗口的尺寸，返回一个对象{width: xxpx, height: height: xxpx} */
	    winSize: function() 
		{
			var clientWidth, clientHeight;
			
			/* 获取窗口宽度 */
			if (window.innerWidth)
	        {
	        	 clientWidth = window.innerWidth;
	        }
			else if ((document.body) && (document.body.clientWidth))
	        {
	        	 clientWidth = document.body.clientWidth;
	        }
			
			
			/*获取窗口高度 */
			if (window.innerHeight)
	        {
	        	 clientHeight = window.innerHeight;
	        }
			else if ((document.body) && (document.body.clientHeight))
	        {
	        	 clientHeight = document.body.clientHeight;
	        }
			
			/*通过深入Document内部对body进行检测，获取窗口大小 */
			if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
			{
				clientHeight = document.documentElement.clientHeight;
				clientWidth = document.documentElement.clientWidth;
	        }
			
			return {width: clientWidth, height: clientHeight};
		},
		
		/** 
		 * 判断并取出浏览器的transition and transform 
		 * 参考：https://developer.mozilla.org/en-US/docs/Web/Reference/Events/transitionend
    	 * 据查证: 有transition的浏览器它肯定存在transform,只是写法不同,
    	 * 为了使提高以后动画的执行效率,所以所以返回值只有两种情况,要么过渡存在,要么过渡不存在!  	 
		 * @returns vendor,它是一个对象或false(boolean)
		 * 格式如下: 
		 * {
		 * 		vendor:
		 * 		{
		 * 			name: 'value',
		 * 			property: 'value',
		 * 			duration: 'value',
		 * 			timing: 'value',
		 * 			cbFn: callback,
		 * 
		 * 			propJs: '(property的值)的JS写法',
		 * 			propCss: 'property的值'
		 * 		}
		 * }
		 */
		tranKey: function()
		{
			var vendor = arguments.callee.m_vendor;
			
			if (vendor == null)		/* 这是第一次访问, 整理出数据 */
			{
				vendor = false;		/* 初始化 */
				var elem = document.createElement('div');
				//elem.style.cssText = "transition-property: left; background: red;";
				var dummyStyle = elem.style;	/* 用(defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle);结果也是一样 */
				
				//console.log(dummyStyle);
//				alert("webkitTransition" in dummyStyle);	/* safari为true,其他为true */
//				var tranTxt = "";
//				for (var key in dummyStyle)		/* safari读不出来,其他可读出来 */
//				{
//					if (typeof(key) == "string" && key.toLowerCase().indexOf("transition") != -1)
//					{
//						tranTxt += (key + " : " + dummyStyle[key]) + "<br />";
//					}
//				}
//				$(document.body).html(tranTxt);
				
			    var tmpVendor = {}, transitions, transforms;
			    
			    /*
			     * 判断事件是否存在
			     * ar getTransitionEndEventName = function(){
					    var obj = {
					        'WebKitTransitionEvent': 'webkitTransitionEnd',
					        'TransitionEvent': 'transitionend',
					        'OTransitionEvent': 'oTransitionEnd'
					    }, ret ,e;
					    for (var name in obj) {
					        try {
					            document.createEvent(name);
					            ret =  obj[name];
					            console.log(ret)
					          
					        } catch (ex) { }
					    }
					 
					    getTransitionEndEventName = function(){
					        return ret
					    }
					    return ret;
					}
					getTransitionEndEventName();
			     */
			    transitions = 
			    [
			     	{name: "transition", property: "transitionProperty", duration: "transitionDuration", 
			     		timing: "transitionTimingFunction", timingCss: "transition-timing-function", cbFn: "transitionend"},
			     	{name: "webkitTransition", property: "webkitTransitionProperty", duration: "webkitTransitionDuration", 
			     			timing: "webkitTransitionTimingFunction", timingCss: "-webkit-transition-timing-function", cbFn: "webkitTransitionEnd"},
	     			{name: "MozTransition", property: "MozTransitionProperty", duration: "MozTransitionDuration", 
			     		timing: "MozTransitionTimingFunction", timingCss: "-moz-transition-timing-function", cbFn: "transitionend"}	/* 不可用MozTransitionend, transitionend通过, bootstrap也是这么写的 */
//		     		{name: "OTransition", property: "OTransitionProperty", duration: "OTransitionDuration", 
//		     			timing: "OTransitionTimingFunction", timingCss: "-o-transition-timing-function", cbFn: "oTransitionEnd otransitionend"}		/* 测试: oTransitionEnd不能通过; otransitionend通过, bootstrap也是这么写的*/
//			     	{name: "msTransition", property: "msTransitionProperty", duration: "msTransitionDuration", 
//			     		timing: "msTransitionTimingFunction", timingCss: "-ms-transition-timing-function", cbFn: "msTransitionEnd"},	/* 测试不能通过,endKey没有通过 */
			     ];
			    
			    /* 经测试，以上（包括注释的部分）属性在各自己的浏览器中都会出现，有的不只一个，
			     * 比如：opera12.15,  
			     *  OTransition : 
					OTransitionDelay : 
					OTransitionDuration : 
					OTransitionProperty : 
					OTransitionTimingFunction : 
					WebkitTransition : 
					WebkitTransitionDelay : 
					WebkitTransitionDuration : 
					WebkitTransitionProperty : 
					WebkitTransitionTimingFunction : 
					transition : 
					transitionDelay : 
					transitionDuration : 
					transitionProperty : 
					transitionTimingFunction :
			     * 
			     * 比如：FireFox 29.01
			     *  transition :
					transitionDelay :
					transitionDuration :
					transitionProperty :
					transitionTimingFunction :
					MozTransition :
					MozTransitionDelay :
					MozTransitionDuration :
					MozTransitionProperty :
					MozTransitionTimingFunction : 
					
					比如：chrome 35.0.1916.114 
					transition : 
					transitionDelay : 
					transitionDuration : 
					transitionProperty : 
					transitionTimingFunction : 
					webkitTransition : 
					webkitTransitionDelay : 
					webkitTransitionDuration : 
					webkitTransitionProperty : 
					webkitTransitionTimingFunction : 
					
					
					比如：IE 10
					msTransition : 
					msTransitionDelay : 
					msTransitionDuration : 
					msTransitionProperty : 
					msTransitionTimingFunction : 
					transition : 
					transitionDelay : 
					transitionDuration : 
					transitionProperty : 
					transitionTimingFunction : 
					
					比如：IE 11
					msTransition : 
					msTransitionDelay : 
					msTransitionDuration : 
					msTransitionProperty : 
					msTransitionTimingFunction : 
					transition : 
					transitionDelay : 
					transitionDuration : 
					transitionProperty : 
					transitionTimingFunction : 
					
					比如: Safari 5.1.7 暂无法判断(它内里实质有这些属性，只是不能用var key in object来取值)
					
					
			     * */
			    for (var i = 0; i < transitions.length; i++)
			    {
			    	var tmpTransition = transitions[i];
			    	if (tmpTransition.name in dummyStyle)
			    	{
			    		/* 记录所需要的值 */
			    		tmpVendor.name = tmpTransition.name;
			    		tmpVendor.property = tmpTransition.property;
			    		tmpVendor.duration = tmpTransition.duration;
			    		tmpVendor.timing = tmpTransition.timing;
			    		tmpVendor.timingCss = tmpTransition.timingCss;
			    		tmpVendor.cbFn = tmpTransition.cbFn;
			    		break;
			    	}
			    }
			    
			    
			    /* 有过渡效果特性 */
			    if (tmpVendor.name)
			    {
			    	transforms = 
		    		[
		    		 	{name: 'transform', cssKey: 'transform'},
		    		 	{name: 'webkitTransform', cssKey: '-webkit-transform'},
		    		 	{name: 'MozTransform', cssKey: '-moz-transform'},
		    		 ];
			    	
			    	for (var i = 0; i < transforms.length; i++)
				    {
				    	var tmpTransfrom = transforms[i];
				    	if (tmpTransfrom.name in dummyStyle)
				    	{
				    		/* 记录所需要的值 */
				    		tmpVendor.propJs = tmpTransfrom.name;
				    		tmpVendor.propCss = tmpTransfrom.cssKey;
				    		break;
				    	}
				    }
			    	
			    	/* 
			    	 * 找不到变换属性,把它设置为false,为什么这样,因为据查证: 有transition的浏览器它肯定存在transform,只是写法不同,
			    	 * 为了使提高以后动画的执行效率,所以只写两种情况,要么没有,要么两个都存在!
			    	 */
			    	if (!(tmpVendor.propJs))
			    	{
			    		tmpVendor = false;
			    	}
			    	
			    	vendor = tmpVendor;
					arguments.callee.m_vendor = vendor;
			    }
			    else
			    {
			    	tmpVendor = false;
			    	vendor = tmpVendor;
					arguments.callee.m_vendor = vendor;
			    }
			    
			    /* 释放内存 */
				transitions = null;
				transforms = null;
			    
				
			}
			
			return vendor;
		},
		
		/* 从后面计算，取出某个字符串后面的字符串, 否则返回空字符 */
		lastStr: function(source, seperator)
		{
			if (typeof(source) == "string")
			{
				var lastNum = source.lastIndexOf(seperator);
				if (lastNum >= 0)
				{
					return source.substring(lastNum + seperator.length);
				}
			}
			return "";
		}
		
	};
	
	/**
     * 初始化输入框，模拟html5的位置标志符(占位符)
     * @param selector 只接受#id, .class
     * 
     * 注:
     * 1、当浏览器不支持placeholder,模块时,输入框若全是空格时,则认为输入框没有输入,自动置为空.
     * 2、当浏览器不支持placeholder,模块时,字符串左边的空格会自动去掉.
     */
	function setPlaceHolder(selector)
	{
	    if (typeof selector != "string")
	    {
	        return;
	    }
		
	    var temp_selector = selector.replace(/\s+/g, "");	/* 去掉所有的空格 */	
	    if ((temp_selector.charAt(0) == "#") || (temp_selector.charAt(0) == "."))
	    {
			
	        var jInputElems = $(temp_selector);
	        if (!SBase.hasPholder())	/* 支持placeholder,不用重写 */
	        {
				
	            jInputElems.each(function(index){
					
	                var jInputElem = $(this);
	                var placeholder = jInputElem.attr("placeholder");
	                if (placeholder)
	                {
	                    //placeholder += " "; /* 在后页补上空格,降低用户输入相同值的概率 */
	                    //if (this.setAttribute)	/* for IE7 */
	                    //{
	                    //    this.setAttribute("placeholder", placeholder);
	                    //}
	                    //else
	                    //{
	                    //    jInputElem.attr("placeholder", placeholder);	
	                    //}
	                    var curVal = jInputElem.val();
	                    if (curVal == placeholder || $.trim(curVal) == "")
	                    {
	                        jInputElem.val(placeholder).addClass("gray");
	                    }
						
	                    jInputElem.focus(function(event){
	                        var jTargetElem = $(this);
	                        var value = jTargetElem.val();
	                        var pholder = jInputElem.attr("placeholder");
							
	                        if ((value == "") || (value == pholder))
	                        {
	                            jTargetElem.val("").removeClass("gray");
	                        }
	                        else
	                        {
	                            jTargetElem.removeClass("gray");
	                        }
	                    }).blur(function(event){
	                        var jTargetElem = $(this);
	                        var value = jTargetElem.val();	/*  */
	                        var pholder = jInputElem.attr("placeholder");
							
	                        if ((value == pholder) || $.trim(value) == "")
	                        {
	                            jTargetElem.val(pholder).addClass("gray");
	                        }
	                        else
	                        {
	                            jTargetElem.removeClass("gray").val($.trim(value));
	                        }
	                    });	
	                }
	            });
	        }
	    }
	}
	
	/* 预加载图片 */
	function preloadImgs()
	{

	    /**
        * 预加载图片
        */
		var imgInfos = ["content/images/bg-sArrow-001.jpg",
		                "content/images/bg-sArrow-002.jpg",
		                "content/images/bg-sArrow-003.jpg",
		                "content/images/ajax-loader.gif"];
		
		for (var i = 0; i < imgInfos.length; i++)
		{
			var imgElem = new Image();
			imgElem.src = SBase.urlPrefix() + imgInfos[i];
		}
	}
})();