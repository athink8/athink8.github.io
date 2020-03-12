---
title: Java中HttpClient使用
categories:
  - Java
tags:
  - Java
  - HttpClient
cover: false
top: false
keywords: 'Java,HttpClient'
summary: '在Java中HttpClient使用，在 Internet，HTTP 协议上是使用得最多、最重要的协议了,HttpClient 是 Apache Jakarta Common 下的子项目..'
date: '2020-02-23 00:00:00'
abbrlink: 2d8346af
---

## Java中HttpClient使用

> `从现在开始，我将追寻你的名字`

------

### 一、HttpClient简介

> 在 Internet ，HTTP 协议上是使用得最多、最重要的协议了，越来越多的 Java 应用程序需要直接通过 HTTP 协议来访问网络资源。HttpClient 是 Apache Jakarta Common 下的子项目，用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包，并且它支持 HTTP 协议最新的版本和建议。
>
> HttpClient实现了所有 HTTP 的方法（GET、POST、PUT、HEAD、DELETE、HEAD、OPTIONS 等）
> 支持 HTTPS 协议
> 支持代理服务器（Nginx等）等
> 支持自动（跳转）转向

### 二、HttpClient的主要功能：

#### GET无参：

```java
/**
 * GET---无参测试
 * @date 2020年2月23日 下午4:18:50
 */
@Test
public void doGetTestOne() {
	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
	// 创建Get请求
	HttpGet httpGet = new HttpGet("http://localhost:12345/doGetControllerOne");
 
	// 响应模型
	CloseableHttpResponse response = null;
	try {
		// 由客户端执行(发送)Get请求
		response = httpClient.execute(httpGet);
		// 从响应模型中获取响应实体
		HttpEntity responseEntity = response.getEntity();
		System.out.println("响应状态为:" + response.getStatusLine());
		if (responseEntity != null) {
			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
		}
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (ParseException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			// 释放资源
			if (httpClient != null) {
				httpClient.close();
			}
			if (response != null) {
				response.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```


#### GET有参(方式一：直接拼接URL)：

```java
/**
 * GET---有参测试 (方式一:手动在url后面加上参数)
 * @date 2020年2月23日 下午4:19:23
 */
@Test
public void doGetTestWayOne() {
	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
 
	// 参数
	StringBuffer params = new StringBuffer();
	try {
		// 字符数据最好encoding以下;这样一来，某些特殊字符才能传过去(如:某人的名字就是“&”,不encoding的话,传不过去)
		params.append("name=" + URLEncoder.encode("&", "utf-8"));
		params.append("&");
		params.append("age=24");
	} catch (UnsupportedEncodingException e1) {
		e1.printStackTrace();
	}
 
	// 创建Get请求
	HttpGet httpGet = new HttpGet("http://localhost:12345/doGetControllerTwo" + "?" + params);
	// 响应模型
	CloseableHttpResponse response = null;
	try {
		// 配置信息
		RequestConfig requestConfig = RequestConfig.custom()
				// 设置连接超时时间(单位毫秒)
				.setConnectTimeout(5000)
				// 设置请求超时时间(单位毫秒)
				.setConnectionRequestTimeout(5000)
				// socket读写超时时间(单位毫秒)
				.setSocketTimeout(5000)
				// 设置是否允许重定向(默认为true)
				.setRedirectsEnabled(true).build();
 
		// 将上面的配置信息 运用到这个Get请求里
		httpGet.setConfig(requestConfig);
 
		// 由客户端执行(发送)Get请求
		response = httpClient.execute(httpGet);
 
		// 从响应模型中获取响应实体
		HttpEntity responseEntity = response.getEntity();
		System.out.println("响应状态为:" + response.getStatusLine());
		if (responseEntity != null) {
			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
		}
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (ParseException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			// 释放资源
			if (httpClient != null) {
				httpClient.close();
			}
			if (response != null) {
				response.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```


#### GET有参(方式二：使用URI获得HttpGet)：

