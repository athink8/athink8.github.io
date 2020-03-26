---
title: 11分钟了解Spring JDBC和事务管理
categories:
  - Spring
tags:
  - Spring
  - Spring JDBC
  - Spring 事务
cover: false
top: false
keywords: 'Spring,Spring JDBC, Spring 事务,博客,,11分钟,11,blog.onfree.cn,Athink'
summary: Spring JDBC和事务管理，Spring中对数据访问对象的支持旨在简化Spring与数据访问技术的操作..
abbrlink: 461ef513
date: 2020-03-13 11:00:00
---

## 11分钟了解Spring JDBC和事务管理

> `不断的努力，不断的去接近梦想，越挫越勇，吃尽酸甜苦辣，能够抵御寒冬，也能够拥抱春天，这样的才叫生活。`

### 1. Spring JDBC 配置
#### 1.1 对应的包类：

* org.springframework.jdbc.core.JdbcTemplate  提供访问数据库基本属性和操作
* org.springframework.jdbc.datasource.DriverManagerDataSource 获取数据库连接
* org.springframework.jdbc.support.SQLExceptionTranslator  处理SQL Exception 完成转译


        <bean id="datasource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        	<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        	<property name="url" value="jdbc:mysql://localhost:3306/classes"/>
        	<property name="username" value="root"/>
        	<property name="password" value="123456" />
        </bean>	
        <bean id="jdbctemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        	<property name="dataSource" ref="datasource"></property>
        </bean>

#### 1.2 JdbcTemplate 常用方法 
##### 1.2.1数据库创建创建删除修改等: 
        execute()  
##### 1.2.2数据的增删改 ：

* int update(String sql)  执行Sql语句 返回受影响的行数;
* int update(PrepareedStatementCreator psc)  执行 PrepareedStatementCreator 返回语句 返回行数;
* int update(String sql，PrepareedStatementCreator psc) 执行 PrepareedStatementCreator 设置的Sql 语句 返回行数;
* int update(String sql,Object..args)  使用Object...设置Sql语句中的参数，参数不能为NULL 返回行数； 


        public int upadte(Userdao userdao) {
        		String sql="update user set username=?,password=? where id=?";
        		Object[] object=new Object[]{
        				userdao.getUsername(),
        				userdao.getPassword(),
        				userdao.getId()
        		};
        		int i=this.jdbcTemplate.update(sql, object);
        		return i;
        	}

##### 1.2.3 数据表的查询

* List query(String sql,RowMapper rowmapper)  执行Sql语句 通过RowMapper返回一个List集合；
* List query(String sql,PrepareedStatementCreator psc,RowMapper rowmapper)   执行sql语句创建PrepareedStatement对象，通过RowMapper返回一个List对象；
* List query(String sql,Object[] args,RowMapper rowmapper)  使用Object[] 的值设置Sql语句参数，采用RowMapper回调方法返回LIST 数据；
* queryForObject(String sql,RowMapper rowmapper,Object..args) 将args 参数绑定Sql语句中，通过RowMapper返回一个Object类型的单行记录；
* queryForList(String sql,Object[] args,class<T> elementType)  返回多行数据的结果，但必须是返回列表，elementType 参数返回的是List 元素类型；


### 2.Spring 事务管理

#### 2.1 Spring 所需要包类：
> spring-tx-4.3.6.RELEASE.jar

#### 2.2 事务管理器：

* DataSourceTransactionManager ：
> 位于org.springframework.jdbc.datasource包中，数据源事务管理器，提供对单个javax.sql.DataSource事务管理，用于Spring JDBC抽象框架、iBATIS或MyBatis框架的事务管理；

* JdoTransactionManager ：
> 位于org.springframework.orm.jdo包中，提供对单个javax.jdo.PersistenceManagerFactory事务管理，用于集成JDO框架时的事务管理；

* JpaTransactionManager ：
> 位于org.springframework.orm.jpa包中，提供对单个javax.persistence.EntityManagerFactory事务支持，用于集成JPA实现框架时的事务管理；

* HibernateTransactionManager ：
> 位于org.springframework.orm.hibernate3包中，提供对单个org.hibernate.SessionFactory事务支持，用于集成Hibernate框架时的事务管理；该事务管理器只支持Hibernate3+版本，且Spring3.0+版本只支持Hibernate 3.2+版本；

* JtaTransactionManager ：
> 位于org.springframework.transaction.jta包中，提供对分布式事务管理的支持，并将事务管理委托给Java EE应用服务器事务管理器；

* OC4JjtaTransactionManager ：
> 位于org.springframework.transaction.jta包中，Spring提供的对OC4J10.1.3+应用服务器事务管理器的适配器，此适配器用于对应用服务器提供的高级事务的支持；

* WebSphereUowTransactionManager ：
> 位于org.springframework.transaction.jta包中，Spring提供的对WebSphere 6.0+应用服务器事务管理器的适配器，此适配器用于对应用服务器提供的高级事务的支持；

* WebLogicJtaTransactionManager ：
> 位于org.springframework.transaction.jta包中，Spring提供的对WebLogic 8.1+应用服务器事务管理器的适配器，此适配器用于对应用服务器提供的高级事务的支持。

#### 2.3 事务定义：
> 声明式事务通过 -传播行为，隔离级别，只读提示，事务超时及回滚规则-来进行定义。 

##### 2.3.1事务传播行为：
![image](https://cdn.jsdelivr.net/gh/athink8/cdn/imgs/arctle/SpringJdbc1.png)

#### 2.4 基于XML 声明事务

        <!--配置事务管理器 依赖数据源  -->
        <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        		<property name="dataSource" ref="datasource"></property>
        </bean>
        <!-- 配置事务通知 -->
        <tx:advice id="txadvice" transaction-manager="transactionManager">
        	<tx:attributes>
        		<tx:method name="*" propagation="REQUIRED" 
        isolation="DEFAULT" read-only="false" timeout="-1" />
        	</tx:attributes>
        </tx:advice>
        <!-- 配置AOP -->
        <aop:config>
        	<aop:pointcut id="pointcut1" expression="execution(* com.dao.*.*(..))" />
        	<aop:advisor advice-ref="txadvice" pointcut-ref="pointcut1"/>
        </aop:config>

#### 2.5 基于Annotation 声明事务

        <!--配置事务管理器 依赖数据源  -->
        <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        		<property name="dataSource" ref="datasource"></property>
        </bean>
        <!-- 配置事务通知 -->
        <tx:annotation-driven transaction-manager="transactionManager" />

> 在使用的bean类或方法前 添加 @Transactional




