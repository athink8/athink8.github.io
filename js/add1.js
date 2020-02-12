$(function() {

	console.log("\n %c Athink_ %c https://github.com/athink8 \n",
		"color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
		/* console.log("\n %c APlayer v1.10.1 af84efb %c http://aplayer.js.org \n","color: #fadfa3; background: #030307; padding:5px 0;", */
	/* 浏览器搞笑标题 */
	var OriginTitle = document.title;
	var titleTime;
	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {
			$('[rel="icon"]').attr('href', "https://s2.ax1x.com/2020/02/11/1oJJeJ.th.png");
			document.title = 'ヽ(●-`Д´-)ノ你要和我玩嘛';
			clearTimeout(titleTime);

		} else {
			$('[rel="icon"]').attr('href', "https://s2.ax1x.com/2020/02/11/1oJJeJ.th.png");
			document.title = 'ヾ(Ő∀Ő3)ノ好呀！' + OriginTitle;
			titleTime = setTimeout(function() {
				document.title = OriginTitle;
			}, 2000);
		}
	});



})
