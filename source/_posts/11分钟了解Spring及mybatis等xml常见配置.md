---
title: 11分钟了解Spring及mybatis等xml常见配置
categories:
  - Spring
tags:
  - Spring
  - mybatis
  - SpringMVC
  - 配置
cover: false
top: false
keywords: 'Spring,mybatis,SpringMVC,配置,xml,11分钟,11,blog.onfree.cn,Athink'
summary: 在使用Spring、SpringMVC和mybatis开发时，往往要配置的文件信息太多了，自己敲的话太麻烦了，以下整理了关于了常见的配置信息
abbrlink: '1572e255'
date: 2020-03-15 18:00:00
---

## 11分钟了解Spring及mybatis等xml常见配置

> `世界会向那些有目标和远见的人让路。`

总所周知，在使用Spring、SpringMVC和mybatis开发时，往往要配置的文件信息太多了，自己敲的话太麻烦了，以下整理了关于了常见的配置信息，可直接复制粘贴修改使用就好啦。

### 1.web.xml :

    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" 
    id="WebApp_ID" version="3.1">
    
    <!-- 欢迎页 -->
    <welcome-file-list>
    	<welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
    
    <!-- 配置Spring -->
      <context-param> 
        <param-name> contextConfigLocation </param-name> 
        <param-value>classpath:applicationContext.xml</param-value> 
    </context-param> 
    
    <!-- 配置监听器 -->
    <listener> 
        <listener-class> org.springframework.web.context.ContextLoaderListener </listener-class> 
    </listener>
    
      <!-- 前端配置器 spring mvc-->
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
      
      <!-- 中文处理过滤 -->
      <filter>
        <filter-name>Encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
          <param-name>encoding</param-name>
          <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
         <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
      </filter>
      <filter-mapping>
        <filter-name>Encoding</filter-name>
        <url-pattern>/*</url-pattern>
      </filter-mapping>
    </web-app>


### 2. applicationContext.xml:

    <beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:aop="http://www.springframework.org/schema/aop" 
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-4.3.xsd 
    http://www.springframework.org/schema/context 
    http://www.springframework.org/schema/context/spring-context-4.3.xsd 
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop-4.3.xsd 
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx-4.3.xsd">
    
    <!-- 加载db.properties -->
    <context:property-placeholder location="classpath:db.properties"/>
    
    <!-- 加载log4j.properties -->
    <context:property-placeholder location="classpath:log4j.properties" />
    
    <!-- 配置数据源 -->
    <bean id="datasource" class="org.apache.commons.dbcp2.BasicDataSource">
    	<property name="driverClassName" value="${jdbc.driver}"></property>
    	<property name="url" value="${jdbc.url}"></property>
    	<property name="username" value="${jdbc.username}"></property>
    	<property name="password" value="${jdbc.password}"></property>
        <!-- 最大连接数 -->
    	<property name="maxTotal" value="${jdbc.maxTotal}"></property> 
     	<!-- 最大空闲连接数 -->
        <property name="maxIdle" value="${jdbc.maxIdle}"></property>
         <!-- 初始化连接数 -->
         <property name="initialSize" value="${jdbc.initialSize}"></property> 
    </bean>
    
    <!-- 配置事务管理 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    	<property name="dataSource" ref="datasource"/>
    </bean>
    
    <!-- 开启事务注解 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>
    
    <!-- 配置 MyBatis的工厂 -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    	<!-- 数据源 -->
    	<property name="dataSource" ref="datasource" />
    	<!-- 配置MyBatis的核心配置文件所在位置 -->
    	<property name="configLocation" value="classpath:mybatis-config.xml" />
    </bean>
    
    <!-- 配置Mapper 自动扫描器 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    	<property name="basePackage" value="com.dao"></property>
    </bean>
    
    <!-- 开启注解扫描com.service -->	
    <context:component-scan base-package="com.service"/>
    
    </beans>

### 3. mybatis-config.xml

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE configuration
     PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
     "http://mybatis.org/dtd/mybatis-3-config.dtd">
    <configuration>
    	<typeAliases>
    		<package name="com.po"/>
    	</typeAliases>
    	<mappers>
    		<mapper resource="com/dao/Userdao.xml"/>
    	</mappers>
    </configuration>

### 4.mybatis-mapper.xml

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE mapper
      PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
      "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    
    <mapper namespace="com.mapper.StudentMapper">
        <select id="findbyid" parameterType="Integer" resultMap="StudentResult">
            select *from student where id=#{id}
        </select>
    
    </mapper>

### 5.spring-mvc.xml

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                              http://www.springframework.org/schema/beans/spring-beans.xsd
                              http://www.springframework.org/schema/context 
                              http://www.springframework.org/schema/context/spring-context.xsd
                              http://www.springframework.org/schema/mvc
                              http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    
    <context:component-scan base-package="com.controller"></context:component-scan>
    <!--<bean name="/index" class="com.controller.Controller1 "/>-->
    
    <!-- 定义视图 -->
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    	<property name="prefix" value="/WEB-INF/jsp/"></property>
    	<property name="suffix" value=".jsp"></property>
    </bean>
    
    <!-- 配置注解驱动 
    	自动注册org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping
    	和org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter -->
    <mvc:annotation-driven />
    
    <!-- 配置静态资源的访问映射 使其不被前端控制器拦截 -->
    <mvc:resources location="/js/" mapping="/js/**" />
    <!-- 使用使用默认的服务器请求处理器自动判断筛选 -->
    <!-- <mvc:default-servlet-handler/> -->
    
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
        
    <!-- 显示装配的自定义的转换器 -->
    <!-- <mvc:annotation-driven conversion-service="conversionservice1"></mvc:annotation-driven> -->
    
    <!-- 自定义类型转换器配置 converters-->
    <!-- <bean id="conversionservice1" class="org.springframework.context.support.ConversionServiceFactoryBean">
    	<property name="converters">
    		<set>
    			<bean class="com.converter.DateConverter"></bean>
    		</set>
    	</property>
    </bean> -->
    
    <!-- 自定义类型转换器配置formatters-->
    <!-- <bean id="conversionservice2" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
    	<property name="formatters">
    		<set>
    			<bean class="com.converter.DateFormatter"></bean>
    		</set>
    	</property>
    </bean> -->
    
    </beans>

### 6.db.properties

    jdbc.driver=com.mysql.jdbc.Driver
    jdbc.url=jdbc:mysql://localhost:3306/test1
    jdbc.username=root
    jdbc.password=123456
    jdbc.maxTotal=30
    jdbc.maxIdle=10
    jdbc.initialSize=5

### 7.log4j.properties

    # Global logging configuration
    log4j.rootLogger=ERROR, stdout
    # MyBatis logging configuration...
    log4j.logger.com=DEBUG
    # Console output...
    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n













