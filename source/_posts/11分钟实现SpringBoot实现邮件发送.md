---
title: 11分钟实现SpringBoot实现邮件发送
categories:
  - SpringBoot
tags:
  - JavaMail
  - SpringBoot
cover: false
top: false
keywords: 'JavaMail,Java,SpringBoot,组件,11分钟,11,blog.onfree.cn,Athink'
summary: ' 邮件发送在很多场景都需要使用，比如注册登录需要邮箱验证等；而要想网络上实现邮件功能，必须要有专门的邮件服务器。'
abbrlink: f5433e08
date: 2020-03-20 20:30:00
---

## 11分钟实现SpringBoot实现邮件发送

> `一个人的快乐，不是因为他拥有的多，而是因为他计较的少`

---

邮件发送在很多场景都需要使用，比如注册登录需要邮箱验证等；

而要想网络上实现邮件功能，必须要有专门的**邮件服务器**。这些邮件服务器类似于现实生活中的邮局，它主要负责接收用户投递过来的邮件，并把邮件投递到邮件接收者的电子邮箱中。

### 一、邮件传输协议

- SMTP服务器地址

  一般是 smtp.xxx.com，比如163邮箱是smtp.163.com，qq邮箱是smtp.qq.com。

- SMTP协议

  通常把处理用户smtp请求(邮件发送请求)的服务器称之为SMTP服务器(邮件发送服务器)。

- POP3协议

  通常把处理用户pop3请求(邮件接收请求)的服务器称之为POP3服务器(邮件接收服务器)。

### 二、邮件发送流程

