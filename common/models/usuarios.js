var pubsub = require('../../server/pubsub.js');
module.exports = function (Usuarios) {
    Usuarios.CargarCuadrillasPanelIzquierdo = (IdVisita,cb) => {
        var ds = Usuarios.dataSource
        var sql = "SELECT Cuadrilla FROM loopback_repository.Usuarios GROUP BY Cuadrilla";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/UsuariosEntrante/get', instance);
            cb(err, instance);
        })
    }
    Usuarios.remoteMethod(
        'CargarCuadrillasPanelIzquierdo',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'IdVisita', type: ['string'] },
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Usuarios.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Usuarios key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Usuarios.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Usuarios.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Usuarios.observe('after save', function (ctx, next) {
        //socket.emit('/Usuarios/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Usuarios/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Usuarios.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Usuarios.observe('after delete', function (ctx, next) {
        pubsub.publish('/Usuarios/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Usuarios.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Usuarios.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Usuarios instance:', ctx.instance);
        } else {
            //console.log('About to update Usuarioss that match the query %j:', ctx.where);
        }
        next();
    });
};