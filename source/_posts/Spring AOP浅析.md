---
title: Spring AOP浅析
categories:
  - Spring
tags:
  - Spring
  - AOP
cover: false
top: false
keywords: 'Spring,SpringBoot,AOP'
summary: ' Spring Aop在实际生产中往往很多地方都需要，如最常用的权限检查和日志记录等，都是web开发中必可少的..'
abbrlink: 145eface
date: 2020-03-11 20:00:00
---

## Spring AOP浅析

> `既然认准这条路，何必去打听要走多久`

------

AOP是Spring框架面向切面的编程思想，AOP采用一种称为“横切”的技术，将涉及多业务流程的通用功能抽取并单独封装，形成独立的切面，在合适的时机将这些切面横向切入到业务流程指定的位置中。

### 1.AOP名词解释

* JoinPoint(连接点):目标对象中,所有可以增强的方法，就是spring允许你是通知（Advice）的地方，那可就真多了，基本每个方法的前、后（两者都有也行），或抛出异常是时都可以是连接点，spring只支持方法连接点。

* Pointcut(切入点):目标对象中,已经被增强的方法。调用这几个方法之前、之后或者抛出异常时干点什么，那么就用切入点来定义这几个方法。
* Advice(通知/增强) :增强方法的代码、想要的功能。
* Target(目标对象):被代理对象，被通知的对象，被增强的类对象。
* Weaving(织入):将通知应用到连接点形成切入点的过程
* Proxy(代理):将通知织入到目标对象之后形成的代理对象
* aspect(切面):切入点+通知—通知(Advice)说明了干什么的内容(即方法体代码)和什么时候干（什么时候通过方法名中的before，after，around等就能知道），二切入点说明了在哪干（指定到底是哪个方法），切点表达式等定义。

### 2.两种代理方式
#### 2.1.JDK动态代理
> 主要是代理接口；

> jdk的动态代理调用了Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h) 方法；

> 代理类需要继承java.lang.reflect.invocationHandle 接口；

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import com.aspect.MyAspect;
import com.jdk.*;

public class JdkProxy implements InvocationHandler {

	private Userdao userdao;
	public Object creatProxy(Userdao userdao){
		this.userdao=userdao;
		//类加载器
		ClassLoader classLoader=JdkProxy.class.getClassLoader();
		//获取所有目标对象所有接口
		Class[] clazz=userdao.getClass().getInterfaces();
		//返回代理后对象
		return Proxy.newProxyInstance(classLoader, clazz, this);
	}
	
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		MyAspect myAspect=new MyAspect();
		myAspect.check();
		Object obj=method.invoke(userdao, args);
		myAspect.log();
		return obj;
	}
}
```

#### 2.2  CGLIB代理
> 主要是代理类。

```java
package com.proxy;
import java.lang.reflect.Method;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;
import org.springframework.cglib.proxy.Enhancer;
import com.aspect.*;

public class CglibPoxy implements MethodInterceptor {
	public Object crearProxy(Object target){
		//创建动态对象
		Enhancer enhancer=new Enhancer();
		//确定要增强胡类及设置父类
		enhancer.setSuperclass(target.getClass());
		enhancer.setCallback(this);
		return enhancer.create();
	}
	