![image](https://cdn.jsdelivr.net/gh/athink8/cdn@master/imgs/arctle/java%E9%82%AE%E7%AE%B1%E5%8F%91%E9%80%81.png)

### 三、SpringBoot整合

- pom

  ```xml
  <!--添加maill的依赖支持-->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-mail</artifactId>
  </dependency>
  ```

- yml

  ```yml
  spring:
    mail:
      #自定义的邮箱发送者
      sender: athink8@163.com
      host: smtp.163.com	#服务地址
      username: athink8@163.com #邮件发送者
      password: asdfghjkqwert	#smtp/POP3 密钥
      protocol: smtp	#服务协议
      default-encoding: UTF-8
  ```

- 类MailBean

  ```java
  import java.io.Serializable;
  
  /**
   * author: jz
   * Time: 2019/9/24 13:54
   **/
  public class MailBean implements Serializable {
      private String recipient;   //邮件接收人
      private String subject; //邮件主题
      private String content; //邮件内容
      private String attachmentFilename; //附件内容
      private String attachmentSource; //附件路径内容
  
      public MailBean(String recipient, String subject, String content, String attachmentFilename, String attachmentSource) {
          this.recipient = recipient;
          this.subject = subject;
          this.content = content;
          this.attachmentFilename = attachmentFilename;
          this.attachmentSource = attachmentSource;
      }
  
      public MailBean(String recipient, String subject, String content) {
          this.recipient = recipient;
          this.subject = subject;
          this.content = content;
      }
  
      public MailBean() {
      }   
  ```

- mail操作类

  ```java
  package athink.athink_travel.service;
  
  import athink.athink_travel.domain.MailBean;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.core.io.FileSystemResource;
  import org.springframework.mail.SimpleMailMessage;
  import org.springframework.mail.javamail.JavaMailSender;
  import org.springframework.mail.javamail.MimeMessageHelper;
  import org.springframework.stereotype.Service;
  import javax.mail.internet.MimeMessage;
  import java.io.File;
  
  /**
   * author: jz
   * Time: 2019/9/24 14:06
   **/
  
  @Service
  public class MailService {
  
      @Value("${spring.mail.sender}") //yml里的配置
      private String MAIL_SENDER; //邮件发送者
  
      @Autowired
      private JavaMailSender javaMailSender;
  
      /**
       * 发送一个简单格式的邮件
       *
       * @param mailBean
       */
      public void sendSimpleMail(MailBean mailBean) {
          try {
              SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
              //邮件发送人
              simpleMailMessage.setFrom(MAIL_SENDER);
              //邮件接收人
              simpleMailMessage.setTo(mailBean.getRecipient());
              //邮件主题
              simpleMailMessage.setSubject(mailBean.getSubject());
              //邮件内容
              simpleMailMessage.setText(mailBean.getContent());
              //这里添加抄送人名称列表
              String[] ccList = new String[]{MAIL_SENDER};
              simpleMailMessage.setCc(ccList);
              //这里添加密送人名称列表
              String[] bccList = new String[]{MAIL_SENDER};
              simpleMailMessage.setBcc(bccList);
              //发送邮件
              javaMailSender.send(simpleMailMessage);
              System.out.println("邮件发送success");
          } catch (Exception e) {
              System.out.println("邮件发送失败：" + e.getMessage());
          }
      }
  
      /**
       * 发送一个HTML格式的邮件
       *
       * @param mailBean
       */
      public void sendHTMLMail(MailBean mailBean) {
          MimeMessage mimeMailMessage = null;
          try {
              mimeMailMessage = javaMailSender.createMimeMessage();
              MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);
              mimeMessageHelper.setFrom(MAIL_SENDER);
              mimeMessageHelper.setTo(mailBean.getRecipient());
              mimeMessageHelper.setSubject(mailBean.getSubject());
              mimeMessageHelper.setText(mailBean.getContent(), true);
              //这里添加抄送人名称列表
              String[] ccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setCc(ccList);
              //这里添加密送人名称列表
              String[] bccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setBcc(bccList);
              javaMailSender.send(mimeMailMessage);
              System.out.println("邮件发送success");
          } catch (Exception e) {
              System.out.println("邮件发送失败：" + e.getMessage());
          }
      }
  
      /**
       * 发送带附件格式的邮件
       *
       * @param mailBean
       */
      public void sendAttachmentMail(MailBean mailBean) {
          MimeMessage mimeMailMessage = null;
          try {
              mimeMailMessage = javaMailSender.createMimeMessage();
              MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);
              mimeMessageHelper.setFrom(MAIL_SENDER);
              mimeMessageHelper.setTo(mailBean.getRecipient());
              mimeMessageHelper.setSubject(mailBean.getSubject());
              mimeMessageHelper.setText(mailBean.getContent(), true);
              //这里添加抄送人名称列表
              String[] ccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setCc(ccList);
              //这里添加密送人名称列表
              String[] bccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setBcc(bccList);
              //文件路径
              FileSystemResource file = new FileSystemResource(new File(mailBean.getAttachmentSource()));
              mimeMessageHelper.addAttachment(mailBean.getAttachmentFilename(), file);
  
              javaMailSender.send(mimeMailMessage);
              System.out.println("邮件发送success");
          } catch (Exception e) {
              System.out.println("邮件发送失败：" + e.getMessage());
          }
      }
  
      /**
       * 发送带静态资源的邮件
       *
       * @param mailBean
       */
      public void sendInlineMail(MailBean mailBean) {
          MimeMessage mimeMailMessage = null;
          try {
              mimeMailMessage = javaMailSender.createMimeMessage();
              MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);
              mimeMessageHelper.setFrom(MAIL_SENDER);
              mimeMessageHelper.setTo(mailBean.getRecipient());
              mimeMessageHelper.setSubject(mailBean.getSubject());
              mimeMessageHelper.setText("<html><body>" + mailBean.getContent() + "</body></html>", true);
              //这里添加抄送人名称列表
              String[] ccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setCc(ccList);
              //这里添加密送人名称列表
              String[] bccList = new String[]{MAIL_SENDER};
              mimeMessageHelper.setBcc(bccList);
              //文件路径
              FileSystemResource file = new FileSystemResource(new File(mailBean.getAttachmentSource()));
              mimeMessageHelper.addAttachment(mailBean.getAttachmentFilename(), file);
  
              javaMailSender.send(mimeMailMessage);
              System.out.println("邮件发送success");
          } catch (Exception e) {
              System.out.println("邮件发送失败：" + e.getMessage());
          }
      }
  
  }
  ```

- 好了，测试下呗

  ```java
  @RunWith(SpringRunner.class)
  @SpringBootTest
  public class AthinkTravelApplicationTests {
  
      @Autowired
      UserService userservice;
  
      @Test
      public void contextLoads() throws Exception {
          test();
      }
      
      MailService mailService;
  
      public void test() throws Exception { // 做测试用
          MailBean mail1 = new MailBean("888880@qq.com", "Athink -注册用户激活",
                  "尊敬的用户你好：" + "<br/><a href=\"http://localhost:8080/user/code?email=" + 123 + "&code=" + 123 + "\">点击激活</a>");
          mailService.sendHTMLMail(mail1);
  
      }
  ```

  ---

  