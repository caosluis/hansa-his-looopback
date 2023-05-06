var pubsub = require('../../server/pubsub.js');
var global = require("../../global/global")
module.exports = function (Haninvisita) {

    Haninvisita.CargarHaninvisitaUnaRegional = (DivisionID, RegionalID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisita.dataSource
        var sql = " select hv.id,hv.assigned_user_id,ho.telefono_contacto,a.name ,ho.iddivision_c,ho.idregional_c ,ho.idamercado_c ,hv.fecha_visita_c, hv.fecha_final_plan ,hv.fecha_final_real,hv.fecha_inicio_plan,hv.fecha_inicio_real,hv.estado_c,ho.tiposinstalaciones,ho.zona_instalacion" +
            " from hanin_visita hv, hanin_visita_hanin_ordenestrabajo_c hvho, hanin_ordenestrabajo ho, hanin_ordenestrabajo_accounts_c hoac, accounts a" +
            " where ho.iddivision_c = " + DivisionID +
            " and ho.idregional_c = " + RegionalID +
            " and YEAR(hv.fecha_visita_c) = " + Anio + " and MONTH(hv.fecha_visita_c) = " + Mes + " and DAY(hv.fecha_visita_c) = " + Dia +
            " and ho.id = hvho.hanin_visita_hanin_ordenestrabajohanin_ordenestrabajo_ida" +
            " and hv.id = hvho.hanin_visita_hanin_ordenestrabajohanin_visita_idb" +
            " and ho.id = hoac.hanin_ordenestrabajo_accountsaccounts_ida" +
            " and a.id = hoac.hanin_ordenestrabajo_accountshanin_ordenestrabajo_idb";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitaEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisita.remoteMethod(
        'CargarHaninvisitaUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    //////////////////////////////////////////////////////
    Haninvisita.VerificarVisita = (VisitaID, cb) => {
        var ds = Haninvisita.dataSource
        var sql = " select *" +
            " from hanin_visita" +
            " where id=" + "'" + VisitaID + "'";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitaEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisita.remoteMethod(
        'VerificarVisita',
        {
            http: { verb: 'get' },
            accepts: [{ arg: 'VisitaID', type: ['string'] }],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    ///////////////////////////////////////////////////////////////////
    Haninvisita.DeleteVisitaFirebase = (Visita, cb) => {
        var url =
            global.FirebaseURL +
            "/Visitas/" +
            Visita.VisitaID +
            ".json";
        pubsub.serviceConsumer_delete(url, function (data, err) {
            if (data != null) {
                var json = JSON.parse(data);
                cb(null, json);
            }
            if (err != null) {
                cb(null, err);
            }
        });
    };
    Haninvisita.remoteMethod("DeleteVisitaFirebase", {
        http: { verb: "put" },
        accepts: [{ arg: "Visita", type: "object", http: { source: "body" } }],
        returns: { arg: "data", type: ["string"], root: true },
    });
    ///////////////////////////////////////////////////////////////////////////////

    // remote method before hooks
    Haninvisita.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Haninvisita key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Haninvisita.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Haninvisita.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Haninvisita.observe('after save', function (ctx, next) {
        //socket.emit('/Haninvisita/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Haninvisita/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Haninvisita.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Haninvisita.observe('after delete', function (ctx, next) {
        pubsub.publish('/Haninvisita/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Haninvisita.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Haninvisita.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Haninvisita instance:', ctx.instance);
        } else {
            //console.log('About to update Haninvisitas that match the query %j:', ctx.where);
        }
        next();
    });
};