	public Object intercept(Object proxy, Method method, Object[] args,
			MethodProxy methodProxy) throws Throwable {
		
		MyAspect myAspect=new MyAspect();
		myAspect.check();
		Object object= methodProxy.invokeSuper(proxy, args);
		myAspect.log();
		return object;
	}
}
```

### 3.Spring AOP的实现
#### 3.1.所需类包：
* spring 核心包
* spring-aop-4.3-release.jar
* aopalliance-1.0.jar
> 主要是通过 ProxyFactoryBean 来创建代理实例

#### 3.2.实现：

* Myaspect切面类：

    ```java
    package com.aspect;
    import org.aopalliance.intercept.MethodInterceptor;
    import org.aopalliance.intercept.MethodInvocation;
    public class Myaspect implements MethodInterceptor {
    	public Object invoke(MethodInvocation method) throws Throwable {
    		check();
    		Object object= method.proceed();
    		log();
    		return object;
    	}
    
    public void check(){
    	System.out.println("模拟检查权限。。");
    }
    public void log(){
    	System.out.println("模拟检查日志。。");
    }
    ```
    }

* application配置文件:

    ```xaml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd">
    	<bean id="userdao" class="com.dao.Userdaoimpl"/>
    	<bean id="myaspect" class="com.aspect.Myaspect"/>
    	<bean id="userdaoproxy" class="org.springframework.aop.framework.ProxyFactoryBean">
    	<!-- <property name="proxyInterfaces" value="com.dao.Userdao"></property> -->	
    		<property name="target" ref="userdao"></property>
    		<property name="interceptorNames" value="myaspect"></property>
    	</bean>
    </beans>
    ```

### 4.Aspectj 开发
> 主要包类：
* spring 核心包
* spring-aop-4.3-release.jar
* aspectjweaver-1.8.10.jar

#### 4.1 基于XML声明

> 实现：

* applicationContext配置文件:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop-4.3.xsd">
            
    	<bean id="userdao" class="com.dao.Userdao"></bean>
    	<bean id="myaspect" class="com.aspect.Myaspect"></bean>
    	<aop:config>
    		<aop:aspect ref="myaspect">
    			<aop:pointcut id="pointcut1" expression="execution(* com.dao.*.*(..))"></aop:pointcut>
    			<aop:before method="mybefore" pointcut-ref="pointcut1" />
    			<aop:after-returning method="myafterRetern" returning="returnVal" pointcut-ref="pointcut1"/>
    			<aop:around method="myAround" pointcut-ref="pointcut1" />
    			<aop:after-throwing method="mythrow" throwing="e" pointcut-ref="pointcut1"/> 
    			<aop:after method="myAfter" pointcut-ref="pointcut1" />	
    		</aop:aspect>
    	</aop:config>
    </beans>
    ```


* Aspect切面类：

    ```java
    package com.aspect;
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.ProceedingJoinPoint;
    public class Myaspect {
    	//前置通知
    	public void mybefore(JoinPoint joinPoint){
    		System.out.println("模拟前置执行通知。。");
    		System.out.println("执行的目标类： "+joinPoint.getTarget());
    		System.out.println("目标方法： "+joinPoint.getSignature().getName());
    		System.out.println("-----------------");
    	}
    	//后置通知
    	public void myafterRetern(JoinPoint joinPoint,Object returnVal){
    		System.out.println(returnVal);
    		System.out.println("模拟后置记录日志");
    		System.out.println("目标方法： "+joinPoint.getSignature().getName());
    		System.out.println("-----------------");
    	}
    	
    	//环绕通知
    	public Object myAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
    		System.out.println("-----------------");
    		System.out.println("环绕前置开始：---");
    		Object object=proceedingJoinPoint.proceed();
    		System.out.println("环绕后置结束：---");
    		System.out.println("-----------------");
    		return object;
    	}
    	
    	//异常通知
    	public void mythrow(JoinPoint joinPoint,Throwable e){
    		System.out.println("异常发生： "+e.getMessage());
    		System.out.println("-----------------");
    	}
    	//最终通知
    	public void myAfter(JoinPoint joinPoint){
    		System.out.println("最终通知。。");
    		System.out.println("-----------------");
    	}
    }
    ```



#### 4.1 基于注解声明

* applicationContext配置文件:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context-4.3.xsd">
            
    	<context:component-scan base-package="com" />
    	<aop:aspectj-autoproxy />
    </beans>
    ```

*Aspect切面类：

```java
    package com.aspect;
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.*;
    import org.springframework.stereotype.Component;
    
    @Aspect
    @Component
    public class Myaspect {
    	//定义切入点
    	@Pointcut("execution(* com.dao.*.*(..))")
    	private void mypointcut() {}
    	
    	//前置通知
    	@Before("mypointcut()")
    	public void mybefore(JoinPoint joinPoint){
    		System.out.println("模拟前置执行通知。。");
    		System.out.println("执行的目标类： "+joinPoint.getTarget());
    		System.out.println("目标方法： "+joinPoint.getSignature().getName());
    		System.out.println("-----------------");
    	}
    	
    	//后置通知
    	@AfterReturning(value="mypointcut()",returning="returnVal")
    	public void myafterRetern(JoinPoint joinPoint,Object returnVal){
    		System.out.println(returnVal);
    		System.out.println("模拟后置记录日志");
    		System.out.println("目标方法： "+joinPoint.getSignature().getName());
    		System.out.println("-----------------");
    	}
    	
    	//环绕通知
    	@Around("mypointcut()")
    	public Object myAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
    		System.out.println("-----------------");
    		System.out.println("环绕前置开始：---");
    		Object object=proceedingJoinPoint.proceed();
    		System.out.println("环绕后置结束：---");
    		System.out.println("-----------------");
    		return object;
    	}
    	
    	//异常通知
    	@AfterThrowing(value="mypointcut()",throwing="e")
    	public void mythrow(JoinPoint joinPoint,Throwable e){
    		System.out.println("异常发生： "+e.getMessage());
    		System.out.println("-----------------");
    	}
    	
    	//最终通知
    	@After("mypointcut()")
    	public void myAfter(JoinPoint joinPoint){
    		System.out.println("最终通知。。");
    		System.out.println("-----------------");
    	}
    }
```





