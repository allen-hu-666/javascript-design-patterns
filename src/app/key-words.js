var config = require('./config.js');

let keyWords = [
    'javascript设计模式',
    '设计模式',
    'javascript design pattern',
    'design pattern'
];

config.forEach(item=>{
    keyWords.push(item.name);
    keyWords.push(item.id.replace(/-/," "))
});


module.exports = keyWords;