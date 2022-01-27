const fs = require('node:fs')
const path = require('node:path')

const createQuery = (data)=>{
  var key = Object.keys(data)
  var pairs = []
  for (let i = 0; i < key.length; i++) {
    pairs.push(key[i]+'='+data[key[i]])
  }
  return pairs.join('&')
}
const parseQuery = (url)=>{
  var query = url.replace(/\/path\?/,'')
  var pairs = query.split('&')
  var data = {}
  for(var i = 0; i < pairs.length; i++){
    var [key, value] = pairs[i].split('=')
    if(value.startsWith('i:')){
      data[key] = parseInt(value.substr(2))
    }else if(value.startsWith('f:')){
      data[key] = parseFloat(value.substr(2))
    }else if(value.startsWith('b:')){
      data[key] = (value.substr(2) == 'true') ? true : false
    }else{
      data[key] = value
    }
  }
  return data
}
const writeToFile = (data)=>{
  var file = path.join(__dirname, './data.json')
  fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8', (err)=>{
    if(err != null){
      console.log('WRITE_ERR: ', err)
    }else{
      console.log('Data Written')
    }
  })
}
const log = (_event)=>{
  var file = path.join(__dirname, './server.log')
  if(fs.existsSync(file)){
    fs.appendFile(file, `[${new Date().toJSON()}] ${_event}`, (err)=>{
      if(err != null){
        console.log('LOGGING_ERR: ', err)
      }
    })
  }else{
    fs.writeFile(file, `[${new Date().toJSON()}] ${_event}`, (err)=>{
      if(err != null){
        console.log('LOGGING_ERR: ', err)
      }
    })
  }
}

module.exports = {
  createQuery,
  parseQuery,
  writeToFile,
  log
}