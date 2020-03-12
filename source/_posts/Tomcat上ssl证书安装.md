---
title: Tomcat上ssl证书安装
categories:
  - Tomcat
tags:
  - Tomcat
  - ssl
  - https
cover: false
top: false
keywords: 'Tomcat,ssl,https,Tomcat上ssl证书安装'
summary: '在Tomcat上正确的配置ssl证书,可使你的网站使用HTTPS协议，能够让你的网站更加安全，同时也使域名显示更加美观'
abbrlink: 2fddf34
date: 2020-02-26 20:00:00
---

## Tomcat上ssl证书安装

> `正是因为这一点一滴觉得还有希望的自己，才是最无可救药的吧。`

------

在Tomcat上正确的配置ssl证书,可使你的网站的HTTP转为HTTPS协议，能够让你的网站更加安全，同时也使域名在浏览器上显示小绿标更加美观点。

**HTTPS有如下特点：**

1. 内容加密：采用混合加密技术，中间者无法直接查看明文内容
2. 验证身份：通过证书认证客户端访问的是自己的服务器
3. 保护数据完整性：防止传输的内容被中间人冒充或者篡改

### 1.在server.xm配置证书

> 添加如下 并在主端口修改  redirectPort="443" 

    <Connector port="443"
        protocol="org.apache.coyote.http11.Http11NioProtocol" 
        SSLEnabled="true"
        scheme="https"
        secure="true"
        keystoreFile="/tomcat8/conf/mySSL/2826717_onfree.cn.pfx"   
        keystoreType="PKCS12"
        keystorePass="TlB73znA"   
        clientAuth="false"
        SSLProtocol="TLSv1+TLSv1.1+TLSv1.2"
        ciphers="TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA,
        TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"/>

    SSLCipherSuite:配置符合PFS规范的加密套餐,苹果ATS特性服务器需要（是否配置自行选择）
    
    ciphers：服务器加密套件（是否配置自行选择）
    
    SSLProtocol：在服务端TLS协议中启用TLS1.2，苹果ATS特性服务器和微信小程序都需要TLS版本为1.2以上，这个还需要jdk支持TLS1.2，jdk1.6和jdk1.7都需要第三方插件，jdk1.8默认支持TLS1.2（是否配置自行选择）
    
    keystoreFile：证书文件的绝对路径
    
    keystorePass：证书密码，这个文件里面

### 2.在web.xml配置强制将http跳转至https（可选配置）

    #在</welcome-file-list>后添加以下内容：
    <login-config>  
        <!-- Authorization setting for SSL -->  
        <auth-method>CLIENT-CERT</auth-method>  
        <realm-name>Client Cert Users-only Area</realm-name>  
    </login-config>  
    <security-constraint>  
        <!-- Authorization setting for SSL -->  
        <web-resource-collection >  
            <web-resource-name >SSL</web-resource-name>  
            <url-pattern>/*</url-pattern>  
        </web-resource-collection>  
        <user-data-constraint>  
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>  
        </user-data-constraint>  
    </security-constraint>
