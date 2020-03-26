---
title: 11分钟学会springboot热部署
categories:
  - SpringBoot
tags:
  - 热部署
  - SpringBoot
cover: false
top: false
keywords: '热部署,SpringBoot,组件,11分钟,11,blog.onfree.cn,Athink'
summary: ' spring为开发者提供了一个名为spring-boot-devtools的模块来使Spring Boot应用支持热部署，提高开发者的开发效率，无需.'
abbrlink: 63687d21
date: 2020-03-18 12:30:00
---

## 11分钟学会springboot热部署

> `一个人的快乐，不是因为他拥有的多，而是因为他计较的少。`

### 一、spring-boot-devtools

> spring为开发者提供了一个名为spring-boot-devtools的模块来使Spring Boot应用支持热部署，提高开发者的开发效率，无需手动重启Spring Boot应用。

**devtools的原理**

> 深层原理是使用了两个ClassLoader，一个Classloader加载那些不会改变的类（第三方Jar包），另一个ClassLoader加载会更改的类，称为restart ClassLoader,这样在有代码更改的时候，原来的restart ClassLoader 被丢弃，重新创建一个restart ClassLoader，由于需要加载的类相比较少，所以实现了较快的重启时间。

#### 1.添加以下的配置：

    <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
    </dependency>
    
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
         <!--fork:如果没有该项配置,整个devtools不会起作用-->
            <fork>true</fork>
        </configuration>
    </plugin>


**说明：**

（1） devtools可以实现页面热部署（即页面修改后会立即生效，这个可以直接在application.properties文件中配置spring.thymeleaf.cache=false来实现），
实现类文件热部署（类文件修改后不会立即生效），实现对属性文件的热部署。
即devtools会监听classpath下的文件变动，并且会立即重启应用（发生在保存时机），注意：因为其采用的虚拟机机制，该项重启是很快的

（2）配置了true后在修改java文件后也就支持了热启动，不过这种方式是属于项目重启（速度比较快的项目重启），会清空session中的值，也就是如果有用户登陆的话，项目重启后需要重新登陆。

> 默认情况下，/META-INF/maven，/META-INF/resources，/resources，/static，/templates，/public这些文件夹下的文件修改不会使应用重启，但是会重新加载（devtools内嵌了一个LiveReload server，当资源发生改变时，浏览器刷新）。

**devtools的配置**

在application.properties中配置spring.devtools.restart.enabled=false，此时restart类加载器还会初始化，但不会监视文件更新。

在SprintApplication.run之前调用System.setProperty(“spring.devtools.restart.enabled”, “false”);可以完全关闭重启支持，配置内容： 

```xml
#热部署生效
spring.devtools.restart.enabled: true
#设置重启的目录
#spring.devtools.restart.additional-paths: src/main/java
#classpath目录下的WEB-INF文件夹内容修改不重启
spring.devtools.restart.exclude: WEB-INF/**
```

二选一

```
 #热部署
 devtools:
   restart:
     enabled: true
     additional-paths: src/main/java
```



#### 2.设置IDEA的自动编译：

> File-Settings-Compiler勾选 Build Project automatically

#### 3..设置IDEA允许

> 快捷键 ctrl + shift + alt + /,选择Registry,勾上 Compiler autoMake allow when app running



