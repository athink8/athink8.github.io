---
title: Java对象和Map转换
categories:
  - Java
tags:
  - Java
  - Map
cover: false
top: false
keywords: 'Java,转换,Map'
summary: 'Java对象和Map在很多时候常常需要转换，而本文可作为常见转换工具类来使用											..'
abbrlink: b59ed7a2
date: 2020-02-20 20:30:00
---

## Java对象和Map转换

> `或许前路永夜，即便如此我也要前进，因为星光即使微弱也会为我照亮前路`

------

### 1. 将Javabean对象装换为map

```java
        /**
         * @param bean
         * @return
         */
        public static <T> Map<String, Object> beanToMap(T bean) {
            Map<String, Object> map = Maps.newHashMap();
            if (bean != null) {
                BeanMap beanMap = BeanMap.create(bean);
                for (Object key : beanMap.keySet()) {
                    map.put(key + "", beanMap.get(key));
                }
            }
            return map;
        }
```



### 2.将map装换为Javabean对象

```java
        /**
         * @param map
         * @param bean
         * @return
         */
        public static <T> T mapToBean(Map<String, Object> map, T bean) {
            BeanMap beanMap = BeanMap.create(bean);
            beanMap.putAll(map);
            return bean;
        }
```



### 3.将List<T>转换为List<Map<String, Object>>

```java
        /**
         * @param objList
         * @return
         * @throws JsonGenerationException
         * @throws JsonMappingException
         * @throws IOException
         */
        public static <T> List<Map<String, Object>> objectsToMaps(List<T> objList) {
            List<Map<String, Object>> list = Lists.newArrayList();
            if (objList != null && objList.size() > 0) {
                Map<String, Object> map = null;
                T bean = null;
                for (int i = 0, size = objList.size(); i < size; i++) {
                    bean = objList.get(i);
                    map = beanToMap(bean);
                    list.add(map);
                }
            }
            return list;
        }
```



### 4. 将List<Map<String,Object>>转换为List<T>

```java
	/**
         * @param maps
         * @param clazz
         * @return
         * @throws InstantiationException
         * @throws IllegalAccessException
       */
        public static <T> List<T> mapsToObjects(List<Map<String, Object>> maps, Class<T> clazz)
                throws InstantiationException, IllegalAccessException {
            List<T> list = Lists.newArrayList();
            if (maps != null && maps.size() > 0) {
                Map<String, Object> map = null;
                T bean = null;
                for (int i = 0, size = maps.size(); i < size; i++) {
                    map = maps.get(i);
                    bean = clazz.newInstance();
                    mapToBean(map, bean);
                    list.add(bean);
                }
            }
            return list;
        }
```

...