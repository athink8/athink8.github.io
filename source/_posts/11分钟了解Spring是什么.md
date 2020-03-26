---
title: 11分钟了解Spring是什么
categories:
  - Spring
tags:
  - Spring
  - 简介
cover: false
top: false
keywords: 'Spring,简介,,11分钟,11,blog.onfree.cn,Athink'
summary: ' Spring框架是由于软件开发的复杂性而创建的。Spring使用的是基本的JavaBean来完成以前只可能由EJB完成的事情'
abbrlink: af11a1b8
date: 2020-03-14 13:00:00
---

## 11分钟了解Spring是什么

> `有志者自有千计万计，无志者只感千难万难。`

Spring框架是由于软件开发的复杂性而创建的。Spring使用的是基本的JavaBean来完成以前只可能由EJB完成的事情。然而，Spring的用途不仅仅限于服务器端的开发。从简单性、可测试性和松耦合性角度而言，绝大部分Java应用都可以从Spring中受益。

### 1.Spring框架包的下载
> http://repo.spring.io/simple/libs-release-local/org/springframework/spring/

### 2.spring框架体系
![image](https://cdn.jsdelivr.net/gh/athink8/cdn/imgs/arctle/Spring1.png)

### 3.spring 核心容器
* BeanFactory接口: 

    Resource resource = new FileSystemResource("beans.xml");
    BeanFactora factory = new XmlBeanFactory(resource);

* ApplicationContext接口：
> 
    从类路径下加载配置文件:  ClassPathXmlApplicationContext

    从硬盘的绝对路径下加载配置文件: FileSystemXmlApplication

### 4.spring配置详解
#### 4.1、元素属性

* bean元素:使用该元素描述需要spring容器管理对象
  
* name属性:给被管理的对象起个名字,获得对象时getBean("name值")

* class属性:被管理对象的完整类名

* id属性:与name属性一模一样，名称不可重复，不能使用特殊字符

 

**name和id之间的一些注意点:**

    1 配置两个相同的 id 或者 name 都不能通过。
    
    2 如果既配置了 id ，也配置了 name ，则两个都生效。如果id和name都没有指定，则用类全名作为name，如<bean class="com.stamen.BeanLifeCycleImpl">,则你可以通过getBean("com.stamen.BeanLifeCycleImpl")返回该实例
    
    3 如果配置基本类的时候，注解和配置文件都使用的时候，注解和配置文件中 name 相同的时候， 则两个冲突，配置文件生效。如果配置基本类的时候，注解和配置文件都使用的时候，注解和配置文件中 name 不相同的时候， 则两个不冲突，都能够生效。

 




#### 4.2、bean元素进阶

1. scope属性

    (1) singleton  (默认值 )  
    > 单例对象:被标识为单例的对象在spring容器中只会存在一个实例
    
    (2) prototype    
    > 多例原型:被标识为多例的对象,每次在获得才会被创建,每次创建都是新的对象
    
    (3)request
    > Web环境下,对象与request生命周期一致    
    
    (4)session
    > Web环境下,对象与session生命周期一致
    
> 总结:绝大多数情况下，使用单例singleton(默认值)，但是在与struts整合时候，务必要用prototype多例，因为struts2在每次请求都会创建一个新的Action，若为单例，在多请求情况下，每个请求找找spring拿的都是同一个action。


2. 生命周期属性(了解)———初始化和销毁
   
    (1)配置一个方法作为生命周期初始化方法,spring会在对象创建之后立刻调用 init-method
    
    (2)配置一个方法作为生命周期的销毁方法,spring容器在关闭并销毁所有容器中的对象之前调用destory-method
    
        <bean init-method=“init”  destory-method=“destory”></bean>
        //对应注解为@PostConstruct
        <bean name=“hello” class=“完整类名”></bean>
        //对应注解为@PreDestory


3. 模块化配置,即分模块配置(导入其他spring配置文件)

        <beans>
            <import resource = “spring配置文件的全路径名” />
        </beans>

 

#### 4.3、spring三种对象的创建方式
    (1)空参数构造(重要)
    
    (2)静态工厂创建(调用静态方法创建)调用UserFactory类的静态createUser方法创建名为user的对象,放入容器
        <bean name="user" class="cn.itcats.UserFactory" factory-method="createUser"></bean>
    
    (3)实例工厂创建(调用非静态方法创建)——需要配置两个bean，因为无法通过类名调用非静态方法
        <bean name="user2" factory-bean="userFactory" factory-method="createUser"></bean>
        <bean name=“userFactory” class=“cn.itcats.UserFactory”></bean>







