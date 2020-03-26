---
title: 11分钟详析Spring MVC
categories:
  - Spring
tags:
  - Spring
  - Spring MVC
cover: false
top: false
keywords: 'Spring,SpringBoot,Spring MVC,11分钟,11,blog.onfree.cn,Athink'
summary: Spring MVC是当前最优秀的MVC框架，支持注解配置，易用性有了大幅度的提高，使用简单，学习成本低，灵活性高，易拓展
abbrlink: 65754b0a
date: 2020-03-12 10:00:00
---

## 11分钟详析Spring MVC

> `我手中的魔法，是守护挚爱的力量，是坚定这个信念所必须的力量，我一定会拯救你的，无论在何时、何地。`

------

Spring MVC是当前最优秀的MVC框架，支持注解配置，易用性有了大幅度的提高，使用简单，学习成本低，灵活性高，易拓展。

### 1. 工作流程

![image](https://cdn.jsdelivr.net/gh/athink8/cdn/imgs/arctle/Springmvc1.png)

        <!-- 配置处理器 Handle，映射 “/controller1”请求 -->
    	<bean name="/controller1" class="com.controller.Controller1" />
        <!-- 已下默认不用写 在Spring 4.0 会自动使用默认的来处理 -->
    	<!-- 处理器映射器  将处理器的name作为URL请求进行查找-->
    	<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>	
    	<!-- 处理器适配器 配置对处理器中handleRequest（）方法的调用 -->
    	<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
    	<!--视图解析器  -->
    	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"/>

### 2. DispatcherServlet

        <!-- 配置Springmvc -->
    	<servlet>
            <servlet-name>dispatcher</servlet-name>
            <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
            <init-param>
                <param-name>contextConfigLocation</param-name>
                <param-value>classpath:spring-mvc.xml</param-value>
            </init-param>
            <load-on-startup>1</load-on-startup>
        </servlet>
        <servlet-mapping>
            <servlet-name>dispatcher</servlet-name>
            <url-pattern>/</url-pattern>
        </servlet-mapping>

> // <load-on-startup> 1为启动程序立即加载该<servlet> 

> //  <url-pattern> /  为拦截所有URL交给DispatcherServlet处理

### 3.Controller 层
#### 3.1实现接口 org.springframework.web.servlet.mvc.Controller

    public class Controller1 implements Controller {
    	public ModelAndView handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
    		ModelAndView modelAndView =new ModelAndView();
    		modelAndView.addObject("msg", "hello world");
    		modelAndView.setViewName("WEB-INF/jsp/index1.jsp");
    		return modelAndView;
    	}
    
    	<!-- 配置处理器 Handle，映射 “/controller1”请求 -->
    	<bean name="/controller1" class="com.controller.Controller1" />


#### 3.2 使用注解 @Controller   @RequestMapping

    @Controller
    @RequestMapping(value="/hello")  //标注在类上时所有请求前必须有定义的名称下"/hello
    public class Controller1{
    	
    	//跳转登录界面
    	@RequestMapping(value="/login",method=RequestMethod.GET)  //使用 /login 即可调用
    	public String toLogin(){
    		return "login";
    	}
    	
    	//获取登录视图传递来的信息进行配对 成功后视图跳转
    	@RequestMapping(value="/login",method=RequestMethod.POST)
    	public String login(User user,Model model,HttpSession session) {
    		System.out.println("当前用户： "+user);
    		String name=user.getName();
    		String password=user.getPassword();
    		if(name.equals("jz")&&password.equals("123")) {
    			session.setAttribute("session_user", user);
    	        //redirect 重定向的意思时跳转到相应的方法而不是跳到jsp视图
    			return "redirect:main";  
    		}else if(name.equals("aa")&&password.equals("123")) {
    			session.setAttribute("session_user", user);
    			return "redirect:upload";
    		}
    		model.addAttribute("msg", "用户名或密码错误");
    		return "login";
    	}

> //组合注解:   GetMapping  PostMapping  PutMapping  DeleteMapping  PatchMapping

### 4. 视图解析器

       <!-- 定义视图 -->
        <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        	<property name="prefix" value="/WEB-INF/jsp/"></property>
        	<property name="suffix" value=".jsp"></property>
        </bean>

### 5.数据绑定

#### 5.1绑定默认数据类型
* HttpServletRequest
* HttpServletResponse
* HttpSession
* Model/ModelMap  
> //model是接口  ModelMap是接口实现 作用是将数据填充到Request

#### 5.2绑定简单数据类型

    String 、Interget、double..
    //视图传递来的name属性要和控制器方法的形参相同
    //不同要使用注解 @RequestParam(value="name") String name 定义

#### 5.3绑定POJO类型

> 
    public String login(User user) {}

>
    <form action="${pageContext.request.contextPath}/hello/login " method="post" onsubmit="return check() ">  
        		账号： <input type="text" name="name" id="name"><br/>
        		密码： <input type="password" name="password" id="password"><br/>
        		<input type="submit" value="登录">
        		<input type="reset" value="重置">
        </form>



> //解决请求参数中中文乱码问题

    	<!-- 字符过滤为UTF-8 -->
    <filter>
    	<filter-name>Encoding</filter-name>
    	<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    	<init-param>
    		<param-name>encoding</param-name>
    		<param-value>UTF-8</param-value>
    	</init-param>
    </filter>
    <filter-mapping>
    	<filter-name>Encoding</filter-name>
    	<url-pattern>/*</url-pattern>
    </filter-mapping>

#### 5.4绑定包装POJO类型

    public class Order {
    	private Integer id;
    	private User user;
    }
    
    	//获取order.jsp界面传递来的参数
    	@RequestMapping("/order")
    	public String order(Order order) {
    		System.out.println(order);
    		return "index2";
    	}
    
    	<form action="${pageContext.request.contextPath}/hello/order " method="post"> 
    		订单号： <input type="text" name="order.id"><br/>
    		用户名： <input type="text" name="user.name"><br/>
    		<input type="submit" value="继续">
    		<input type="reset" value="重置">
    	</form>

> //两种规范：

> 1.查询条件参数是包装类的直接基本属性 则参数名直接用对应的属性名

> 2.查询条件参数是包装类的POJO的子属性  则参数名必须为 【对象.属性】对象为包装类里POJO的对象名

#### 5.5自定义绑定数据
##### 5.5.1 Converter转换器  //源格式可以为任何格式
> public interface Converter<S, T>{
T convert(S source)
}    //S 为源格式 T为目标格式

    public class DateConverter implements Converter<String, Date> {
    	public Date convert(String source) {
    		String datePattern="yyyy-MM-dd HH:MM:SS";
    		SimpleDateFormat simpleDateFormat=new SimpleDateFormat(datePattern);
    		try {
    			return simpleDateFormat.parse(source);
    		} catch (ParseException e) {
    			throw new IllegalArgumentException("无效格式，请使用这种格式"+datePattern);
    		}
    	}
    }


    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="http://www.springframework.org/schema/mvc
                                  http://www.springframework.org/schema/mvc/spring-mvc.xsd"
        <!-- 显示装配的自定义的转换器 -->
      <mvc:annotation-driven conversion-service="conversionservice1"></mvc:annotation-driven> 
          
        <!-- 自定义类型转换器配置 converters-->
      <bean id="conversionservice1" class="org.springframework.context.support.ConversionServiceFactoryBean">
        	<property name="converters">
        		<set>
        			<bean class="com.converter.DateConverter"></bean>
        		</set>
        	</property>
        </bean>

> 

    	//通过自定义绑定数据Converter或DateFormat 获取Date
    	@RequestMapping("customDate")
    	public String customDate(Date date) {
    		System.out.println(date);
    		return "index2";
    	}


##### 5.5.2 Formatter格式化  //源格式只能为String
> public interface Formatter<T> extends Printer<T>,Parser<T>{}

    public class DateFormatter implements Formatter<Date> {
    	private String datePattern="yyyy-MM-dd HH:MM:SS";
    	private SimpleDateFormat simpleDateFormat;
    	//返回目标对象的字符串
    	public String print(Date date, Locale locale) {
    		return new SimpleDateFormat().format(date);
    	}
    	//利用指定的local将一个String类型解析成目类型
    	public Date parse(String source, Locale locale) throws ParseException {
    		simpleDateFormat=new SimpleDateFormat(datePattern);
    		return simpleDateFormat.parse(source);
    	}
    }

> 

    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="http://www.springframework.org/schema/mvc
                                  http://www.springframework.org/schema/mvc/spring-mvc.xsd"
        <!-- 显示装配的自定义的转换器 -->
      <mvc:annotation-driven conversion-service="conversionservice1"></mvc:annotation-driven> 
        <!-- 自定义类型转换器配置formatters-->
        <bean id="conversionservice2" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
        	<property name="formatters">
        		<set>
        			<bean class="com.converter.DateFormatter"></bean>
        		</set>
        	</property>
        </bean>


#### 5.6绑定数组
    	//获取绑定要执行删除的数组 
    	@RequestMapping("/delID")
    	public String delID(Integer[] ids) {
    		if(ids!=null) {
    			for (Integer id : ids) {
    				System.out.println("你删除了第 "+id+"数据");
    			}
    		}else{
    			System.out.println("ids为null");
    		}
    		return "editUser";
    	}
    	<form action="${pageContext.request.contextPath}/hello/delID" method="post">
    		<table border=1 width="20%">
    			<thead>删除用户</thead>
    			<tbody>
    				<tr>
    					<td>选择</td>
    					<td>用户名</td>
    				</tr>
    				<tr>
    					<td> <input type="checkbox" name="ids" value="1"></input> </td>
    					<td>aa</td>
    				</tr>
    				<tr>
    					<td> <input type="checkbox" name="ids" value="2"></input> </td>
    					<td>bb</td>
    				</tr>
    			</tbody>
    		</table>
    		<br/><input type="submit" value="确定">
    	</form>


#### 5.6绑定集合  
> //后台不允许使用集合作为形参 只能用包装类来包装一个集合

> public class UserList {
	private List<User> userList;
}

    	//获取绑定要执行修改数据的集合
    	@RequestMapping("/editUser")
    	public String editUser(UserList userList1) {
    		List<User> users=userList1.getUserList();
    		for (User user : users) {
    			if(user.getId()!=null) {
    				System.out.println("修改了第 "+user.getId()+"数据");
    				System.out.println("用户名为："+user.getName());
    			}
    		}
    		return "index2";
    	}
    
    <form action="${pageContext.request.contextPath}/hello/editUser" method="post">
    		<table border=1>
    			<thead>修改用户</thead>
    			<tr>
    				<td>选择</td>
    				<td>用户名</td>
    			</tr>
    			<tr>
    				<td> <input type="checkbox" name="userList[0].id" value="1"></input> </td>
    				<td> <input type="text" name="userList[0].name" value="jz"></input></td>
    			</tr>
    			<tr>
    				<td> <input type="checkbox" name="userList[1].id" value="2"></input> </td>
    				<td> <input type="text" name="userList[1].name" value="aa"></input></td>
    			</tr>
    		</table>
    		<br/><input type="submit" value="确定">
    	</form>


### 6.JSON 和RESTful
#### 6.1 JSON 格式
> 对象结构：

    {
    key1:value1,
    key2:value2
    }

> 数组结构：

    [
    value1,
    value2
    ]

#### 6.2JSON数据交换
> 包类：

> jackson-annotations-2.9.9.jar

> jackson-core-2.9.9.jar

> databind-2.9.9.jar

> 注解：

> @RequestBody  //将请求体的数据绑定在形参上  作用在形参
> @ResponseBody  //返回JSON格式  作用在方法上


        <!-- 配置注解驱动 
    自动注册 org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping
        	和org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter 
    -->
        <mvc:annotation-driven />
        <!--第1种. 配置静态资源的访问映射 使其不被前端控制器拦截 -->
        <mvc:resources location="/js/" mapping="/js/**" />
        <!-- 第2种.使用使用默认的服务器请求处理器自动判断筛选 -->
        <!-- <mvc:default-servlet-handler/> -->


​	
> 

    //测试JSON 
    @RequestMapping(value="/login2",method=RequestMethod.POST)
    @ResponseBody  //返回JSON格式
    public User login2(@RequestBody User user) {
    	System.out.println("login2 测试");
    	System.out.println(user);
    	return user;
    }

> 

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    	<title>Insert title here</title>
    	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.3.1.min.js"></script>
    	<script type="text/javascript">
    		function check() {
    			var name=$("#name").val();
    			var password=$("#password").val();
    			if(name==null||password==null||name==""||password==""){
    				alert("账号或密码不能为空！！");
    				return false;
    			}
    			return true;
    		}
    //使用JQuery的AJAX传递JSON格式
    		function login2(){
    			//alert("1");
    			var name=$("#name").val();
    			var password=$("#password").val();
    			var id=1;	
    			if(check()){
    				$.ajax({
    //url前往路径
    					url:"${pageContext.request.contextPath}/hello/login2", 
    					type:"post",
    //data请求发送的数据
    					data:JSON.stringify({id:id,name:name,password:password}),
    //json格式时 必须为application/json
    					contentType:"application/json;charset=UTF-8",
    //定义回调属性为json
    					dataType:"json",
    					success:function(data){
    						alert(data.name+data.password);
    					}	
    				});
    			}	
    		}
    	</script>
    </head>
    <body>
    	<!-- ${pageContext.request.contextPath}<br/>-->
    	<div style="color: red">${msg}</div>
    	<form action="${pageContext.request.contextPath}/hello/login " method="post" onsubmit="return check()"> 
    		账号： <input type="text" name="name" id="name"><br/>
    		密码： <input type="password" name="password" id="password"><br/>
    		<input type="submit" value="登录">
    		<input type="reset" value="重置">
    		<input type="button" value="登录2" onclick="login2()" />
    	</form>
    </body>
    </html>

#### 6.3RESTful风格
> 如：http://hello/items/1  
//参数写在连接之后

    	//用RESTful风格测试JSON
    	@RequestMapping(value="/user/{id}",method=RequestMethod.GET)
    	@ResponseBody
    	public User selectUser(@PathVariable("id") Integer id) {
    		User user1=new User();
    		//模拟在数据库找到此ID数据
    		if(id.equals(1)) {
    			user1.setName("jzz");
    			user1.setId(id);
    			System.out.println("ID: "+user1.getId()+" 用户名： "+user1.getName());
    		}else {
    			System.out.println("没有找到此ID的用户");
    		}
    		return user1;
    	}

> 


    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.3.1.min.js"></script>
    	<script type="text/javascript">
    		function select1(){
    			//alert("1");
    			var id=$("#number").val();
    			$.ajax({
    				url:"${pageContext.request.contextPath}/hello/user/"+id,
    				type:"GET",
    				dataType:"json",
    				success:function(data){
    					if(data.id!=null&&data.name!=null){
    						alert("id: "+data.id+"用户名： "+data.name);
    					}else{
    						alert("没有找到此ID的用户");
    					}
    				}
    				
    			}) 
    		}
    	</script>

### 7.拦截器interceptor
* // 拦截器需实现接口 HandlerInterceptor 或它的实现类 HandlerInterceptorAdapter
* //或者 实现接口WebRequestInterceptor或实现类WebRequestHandlerInterceptorAdapter

        public class LoginInterceptor extends HandlerInterceptorAdapter {
            	//此方法在控制器方法前执行  返回true时继续执行  fasle时中断控制器方法及拦截器方法
        	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
        		//判断是否登录 /login 连接
        		String url=request.getRequestURI();
        		System.out.println("当前连接："+url);
        		if(url.indexOf("/login")>=0) {
        			return true;
        		}
        		if(url.indexOf("/login2")>=0) {
        			return true;
        		}
        		
        		//判断session是否有数据User用户
        		HttpSession session=request.getSession();
        		User user =(User) session.getAttribute("session_user");
        		if(user!=null) {
        			return true;
        		}
        	
        	//不符合条件重新转发到登录界面
        	request.setAttribute("msg", "你还没有登录，请登录！");
        	request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
        	return false;
        }
        //此方法在控制器调用之后 视图解析前执行  以便对模型和视图进行修改
        public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView modelAndView)
        		throws Exception {
        	// TODO Auto-generated method stub
        
        }
        //此方法在视图解析之后进行  可进行资源清理、日子记录等等
        	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3)
        			throws Exception {
        		// TODO Auto-generated method stub
        		
        	}
        }
        
            <!-- 配置拦截器 -->
        	<mvc:interceptors>
        		<!-- 全局拦截器 -->
        		<!--<bean class="" />  -->
        		<mvc:interceptor>
        			<mvc:mapping path="/**"/> <!-- 配置拦截器作用的路径 -->
        			<mvc:exclude-mapping path=""/> <!-- 配置拦截器不作用的路径 -->
        			<bean class="com.interceptor.LoginInterceptor"></bean>
        		</mvc:interceptor>
        	</mvc:interceptors>


> /* 假设配置多个拦截器interceptor1   interceptor2 
则其拦截器的方法的调用的顺序是：
interceptor1(preHandle) - interceptor2(preHandle) - handleAdapter(Handle) -interceptor2(postHandle) - interceptor1(postHandle) - DispatcherServlet(reader) - interceptor2(afterCompletion) -  interceptor1(afterCompletion)  */


### 7.文件上传
>类包：
* commons-fileupload-1.4.jar 
* commons-io-2.6.jar

    	<!-- 配置文件上传解析器 multipartResolver -->
        	<!-- 因为CommonsMultipartResolver内部是引用MultipartResolver字符串来完成文件解析 所以指定的ID必须为multipartResolver  -->
        <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
            <!-- 配置缓存中最大阈值 低于此值，只保留在内存里，超过此阈值，生成硬盘上的临时文件 -->
            <property name="maxInMemorySize" value="" /> 
            <!-- 推迟文件解析 -->
            <property name="resolveLazily" value=""/>
            <!-- 允许文件上传的最大尺寸 -->
            <property name="maxUploadSize" value="10485760" />
            <!-- 默认编码格式 -->
            <property name="defaultEncoding" value="UTF-8" />
        </bean>

> 

    <!--  enctype属性必须为"multipart/form-data"   multiple="multiple" 表示可以多文件上传 -->
    	<form id="form1" action="${pageContext.request.contextPath}/hello/upload" enctype="multipart/form-data" method="post" onsubmit="return check()" >
    		上传人： <input type="text" id="name1" name="name1" /> <br/>    
    		<input type="file" multiple="multiple"  name="ufile" id="ufile" />
    		<input type="submit" value="上传" />
    	</form>

> 

    //上传文件处理
    	@RequestMapping(value="/upload" ,method=RequestMethod.POST)
    	public String upload(@RequestParam(value="name1") String name1,@RequestParam(value="ufile") List<MultipartFile> ufile,HttpServletRequest request,HttpSession session) {
    		
    		//System.out.println("1成功");
    		User user=(User) session.getAttribute("session_user");
    		//System.out.println(user);
    		
    		//判断上传文件是否存在
    		if(!ufile.isEmpty()&&ufile.size()>0) {
    			for (MultipartFile multipartFile : ufile) {
    				//获取上传文件的源名字
    				String sfilename=multipartFile.getOriginalFilename();
    				//上传文件的最后的保存路径
    				String dirPath=request.getServletContext().getRealPath("/upload")+"/"+user.getName();
    				System.out.println("dirPath :"+dirPath);
    				//假设目录不存在 就创建目录
    				File pathfile=new File(dirPath);
    				if(!pathfile.exists()) {
    					pathfile.mkdirs();
    				}
    				//上传文件的最后的文件名 上传人_UUID_源文件名
    				String lfilename=name1+"_"+UUID.randomUUID()+" "+sfilename;
    				try {
    					multipartFile.transferTo(new File(dirPath,lfilename));
    				} catch (IllegalStateException | IOException e) {
    					// TODO Auto-generated catch block
    					e.printStackTrace();
    					System.out.println("错误"+e);
    				}
    			}
    			return "index2";
    		}else {
    			System.out.println("错误2");
    			return null;
    		}
    	}


> // MultipartFile 接口常用方法
*  byte[] getBytes() 返回文件的内容作为一个字节数组
*  String getContentType() 返回文件的内容类型
*  InputStream getInputStream() 返回InputStream读取文件的内容
*  String getName() 返回参数的名称多部分的形式
*  String getOriginalFilename() 返回原来的文件名
*  long getSize() 返回文件的大小,以字节为单位
*  boolean isEmpty() 返回是否上传文件是空
*  void transferTo(File dest) 接收到的文件转移到给定的目标文件。

### 8.文件下载
> // 使用 ResponseEntity<byte[]> 对象设置 HttpHeaders 和 HttpStatus 配置信息下载

    <%@ page import="java.net.URLEncoder"%>
    ...
    <a href="${pageContext.request.contextPath}/hello/download?
    filename=<%=URLEncoder.encode("看.jpg","UTF-8")%>">下载</a>
    
    //下载文件处理
    	@RequestMapping(value="/download")
    	public ResponseEntity<byte[]> download(@RequestParam("filename") String filename,HttpSession session,HttpServletRequest request) throws IOException{
    		System.out.println("download 开始！");
    		//System.out.println(filename);
    		
    		User user =(User) session.getAttribute("session_user");
    		//下载文件路径
    	//String pathname=request.getServletContext().getRealPath("/upload")+"/"+user.getName();
    	//File pathfile=new File(pathname+File.separator+filename);
    		File pathfile=new File("C:\\Users\\jz\\Pictures\\Camera Roll\\"+filename);
    		System.out.println(pathfile);
    		if(!pathfile.exists()) {
    			System.out.println("文件为空");
    		}
    		//设置头信息
    		HttpHeaders headers = new HttpHeaders(); 
    		//中文文件名处理
    		String filename1=new String(filename.getBytes("utf-8"),"ISO-8859-1");
    		 //设置请求头内容,告诉浏览器以下载方式打开窗口
    		headers.setContentDispositionFormData("attachment", filename1);
    		//定义以流的形式返回下载数据
    		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(pathfile),    
                                                  headers, HttpStatus.OK);  
    	}







