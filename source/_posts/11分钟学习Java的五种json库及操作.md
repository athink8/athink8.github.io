---
title: 11分钟学习Java的五种json库及操作
categories:
  - Java
tags:
  - Java
  - json
cover: false
top: false
keywords: 'Java,json,11分钟,11,blog.onfree.cn,Athink'
summary: 'Java的五种json库及操作，包括json-lib、org.json、jackSon、 fastjson、GSON										..'
abbrlink: d5737b81
date: 2020-02-19 20:00:00
---
---

## 11分钟学习Java的五种json库及操作

> `你的所言所行，全都闪烁着光芒，太过刺目，于是我闭上双眼，但内心还是无法停止对你的憧憬`

------

​	Java 中json格式的字符串写法 

    String paramess="{\"name\":\"Mahesh\",\"password\":21}";

### 1. json-lib
> json-lib具有通用性，但是比较麻烦，且时间有些久远，jar包只更新到2010年
>
> 项目地址：http://json-lib.sourceforge.net/index.html

##### 1.1 maven依赖
    <dependency>
        <groupId>net.sf.json-lib</groupId>
        <artifactId>json-lib</artifactId>
        <version>2.4</version>
        <classifier>jdk15</classifier>//jar包区分jdk1.3和jdk1.5版本
    </dependency>
##### 1.2 具体操作
- 1.2.1 JSONObject与String相互转换

        JSONObject jsonobject= JSONObject.fromObject(str);
        String str = JSONObject.toString
    
- 1.2.2 获取JSONObject数据及遍历JSONArray

    String str = JSONObject.getInt("keys")  
    String str = JSONObject.getString("keys")
    JSONArray = JSONObject.getJSONArray(String);

- 遍历：

        for(i<JSONArray.size())
        {
           JSONObject = JSONArray.getJSONObject(i); 
           JSONObject.getInt()...
        }
         
        Iterator<String> iterator = JSONObject.keys(); 
          while(iterator.hasNext()){
            String keys = iterator.next();
        }

- 1.2.2 JSONObject转对象

        Grade grade = (Grade)JSONObject.toBean(jsonObject,Grade.class);

### 2.org.json
> 与json-lib相类似

##### 2.1maven依赖
        <dependency>
              <groupId>org.json</groupId>
              <artifactId>json</artifactId>
              <version>20170516</version>
        </dependency>
##### 2.2 创建json对象
        JSONObject = new JSONObject(str);
##### 2.3 操作
    net.sf.json.JSONObject： 没有严格要求获取字段的类型跟getXXX()的类型一样
    org.json.JSONObject：获取的字段类型必须跟getXXX()的类型一样

##### 2.4 JSONArray.length()

### 3. jackSon
> springMVC内置解析器就是jackson 
>
> 项目地址：https://github.com/FasterXML/jackson

##### 3.1 maven依赖
        <dependency>
              <groupId>com.fasterxml.jackson.core</groupId>
              <artifactId>jackson-databind</artifactId>
              <version>2.9.0</version>
        </dependency>
##### 3.2 对象和String之间的转换
        ObjectMapper mapper=new ObjectMapper();
        //json转对象
        Grade grade=mapper.readValue(json1, Grade.class);
        //对象转json
        mapper.writeValueAsString(grade);
##### 3.3 对JsonNode的遍历
        JsonNode jsonNode = mapper.readTree(jsonStr);
        Iterator<String> keys = jsonNode.fieldNames();
        while(keys.hasNext()){
            String fieldName = keys.next();
            System.out.println(fieldName + " : " + jsonNode.path(fieldName).toString());
        }

### 4. fastjson
> 阿里巴巴开源框架，效率最高
>
> 项目地址：https://github.com/alibaba/fastjson

##### 4.1 maven依赖
        <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>fastjson</artifactId>
              <version>1.2.37</version>
        </dependency>
##### 4.2 String转对象
        Student stu = JSON.parseObject(json,Student.class);
        List<String> list=JSON.parseArray(json2, String.class);
##### 4.3 对象转String
        JSON.toJSONString(stu);
        //or String json = JSON.toJSON(stu).toString();

### 5.GSON
> 谷歌产品 ，前功能最全
>
> 项目地址：https://github.com/google/gson

##### 5.1 maven依赖
        <dependency>
              <groupId>com.google.code.gson</groupId>
              <artifactId>gson</artifactId>
              <version>2.8.1</version>
        </dependency>
##### 5.2 String转对象
        Gson gson = new Gson();
        Grade grade = gson.fromJson(json1,Grade.class);
         
        ArrayList<String> list=gson.fromJson(json2,new TypeToken<ArrayList<String>>(){}.getType());

##### 5.3 对象转String
        String json=gson.toJson(grade);