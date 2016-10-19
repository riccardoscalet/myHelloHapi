'use strict'

const fs = require('fs');
const pump = require('pump');

module.exports.register = function(server, options, next) {

 

    server.route({
        method: 'POST',
        path: '/load',
        handler: function(req,  reply) {
        const dest = fs.createWriteStream('out')
        pump(req.payload, dest, reply)
    },
        config: {
                payload : {output : 'stream'}
        }
    })
   
    next()
}

module.exports.register.attributes = {
    name: 'loadplugin',
    version: '1.0.0'
}