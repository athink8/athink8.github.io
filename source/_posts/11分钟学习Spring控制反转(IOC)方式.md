---
title: 11分钟学习Spring控制反转(IOC)方式
categories:
  - Spring
tags:
  - Spring
  - IOC
cover: false
top: false
keywords: 'Spring,IOC,DI,控制反转,依赖注入,11分钟,11,blog.onfree.cn,Athink'
summary: ' Spring框架则避免了调用者与工厂之间的耦合，通过spring容器“宏观调控”，调用者只要被动接受spring容器为调用者的成员变量'
abbrlink: 631766d3
date: 2020-03-14 14:00:00
---

## 11分钟学习Spring控制反转(IOC)方式

> `实现自己既定的目标，必须能耐得住寂寞单干。`

Spring框架则避免了调用者与工厂之间的耦合，通过spring容器“宏观调控”，调用者只要被动接受spring容器为调用者的成员变量赋值即可，而不需要主动获取被依赖对象。这种被动获取的方式就叫做依赖注入(DI)，又叫控制反转(IOC)。

#### 1.通过 setter 方法

* bean类：

        private User2 user2;
        public void setUser2(User2 user2) {
            this.user2 = user2;
        }

* applicationContext.xml：

        <bean id="user2" class="com.ioc.User2"></bean>
        <bean id="user1" class="com.ioc.User1">
            <property name="name" value="jz"></property>
            <property name="user2" ref="user2"></property>
        </bean>

#### 2.通过constructor 构造方法

* bean类：

        private User2 user2;
            public User1(User2 user2){
                this.user2=user2;
            }

* applicationContext.xml：

        <bean id="user2" class="com.ioc.User2"></bean>
        <bean id="user1" class="com.ioc.User1">
            <constructor-arg name="name" value="jz" />
            <constructor-arg name="user2" ref="user2" />
        </bean>





