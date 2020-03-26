---
title: 11分钟实现springBoot打war包和发布
categories:
  - SpringBoot
tags:
  - war
cover: false
top: false
keywords: 'war,Java,SpringBoot,打包,11分钟,11,blog.onfree.cn,Athink'
summary: ' 用springBoot使开发变得很简便，其内置Tomcat更是实现了无法外置Tomcat启动项目。然而有时候需要统一管理程序'
abbrlink: ed7edb2d
date: 2020-03-22 18:30:00
---

## 11分钟实现springBoot打war包和发布

> `平安是幸，知足是福，清心是禄，寡欲是寿`

用springBoot使开发变得很简便，其内置Tomcat更是实现了无法外置Tomcat启动项目，大大提高了便利性，然而有时候需要统一管理程序，或发布多个同端口项目时，不得不得打包成War包，方便防止在所需发布的服务器上。

#### 一、修改打包形式
> 在pom.xml里设置 

        <packaging>war</packaging>

#### 二、移除嵌入式tomcat插件
> 在pom.xml里找到spring-boot-starter-web依赖节点，添加<exclusions></exclusions>之间的内容，

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <!-- 移除嵌入式tomcat插件 -->
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

#### 三、添加servlet-api的依赖
> 下面两种方式都可以，任选其一

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
>     
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-servlet-api</artifactId>
            <version>8.0.36</version>
            <scope>provided</scope>
        </dependency>

#### 四、修改启动类，并重写初始化方法
> 平常用main方法启动的方式，都有一个App的启动类，代码如下：

        @SpringBootApplication
        public class Application {
            public static void main(String[] args) {
                SpringApplication.run(Application.class, args);
            }
        }

> 需要类似于web.xml的配置方式来启动spring上下文了，在Application类的同级添加一个SpringBootStartApplication类，其代码如下:

        /**
         * 修改启动类，继承 SpringBootServletInitializer 并重写 configure 方法
         */
        public class SpringBootStartApplication extends SpringBootServletInitializer {
         
            @Override
            protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
                // 注意这里要指向原先用main方法执行的Application启动类
                return builder.sources(Application.class);
            }
        }

#### 五 application.propertis添加
> 当需要发布多个springboot项目到tomcat时需要添加如下，否则报错如下

> Caused by: org.springframework.jmx.export.UnableToRegisterMBeanException: Unable to register MBean [HikariDataSource (HikariPool-2)] with key 'dataSource'; nested exception is javax.management.InstanceAlreadyExistsException: com.zaxxer.hikari:name=dataSource,type=HikariDataSource


        spring.jmx.enabled=false；
> 或者如下：        

        spring.jmx.default-domain

#### 六、打包部署