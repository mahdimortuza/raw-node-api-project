/*

* title: uptime monitoring application
* description: a restful API to monitor up or down time of user defined links
* author: mahdi
* date: 12/06/24

*/

// dependencies
const http = require('http')

// app object - module scaffolding
const app = {}

// configuration
app.config = {
    port: 3000
}

// create server
app.createServer = () => {
    const server = http.createServer(handleRequest)
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`)
    })
}

// handle request response
app.handleRequest = (req, res) => {
    // response handle
    res.end('hello world ')
}

app.createServer()