---
title: Redis简介及使用场景
categories:
  - 数据库
tags:
  - Redis
  - 简介
  - 使用场景
cover: false
top: false
keywords: 'Redis,简介,使用场景,安装'
summary: 'Redis 是完全开源免费的，遵守BSD协议，是一个高性能的`key-value`型数据库,易安装和使用，使用场景丰富'
abbrlink: fc9ec3a7
date: 2020-02-18 08:00:00
---

## Redis 简介及使用场景

> `星星在你的头顶上闪耀着，与你交互诉说的话语，一句一句地，如同星点般翩然落至眼前`

### 一、Redis简介

​	Redis 是完全开源免费的，遵守BSD协议，是一个高性能的`key-value`型数据库。

### 二、window下的安装

> redis 64位下载地址：https://github.com/ServiceStack/redis-windows

1.修改redis.windows.conf文件

        maxmemory 1024*1024*1024

2.启动redis

        redis-server.exe redis.windows.conf

3.将redis加入到windows的服务中

        redis-server.exe --service-install redis.windows.conf --loglevel verbose

4.常用的redis服务命令。

    卸载服务：redis-server --service-uninstall
    
    开启服务：redis-server --service-start
    
    停止服务：redis-server --service-stop
    
    重命名服务：redis-server --service-name name

5.连接服务器
    
    redis-cli.exe

### 三、linix下的安装

1. 安装
```
$ wget http://download.redis.io/releases/redis-2.8.17.tar.gz
$ tar xzf redis-2.8.17.tar.gz
$ cd redis-2.8.17
$ make
```
2. 启动服务

- 默认启动
```
$ cd src
$ ./redis-server
```

- 使用指定配置文件启动
```
$ cd src
$ ./redis-server ../redis.conf
```

### 四、redis使用场景