```java
/**
 * GET---有参测试 (方式二:将参数放入键值对类中,再放入URI中,从而通过URI得到HttpGet实例)
 * @date 2020年2月23日 下午4:19:23
 */
@Test
public void doGetTestWayTwo() {
	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
 
	// 参数
	URI uri = null;
	try {
		// 将参数放入键值对类NameValuePair中,再放入集合中
		List<NameValuePair> params = new ArrayList<>();
		params.add(new BasicNameValuePair("name", "&"));
		params.add(new BasicNameValuePair("age", "18"));
		// 设置uri信息,并将参数集合放入uri;
		// 注:这里也支持一个键值对一个键值对地往里面放setParameter(String key, String value)
		uri = new URIBuilder().setScheme("http").setHost("localhost")
				              .setPort(12345).setPath("/doGetControllerTwo")
				              .setParameters(params).build();
	} catch (URISyntaxException e1) {
		e1.printStackTrace();
	}
	// 创建Get请求
	HttpGet httpGet = new HttpGet(uri);
 
	// 响应模型
	CloseableHttpResponse response = null;
	try {
		// 配置信息
		RequestConfig requestConfig = RequestConfig.custom()
				// 设置连接超时时间(单位毫秒)
				.setConnectTimeout(5000)
				// 设置请求超时时间(单位毫秒)
				.setConnectionRequestTimeout(5000)
				// socket读写超时时间(单位毫秒)
				.setSocketTimeout(5000)
				// 设置是否允许重定向(默认为true)
				.setRedirectsEnabled(true).build();
 
		// 将上面的配置信息 运用到这个Get请求里
		httpGet.setConfig(requestConfig);
 
		// 由客户端执行(发送)Get请求
		response = httpClient.execute(httpGet);
 
		// 从响应模型中获取响应实体
		HttpEntity responseEntity = response.getEntity();
		System.out.println("响应状态为:" + response.getStatusLine());
		if (responseEntity != null) {
			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
		}
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (ParseException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			// 释放资源
			if (httpClient != null) {
				httpClient.close();
			}
			if (response != null) {
				response.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```


