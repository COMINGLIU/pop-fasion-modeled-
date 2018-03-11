(function() {
	//头部导航条
	var oHeader = document.querySelector(".header"),
		// 三根杠的展开导航块
		oSwitch = document.querySelector(".header .more"),
		// “智能助力设计 趋势导航遇见流行”下边的导航条
		oModulenav = document.querySelector(".module-nav"),
		// 右侧关闭“三根杠的展开导航块”的“x”
		oModulenavClose = document.querySelector(".module-switch"),
		// 趋势导航块（此导航块与“三根杠的展开导航块”指向同一个导航块）
		oTrendSwitch2 = document.querySelector(".trendnav"),
		// 底部弹窗
		oPop = document.querySelector(".pop-window");
	// 主页中非交互的量（包括函数与变量）
	var demoStatic = {
		// 获取某个元素的css样式属性值，obj-元素，attr-属性
		getStyle: function(obj,attr) {
			return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
		},
		// 获取鼠标滚轮的步数
		getScroll: function() {
			var scroll = document.documentElement.scrollTop||window.scrollY||window.pageYoffset;
			return scroll;
		},
		// open:控制底部弹窗的出现
		open: true
	}
	/*=== demoRun:首页运行所需所有交互函数===*/
	var demoRun = {
		/*
		*  modulenavOpen功能:控制有关右侧导航块打开关闭的操作  
		*      oSwitch:打开header头部最右侧的导航块
		*      oTrendSwitch2:打开右侧趋势导航块（注意：oSwitch、oTrendSwitch不会同时存在，随着鼠标滚轮滑动只会存在一个）
		*      oModulenavClose：关闭oTrendSwitch2
		*      oModulenav：关闭oSwitch
		*/
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
		/*===scrollHeader:滑动滚轮，header背景色出现，趋势导航吸顶===*/
		scrollHeader: function() {
			// header头部所有的子部分
			var aHliBgs = document.querySelectorAll(".header >ul >li:not(.logo)"),
				// header处的“中文”
				oHlanguageBg = document.querySelector(".header >ul li.language"),
				// header处“中文”hover后出现的ul元素
				oHlanguageUlBg = document.querySelector(".header >ul li.language ul"),
				// header处的服务热线“小图标”
				oHcontactBg = document.querySelector(".header >ul li.contact"),
				// header处的服务热线“小图标”hover后出现的ul元素
				oHcontactUlBg = document.querySelector(".header >ul li.contact ul");
			/*
			*功能：（window.onscroll）滚轮滑动事件实现——
			*    控制底部弹窗出现与消失-oPop
			*	 控制header右侧导航块的出现与消失-oSwitch 
			*    控制header的背景颜色，及“hover”header上的子元素是否改变背景色
			*	 控制滑动到首页中部白色背景处右侧元素的入场-demoRun.characterIn()
			*/
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
			/*=== 将header部分背景颜色===*/
			function headerBgChange1() {
				//当scroll<280时，执行这段代码：清除hover变色绑定的事件,不仅要清除mouseenter还要清除mouseleave
				for(let i=0,len=aHliBgs.length;i<len;i++) {
						aHliBgs[i].onmouseenter=null;
				}
				for(let i=0,len=aHliBgs.length;i<len;i++) {
						aHliBgs[i].onmouseleave=null;
				}
				oHlanguageBg.onmouseenter=null;
				oHcontactBg.onmouseenter=null;
				oHlanguageBg.onmouseleave=null;
				oHcontactBg.onmouseleave=null;
			}
			/*===当scroll>=280时执行这段代码，相当于hover===*/
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
		/*==header头部搜索框聚焦变长==*/
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
		/*==关闭页面底部弹窗==*/
		popWindowClose: function() {
			var oClose = document.querySelector(".pop-window span.close");
			oClose.addEventListener("click",function() {
				oPop.style.display = "none";
				demoStatic.open= false;
			})
		},
		/*==主页中部弹窗==*/
		consultGiftClose: function() {
			var oClose = document.querySelector(".consult-gift .close");
			var oConsultGift = document.querySelector(".consult-gift");
			oClose.addEventListener("click",function() {
				oConsultGift.style.display = "none";
			}) 
		},
		/*==banner-left-图片轮播--start==*/
		bannerLimgTurn: function() {
			var aImgs = document.querySelectorAll(".banner ul.l-imgs img");
			var aPoints = document.querySelectorAll(".banner .img-l .point span");
			function turn() {
				var i=0;
				var timer = setInterval(function() {
					change();
				},4000);
				//point切换图片
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
				//轮播函数change()
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
		/*==banner-left-图片轮播--end==*/
		characterIn: function() {
			var oCha = document.querySelector(".c-center-content .character");
			oCha.style.left = "810px";
		},
		/*==footer-consult-check-start==*/
		/*
		*	对footer部分的表单进行交互处理
		*/
		footerConsult: function() {
			var footerRight = document.querySelector(".footer .right"),
				// 表单处“资源选项”栏目
				oConsult = footerRight.querySelector(".consult"),
				// 表单处"资源类型"栏目隐藏的选项ul
				oCheck = footerRight.querySelector("ul.check"),
				// “资源类型”右侧标识
				oOpen = footerRight.querySelector(".open"),
				// 表单处"资源类型"栏目隐藏的选项ul->li
				aChioce = footerRight.querySelectorAll("ul.check li"),
				// 表单处"资源类型"的value值
				oTxt = footerRight.querySelector(".consult input");
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
			//隐藏表单“咨询类型”选项
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
})();
