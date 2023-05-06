var pubsub = require('../../server/pubsub.js');
module.exports = function (Haninsupervisor) {

    Haninsupervisor.CargarHaninsupervisorUnaRegional = (DivisionID,RegionalID,ProyectoID,cb) => {
        var ds = Haninsupervisor.dataSource
        var sql = "SELECT hs.id ,hs.name,hs.assigned_user_id"+
        " FROM hanin_supervisor hs,hanin_instalaciones hi,project p,hanin_instalaciones_hanin_supervisor_c hihsc,hanin_instalaciones_project_c hipc"+
        " WHERE hs.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_supervisor_idb"+
        " AND hi.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_instalaciones_ida"+ 
        " AND p.id = hipc.hanin_instalaciones_projectproject_ida"+
        " AND hi.id = hipc.hanin_instalaciones_projecthanin_instalaciones_idb"+
        " AND hihsc.deleted = '0'"+
        " AND hi.iddivision_c = "+"'"+DivisionID+"'"+
        " AND idregion_c = "+"'"+RegionalID+"'"+
        " AND p.id = "+"'"+ProyectoID+"'";


        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninsupervisorEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninsupervisor.remoteMethod(
        'CargarHaninsupervisorUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninsupervisor.CargarHaninsupervisor = (DivisionID,RegionalID,ProyectoID,cb) => {
        var ds = Haninsupervisor.dataSource
        var sql = "SELECT hs.id ,hs.name,hs.assigned_user_id"+
        " FROM hanin_supervisor hs,hanin_instalaciones hi,project p,hanin_instalaciones_hanin_supervisor_c hihsc,hanin_instalaciones_project_c hipc"+
        " WHERE hs.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_supervisor_idb"+
        " AND hi.id = hihsc.hanin_instalaciones_hanin_supervisorhanin_instalaciones_ida"+ 
        " AND p.id = hipc.hanin_instalaciones_projectproject_ida"+
        " AND hi.id = hipc.hanin_instalaciones_projecthanin_instalaciones_idb"+
        " AND hihsc.deleted = '0'"+
        " AND hi.iddivision_c = '"+DivisionID+"'"+
        " AND idregion_c in('"+RegionalID+"')"+
        " AND p.id = '"+ProyectoID+"'";


        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninsupervisorEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninsupervisor.remoteMethod(
        'CargarHaninsupervisor',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    // remote method before hooks
    Haninsupervisor.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Haninsupervisor key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Haninsupervisor.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Haninsupervisor.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Haninsupervisor.observe('after save', function (ctx, next) {
        //socket.emit('/Haninsupervisor/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Haninsupervisor/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Haninsupervisor.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Haninsupervisor.observe('after delete', function (ctx, next) {
        pubsub.publish('/Haninsupervisor/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Haninsupervisor.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Haninsupervisor.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Haninsupervisor instance:', ctx.instance);
        } else {
            //console.log('About to update Haninsupervisors that match the query %j:', ctx.where);
        }
        next();
    });
};