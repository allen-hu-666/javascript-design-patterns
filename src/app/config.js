module.exports = [
    {
        name: '概述',
        id: 'overview',
        rander: require('./overview.ejs')
    },{
        name: '单例模式',
        id: 'singleton-pattern',
        rander: require('../pages/singleton/index.ejs')
    },{
        name: '观察者模式',
        id: 'observer-pattern',
        rander: require('../pages/observer/index.ejs')
    }
];
