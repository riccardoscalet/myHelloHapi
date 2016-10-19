#! /usr/bin/env node

'use strict'

const Hapi = require('hapi')
const xtend = require('xtend')
const minimist = require('minimist')
const memdb = require('memdb');
const defaults = {
    port: 8989
}

function build(opts, cb) {
    opts = xtend(defaults, opts)

    const server = new Hapi.Server()

    // Uses level, if --path option is used on command line. Else uses memdb.
    // Example: node hello --path dbfolder
    var db = memdb();

    server.connection({ port: opts.port })

    // Registers plugins to expose on server
    server.register([{
            register: require('./lib/assetplugin'),
            options: { // Sets options
                db // Equivalent to: db = db
            }
        },
        require ('./lib/loadplugin'),
        require('./lib/myplugin')
    ], (err) => {
        cb(err, server)
    })

    return server
}

function start(opts) {
    build(opts, (err, server) => {
        if (err) { throw err }

        server.start(function(err) {
            if (err) { throw err }

            console.log('Server running at:', server.info.uri)
        })
    })
}

module.exports = build

if (require.main === module) {
    start(minimist(process.argv.slice(2), {
        integer: 'port',
        alias: {
            'port': 'p'
        }
    }))
}
