var pubsub = require('../../server/pubsub.js');
module.exports = function (Hanincuadrilla) {

    Hanincuadrilla.CargarHanincuadrillaUnaRegional = (InstalacionID,TipoOt, cb) => {
        var ds = Hanincuadrilla.dataSource
        var sql = "SELECT hc.id,hc.name,upper(u.user_name)as user_name,hc.assigned_user_id as TecnicoID,hc.annual_revenue as TipoOt,hs.assigned_user_id as SupervisorID,hi.iddivision_c,hi.idregion_c" +
            " FROM hanin_instalaciones hi , hanin_instalaciones_hanin_supervisor_c hihsc , hanin_supervisor hs, hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc , users u" +
            " WHERE hc.annual_revenue LIKE '%" + TipoOt + "%'" +
            " AND hi.id = '"+InstalacionID+"'"+
            " AND hi.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_instalaciones_ida" +
            " AND hs.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_supervisor_idb" +
            " AND hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida" +
            " AND hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb" +
            " AND u.id = hc.assigned_user_id" +
            " AND hi.deleted = 0" +
            " AND hihsc.deleted = 0" +
            " AND hs.deleted = 0" +
            " AND hshcc.deleted = 0" +
            " AND hc.deleted = 0" +
            " AND u.deleted = 0" +
            " order by hc.name";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            /* pubsub.publish('trigger', instance); */
            cb(err, instance);
        })
    }
    Hanincuadrilla.remoteMethod(
        'CargarHanincuadrillaUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'TipoOt', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    Hanincuadrilla.CargarHanincuadrillaUnaRegionalTodos = (InstalacionID, cb) => {
        var ds = Hanincuadrilla.dataSource
        var sql = " SELECT hc.id,hc.name,upper(u.user_name)as user_name,hc.assigned_user_id as TecnicoID,hc.annual_revenue as TipoOt,hs.assigned_user_id as SupervisorID,hi.iddivision_c,hi.idregion_c" +
            " FROM hanin_instalaciones hi , hanin_instalaciones_hanin_supervisor_c hihsc , hanin_supervisor hs, hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc , users u" +
            " WHERE hi.id = '"+InstalacionID+"'"+
            " AND hi.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_instalaciones_ida" +
            " AND hs.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_supervisor_idb" +
            " AND hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida" +
            " AND hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb" +
            " AND u.id = hc.assigned_user_id" +
            " AND hi.deleted = 0" +
            " AND hihsc.deleted = 0" +
            " AND hs.deleted = 0" +
            " AND hshcc.deleted = 0" +
            " AND hc.deleted = 0" +
            " AND u.deleted = 0" +
            " order by hc.name";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HanincuadrillaEntrante/get', instance);
            cb(err, instance);
        })
    }
    Hanincuadrilla.remoteMethod(
        'CargarHanincuadrillaUnaRegionalTodos',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'InstalacionID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    Hanincuadrilla.CargarHanincuadrillaUnaRegionalSupervisor = (SupervisorID, cb) => {
        var ds = Hanincuadrilla.dataSource
        var sql = " SELECT hc.id,hc.name,upper(u.user_name)as user_name,hc.assigned_user_id as TecnicoID,hs.assigned_user_id as SupervisorID,uc.iddivision_c,uc.idregional_c" +
            " from hanin_cuadrilla hc ,hanin_supervisor_hanin_cuadrilla_c hshcc , hanin_supervisor hs, users u,users_cstm uc" +
            " where hs.assigned_user_id =" + "'" + SupervisorID + "'" +
            " and hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb" +
            " and hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida" +
            " and hc.assigned_user_id = u.id " +
            " and uc.id_c = u.id";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HanincuadrillaEntrante/get', instance);
            cb(err, instance);
        })
    }
    Hanincuadrilla.remoteMethod(
        'CargarHanincuadrillaUnaRegionalSupervisor',
        {
            http: { verb: 'get' },
            accepts: [],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    Hanincuadrilla.CargarHanincuadrillaUnaRegionalTecnico = (CodUsuarioID, cb) => {
        var ds = Hanincuadrilla.dataSource
        var sql = " SELECT hc.id,hc.name,upper(u.user_name)as user_name,hc.assigned_user_id as TecnicoID,hs.assigned_user_id as SupervisorID,uc.iddivision_c,uc.idregional_c" +
            " from hanin_cuadrilla hc ,hanin_supervisor_hanin_cuadrilla_c hshcc , hanin_supervisor hs, users u,users_cstm uc" +
            " where hs.assigned_user_id =" + "'" + SupervisorID + "'" +
            " and hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb" +
            " and hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida" +
            " and hc.assigned_user_id = u.id " +
            " and uc.id_c = u.id";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HanincuadrillaEntrante/get', instance);
            cb(err, instance);
        })
    }
    Hanincuadrilla.remoteMethod(
        'CargarHanincuadrillaUnaRegionalTecnico',
        {
            http: { verb: 'get' },
            accepts: [],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // remote method before hooks
    Hanincuadrilla.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Hanincuadrilla key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Hanincuadrilla.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Hanincuadrilla.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Hanincuadrilla.observe('after save', function (ctx, next) {
        //socket.emit('/Hanincuadrilla/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Hanincuadrilla/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Hanincuadrilla.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Hanincuadrilla.observe('after delete', function (ctx, next) {
        pubsub.publish('/Hanincuadrilla/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Hanincuadrilla.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Hanincuadrilla.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Hanincuadrilla instance:', ctx.instance);
        } else {
            //console.log('About to update Hanincuadrillas that match the query %j:', ctx.where);
        }
        next();
    });
};