> 参考[ redis使用场景及案例](https://blog.csdn.net/Bobdragery/article/details/99711762)

#### 一、缓存

项目场景：用户登录或注册时的验证码存储，用户名

```
set Code:1:code 1232 EX 100 NX
get Code:1:code 	# 1232
set User:1:name bob EX 100 NX
get User:1:name		 # bob
```


缓存是 redis 出镜率最高的一种使用场景，仅仅使用 set/get 就可以实现，不过也有一些需要考虑的点
1、如何更好的设置缓存
2、如何保持缓存与上游数据的一致性
3、如何解决缓存雪崩，缓存击穿问题（这两个问题会单独写一篇）

#### 二：消息队列

```
lpush UserEmailQueue 1 2 3 4
lpop UserEmailQueue
rpop UserEmailQueue 1
rpop UserEmailQueue 2
```

可以把redis的队列看为分布式队列，作为消息队列时，生产者在一头塞入数据。消费者另一条取出数据:(lpush/rpop,rpush/lpop),不过也有一些不足，而这些不足有可能是致命的，不过对于一些丢几条消息也没关系的场景还是可以考虑的:
1、没有ack(消息确认机制)，有可能丢消息
2、需要做redis的持久化配置

#### 三：过滤器(dupefilter)

```
sadd UrlSet http://1
sadd UrlSet http://2
sadd UrlSet http://2

smembers UrlSet
“http://1”
“http://2”
scrapy-redis作为分布式的爬虫框架，便是使用了 redis 的 Set 这个数据结构来对将要爬取的 url 进行去重处理。
```

    def request_seen(self, request):  
      """Returns True if request was already seen.   
    Parameters   
    -------
    request : scrapy.http.Request    
    Returns    
    -------
     bool    
     """    
     fp = self.request_fingerprint(request)    
     added = self.server.sadd(self.key, fp)    
     return added == 0
    不过当 url 过多时，会有内存占用过大的问题
#### 四、分布式锁

分布式锁，这个是除了 KV 缓存之外最为常用的另一个特色功能。

```
set Lock:User:10086 06be97fc-f258-4202-b60b-8d5412dd5605 EX 60 NX
#释放锁，一段 LUA 脚本

if redis.call("get",KEYS[1]) == ARGV[1] then
	  return redis.call("del",KEYS[1])
else
	 return 0
end
```



这是一个最简单的单机版的分布式锁，有以下要点
1）EX 表示锁会过期释放
2）NX 保证原子性
解锁时对比资源对应产生的 UUID，避免误解锁
当你使用分布式锁是为了解决一些性能问题，如分布式定时任务防止执行多次 (做好幂等性)，而且鉴于单点 redis 挂掉的可能性很小，可以使用这种单机版的分布式锁。

举个例子说明：
比如一个很能干的资深工程师，开发效率很快，代码质量也很高，是团队里的明星。所以呢诸多产品经理都要来烦他，让他给自己做需求。如果同一时间来了一堆产品经理都找他，它的思路呢就会陷入混乱，再优秀的程序员，大脑的并发能力也好不到哪里去。所以呢他就在自己的办公室的门把上挂了一个请勿打扰的牌子，当一个产品经理来的时候先看看门把上有没有这个牌子，如果没有呢就可以进来找工程师谈需求，谈之前要把牌子挂起来，谈完了再把牌子摘了。这样其它产品经理也要来烦他的时候，如果看见这个牌子挂在那里，就可以选择睡觉等待或者是先去忙别的事。如是这位明星工程师从此获得了安宁。

一定要设置这个过期时间，因为遇到特殊情况 —— 比如地震（进程被 kill -9，或者机器宕机），产品经理可能会选择从窗户上跳下去，没机会摘牌，导致了死锁饥饿，让这位优秀的工程师成了一位大闲人，造成严重的资源浪费。同时还需要注意这个 owner_id，它代表锁是谁加的 —— 产品经理的工号。以免你的锁不小心被别人摘掉了。释放锁时要匹配这个 owner_id，匹配成功了才能释放锁。这个 owner_id 通常是一个随机数，存放在 ThreadLocal 变量里（栈变量）。官方其实并不推荐这种方式，因为它在集群模式下会产生锁丢失的问题 —— 在主从发生切换的时候。官方推荐的分布式锁叫 RedLock，作者认为这个算法较为安全，推荐我们使用。不过我们一直还使用上面最简单的分布式锁。为什么我们不去使用 RedLock 呢，因为它的运维成本会高一些，需要 3 台以上独立的 Redis 实例，用起来要繁琐一些。另外，Redis 集群发生主从切换的概率也并不高，即使发生了主从切换出现锁丢失的概率也很低，因为主从切换往往都有一个过程，这个过程的时间通常会超过锁的过期时间，也就不会发生锁的异常丢失。还有呢就是分布式锁遇到锁冲突的机会也不多，这正如一个公司里明星程序员也比较有限一样，总是遇到锁排队那说明结构上需要优化。

#### 五：定时任务

分布式定时任务有多种实现方式，最常见的一种是 master-workers 模型。
master 负责管理时间，到点了就将任务消息仍到消息中间件里，然后worker们负责监听这些消息队列来消费消息。
著名的 Python 定时任务框架 Celery 就是这么干的。但是 Celery 有一个问题，那就是 master 是单点的，如果这个 master 挂了，整个定时任务系统就停止工作了。

[![3AVW1U.png](https://s2.ax1x.com/2020/02/18/3AVW1U.png)](https://imgchr.com/i/3AVW1U)


另一种实现方式是 multi-master 模型。这个模型什么意思呢，就类似于 Java 里面的 Quartz 框架，采用数据库锁来控制任务并发。会有多个进程，每个进程都会管理时间，时间到了就使用数据库锁来争抢任务执行权，抢到的进程就获得了任务执行的机会，然后就开始执行任务，这样就解决了 master 的单点问题。

这种模型有一个缺点，那就是会造成竞争浪费问题，不过通常大多数业务系统的定时任务并没有那么多，所以这种竞争浪费并不严重。还有一个问题它依赖于分布式机器时间的一致性，如果多个机器上时间不一致就会造成任务被多次执行，这可以通过增加数据库锁的时间来缓解。

[![3AVnfK.png](https://s2.ax1x.com/2020/02/18/3AVnfK.png)](https://imgchr.com/i/3AVnfK)

现在有了 Redis 分布式锁，那么我们就可以在 Redis 之上实现一个简单的定时任务框架。

```
#注册定时任务
hset tasks name trigger_rule
#获取定时任务列表
hgetall tasks
#争抢任务
set lock:$(name) true nx ex=5
#任务列表变空
#轮询版本号，有变化就重新加载任务列表，重新调度时间有变化的任务
set tasks_version $new_version
get tasks_version
```

#### 六、频率控制

项目的社区功能里，不可避免的总是会遇到垃圾内容，一觉醒来你会发现首页突然会被某些恶意的帖子和广告刷屏了，如果不采取适当的机制来控制就会导致用户体验受到严重的影响。
	

控制广告垃圾贴的策略很多，高级一点的可以通过AI，最简单的方式是通过关键词扫描，还有比较常用的一种方式是频率控制，限制单个用户内容的生产速度，不通等级的用户会有不同的频率控制参数。
	

频率控制就可以使用redis来实现，我们将用户的行为理解为一个时间序列，我们要保证在一定的时间内限制单个用户的时间序列的长度，超过这个长度就禁止用户的行为，它可以是用redis的zset(有序集合)来实现

[![3AEsJK.png](https://s2.ax1x.com/2020/02/18/3AEsJK.png)](https://imgchr.com/i/3AEsJK)

图中绿色的部门就是我们要保留的一个时间段的时间序列信息，灰色的段会被砍掉。统计绿色段中时间序列记录的个数就知道是否超过了频率的阈值。

```
下面的代码控制用户的ugc行为为每小时最对N次
hist_key:"ugc:${user_id}"
with redis.pipeline() as pipe:
#记录当前的行为
pipe.zadd(hist_key,ts,uuid)
#保留1小时内的行为序列
pipe.zremrangebyscore(hist_key, 0, now_ts -3600)
# 获取这1小时的行为数量
pipe.zcard(hist_key)
# 设置过期时间，节约内存
pipe.expire(hist_key, 3600)
# 批量执行
_ , _ , count, _ =pipe.exec()
return count > N
```

#### 七、服务发现

如果想要技术成熟度再高一些，有的企业会有服务发现的基础设施。通常我们都会选用zookeeper、etcd，consul等分布式配置数据库来作为服务列表的存储。
它们有非常及时的通知机制来通知服务消费者服务列表发生了变更。那我们该如何使用 Redis 来做服务发现呢？

[![3AEurj.png](https://s2.ax1x.com/2020/02/18/3AEurj.png)](https://imgchr.com/i/3AEurj)

这里我们要再次使用 zset 数据结构，我们使用 zset 来保存单个服务列表。多个服务列表就使用多个 zset 来存储。
zset 的 value 和 score 分别存储服务的地址和心跳的时间。服务提供者需要使用心跳来汇报自己的存活，每隔几秒调用一次 zadd。服务提供者停止服务时，使用 zrem 来移除自己。

```
zadd service_key heartbeat_ts addr
zrem service_key addr
```


这样还不够，因为服务有可能是异常终止，根本没机会执行钩子，所以需要使用一个额外的线程来清理服务列表中的过期项

```
zremrangebyscore service_key 0 now_ts -30 # 30s都没来心跳
```


接下来还有一个重要的问题是如何通知消费者服务列表发生了变更，这里我们同样使用版本号轮询机制，当服务列表变更时，递增版本号。消费者通过轮询版本号的变化来重加载服务列表

```
if zadd() >0 || zrem() >0 ||zremrangebuscore() >0:
		incr service_version_key
```

但是还有一个问题，如果消费者依赖了很多的服务列表，那么它就需要轮询很多的版本号，这样的IO效率会比较低下。

这是我们可以再增加一个全局版本号，在任意的服务类表版本号发生变化时，递增全局版本号；

这样在正常情况下消费者只需要轮询全局版本号就可以了。当全局版本号发生变更时再挨个对依赖的服务类表的子版本号，然后加载有变更的服务列表

[![3AA48U.png](https://s2.ax1x.com/2020/02/18/3AA48U.png)](https://imgchr.com/i/3AA48U)

#### 八、位图

项目里需要做一个球队成员的签到系统，当用户量比较少的时候，设计上比较简单，就是将用户的签到状态用redis的hash结构来存储，签到一次就再hash结构里记录一条，签到有三种状态：未签到，已签到和部签到，分别是0，1，2三个整数值。

```
hset sign:$(user_id) 2019-08-11 1
hset sign:$(user_id) 2019-08-12 0
hset sign:$(user_id) 2019-08-14 2
```

这个其实非常浪费用户空间，后来想做全部用户的签到，技术leader指出，这时候的再用hash就有问题了，他讲到当用户过千万的时候，内存可能会飚到 30G+，我们线上实例通常过了 20G 就开始报警，30G 已经属于严重超标了。

这时候我们就开始着手解决这个问题，去优化存储。我们选择使用位图来记录签到信息，一个签到状态需要两个位来记录，一个月的存储空间只需要 8 个字节。这样就可以使用一个很短的字符串来存储用户一个月的签到记录。

[![3AAeBR.png](https://s2.ax1x.com/2020/02/18/3AAeBR.png)](https://imgchr.com/i/3AAeBR)

但是位图也有一个缺点，它的底层是字符串，字符串是连续存储空间，位图会自动扩展，比如一个很大的位图 8m 个位，只有最后一个位是 1，其它位都是零，这也会占用1m 的存储空间，这样的浪费非常严重。

所以呢就有了咆哮位图这个数据结构，它对大位图进行了分段存储，全位零的段可以不用存。

另外还对每个段设计了稀疏存储结构，如果这个段上置 1 的位不多，可以只存储它们的偏移量整数。这样位图的存储空间就得到了非常显著的压缩。

#### 九、 模糊计数

上面提到的签到系统，如果产品经理需要知道这个签到的日活月活怎么办呢？
通常我们会直接甩锅——请找数据部门。

但是数据部门的数据往往不是很实时，经常前一天的数据需要第二天才能跑出来，离线计算是通常是定时的一天一次。那如何实现一个实时的活跃计数？

最简单的方案就是在 Redis 里面维护一个 set 集合，来一个用户，就 sadd 一下，最终集合的大小就是我们需要的 UV 数字。

但是这个空间浪费严重怎么办？这时候就需要使用redis提供的HyperLogLog模糊计数功能，它是一种概率计数，有一定的误差，大约是0.81%。

但是空间占用很小，其底层是一个位图，它最多只会占用12k的存储空间，而且在计数值比较小的时候，位图使用稀疏存储，空间占用就更小了。

```
#记录用户
pfadd sign_uv_${day} user_id
#获取记录数量
p count sign_uv_${day}
```


微信公众号文章的阅读数可以使用它，网页的 UV 统计它都可以完成。但是如果产品经理非常在乎数字的准确性，比如某个统计需求和金钱直接挂钩，那么你可以考虑一下前面提到的咆哮位图。

它使用起来会复杂一些，需要提前将用户 ID 进行整数序列化。Redis 没有原生提供咆哮位图的功能，但是有一个开源的 Redis Module 可以拿来即用。

#### 十、布隆过滤器

如果系统即将会有大量的新用户涌入时，布隆过滤器就会非常有价值，可以显著降低缓存的穿透率，降低数据库的压力
这个新用户的涌入不一定是业务系统的大规模铺开，也可能是因为来自外部的缓存穿透攻击；

```
def get_user_state(user_id):
		state = cache.get(user_id)
		if not state:
			state = db.get(user_id) or{}
			cache.set(user_id,state)
		return state
def save_user_state(user_id,state):
		cache.set(user_id,state)
		db.set_async(user_id,state)
```

比如就上面这个业务系统的用户状态查询接口代码，现在一个新用户过来，会先去缓存里查询有没有这个用户的状态数据
因为是新用户，所以肯定缓存里没有，然后它就要去数据库里查，结过数据库也没有，如果这样的新用户大批量瞬间涌入，那么可以遇见数据库的压力会比较大，会存在大量的空查询；

我们非常希望redis里面有这样一个set，它存放了所有的用户id，这样通过查询这个set集合就知道是不是新用户来了
当用户量非常庞大的时候，维护这样的一个集合需要的存储空间是很大的；

这时候就可以使用布隆过滤器，它相当于一个set，但是又不同于set，它需要的存储空间要小的多；

比如存储一个用户id需要64个字节，而布隆过滤器存储一个用户ID只需要1个字节多点，其实它存的不是用户id，而是用户id的指纹，所以会存在一定的小概率误判，它是一个具备模糊过滤能力的容器；

当它说用户 id 不在容器中时，那么就肯定不在。当它说用户 id 在容器里时，99% 的概率下它是正确的，还有 1% 的概率它产生了误判。

[![3AkEwt.png](https://s2.ax1x.com/2020/02/18/3AkEwt.png)](https://imgchr.com/i/3AkEwt)

不过在这个案例中，这个误判并不会产生问题，误判的代价只是缓存穿透而已。
相当于有 1% 的新用户没有得到布隆过滤器的保护直接穿透到数据库查询，而剩下的 99% 的新用户都可以被布隆过滤器有效的挡住，避免了缓存穿透

[![3AFurR.png](https://s2.ax1x.com/2020/02/18/3AFurR.png)](https://imgchr.com/i/3AFurR)

布隆过滤器的原理有一个很好的比喻，那就是在冬天一片白雪覆盖的地面上，如果你从上面走过，就会留下你的脚印。如果地面上有你的脚印，那么就可以大概率断定你来过这个地方，但是也不一定，也许别人的鞋正好和你穿的一模一样。可是如果地面上没有你的脚印，那么就可以 100% 断定你没来过这个地方。