#### POST无参：

    /**
     * POST---无参测试
     * @date 2020年2月23日 下午4:18:50
     */
    @Test
    public void doPostTestOne() {
     
    	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
    	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
     
    	// 创建Post请求
    	HttpPost httpPost = new HttpPost("http://localhost:12345/doPostControllerOne");
    	// 响应模型
    	CloseableHttpResponse response = null;
    	try {
    		// 由客户端执行(发送)Post请求
    		response = httpClient.execute(httpPost);
    		// 从响应模型中获取响应实体
    		HttpEntity responseEntity = response.getEntity();
     
    		System.out.println("响应状态为:" + response.getStatusLine());
    		if (responseEntity != null) {
    			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
    			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
    		}
    	} catch (ClientProtocolException e) {
    		e.printStackTrace();
    	} catch (ParseException e) {
    		e.printStackTrace();
    	} catch (IOException e) {
    		e.printStackTrace();
    	} finally {
    		try {
    			// 释放资源
    			if (httpClient != null) {
    				httpClient.close();
    			}
    			if (response != null) {
    				response.close();
    			}
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
    }


#### POST有参(普通参数)：

> 注：POST传递普通参数时，方式与GET一样即可，这里以直接在url后缀上参数的方式示例。

```java
/**
 * POST---有参测试(普通参数)
 * @date 2020年2月23日 下午4:18:50
 */
@Test
public void doPostTestFour() {
 
	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
 
	// 参数
	StringBuffer params = new StringBuffer();
	try {
		// 字符数据最好encoding以下;这样一来，某些特殊字符才能传过去(如:某人的名字就是“&”,不encoding的话,传不过去)
		params.append("name=" + URLEncoder.encode("&", "utf-8"));
		params.append("&");
		params.append("age=24");
	} catch (UnsupportedEncodingException e1) {
		e1.printStackTrace();
	}
 
	// 创建Post请求
	HttpPost httpPost = new HttpPost("http://localhost:12345/doPostControllerFour" + "?" + params);
 
	// 设置ContentType(注:如果只是传普通参数的话,ContentType不一定非要用application/json)
	httpPost.setHeader("Content-Type", "application/json;charset=utf8");
 
	// 响应模型
	CloseableHttpResponse response = null;
	try {
		// 由客户端执行(发送)Post请求
		response = httpClient.execute(httpPost);
		// 从响应模型中获取响应实体
		HttpEntity responseEntity = response.getEntity();
 
		System.out.println("响应状态为:" + response.getStatusLine());
		if (responseEntity != null) {
			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
		}
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (ParseException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			// 释放资源
			if (httpClient != null) {
				httpClient.close();
			}
			if (response != null) {
				response.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```


#### POST有参(对象参数)：

	/**
	 * POST---有参测试(对象参数)
	 * @date 2020年2月23日 下午4:18:50
	 */
	@Test
	public void doPostTestTwo() {
	 
		// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
		CloseableHttpClient httpClient = HttpClientBuilder.create().build();
	 
		// 创建Post请求
		HttpPost httpPost = new HttpPost("http://localhost:12345/doPostControllerTwo");
		User user = new User();
		user.setName("潘晓婷");
		user.setAge(18);
		user.setGender("女");
		user.setMotto("姿势要优雅~");
		// 我这里利用阿里的fastjson，将Object转换为json字符串;
		// (需要导入com.alibaba.fastjson.JSON包)
		String jsonString = JSON.toJSONString(user);
	 
		StringEntity entity = new StringEntity(jsonString, "UTF-8");
	 
		// post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
		httpPost.setEntity(entity);
	 
		httpPost.setHeader("Content-Type", "application/json;charset=utf8");
	 
		// 响应模型
		CloseableHttpResponse response = null;
		try {
			// 由客户端执行(发送)Post请求
			response = httpClient.execute(httpPost);
			// 从响应模型中获取响应实体
			HttpEntity responseEntity = response.getEntity();
	 
			System.out.println("响应状态为:" + response.getStatusLine());
			if (responseEntity != null) {
				System.out.println("响应内容长度为:" + responseEntity.getContentLength());
				System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				// 释放资源
				if (httpClient != null) {
					httpClient.close();
				}
				if (response != null) {
					response.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}


#### POST有参(普通参数 + 对象参数)：

> 注：POST传递普通参数时，方式与GET一样即可，这里以通过URI获得HttpPost的方式为例。

```java
/**
 * POST---有参测试(普通参数 + 对象参数)
 * @date 2020年2月23日 下午4:18:50
 */
@Test
public void doPostTestThree() {
 
	// 获得Http客户端(可以理解为:你得先有一个浏览器;注意:实际上HttpClient与浏览器是不一样的)
	CloseableHttpClient httpClient = HttpClientBuilder.create().build();
 
	// 创建Post请求
	// 参数
	URI uri = null;
	try {
		// 将参数放入键值对类NameValuePair中,再放入集合中
		List<NameValuePair> params = new ArrayList<>();
		params.add(new BasicNameValuePair("flag", "4"));
		params.add(new BasicNameValuePair("meaning", "这是什么鬼？"));
		// 设置uri信息,并将参数集合放入uri;
		// 注:这里也支持一个键值对一个键值对地往里面放setParameter(String key, String value)
		uri = new URIBuilder().setScheme("http").setHost("localhost").setPort(12345)
				.setPath("/doPostControllerThree").setParameters(params).build();
	} catch (URISyntaxException e1) {
		e1.printStackTrace();
	}
 
	HttpPost httpPost = new HttpPost(uri);
	// HttpPost httpPost = new
	// HttpPost("http://localhost:12345/doPostControllerThree1");
 
	// 创建user参数
	User user = new User();
	user.setName("潘晓婷");
	user.setAge(18);
	user.setGender("女");
	user.setMotto("姿势要优雅~");
 
	// 将user对象转换为json字符串，并放入entity中
	StringEntity entity = new StringEntity(JSON.toJSONString(user), "UTF-8");
 
	// post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
	httpPost.setEntity(entity);
 
	httpPost.setHeader("Content-Type", "application/json;charset=utf8");
 
	// 响应模型
	CloseableHttpResponse response = null;
	try {
		// 由客户端执行(发送)Post请求
		response = httpClient.execute(httpPost);
		// 从响应模型中获取响应实体
		HttpEntity responseEntity = response.getEntity();
 
		System.out.println("响应状态为:" + response.getStatusLine());
		if (responseEntity != null) {
			System.out.println("响应内容长度为:" + responseEntity.getContentLength());
			System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
		}
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (ParseException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			// 释放资源
			if (httpClient != null) {
				httpClient.close();
			}
			if (response != null) {
				response.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```


####  ssl证书忽略

        private static CloseableHttpClient getCloseableHttpClient() {
                try {
                    SSLContextBuilder builder = new SSLContextBuilder();
                    builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
                    SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(builder.build(), NoopHostnameVerifier.INSTANCE);
                    Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create()
                            .register("http", new PlainConnectionSocketFactory())
                            .register("https", sslConnectionSocketFactory)
                            .build();
        
                    PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(registry);
                    cm.setMaxTotal(100);
                    return HttpClients.custom()
                            .setSSLSocketFactory(sslConnectionSocketFactory)
                            .setConnectionManager(cm)
                            .build();
                } catch (NoSuchAlgorithmException e) {
                    e.printStackTrace();
                } catch (KeyStoreException e) {
                    e.printStackTrace();
                } catch (KeyManagementException e) {
                    e.printStackTrace();
                }
                return null;
            }

------


