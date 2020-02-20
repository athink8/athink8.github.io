$(function() {

	/*  添加信息到控制面板*/
	console.log("\n %c Athink_ %c https://blog.onfree.cn \n",
		"color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
	console.log(
		"%c亲爱的朋友: \n  你好呀,很高兴你能看见这段信息,本人为一名普普通通都程序员,\n"+
		"在这技术乱世里,希望我和你可以不忘初心,努力加油,\n"+
		"如果你想和我交个朋友!一定要联系我哦,谢谢!! \n 我的邮箱: athink8@163.com ",
		"color: #202124; background: #ccffff; padding:6px;")

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
