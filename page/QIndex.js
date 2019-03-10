/**
 * QIndex.js
 * 作者: Peter Chan
 * 描述：主页
 *
 */


(function() {
	window.QWin = {
		/**
		 * 页面加载完成,进行了进行初始化
		 */
		init: function() /* 只能执行一次 */ {
			if (!(arguments.callee.m_hasExec)) {
				arguments.callee.m_hasExec = true; /* 记录这个函数已经执行过了 */

				SBase.init(); /* 页面公共部门初始化 */

				initUI();
			} else {
				throw "Only execute one time!";
			}

		}
	};

	function initUI() {
		$("#id-cover").delay(800).fadeOut(1500, function(event) {
			$(this).remove();
			initBanner();
		});

		initServBox();
	}

	function initBanner() {
		$("dt", "#id-banner-wrapper").hover(function(event) {
			var jThisDtElem = $(this);
			if (!jThisDtElem.hasClass("selected")) {
				jThisDtElem.addClass("selected").siblings("dt").removeClass("selected");
				jThisDtElem.next().stop(true).show().animate({
					"opacity": 1
				}, 800).siblings("dd:visible").animate({
					"opacity": 0
				}, 500, function(event) {
					$(this).css("display", "none");
				});
			}
		}, function(event) {

		}).siblings("dd:hidden").css("opacity", 0);
	}

	function initServBox() {
		$("dt", "#id-serv-box").hover(function(event) {
			var jThisDtElem = $(this);
			if (!jThisDtElem.hasClass("selected")) {
				jThisDtElem.addClass("selected");
				jThisDtElem.siblings(".selected").removeClass("selected");
				jThisDtElem.next().show().siblings("dd").hide();
			}
		}, function(event) {

		});
	}


})();

function changeWXlogo(arr) {
	var wxlogo = document.getElementById('WXlogo');
	if (arr.alt == 1) {
		wxlogo.src = "images/ewm.png";
	}
	if (arr.alt == 2) {
		wxlogo.src = "images/qr-code1.jpg";
	}
	if (arr.alt == 3) {
		wxlogo.src = "images/qr-code2.jpg";
	}

}