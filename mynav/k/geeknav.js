$(document).ready(function() {
	//根据json内容渲染菜单
	var html = template('menu-tpl', geeknavData);
	$('.menu-wrapper').html(html);

	//根据json 内容x渲染cart
	var html2 = template('cart-tpl', geeknavData);
	$('.content').html(html2);

	// menu hover 效果
	$('.menu-wrapper a').hover(function() {
		$(this).css("color", "#00897b");
	}, function() {
		$(this).css("color", "#ccc");
	})

/* 	//cart hover 效果
	$('.cart').hover(function() {
		$(this).css("background-color", "#ff5722");
	}, function() {
		$(this).css("background-color", "#9e9e9e");
	}) */
	
})
