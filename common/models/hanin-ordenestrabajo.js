var pubsub = require('../../server/pubsub.js');
module.exports = function (Haninordenestrabajo) {
    Haninordenestrabajo.CargarHaninordenestrabajoUnaRegional = (DivisionID, RegionalID, Anio, Mes, Dia, cb) => {
        var ds = Haninordenestrabajo.dataSource
        var sql = "SELECT *" +
            " FROM HANSACRM.dbo.hanin_ordenestrabajo" +
            " WHERE iddivision_c =" + DivisionID +" and idregional_c="+ RegionalID+" and YEAR(fecha_final_plan)=" + Anio + " AND MONTH(fecha_final_plan)=" + Mes + " AND DAY(fecha_final_plan)=" + Dia +
            " order by fecha_final_plan";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninordenestrabajoEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninordenestrabajo.remoteMethod(
        'CargarHaninordenestrabajoUnaRegional',
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
    Haninordenestrabajo.CargarHaninordenestrabajoTodasRegional = (DivisionID, Anio, Mes, Dia, cb) => {
        var ds = Haninordenestrabajo.dataSource
        var sql = "SELECT *" +
        " FROM HANSACRM.dbo.hanin_ordenestrabajo" +
        " WHERE iddivision_c =" + DivisionID +"and YEAR(fecha_final_plan)=" + Anio + " AND MONTH(fecha_final_plan)=" + Mes + " AND DAY(fecha_final_plan)=" + Dia +
        " order by fecha_final_plan";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninordenestrabajoEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninordenestrabajo.remoteMethod(
        'CargarHaninordenestrabajoTodasRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'Año', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    // remote method before hooks
    Haninordenestrabajo.CargarUsuariosPanelIzquierdo = (IdVisita, cb) => {
        var ds = Haninordenestrabajo.dataSource
        var sql = "SELECT CodUsuario FROM Haninordenestrabajo GROUP BY CodUsuario";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninordenestrabajoEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninordenestrabajo.remoteMethod(
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
    Haninordenestrabajo.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Haninordenestrabajo key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Haninordenestrabajo.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Haninordenestrabajo.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Haninordenestrabajo.observe('after save', function (ctx, next) {
        //socket.emit('/Haninordenestrabajo/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Haninordenestrabajo/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Haninordenestrabajo.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Haninordenestrabajo.observe('after delete', function (ctx, next) {
        pubsub.publish('/Haninordenestrabajo/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Haninordenestrabajo.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Haninordenestrabajo.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Haninordenestrabajo instance:', ctx.instance);
        } else {
            //console.log('About to update Haninordenestrabajos that match the query %j:', ctx.where);
        }
        next();
    });
};