/**
 * Author: TGIDEAS
 * //tgideas.qq.com
 */

//事件绑定
function addEvent(obj, evt, func) { if (obj.addEventListener) { obj.addEventListener(evt, func, false); } else if (obj.attachEvent) { obj.attachEvent("on" + evt, func); } else { obj["on" + evt] = func; } }

//getElement by ID or by ClassName
var q = function(o){return document.querySelector(o);}

//延迟加载
function addload(func){var old=window.onload;if(typeof window.onload!="function"){window.onload=func;}else{window.onload=function(){old();func();}}};
//延时加载并判断是否加载完毕
function loadjs(url,succ,v){var elem=delay_js(url);if((navigator.userAgent.indexOf('MSIE')==-1)?false:true){elem.onreadystatechange=function(){if(this.readyState&&this.readyState=="loading") return;else succ(v);};}else elem.onload=function(){succ(v);};elem.onerror=function(){};}
//动态生成JS或CSS;
function delay_js(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");}else var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);file=="css"?document.getElementsByTagName("head")[0].appendChild(obj):document.body.appendChild(obj);return obj;}

var gg = {
    filter: function(d,newsID) {
        var a = [];
        var b = [];
        var c;
        for (c in newsID) {
            a.push(newsID[c])
        }
        for (i = 0; i < a.length; i++) {
            if (a[i][5] == d) {
                b.push(a[i])
            }
        }
        return b
    },
    select: function(e, b,newsID) {
        if (!b) {
            b = "0"
        }
        var c = gg.filter(e,newsID),
            a = [];
        for (var d = 0; d < c.length; d++) {
            if (c[d][6] == b) {
                a.push(c[d])
            }
        }
        return a
    },
    sort: function(a) {
        return a.sort(function(d, c) {
            return Number(c[7]) - Number(d[7])
        })
    }
};
/*loadjs("//pingjs.qq.com/ping_tcss_ied.js",function(){
    if (typeof(pgvMain) == 'function')pgvMain();
},"")*/
/*---图片滚动、广告图---*/
function initMedia(){

	var sWidth = $("#ddBox").width(); //获取焦点图的宽度（显示面积）
	var len = $("#ddBox div a").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#adBtn .btn span").mouseenter(function() {
	index = $("#adBtn .btn span").index(this);
	showPics(index);
	}).eq(0).trigger("mouseenter");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#ddBox .adPic").css("width",sWidth * (len));

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#ddBox").hover(function() {
	clearInterval(picTimer);
	},function() {
	picTimer = setInterval(function() {
		showPics(index);
		index++;
		if(index == len) {index = 0;}
	},4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
	var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
	$("#ddBox .adPic").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
	$("#adBtn .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
	}
}
/*  |xGv00|38073f779f6eb72d8bc1328572991762 */