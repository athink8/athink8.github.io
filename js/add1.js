
$(function(){
	
	/* 浏览器搞笑标题 */
	 var OriginTitle = document.title;
	 var titleTime;
	 document.addEventListener('visibilitychange', function () {
	     if (document.hidden) {
	         $('[rel="icon"]').attr('href', "https://s2.ax1x.com/2020/02/11/1oJJeJ.th.png");
	         document.title = 'ヽ(●-`Д´-)ノ你要和我玩嘛';
	         clearTimeout(titleTime);
			 
	     }
	     else {
	         $('[rel="icon"]').attr('href', "https://s2.ax1x.com/2020/02/11/1oJJeJ.th.png");
	         document.title = 'ヾ(Ő∀Ő3)ノ好呀！' + OriginTitle;
	         titleTime = setTimeout(function () {
	             document.title = OriginTitle;
	         }, 2000);
	     }
	 });
	 
	 /* 只在桌面版网页 启用樱花特效 */
	 /* var windowWidth = $(window).width();
	 if (windowWidth > 768) {
	     document.write('<script type="text/javascript" src="/libs/others/sakura.js"><\/script>');
	 } */
	 
	 
})