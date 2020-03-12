---
title: 基于Hexo和 hexo-theme-matery的个性化定制开发
categories:
  - 前端
tags:
  - 博客
  - hexo
top: false
cover: false
keywords: hexo,hexo-theme-matery,博客,个性化定制
summary: 基于Hexo和 hexo-theme-matery的个性化定制开发，hexo 是基于node.js制作的一个博客工具，支持多种主题更换，主要是基于YAML来配置所需信息即可，通过markdown编写文章
abbrlink: c1595c80
---

## 基于Hexo和 hexo-theme-matery的个性化定制开发

> `就算悲伤难抑，遍体鳞伤地处于谷底，也不能停止演奏！`

------

**本博客基于hexo开发，使用的主题是 @blinkfox 的主题 [  hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)** 

> hexo 是基于node.js制作的一个博客工具，支持多种主题更换，主要是基于YAML来配置所需信息即可，通过markdown编写文章，hexo 能够快速构建出静态的html页面，而静态页面可以放在GitHub、Gitee等代码托管上，而无需自己购买服务器。

> 同时**hexo**支持更换不同好看个性的主题,比如 **[next](https://github.com/theme-next/hexo-theme-next)**  、**[yilia](https://github.com/litten/hexo-theme-yilia)**  等。

### 一. 环境搭建

- 本地安装Git（版本控制工具）

- 本地安装NodeJs（服务端的 JavaScript）

- GitHub创建和Github Pages创建

#### 1. 本地安装Git

1.1 Git下载地址（本文默认基于Window环境下开发）[git官网](https://git-scm.com)

> 因为官网下载会比较慢，推荐使用淘宝镜像快速下载  [点击下载](https://npm.taobao.org/mirrors/git-for-windows/v2.25.0.windows.1/Git-2.25.0-32-bit.exe)

1.2 下载完后点击安装文件并一直下一步运行成功即可，右键会看见 ```Git Bash```，

打开输入  ```git --version```出现版本数即为成功。

1.3 有关Git用法请参考 [文档](https://git-scm.com/book/zh/v2)

> 常用命令：

```console
#使用前配置全局信息
git config --global user.name '你的名字'
git config --global user.email '你的邮箱'
#查看是否已配置成功
git config --list --global

#在你需要使用Git的文件夹下运行
git init						#初始化
git add .						#添加变更文件到暂存区
git status						#查看变更信息
git commit -m '你需要写的信息'		#提交到工作区
git remote add origin https://github.com/用户名/仓库名.git	#添加Github远程连接
git push origin 				#上传到GitHub
git push origin -f				#强制上传到GitHub
```

#### 2. 本地安装NodeJs

2.1 NodeJs 下载地址： [点击下载](http://nodejs.cn/download/)

2.2 下载完后也是一直下一步就好 ，输入 **node -v** 查询版本就可。

> 因为官方镜像源比较慢，推荐如下修改为国内的淘宝镜像源

```console
# 临时修改镜像源
npm --registry=https://registry.npm.taobao.org
# 永久设置为淘宝镜像源
npm config set registry https://registry.npm.taobao.org
# 查看npm的配置
npm config list
```

> 修改默认内置路径，在安装路径上创建 node_global`和`node_cache, 如以下：

```
D:\Program Files\nodejs\node_global
D:\Program Files\nodejs\node_cache
```

> 执行命令：

```
npm config set prefix"D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
```

#### 3. GitHub创建和Github Pages创建

3.1 打开Github[官网首页](https://yq.aliyun.com/go/articleRenderRedirect?url=https%3A%2F%2Fgithub.com%2F)，注册登录并创建仓库，并创建文件 index.html 即可.

3.2 在Setting 中往下拉找到 GitHub Pages 配置即可访问连接。

### 二 . 博客开发

#### 1. 安装Hexo

> 在你想要保存博客文件的路径上创建文件夹，如E:\my\hexo_blog，按住 win+r 弹出框里输入 cmd 进入控制台

```
#进入博客文件夹的上一级目录 
cd E:\my
# 安装hexo
npm install -g hexo-cli
#初始化文件夹
hexo init hexo_blog 
#进入博客文件夹
cd E:\my\hexo_blog
# 安装博客需要的依赖文件
npm install  
```

> hexo命令  [官网文档](https://hexo.io/zh-cn/)

```
hexo cl	#清理
hexo g	#生成
hexo s	#本地服务 
hexo d	#发布
```

> 本地测试 http://locakhost:4000 或者127.0.0.1:4000

#### 2.hexo配置

> hexo 目录结构

```
_config.yml	  	配置文件

_public			生成的静态文件，这个目录最终会发布到服务器  

_scaffolds 		通用模板  

_source 		保存编写的markdown文件

drafts			草稿文件

themes 			博客主题

node_modules	 类库
```

> `_config.yml`配置

```yaml
#网站
title: 你的博客名
subtitle: 博客副标题
description: 博客描述(主要用于SEO)
keywords: 博客关键词(主要用于SEO)
author: 作者(用于主题显示文章的作者)
language: 博客语言  
timezone: 时区

#网址
url	:网址	
root :网站根目录	
permalink: 文章的永久链接格式 :year/:month/:day/:title/
permalink_defaults:	永久链接中各部分的默认值	
pretty_urls: 改写 permalink 的值来美化 URL	
pretty_urls.trailing_index: 是否在永久链接中保留尾部的 index.html，设置为 false时去除
pretty_urls.trailing_html: 是否在永久链接中保留尾部的 .html, 设置为 false 时去除

#目录(基本不需改)
source_dir		资源文件夹，这个文件夹用来存放内容
public_dir		公共文件夹，这个文件夹用于存放chang生成的站点文件
tag_dir			标签文件夹
archive_dir		归档文件夹
category_dir	分类文件夹
code_dir		Include code 文件夹，source_dir 下的子目录
i18n_dir		国际化（i18n）文件夹
skip_render		跳过指定文件的渲染。(常用于跳过GitHub的README.md渲染)

#分页
per_page		每页显示的文章量 (0 关闭分页功能,默认10)
pagination_dir	分页目录

#主题
theme：当前主题名称

#发布
deploy:
  type: git
  repo: 仓库
  branch: 分支
```

#### 3. 使用主题和配置

> 参考博客 [Hexo博客主题之hexo-theme-matery的介绍](https://blinkfox.github.io/2018/09/28/qian-duan/hexo-bo-ke-zhu-ti-zhi-hexo-theme-matery-de-jie-shao/)

##### 3.1 下载主题：

##### 		[ hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)  放在站点目录文件夹下 `themes` 文件夹中即可。

##### 3.2 在站点配置文件`_config.yml `修改` theme: 主题名`

> 防坑指南：设置的主题名和下载的主题名要完全一致

##### 3.3 新建分类 categories 页

```bash
hexo new page "categories"
```

编辑文件 `/source/categories/index.md`，内容如下：

```yaml
---
title: categories
date: 2020-02-10
type: "categories"
layout: "categories"
---
```

##### 3.4 新建标签 tags 页

```bash
hexo new page "tags"
```

编辑文件 `/source/tags/index.md`，内容如下：

```yaml
---
title: tags
date: 2018-09-30 18:23:38
type: "tags"
layout: "tags"
---
```

##### 3.5 新建关于我 about 页

```bash
hexo new page "about"
```

编辑文件 `/source/about/index.md`，内容如下：

```yaml
---
title: about
date: 2018-09-30 17:25:30
type: "about"
layout: "about"
---
```

##### 3.6 新建友情连接 friends 页（可选的）

```bash
hexo new page "friends"
```

编辑文件 `/source/friends/index.md`，内容如下：

```yaml
---
title: friends
date: 2018-12-12 21:25:30
type: "friends"
layout: "friends"
---
```

同时，在你的博客 `source` 目录下新建 `_data` 目录，在 `_data` 目录中新建 `friends.json` 文件，文件内容如下所示：

```json
[{
    "avatar": "https://s2.ax1x.com/2020/02/13/1q6iAs.th.png",
    "name": "Athink_",
    "introduction": "加油 你可以的",
    "url": "https://blog.onfree.cn/",
    "title": "前去学习"
}]
```

##### 3.7 代码高亮

使用[ hexo-prism-plugin](https://github.com/ele828/hexo-prism-plugin)的 Hexo 插件来加强代码高亮，安装命令如下：

```bash
npm i -S hexo-prism-plugin
```

修改 Hexo 根目录下 `_config.yml` 中 `highlight.enable` 的值为 `false`，并新增 `prism` 插件相关配置，主要配置如下：

```yaml
highlight:
  enable: false

prism_plugin:
  mode: 'preprocess'    # realtime/preprocess
  theme: 'tomorrow'
  line_number: false    # default false
  custom_css:
```

##### 3.8 搜索

使用  [hexo-generator-search](https://github.com/wzpan/hexo-generator-search) 的 Hexo 插件来做内容搜索，安装命令如下：

```bash
npm install hexo-generator-search --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
search:
  path: search.xml
  field: post
```

##### 3.9 中文链接转拼音（可选的）

使用 [hexo-permalink-pinyin](https://github.com/viko16/hexo-permalink-pinyin) Hexo 插件使在生成文章时生成中文拼音的永久链接，安装命令如下：

```bash
npm i hexo-permalink-pinyin --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
```

> **注**：除了此插件外，[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 插件也可以生成非中文的链接。

3.10 文章字数统计插件（可选的）

安装 [hexo-wordcount](https://github.com/willin/hexo-wordcount)插件，在文章中显示文章字数、阅读时长信息，安装命令如下：

```bash
npm i --save hexo-wordcount
```

然后只需在本主题下的 _config.yml 文件中，激活以下配置项即可：

```yaml
wordCount:
  enable: true
  postWordCount: true
  min2read: true
  totalCount: true
```

##### 3.11 修改页脚

页脚信息可在主题文件的 `/layout/_partial/footer.ejs` 文件中定制化修改，包括站点、使用的主题、访问量等。

##### 3.12修改社交链接

在主题的 `_config.yml` 文件中，默认支持 `QQ`、`GitHub` 和邮箱的配置，你可以在主题文件的 `/layout/_partial/social-link.ejs` 文件中，新增、修改你需要的社交链接地址，增加链接可参考如下代码：

```html
<a href="https://github.com/blinkfox" class="tooltipped" target="_blank" data-tooltip="访问我的GitHub" data-position="top" data-delay="50">
    <i class="fa fa-github"></i>
</a>
```

其中，社交图标（如：`fa-github`）你可以在 [Font Awesome](https://fontawesome.com/icons) 中搜索找到。以下是常用社交图标的标识，供你参考：

- Facebook: `fa-facebook`
- Twitter: `fa-twitter`
- Google-plus: `fa-google-plus`
- Linkedin: `fa-linkedin`
- Tumblr: `fa-tumblr`
- Medium: `fa-medium`
- Slack: `fa-slack`
- 新浪微博: `fa-weibo`
- 微信: `fa-wechat`
- QQ: `fa-qq`

##### 3.13 修改打赏的二维码图片

在主题文件的 `source/medias/reward` 文件中，替换成你的的微信和支付宝的打赏二维码图片。

##### 3.14配置音乐播放器（可选的）

在主题的 `_config.yml` 配置文件中激活配置：

```yaml
# 是否在首页显示音乐.
music:
  enable: true
  title: #非吸底模式 有效
   enable: false
   show: 听听音乐
  server: netease   #必须	服务源: netease, tencent, kugou, xiami, baidu
  type: playlist	#必须 歌曲, playlist, album, search, artist
  id: 260222983     #必须	歌曲 id / playlist id / album id / search keyword
  fixed: true # 开启吸底模式
  autoplay: false # 是否自动播放
  theme: '#C4C4C4'
  loop: all # 音频循环播放, 可选值: 'all', 'one', 'none'
  order: 'random' # 音频循环顺序, 可选值: 'list', 'random'
  preload: 'auto' # 预加载，可选值: 'none', 'metadata', 'auto'
  volume: 0.9 # 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  listFolded: true # 列表默认折叠
  listMaxHeight: 600px #列表最大高度
```

> 防坑指南：主题默认开启歌词的，简单粗暴直接修改aplyer源码
>
> 	查找 aplayer-icon aplayer-icon-lrc 在后添加 aplayer-icon-lrc-inactivity
> 	查找 this.player.template.lrcButton.addEventListener 在前面添加 e.player.lrc.hide();

> 防坑指南：主题最新播放器背景颜色和歌曲文章列表颜色相近导致看不清
>
>  在/source/css/matery.css里添加如下：
>
> 	.aplayer-list-title {
> 	color: #666;
> 	}
> 	
> 	.aplayer-title {
> 		color: #009688
> 	}

##### 3.15 文章 Front-matter 介绍

`Front-matter` 选项中的所有内容均为**非必填**的。但我仍然建议至少填写 `title` 、`categories` 、 `tags`、`date` 的值。

| 配置选项   | 默认值                        | 描述                                                         |
| :--------- | :---------------------------- | :----------------------------------------------------------- |
| title      | `Markdown` 的文件标题         | 文章标题，强烈建议填写此选项                                 |
| date       | 文件创建时的日期时间          | 发布时间，强烈建议填写此选项，且最好保证全局唯一             |
| author     | 根 `_config.yml`中的 `author` | 文章作者                                                     |
| img        | `featureImages`中的某个值     | 文章特征图，推荐使用图床(腾讯云、七牛云、又拍云等)来做图片的路径.如: `http://xxx.com/xxx.jpg` |
| top        | `true`                        | 推荐文章（文章是否置顶），如果 `top` 值为 `true`，则会作为首页推荐文章 |
| cover      | `false`                       | `v1.0.2`版本新增，表示该文章是否需要加入到首页轮播封面中     |
| coverImg   | 无                            | `v1.0.2`版本新增，表示该文章在首页轮播封面需要显示的图片路径，如果没有，则默认使用文章的特色图片 |
| password   | 无                            | 文章阅读密码，如果要对文章设置阅读验证密码的话，就可以设置 `password` 的值，该值必须是用 `SHA256` 加密后的密码，防止被他人识破。前提是在主题的 `config.yml` 中激活了 `verifyPassword` 选项 |
| toc        | `true`                        | 是否开启 TOC，可以针对某篇文章单独关闭 TOC 的功能。前提是在主题的 `config.yml` 中激活了 `toc` 选项 |
| mathjax    | `false`                       | 是否开启数学公式支持 ，本文章是否开启 `mathjax`，且需要在主题的 `_config.yml` 文件中也需要开启才行 |
| summary    | 无                            | 文章摘要，自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要 |
| categories | 无                            | 文章分类，本主题的分类表示宏观上大的分类，只建议一篇文章一个分类 |
| tags       | 无                            | 文章标签，一篇文章可以多个标签                               |

> **注意**:
>
> 1. 如果 `img` 属性不填写的话，文章特色图会根据文章标题的 `hashcode` 的值取余，然后选取主题中对应的特色图片，从而达到让所有文章都的特色图**各有特色**。
> 2. `date` 的值尽量保证每篇文章是唯一的，因为本主题中 `Gitalk` 和 `Gitment` 识别 `id` 是通过 `date` 的值来作为唯一标识的。
> 3. 如果要对文章设置阅读验证密码的功能，不仅要在 Front-matter 中设置采用了 SHA256 加密的 password 的值，还需要在主题的 `_config.yml` 中激活了配置。有些在线的 SHA256 加密的地址，可供你使用：[开源中国在线工具](http://tool.oschina.net/encrypt?type=2)、[chahuo](http://encode.chahuo.com/)、[站长工具](http://tool.chinaz.com/tools/hash.aspx)。

以下为文章的 `Front-matter` 示例。

最简示例

```yaml
---
title: hello world
date: 2020-02-10 08:05:00
categories: 杂文
tags: 测试
---
```

最全示例

```yaml
---
title: hello world
date: 2020-02-10 08:05:00
author: athink_
img: /source/images/xxx.jpg
top: true
cover: true
coverImg: /images/1.jpg
password: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
toc: false
mathjax: false
summary: 这是你自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要
categories: 杂文
tags: 测试
---
```

##### 3.16 修改主题颜色

在主题文件的 `/source/css/matery.css` 文件中，搜索 `.bg-color` 来修改背景颜色：

```
/* 整体背景颜色，包括导航、移动端的导航、页尾、标签页等的背景颜色. */
.bg-color {
    background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}
/*如果想去掉banner图的颜色渐变效果，请将以下的css属性注释掉或者删除掉即可*/
@-webkit-keyframes rainbow {
   /* 动态切换背景颜色. */
}
@keyframes rainbow {
    /* 动态切换背景颜色. */
}
```

> 推荐[配色方案](https://www.materialpalette.com/colors)

##### 3.17修改 banner 图和文章特色图

 banner 图修改在 /layout/_partial/bg-cover-content.ejs` 文件的代码中修改：

```
$('.bg-cover').css('background-image', 'url(/medias/banner/' + new Date().getDay() + '.jpg)');
```

在 `/source/medias/featureimages` 文件夹中默认有 24 张特色图片，你可以再增加或者减少，并需要在 `_config.yml` 做同步修改。

##### 3.18 制作动态标题

实现方法，引入js文件，在主题文件下的`/source/js/`下新建`FunnyTitle.js`，然后在添加到`themes/matery/layout/layout.ejs`或者添加到`themes/matery/layout/_partial/head.ejs`，其代码如下：

```
<!--浏览器搞笑标题-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/Yafine/cdn@2.5/source/favicon.png");
         document.title = 'ヽ(●-`Д´-)ノ你要玩捉迷藏嘛';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/Yafine/cdn@2.5/source/favicon.png");
         document.title = 'ヾ(Ő∀Ő3)ノ好哦！' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });
```

##### 3.19 添加动态诗词

在`/themes/matery/layout/_partial/head.ejs`添加下面的一行代码：

```
<script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
```

然后再将`/themes/matery/layout/_partial/bg-cover-content.ejs`中的`<%= config.description %>`修改为把`<%= config.description %>`改为`<%- '正在加载今日诗词....' %>`，这个使用前提是将主题配置文件的`subtitle`的值改为`false`。

##### 3.20 添加一言语录

在`\layout\_widget\dream.ejs` 中修改如下

```
<div class="dream">
    <% if (theme.dream.showTitle) { %>
    <div class="title center-align">
       <i class="fa fa-paper-plane" aria-hidden="true"></i> &nbsp;&nbsp;<%- theme.dream.title %>
    </div>
    <% } %>
    <div class="row">
        <!-- <div class="col l8 offset-l2 m10 offset-m1 s10 offset-s1 center-align text">
            <%- theme.dream.text %>
        </div> -->
		<div class="col l8 offset-l2 m10 offset-m1 s10 offset-s1 center-align text">

		</div>
		
		<!-- 添加动态添加一言语录 -->
		<% if (theme.dream.textUrl!=null||theme.dream.textUrl!="") { %>
			<script>
				$.ajax({
					type: "Get",
					url:  "<%- theme.dream.textUrl %>",
					success: function(data) {
						$(".text").html(data)
					},
					error:function(){
						$(".text").html(" <%- theme.dream.text %>")	 
					}
				})
				   
			</script>
		<% } %>
    </div>
</div>
```

> 引用了 一言语录API : https://api.uixsj.cn/hitokoto/w.php

##### 3.21 鼠标点击文字特效

实现方法，引入js文件，在主题文件下的`/source/js/`下新建`click_show_text.js`，并添加到`themes/matery/layout/layout.ejs`。其代码如下：

```
var a_idx = 0;
jQuery(document).ready(function ($) {
    $("body").click(function (e) {
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 5,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#FF0000"
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            3000,
            function () {
                $i.remove();
            });
    });
    setTimeout('delay()', 2000);
});

function delay() {
    $(".buryit").removeAttr("onclick");
}
```

##### 3.22. 修改原有相册

参考教程：[传送门](https://liyangzone.com/2019/07/22/hexo%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E7%9B%B8%E5%86%8C/?spm=a2c4e.10696291.0.0.3f6a19a4hBRD5E)

##### 3.23. 添加天气小插件

首先去中国天气官网：[https://cj.weather.com.cn/plugin/pc](https://yq.aliyun.com/go/articleRenderRedirect?url=https%3A%2F%2Fcj.weather.com.cn%2Fplugin%2Fpc)，配置自己的插件，选择自定义插件—>自定义样式——>生成代码，然后会生成一段代码，复制粘贴到 `themes/matery/layout/layout.ejs`即可。

##### 3.24. 关于我页面添加个人简历

打开`theme/matery/layout/about.ejs`文件，大约在13行。有一个``标签，找出其对应结尾的标签，大约在61行左右，然后在新增如下代码：

```
<div class="card">
     <div class="card-content">
         <div class="card-content article-card-content">
             <div class="title center-align" data-aos="zoom-in-up">
                 <i class="fa fa-address-book"></i>&nbsp;&nbsp;<%- __('个人简历') %>
              </div>
                 <div id="articleContent" data-aos="fade-up">
                     <%- page.content %>
                 </div>
           </div>
      </div>
</div>
```

注意粘贴的位置和空格要正确，这里的位置随你自己设置，你也可以把简历作为第一个card，然后`/source/about/index.md`下面写上你的简历了（就像写博客一样）。

##### 3.25外链跳转插件

> [hexo-external-link](https://blog.hvnobug.com/go.html?url=aHR0cHM6Ly9naXRodWIuY29tL2h2bm9idWcvaGV4by1leHRlcm5hbC1saW5r)是一个跳转外链相关插件。自动为所有html文件中外链的a标签生成对应的属性。 比如 设置`target=’_blank’, rel=’external nofollow noopener noreferrer’` 告诉搜索引擎这是外部链接,不要将该链接计入权重。 同时自动生成外链跳转页面,默认在根目录下 go.html;

使用 npm 或者 yarn 安装

```
## npm 安装
npm install hexo-external-link --save
## yarn 安装
yarn add hexo-external-link
```

之后再hexo博客站点根目录下添加如下配置：

```
hexo_external_link:
  enable: true
  enable_base64_encode: true
  url_param_name: 'u'
  html_file_name: 'go.html'
  target_blank: true
  link_rel: 'external nofollow noopener noreferrer'
  domain: 'your_domain' # 如果开启了防盗链
  safety_chain: true
```

- **enable** - 是否开启`hexo_external_link`插件 - 默认 false
- **enable_base64_encode** - 是否对跳转`url`使用`base64编码` - 默认 fasle
- **url_param_name** - url参数名,在跳转到外链传递给`html_file_name`的参数名 - 默认 ‘u’
- **html_file_name** - 跳转到外链的页面文件路径 - 默认 ‘go.html’
- **target_blank** - 是否为外链的`a`标签添加`target='_blank'` - 默认 true
- **link_rel** - 设置外链的`a`标签的rel属性 - 默认 ‘external nofollow noopener noreferrer’
- **domain** - 如果开启了防盗链,除了 localhost 和 domain 之外调用会跳到主页,同时也是判断链接是否为外链的依据 - 默认 window.location.host
- **safety_chain** - go.html 为了防止外链盗用 对域名进行的判断 - 默认 false

3.24 添加雪花飘落效果

在`themes/matery/source/js`目录下新建`snow.js`文件，打开这个网址[传送门](https://cdn.jsdelivr.net/gh/Yafine/cdn@2.5/source/js/snow1.js )，将内容复制粘贴到cursor.js即可。

然后再`themes/matery/layout/layout.ejs`文件内添加下面的内容：

```
<script src="/js/snow.js"></script>
```

##### 3.25 添加自定义页面

首先在站点目录下的source文件夹下新建`aboutme`文件，文件名可自定义，然后编写一个`index.html`放入`aboutme`文件夹下，然后在主题配置文件下的导航配置信息添加下面的配置：

```
About:
    url: /
    icon: fas fa-address-card
    children:
      - name: 关于我
        url: /about
        icon: fas fa-user-circle
      - name: Another    #这是新添加的，在原有配置基础上添加
        url: /aboutme
        icon: fa fa-user-secret
```

然后在站点配置文件下，找到`skip_render`，在后面添加属性，如下：

```
skip_render: aboutme/**  # 其意思为在对文件进行渲染时跳过aboutme文件下的所有文件
```

知道方法后，你可以添加你自己想要添加的页面，让你的博客内容更加充实。

##### 3.26 添加404页面

首先再站点根目录下的source文件夹下新建`404.md`文件，里面内容如下：

```
---
title: 404
date: 2020-02-10 16:41:10
type: "404"
layout: "404"
description: "Oops～，我崩溃了！找不到你想要的页面了"
---
```

紧接着再新建主题文件夹的layout目录下新建`404.ejs`文件，添加内容如下：

```
<style type="text/css">
    /* don't remove. */
    .about-cover {
        height: 90.2vh;
    }
</style>
<div class="bg-cover pd-header about-cover">
    <div class="container">
        <div class="row">
            <div class="col s10 offset-s1 m8 offset-m2 l8 offset-l2">
                <div class="brand">
                    <div class="title center-align">
                        404
                    </div>
                    <div class="description center-align">
                        <%= page.description %>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // 每天切换 banner 图.  Switch banner image every day.
    $('.bg-cover').css('background-image', 'url(https://cdn.jsdelivr.net/gh/Yafine/cdn@2.6/source/medias/banner/' + new Date().getDay() + '.jpg)');
</script>
```

##### 3.27 文章生成永久链接

主题默认的文章链接配置是

```
premalink: :year/:month/:day/:title
```

这种生成的链接地址很长，文章版权的链接地址会出现一大串字符编码，一点也不好看。因此需要修改文章生成链接的格式。

首先再根目录下执行下面的命令：

[hexo-abbrlinkGitHub地址](https%3A%2F%2Fgithub.com%2Frozbo%2Fhexo-abbrlink)

```
npm install hexo-abbrlink --save
```

然后再站点配置文件下添加如下配置：

```
abbrlink:
    alg: crc16   #算法： crc16(default) and crc32
    rep: hex     #进制： dec(default) and hex: dec #输出进制：十进制和十六进制，默认为10进制。丨dec为十进制，hex为十六进制
```

再将站点配置文件的`permalink`的值修改为：

```
permalink: posts/:abbrlink.html  # 此处可以自己设置，也可以直接使用 :/abbrlink
```

生成文章的链接格式就会是如下样例（官方样例）:

```
crc16 & hex
https://post.zz173.com/posts/66c8.html

crc16 & dec
https://post.zz173.com/posts/65535.html
crc32 & hex
https://post.zz173.com/posts/8ddf18fb.html

crc32 & dec
https://post.zz173.com/posts/1690090958.html
```

生成完后，原md文件的Front-matter 内会增加`abbrlink` 字段，值为生成的ID 。这个字段确保了在我们修改了Front-matter 内的博客标题title或创建日期date字段之后而不会改变链接地址。

##### 3.28添加Valine评论系统

登录[LeanCloud](https://leancloud.cn/dashboard/login.html#/signin),创建应用,在设置中将其中APPID和APPKey复制，添加到配置文件中。

```
valine:
  enable: false  # true即为开启评论系统
  appId:   #此处填写你的appid
  appKey:  #此处填写你的appkey
  notify: false
  verify: false
  visitor: true
  avatar: 'mm' # Gravatar style : mm/identicon/monsterid/wavatar/retro/hide
  pageSize: 10
  placeholder: 'just go go' # Comment Box placeholder
  background:  https://cdn.jsdelivr.net/gh/Yafine/cdn@2.6/social/comment_bg.png
```

### 4.总结

> 本以为使用hexo开发博客会很复杂很难，
>
> 然而发现大多数都是写好的，只有在配置文件上修改就行,
>
> 对于主题样式内容等不满意再去打开源码修改就行，
>
> 其实只有会一点前端知识便可以对源码大概进行你想要的定制呢，
>
> 耐心的可以研究下主题构造也不错呢。
>
> 今天天气不错！加油！！！



