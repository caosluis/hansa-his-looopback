var pubsub = require('../../server/pubsub.js');
module.exports = function (Tareas) {
    Tareas.CargarTareasUnaRegional = (Anio,Mes,Dia, cb) => {
        var ds = Tareas.dataSource
        var sql = "SELECT * FROM Tareas WHERE YEAR(FechaInicioReal)=" + Anio + " AND MONTH(FechaInicioReal)=" + Mes + " AND DAY(FechaInicioReal)=" + Dia;

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/TareasEntrante/get', instance);
            cb(err, instance);
        })
    }
    Tareas.remoteMethod(
        'CargarTareasUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'Año', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Tareas.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Tareas key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Tareas.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Tareas.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Tareas.observe('after save', function (ctx, next) {
        //socket.emit('/Tareas/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Tareas/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Tareas.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Tareas.observe('after delete', function (ctx, next) {
        pubsub.publish('/Tareas/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Tareas.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Tareas.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Tareas instance:', ctx.instance);
        } else {
            //console.log('About to update Tareass that match the query %j:', ctx.where);
        }
        next();
    });
};