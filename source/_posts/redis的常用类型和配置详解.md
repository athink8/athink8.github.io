---
title: Redis的常用命令类型和配置详解
categories:
  - 数据库
tags:
  - Redis
  - 命令类型
  - 配置
cover: false
top: false
keywords: 'Redis,配置,命令类型'
summary: Redis常见五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。
abbrlink: 6996938c
date: 2020-02-18 19:00:00
---

## Redis的常用命令类型和配置详解

> `苦恼着，歇斯底里着，痛苦着，不断挣扎的数月时间，这一切会在未来的某一瞬间得到回报。我们或许就是被那个瞬间迷住的，一种无可救药的生物吧`

### 一、数据类型

#### key

```
keys* 查看当前库全部keys

exists key 判断某个key是否存在

move key db 移动当前库的key到别的库

expire key 秒钟  设置给定的key设置过期时间

ttl key 查看剩余多少秒过期，-1表示永不过期，-2表示已过期

type key 查看你的key是什么类型
```

#### String

```
set/get/del/append/strlen 设置/获取/删除/在值后追加/值的长度

Incr/decr/incrby/decrby，加/减/加多少/减多少 必须为数字

getrange/setrange 获取值的范围/设置范围的值为什么

setex（set with expire）键秒值/setnx（set if not exist）[key] [time] [value] 设置带有效期的键值对/不存在同名键时添加

mset/mget/msetnx 同时多个键值对 设置/添加/不存在添加（只要一个存在都不执行）
```

#### List

```
lpush/rpush/lrange 左边入栈/右边入栈/获取范围的值（0 -1 为获取全部）

lpop/rpop 尾部出栈/头部出栈

lindex 按照索引下标获得元素（从上到下）

llen 获取list值长度

lrem key n value 删N个值

Itrim key 开始index 结束index  截取指定范围的值后再赋值给key 

rpoplpush 源key 目的key  从源list的头部出栈一位到目的list左边入栈

lset key index value 设置索引位的值

linsert key before/after 值1 值2  在某个值前或后插入值
```

#### set 

> zset 和 set 基本一样，不同的是zset 都会关联一个double类型的-score(分数)

```
sadd/smembers/sismember 添加/查询所有/查询是否存在

scard 获取集合里元素个数

srem key value 删除集合中元素

srandmember key [n]  随机出n个数

spop key 随机出栈

smove key1 key2	将key1里的某个值移动到key2

sdiff/sinter/sunion key1 key2	比较两key的差值/交集/并集
```

#### hash

```
hset/hget/hmset/hmget/hgetall/hdel 插入/获取/多插入/多获取/获取全部/删除

hlen 获取长度

hexists key  在key里面的某个值判断key是否存在

hkeys/hvals  获取全部key/获取全部value

hincrby/hincrbyfloat [n] 增加n值

hsetnx 插入（不存在时）
```

### 二、常见配置redis.conf介绍

