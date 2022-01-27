# iot-server

## Query structure
The supported query type is over GET method. Thus all requests are structured in url query params.
To simulate query data types prefixes are uses as follows

* `integer` - `i:[0-9]`
* `float` - `f:[0.*0-9]`
* `boolean` - `b:true|false`

example query data is used in this code from **query.js** file.

## Running the server

1 install dependencies
```shell
npm install
```

2 run server
```shell
npm start
```

