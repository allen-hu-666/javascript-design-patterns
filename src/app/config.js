var config = [
    {
        name: '单例模式',
        id: 'singleton-pattern',
    }
]

function getPath(id) {
    return `../pages/${id}/index.ejs`
}

module.exports = function getConfig() {
    //const path = pages
    return config.map(item=>{
        return require(getPath(item.id))();
    })
}