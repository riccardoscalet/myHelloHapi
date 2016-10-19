'use strict'

const assetServiceModule = require('@darkever/assetservice')

const Joi = require('joi');

module.exports.register = function(server, options, next) {

    var assetService = new assetServiceModule(options.db);

    function addAsset(request, reply) {
        var asset = {
            name: request.query.name,
            state: 0
        }

        assetService.addAsset(asset, function(err) {
            if (err) return reply(err);
            reply("Asset added successfully!");
        });
    }

    function modifyState(request, reply) {
        assetService.modifyState(request.query, function(err) {
            if (err) return reply(err);
            reply("Asset updated successfully!");
        });
    }

    function getState(request, reply) {
        assetService.getState(request.query, function(err, state) {
            if (err) return reply(err);
            console.log(state);
            reply("state: " + state);
        });
    }

    server.route({
        method: 'GET',
        path: '/asset/add',
        handler: addAsset,
        config: {
            validate: {
                query: {
                    name: Joi.string().required().min(3).max(10).lowercase()
                }
            }
        }
    })
    server.route({
        method: 'GET',
        path: '/asset/modify',
        handler: modifyState,
        config: {
            validate: {
                query: {
                    name: Joi.string().required().min(3).max(10).lowercase(),
                    state: Joi.number().required().integer().min(0).max(2)
                }
            }
        }
    })
    server.route({
        method: 'GET',
        path: '/asset/getState',
        handler: getState,
        config: {
            validate: {
                query: {
                    name: Joi.string().required().min(3).max(10).lowercase()
                }
            }
        }
    })

    next()
}

module.exports.register.attributes = {
    name: 'assetplugin',
    version: '1.0.0'
}