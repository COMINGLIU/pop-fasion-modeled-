function index() {
	var oHeader = document.querySelector(".header");
	var oSwitch = document.querySelector(".header .more");
	var oModulenav = document.querySelector(".module-nav");
	var oModulenavClose = document.querySelector(".module-switch");
	var oTrendSwitch2 = document.querySelector(".trendnav");
	var oPop = document.querySelector(".pop-window");
	var demoStatic = {
		getStyle: function(obj,attr) {
			return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
		},
		getScroll: function() {
			var scroll = document.documentElement.scrollTop||window.scrollY||window.pageYoffset;
			return scroll;
		},
		open: true
		/*open:控制底部弹窗的出现*/
	}
	var demoRun = {
		/*--右侧趋势导航条开关--*/
		/*--the switch of the right tred sidebar*/
		modulenavOpen: function() {
			oSwitch.addEventListener("mouseenter",function() {
				oModulenav.style.height = "100%";
				oHeader.style.zIndex = "11";
			})
			oTrendSwitch2.addEventListener("click",function() {
				oModulenav.style.height = "100%";
			})
			oModulenavClose.addEventListener("click",function() {
				oModulenav.style.height = "0";
				oHeader.style.zIndex = "10";
			})
			oModulenav.addEventListener("mouseleave",function() {
				oModulenav.style.height = "0";
				oHeader.style.zIndex = "10";
			})
		},
		/*--滑动滚轮，header背景色出现，趋势导航吸顶--*/
		/*--the background-color of the header appears and the trend nav on the top while the mouse is scrolling*/
		scrollHeader: function() {
			var aHliBgs = document.querySelectorAll(".header >ul >li:not(.logo)");
			var oHlanguageBg = document.querySelector(".header >ul li.language");
			var oHlanguageUlBg = document.querySelector(".header >ul li.language ul");
			var oHcontactBg = document.querySelector(".header >ul li.contact");
			var oHcontactUlBg = document.querySelector(".header >ul li.contact ul");
			window.addEventListener("scroll",function() {
				var scroll = demoStatic.getScroll();
				if(scroll>=100&&demoStatic.open===true) {
					oPop.style.display = "block";
				}else {
					oPop.style.display = "none";
				}
				if(scroll>=280) {
					oSwitch.style.display = "block";
					oHeader.style.backgroundColor = "rgb(28,35,43)";
					headerBgChange2();
					if(scroll>=1200) {
						demoRun.characterIn();
					}
				}else {
					headerBgChange1();
					oSwitch.style.display = "none";
					// oHeader.style.background = "linear-gradient(to bottom,rgba(0,0,0,.5) 0%,transparent 100%)";
					oHeader.style.background = "transparent";
					for(var i=0,len=aHliBgs.length;i<len;i++) {
						(function(i){
						aHliBgs[i].style.background = "transparent";
						})(i);
					}
					oHlanguageBg.style.background = "transparent";
					oHcontactBg.style.background = "transparent";
				}
			})
			function headerBgChange1() {
				/*当scroll<280时，执行这段代码：清除hover变色绑定的事件,不仅要清楚mouseenter还要清楚mouseleave*/
				for(var i=0,len=aHliBgs.length;i<len;i++) {
					(function(i){
						aHliBgs[i].onmouseenter=null;
					})(i);
				}
				for(var i=0,len=aHliBgs.length;i<len;i++) {
					(function(i){
						aHliBgs[i].onmouseleave=null;
					})(i);
				}
				oHlanguageBg.onmouseenter=null;
				oHcontactBg.onmouseenter=null;
				oHlanguageBg.onmouseleave=null;
				oHcontactBg.onmouseleave=null;
			}
			/*当scroll>=280时执行这段代码，相当于hover*/
			function headerBgChange2() {
				for(var i=0,len=aHliBgs.length;i<len;i++) {
					(function(i){
						aHliBgs[i].onmouseenter=function() {
							aHliBgs[i].style.backgroundColor = "rgb(19,24,30)";
						}
					})(i);
				}
				oHlanguageBg.onmouseenter=function() {
					this.style.backgroundColor = "rgb(19,24,30)";
					oHlanguageUlBg.style.backgroundColor = "rgb(19,24,30)";
				}
				oHcontactBg.onmouseenter=function() {
					this.style.backgroundColor = "rgb(19,24,30)";
					oHcontactUlBg.style.backgroundColor = "rgb(19,24,30)";
				}

				for(var i=0,len=aHliBgs.length;i<len;i++) {
					(function(i){
						aHliBgs[i].onmouseleave=function() {
							aHliBgs[i].style.backgroundColor = "rgb(28,35,43)";
						}
					})(i);
				}
				oHlanguageBg.onmouseleave=function() {
					this.style.backgroundColor = "rgb(28,35,43)";
					oHlanguageUlBg.style.backgroundColor = "rgb(28,35,43)";
				}
				oHcontactBg.onmouseleave=function() {
					this.style.backgroundColor = "rgb(28,35,43)";
					oHcontactUlBg.style.backgroundColor = "rgb(28,35,43)";
				}
			}
		},
		/*--搜索框聚焦变长--*/
		/*--search box becomes longer where focusing on it*/
		searchInput: function() {
			var oSearch = document.querySelector("li.search input");
			var oSearchbox = document.querySelector("li.search")
			oSearch.addEventListener("focus",function() {
				oSearch.style.width = "250px";
				oSearchbox.style.width = "270px";
				oSearch.placeholder = "时尚资讯一网打尽";
			})
			oSearch.addEventListener("blur",function() {
				oSearch.style.width="80px";
				oSearchbox.style.width = "100px";
				oSearch.placeholder = "搜索";	
			})			
		},
		/*--关闭页面底部弹窗--*/
		/*--the function of closing the bottom window*/
		popWindowClose: function() {
			var oClose = document.querySelector(".pop-window span.close");
			oClose.addEventListener("click",function() {
				oPop.style.display = "none";
				demoStatic.open= false;
			})
		},
		/*--主页中部弹窗--*/
		/*--the center bounce window--*/
		consultGiftClose: function() {
			var oClose = document.querySelector(".consult-gift .close");
			var oConsultGift = document.querySelector(".consult-gift");
			oClose.addEventListener("click",function() {
				oConsultGift.style.display = "none";
			}) 
		},
		/*--banner-left-图片轮播--start-*/
		bannerLimgTurn: function() {
			var aImgs = document.querySelectorAll(".banner ul.l-imgs img");
			var aPoints = document.querySelectorAll(".banner .img-l .point span");
			function turn() {
				var i=0;
				var timer = setInterval(function() {
					change();
				},4000);
				/*--point切换图片--*/
				for(var k=0;k<2;k++) {
					(function(k) {
						aPoints[k].onmouseenter = function() {
							timer = null;
							for(var j=0;j<2;j++) {
								aImgs[j].style.opacity = "0";
								aPoints[j].style.backgroundColor ="#fff";
							}
							aImgs[k].style.opacity = "1";
							aPoints[k].style.backgroundColor ="rgb(216,176,86)";
						}
						aPoints[k].onmouseleave = function() {
							var timer = setInterval(change(),4000);
						}
					}(k))
				}
				/*--轮播函数change()--*/
				function change() {
					if(i>=2) {i=0;}
					for(var j=0;j<2;j++) {
						aImgs[j].style.opacity = "0";
						aPoints[j].style.backgroundColor ="#fff";
					}
					aImgs[i].style.opacity = "1";
					aPoints[i].style.backgroundColor = "rgb(216,176,86)";
					i++;
				}
			}
			turn();
		},
		/*--banner-left-图片轮播--end-*/
		characterIn: function() {
			var oCha = document.querySelector(".c-center-content .character");
			oCha.style.left = "810px";
		},
		/*---footer-consult-check-start--*/
		/*
			点击指定元素显示选项，点击非指定位置的任意位置隐藏选项方法：
				是对指定元素阻止冒泡即可
		*/
		footerConsult: function() {
			var oConsult = document.querySelector(".footer .right .consult");
			var oCheck = document.querySelector(".footer .right ul.check");
			var oOpen = document.querySelector(".footer .right .open");
			var aChioce = document.querySelectorAll(".footer .right ul.check li");
			var oTxt = document.querySelector(".footer .right .consult input");
			oOpen.addEventListener("click",function(e) {
				e=e||window.event;
				e.cancelBubble = true;
				oCheck.style.display = "block";
			})
			oConsult.addEventListener("click",function(e) {
				e=e||window.event;
				e.cancelBubble = true;
				oCheck.style.display = "block";	
			})
			document.addEventListener("click",function() {
				oCheck.style.display = "none";		
			})
			for(var i=0,len=aChioce.length;i<len;i++) {
				(function(i){
					aChioce[i].addEventListener("click",function() {
						oTxt.value = aChioce[i].innerHTML;
					})
				})(i)
			}
		}
		/*---footer-consult-check-end--*/
	}
	demoRun.modulenavOpen();
	demoRun.scrollHeader();
	demoRun.searchInput();
	demoRun.popWindowClose();
	demoRun.consultGiftClose();
	demoRun.bannerLimgTurn();
	demoRun.footerConsult();
}
index();