```
redis.conf 配置项说明如下：
    1.Redis默认不是以守护进程的方式运行，可以通过该配置项修改，使用yes启用守护进程 
    	daemonize no
    2.当Redis以守护进程方式运行时，Redis默认会把pid写入/var/run/redis.pid文件，可以通过pidfile指定
    	pidfile/var/run/redis.pid
    3.指定Redis监听端口，默认端口为6379，作者在自己的一篇博文中解释了为什么选用6379作为默认端口，因为6379在手机按键上MERZ对应的号码，而MERZ取自意大利歌女Alessia Merz的名字
    	port 6379
    4.绑定的主机地址
    	bind 127.0.0.1
    5.当客户端闲置多长时间后关闭连接，如果指定为0，表示关闭该功能
    	timeout 300
    6.指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为verbose 
    	loglevel verbose
    7.日志记录方式，默认为标准输出，如果配置Redis为守护进程方式运行，而这里又配置为日志记录方式为标准输出，则日志将会发送给/dev/null 
    	logfile stdout
    8.设置数据库的数量，默认数据库为0，可以使用SELECT<dbid>命令在连接上指定数据库id 
    	databases 16
    9.指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合
    	save <seconds><changes>
    Redis默认配置文件中提供了三个条件：
    	save 9001
    	save 30010
    	save 6010000分别表示900秒（15分钟）内有1个更改，300秒（5分钟）内有10个更改以及60秒内有10000个更改。
    10.指定存储至本地数据库时是否压缩数据，默认为yes，Redis采用LZF压缩，如果为了节省CPU时间，可以关闭该选项，但会导致数据库文件变的巨大
    	rdbcompression yes
    11.指定本地数据库文件名，默认值为dump.rdb 
    	dbfilename dump.rdb
    12.指定本地数据库存放目录
    	dir./
    13.设置当本机为lav服务时，设置master服务的IP地址及端口，在Redis启动时，它会自动从master进行数据同步
    	slaveof <masterip><masterport>
    14.当master服务设置了密码保护时，slav服务连接master的密码
    	masterauth <master-password>
    15.设置Redis连接密码，如果配置了连接密码，客户端在连接Redis时需要通过AUTH <password>命令提供密码，默认关闭
    	requirepass foobared
    16.设置同一时间最大客户端连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件描述符数，如果设置maxclients0，表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息maxclients 12817.指定Redis最大内存限制，Redis在启动时会把数据加载到内存中，达到最大内存后，Redis会先尝试清除已到期或即将到期的Key，当此方法处理后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Reds新的vm机制，会把Key存放内存，Value会存放在swap区
    	maxmemory<bytes>
    18.指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为redis本身同步数据文件是按上面save条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为no 
    	appendonly no
    19.指定更新日志文件名，默认为appendonly.aof 
    	appendfilename appendonly.aof
    20.指定更新日志条件，共有3个可选值：
    	no：表示等操作系统进行数据缓存同步到磁盘（快）
    	always：表示每次更新操作后手动调用fsync（）将数据写到磁盘（慢，安全）
    	everysec：表示每秒同步一次（折衷，默认值）
    21.指定是否启用虚拟内存机制，默认值为no，简单的介绍一下，VM机制将数据分页存放，由Redis将访问量较少的页即冷数据swap到磁盘上，访问多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析Redis的VM机制）
    	vm-enabled no
    22.虚拟内存文件路径，默认值为/tmp/redis.swap，不可多个Redis实例共享
    	vm-swap-file/tmp/redis.swap
    23.将所有大于vm-max-memory的数据存入虚拟内存，无论vm-max-memory设置多小，所有索引数据都是内存存储的（Redis的索引数据就是keys），也就是说，当vm-max-memory设置为0的时候，其实是所有value都存在于磁盘。默认值为0
    	vm-max-memory 0
    24.Redis swap文件分成了很多的page，一个对象可以保存在多个page上面，但一个page上不能被多个对象共享，vm-page-size是要根据存储的数据大小来设定的，作者建议如果存储很多小对象，page大小最好设置为32或者64bytes；如果存储很大大对象，则可以使用更大的page，如果不确定，就使用默认值
    	vm-page-size 32
    25.设置swap文件中的page数重，由于页表（一种表示页面空闲或使用的bitmap）是在放在内存中的，，在磁盘上每8个pages将消耗1byte的内存。
    	vm-pages 134217728
    26.设置访间swap文件的线程数，最好不要超过机器的核数，如果设置为0，那么所有对swap文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为4
    	vm-max-threads 4
    27.设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启
    	glueoutputbuf yes
    28.指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法
    	hash-max-zipmap-entries64
    	hash-max-zipmap-value 512
    29.指定是否激活重置哈希，默认为开启（后面在介绍Redis的哈希算法时具体介绍）
    	activerehashing yes
    30.指定包含其它的配置文件，可以在同一主机上多个Redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件
    	include/path/to/local.conf
```

