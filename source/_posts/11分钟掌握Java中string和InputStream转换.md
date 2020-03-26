---
title: 11分钟掌握Java中string和InputStream转换
categories:
  - Java
tags:
  - Java
  - IO流
  - 转换
cover: false
top: false
keywords: 'Java,转换,IO流,11分钟,11,blog.onfree.cn,Athink'
summary: 'JAVA中string和InputStream转换, 对于经常使用IO流来处理时往往需要对对象进行转换,本文主要讲述InputStream转化为String和String转化为InputStream的方法'
abbrlink: ca446a09
date: 2020-02-23 00:00:00
---

## 11分钟掌握Java中string和InputStream转换

> `相信奇迹的人本身就和奇迹一样了不起啊`

------

### 1、InputStream转化为String

#### 1.1 JDK原生提供

##### 方法一：

    byte[] bytes = new byte[0];
    bytes = new byte[inputStream.available()];
    inputStream.read(bytes);
    String str = new String(bytes);

##### 方法二：
    String result = new BufferedReader(new InputStreamReader(inputStream))
            .lines().collect(Collectors.joining(System.lineSeparator()));

##### 方法三：
    String result = new BufferedReader(new InputStreamReader(inputStream))
           .lines().parallel().collect(Collectors.joining(System.lineSeparator()));

##### 方法四：
    Scanner s = new Scanner(inputStream).useDelimiter("\\A");
    String str = s.hasNext() ? s.next() : "";

##### 方法五：
    String resource = new Scanner(inputStream).useDelimiter("\\Z").next();
    return resource;

##### 方法六：
    StringBuilder sb = new StringBuilder();
    String line;
    
    BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
    while ((line = br.readLine()) != null) {
        sb.append(line);
    }
    String str = sb.toString();
    return str;

##### 方法七：
    ByteArrayOutputStream result = new ByteArrayOutputStream();
    byte[] buffer = new byte[inStream.available()];
    int length;
    while ((length = inputStream.read(buffer)) != -1) {
        result.write(buffer, 0, length);
    }
    String str = result.toString(StandardCharsets.UTF_8.name());
    return str;

##### 方法八：
    BufferedInputStream bis = new BufferedInputStream(inputStream);
    ByteArrayOutputStream buf = new ByteArrayOutputStream();
    int result = bis.read();
    while(result != -1) {
        buf.write((byte) result);
        result = bis.read();
    }
    String str = buf.toString();
    return str;

#### 1.2  Apache Common提供

##### 方法九：
    StringWriter writer = new StringWriter();
    IOUtils.copy(inputStream, writer, StandardCharsets.UTF_8.name());
    String str = writer.toString();

##### 方法十：
    String str = IOUtils.toString(inputStream, "utf-8");

#### 1.3  Google Guava提供
##### 方法十一：

    String str = CharStreams.toString(new InputStreamReader(inputStream, StandardCharsets.UTF_8));

##### 方法十二：

    String str = new String(ByteStreams.toByteArray(inputStream));



### 2、String转化为InputStream

#### 2.1 JDK原生提供
    InputStream is = new ByteArrayInputStream(str.getBytes());

#### 2.2 Apache Common提供
    InputStream targetStream = IOUtils.toInputStream(str, StandardCharsets.UTF_8.name());

#### 2.3 Google Guava提供
    InputStream targetStream =
            new ReaderInputStream(CharSource.wrap(str).openStream(), StandardCharsets.UTF_8.name());
