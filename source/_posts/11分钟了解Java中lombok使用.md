---
title: 11分钟了解Java中lombok使用
categories:
  - Java
tags:
  - Java
  - lombok
cover: false
top: false
keywords: 'Java,lombok,11,11分钟,blog.onfree.cn,Athink'
summary: Lombok是一个Java库，能自动插入编辑器并构建工具，简化Java开发。通过添加注解的方式，不需要为类编写getter或setter方法
abbrlink: 9eb5d68a
date: 2020-03-17 14:30:00
---

## 11分钟了解Java中lombok使用

> `让我们将事前的忧虑，换为事前的思考和计划吧`

---

### 一、Lombok是什么？

Lombok是一个Java库，能自动插入编辑器并构建工具，简化Java开发。通过添加注解的方式，不需要为类编写getter或setter方法，同时可以自动化变量。意思就是说可以只通过一个注解就让编译器自动编译类是getter、setter等重复写的方法。

> 官方介绍
> Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java.Never write another getter or equals method again, with one annotation your class has a fully featured builder, Automate your logging variables, and much more.
>

### 二、如果使用？

#### 1.添加依赖

```
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.10</version>
        <scope>provided</scope>
    </dependency>
```

#### 2.添加插件
> 在idea上安装lombok插件，并在File-Settings-build-AnnocationProcessors启用

> 开启该项是为了让Lombok注解在编译阶段起到作用。

#### 3.常用注解
> [官方文档地址](https://projectlombok.org/features/all)

```
val
注解在字段，不可变局部变量

var
注解在字段，可变局部变量

@NonNull
注解在参数上，判断不为空，抛出NullPointerException

@Cleanup
执行调用close方法

@Getter/@Setter
注解在类或字段，注解在类时为所有字段生成Getter/setter方法，注解在字段上时只为该字段生成Getter/setter方法

@ToString
注解在类，添加toString方法

@EqualsAndHashCode
注解在类，生成hashCode和equals方法

@NoArgsConstructor
注解在类，生成无参的构造方法

@RequiredArgsConstructor 
注解在类，为类中需要特殊处理的字段生成构造方法，比如final和被@NonNull注解的字段。

@AllArgsConstructor
注解在类，生成包含类中所有字段的构造方法

@Data
注解在类，生成setter/getter、equals、canEqual、hashCode、toString方法，如为final属性，则不会为该属性生成setter方法

@Value
注解在类，相当于：final @ToString @EqualsAndHashCode @AllArgsConstructor @FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE) @Getter

@Builder
注解在类，注解后可赋值新对象和修改原对象的属性值

@SneakyThrows
注解在方法上，相当于添加了try-catch捕捉异常

@Synchronized
注解在方法上，锁定一个private的常量。如果当前类中没有这个常量，就会自动生成一个。


@Getter(lazy=true)
Getter高级版，会提高代码效率，同时由Lombok帮助你管理线程安全问题


```