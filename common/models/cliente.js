var pubsub = require('../../server/pubsub.js');
module.exports = function (Cliente) {
    Cliente.CargarClienteUnaRegional = (IdVisita, cb) => {
        var ds = Cliente.dataSource
        var sql = "SELECT Latitud,Longitud FROM Cliente WHERE IdVisita ="+"'"+IdVisita+"'";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/ClienteEntrante/get', instance);
            cb(err, instance);
        })
    }
    Cliente.remoteMethod(
        'CargarClienteUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'IdVisita', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    Cliente.CargarDatosClientePopUp = (IdVisita, cb) => {
        var ds = Cliente.dataSource
        var sql = "SELECT * FROM Cliente WHERE IdVisita ="+"'"+IdVisita+"'";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/ClienteEntrante/get', instance);
            cb(err, instance);
        })
    }
    Cliente.remoteMethod(
        'CargarDatosClientePopUp',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'IdVisita', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Cliente.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Cliente key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Cliente.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Cliente.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Cliente.observe('after save', function (ctx, next) {
        //socket.emit('/Cliente/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Cliente/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Cliente.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Cliente.observe('after delete', function (ctx, next) {
        pubsub.publish('/Cliente/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Cliente.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Cliente.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Cliente instance:', ctx.instance);
        } else {
            //console.log('About to update Clientes that match the query %j:', ctx.where);
        }
        next();
    });
};