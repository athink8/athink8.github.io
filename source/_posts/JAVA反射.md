---
title: JAVA反射的整理和理解
categories:
  - Java
tags:
  - Java
  - 反射
cover: false
top: false
keywords: 'Java,反射,基础'
summary: 'JAVA反射机制是在运行状态中,对于任意一个类,都能够知道这个类的所有属性和方法；对于任意一个对象,都能够调用它的任意一个方法和属性。'
abbrlink: 33aa4888
date: 2020-02-16 00:00:00
---

## JAVA反射

>  `星星在你的头顶上闪耀着，与你交互诉说的话语，一句一句地，如同星点般翩然落至眼前`

------

### 一、简介

>   JAVA反射机制是在运行状态中.
对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性.

> 我们创建的每一个类也都是对象，即类本身是java.lang.Class类的实例对象。这个实例对象称之为类对象，也就是Class对象,或者类类型。

### 二、方法：

#### 1.如何获取.Class文件对象

    a.  通过Object类 getClass()方法获取 Class对象
    
    b. 通过类名.class 方式 获取 Class对象
    
    c.  通过反射的方式, Class.forName(String classname) 获取Class对象
    public static Class<?> forName(String className)throws ClassNotFoundException
    返回与带有给定字符串名的类或接口相关联的 Class 对象

#### 2.通过反射，获取类中的构造方法，并完成对象的创建
- 获取指定的构造方法

    public Constructor<T> getConstructor(Class<?>... parameterTypes)

- 获取指定的public修饰的构造方法

    public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)

- 获取指定的构造方法，包含私有的

    public Constructor<T> getConstructor(Class<?>... parameterTypes)

- 获取所有的构造方法

    public Constructor<?>[] getConstructors() 获取所有的public 修饰的构造方法
    public Constructor<?>[] getDeclaredConstructors() 获取所有的构造方法，包含私有的

#### 3.通过反射， 获取类中的构造方法，并完成对象的创建

    步骤：
    a.获取字节码文件对象
    b.通过字节码文件对象 ，获取到指定的构造方法
        getConstructor(参数);
    c.通过构造方法，创建对象
        public T newInstance(Object... initargs)

#### 4.私有构造方法，创建对象

    a.获取字节码文件对象
    b.通过字节码文件对象 ，获取到指定的构造方法
        getDeclaredConstructor (参数);
    c.暴力访问
         con.setAccessible(true);
    d.通过构造方法，创建对象
         public T newInstance(Object... initargs)

#### 5.通过反射，获取Class文件中的方法

- 获取指定的方法

    public Method getMethod(String name, Class<?>... parameterTypes)

- 获取指定的public方法

    public Method getDeclaredMethod(String name, Class<?>... parameterTypes)

- 获取指定的任意方法，包含私有的

    获取所有的方法:
    public Method[] getMethods()
    
    获取本类与父类中所有public 修饰的方法:
    public Method[] getDeclaredMethods()获取本类中包含私有的所有的方法

> // 数组表示：new Class[]{String.class, String.class}

#### 6.通过反射，调用方法

    步骤：
    a.获取Class对象
    b.构造方法，创建对象
    c.取指定的public方法
    d.行方法
    public Object invoke(Object obj, Object... args)

#### 7.私有方法的调用：

    a，获取Class对象
    b,获取构造方法，创建对象
    c,获取指定的private方法
    d,开启暴力访问
    m5.setAccessible(true);
    e,执行方法
    public Object invoke(Object obj, Object... args)

#### 8.通过反射，获取成员变量
- 获取指定的成员变量

     public Field getField(String name) 
- 获取public修饰的成员变量

    public Field getDeclaredField(String name)
- 获取任意的成员变量，包含私有

    public Field[] getFields() 

- 获取所有public修饰的成员变量

    public Field[] getDeclaredFields()

#### 9.通过反射，获取成员 变量，并赋值使用

    步骤：
    a. 获取字节码文件对象
    b. 获取构造方法，创建对象
    c. 获取指定的成员变量
    d. 对成员变量赋值获取值操作
    public void set(Object obj, Object value) // 赋值
    public Object get(Object obj) // 获取值

#### 10.私有成员变量的使用

    步骤：
    a. 获取字节码文件对象
    b. 获取构造方法，创建对象
    c. 获取指定的成员变量
    d. 开启暴力访问
    e. 对成员变量赋值获取值操作
    public void set(Object obj, Object value) //赋值
    public Object get(Object obj) //获取值