# javascript设计模式

### 前言

设计模式（Design Pattern）是一套被反复使用、多数人知晓的、经过分类的、代码设计经验的总结。

设计模式的定义网上能搜到太多了，作者这里就不献丑了。

并且作者非常赞同这句话：Talk is cheep, show me code.

<!-- 国内的前端工程师似乎不是很了解设计模式：
* 有的认为这玩意太抽象了，对业务没太大帮助
* 有的认为这是搞java的人玩的
* 有的根本就不知道设计模式

我对其分析了下，可能有以下几点原因：
* 大部分前端的业务不是很复杂，所以设计模式对业务帮助不是很大
* 一些前端从业人员是非计算机专业转行的，对设计模式不了解
* 设计模式的学习成本高，并且大部分的教程都是c++或java的 -->

### 学习设计模式对你有什么帮助？
* 学会如何去拆解、分析、实现复杂需求
* 代码可读性高、便于复用和维护
* 各种框架中大量运用了设计模式的思想，学习设计模式可以帮助我们快速理解框架的设计思想
* 跨编程语言的知识，即使我们使用的编程语言换了也同样有用
* 框架每年都在变，思考问题的方式不会变，设计模式可以让我们受益整个编程生涯

假如我们web应用中要实现一个需求：登陆成功后执行某个方法savaLoginData，并把登陆的信息传过去

我们可能是这样实现的：在实现登陆的文件中导入savaLoginData方法的模块，然后在ajax登陆回掉中执行它
```javascript
// login.service.js
    const savaLoginData = require('save-login-data.js');

    function login() {
        fetch('http://example.com/login').then(function(response) {
            var resData = response.json();
            savaLoginData(resData);
        });
    }

    module.exports = login;
```
聪明的人相信已经发现了问题：'login.service.js'依赖了'save-login-data.js'    
假如这时候新的需求来了：登陆成功后还要把登陆信息更新到显示模块user-info.component.js，显示登陆的用户信息
如果继续按上面这种方法做的话，这时候'login.service.js'又依赖了'user-info.component.js'  
并且随着需求越来越多，'login.service.js'依赖的模块也越来越多，每增加一次需求都要修改login.service.js    
如果是多人协同开发，难道要让大家一起修改'login.service.js'？

很明显，我们要优化我们的代码了:
```javascript
// login.service.js
    var _events = [];

    // 把所有回掉函数丢到_events里
    function on(fn) {
        _events.push(fn)
    }

    // 执行所有回掉函数
    function _dispatch(data) {
        for(var i=0,l=_events.length;i<l;i++){
            _events[i](data)
        }
    }

    function login() {
        fetch('http://example.com/login').then(function(response) {
            var resData = response.json();
            _dispatch(resData);
        });
    }

    module.exports = {
        on: on,
        login: login
    };

// save-login-data.js
    const loginService = require('login.service.js');

    loginService.on(function(data){
        savaLoginData(data);
    });

// user-info.component.js
    const loginService = require('login.service.js');

    loginService.on(function(data){
        updateComponent(data);
    });
```
这时候'login.service.js'不依赖任何模块，如果你想要在登陆成功后执行某个操作，只需要导入'login.service.js'，执行on方法把回掉函数丢进去，登陆成功后会自动执行该回掉函数    
并且无论你增加多少需求，'login.service.js'是不用修改的

以上的代码就是设计模式中观察者模式的的简单实现（这个实现漏斗百出，但在这一节只是为了让初学者能够看懂并感兴趣，更多观察者模式的东西会有专门一章讲述）

接下来的设计模式的一系列文章都会根据我们经常遇到的应用环境来demo实现，尽量降低大家的阅读成本

### 为什么要写这么一系列文章？
写设计模式的书或文章实在太多太多了，但对于前端开发人员来说，这些书籍入门门槛比较高。

并且用javascript写demo的比较少，唯一一本《javascript设计模式》也用的以前的es3、es5语法。

所以作者希望从实际项目需求的角度，用一些简单容易理解的demo，让初学者可以很直观的了解设计模式

本系列用的是es6语法，例子也是前端项目常用到的例子，所以希望能够帮助前端开发人员能以即学即用的方式对设计模式有个初步的了解

至于更深入的，建议看GOF的《设计模式》

### 本系列文章面向的人群和前置技能
* 1到2年工作经验的前端开发、node后端开发
* javascript基础知识
* [ES6中的一些知识点：class、继承、模块化等](http://es6.ruanyifeng.com/?_blank)
* [面向对象的基本概念](http://www.cnblogs.com/elonhu/p/6939640.html?_blank)

### 测试文档中的代码
``` bash
# 拉取项目
git clone https://github.com/elon-hu/javascript-design-patterns.git

# cd到项目文件夹
cd javascript-design-patterns

# 安装依赖
npm install

# 启动服务localhost:8080，并且修改代码自动刷新
npm start

```
