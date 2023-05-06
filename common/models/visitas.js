var pubsub = require('../../server/pubsub.js');
module.exports = function (Visitas) {
    Visitas.CargarVisitasUnaRegional = (DivisionID, Regional, Anio, Mes, Dia, cb) => {
        var ds = Visitas.dataSource
        var sql = "SELECT V.IdVisita,V.CodUsuario,Estado,FechaInicioPlan,FechaFinPlan,FechaInicioReal,FechaFinReal,FechaVisita,V.LatitudReal,V.LongitudReal,NroOt,Observacion,UsuarioFecha,C.Latitud,C.Longitud,IdCliente,Direccion,NitCi,Nombre,Telefono,U.Cuadrilla" +
            " FROM Visitas V,Cliente C, Usuarios U" +
            " WHERE YEAR(FechaVisita)=" + Anio + " AND MONTH(FechaVisita)=" + Mes + " AND DAY(FechaVisita)=" + Dia +
            " AND V.IdVisita = C.IdVisita AND V.CodUsuario = U.CodUsuario";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/VisitasEntrante/get', instance);
            cb(err, instance);
        })
    }
    Visitas.remoteMethod(
        'CargarVisitasUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'Año', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Visitas.CargarVisitasTodasRegional = (DivisionID, Anio, Mes, Dia, cb) => {
        var ds = Visitas.dataSource
        var sql = "SELECT V.IdVisita,CodUsuario,Estado,FechaInicioPlan,FechaFinPlan,FechaInicioReal,FechaFinReal,FechaVisita,V.LatitudReal,V.LongitudReal,NroOt,Observacion,UsuarioFecha,C.Latitud,C.Longitud" +
            " FROM Visitas V,Cliente C" +
            " WHERE YEAR(FechaVisita)=" + Anio + " AND MONTH(FechaVisita)=" + Mes + " AND DAY(FechaVisita)=" + Dia +
            " AND V.IdVisita = C.IdVisita";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/VisitasEntrante/get', instance);
            cb(err, instance);
        })
    }
    Visitas.remoteMethod(
        'CargarVisitasTodasRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'VisitasID', type: ['string'] },
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Visitas.CargarUsuariosPanelIzquierdo = (IdVisita,cb) => {
        var ds = Visitas.dataSource
        var sql = "SELECT CodUsuario FROM Visitas GROUP BY CodUsuario";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/VisitasEntrante/get', instance);
            cb(err, instance);
        })
    }
    Visitas.remoteMethod(
        'CargarUsuariosPanelIzquierdo',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'IdVisita', type: ['string'] },
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Visitas.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Visitas key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Visitas.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Visitas.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Visitas.observe('after save', function (ctx, next) {
        //socket.emit('/Visitas/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Visitas/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Visitas.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Visitas.observe('after delete', function (ctx, next) {
        pubsub.publish('/Visitas/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Visitas.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Visitas.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Visitas instance:', ctx.instance);
        } else {
            //console.log('About to update Visitass that match the query %j:', ctx.where);
        }
        next();
    });
};