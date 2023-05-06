var pubsub = require('../../server/pubsub.js');
module.exports = function (Hanininstalaciones) {

    Hanininstalaciones.CargarHaninproyectosUnaRegional = (UsuarioID,cb) => {
        var ds = Hanininstalaciones.dataSource
        var sql = `select p.id,p.name
        from hanin_permisos hp, hanin_permisos_cstm hpc,users u,project p , hanin_instalaciones_project_c hipc ,hanin_instalaciones hi
        where u.id ='` +UsuarioID+ `'`+
        `and hp.id =hpc.id_c 
        and hp.user_id_c = u.id 
        and hpc.project_id_c = p.id 
        and p.id = hipc.hanin_instalaciones_projectproject_ida 
        and hi.id = hipc.hanin_instalaciones_projecthanin_instalaciones_idb
        and hp.deleted = '0'
        and u.deleted = '0'
        and p.deleted = '0'
        and hipc.deleted = '0'
        and hi.deleted = '0'
        GROUP BY p.id,p.name`;
        
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HanininstalacionesEntrante/get', instance);
            cb(err, instance);
        })
    }
    Hanininstalaciones.remoteMethod(
        'CargarHaninproyectosUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [ 
                { arg: 'UsuarioID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    Hanininstalaciones.CargarHanininstalacionesUnaRegional = (DivisionID,ProyectoID,cb) => {
        var ds = Hanininstalaciones.dataSource
        var sql = "SELECT hi.id,hi.name,hi.idregion_c FROM hanin_instalaciones hi, hanin_instalaciones_project_c hipc,project p"+
        " WHERE iddivision_c ='"+DivisionID+"'"+
        " AND p.id ='"+ProyectoID+"'"+
        " AND hi.id = hipc.hanin_instalaciones_projecthanin_instalaciones_idb"+
        " AND p.id = hipc.hanin_instalaciones_projectproject_ida"+
        " AND p.deleted = 0" +
        " AND hipc.deleted = 0" +
        " AND hi.deleted = 0" +
        " GROUP BY hi.id,hi.name,hi.idregion_c";
        
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HanininstalacionesEntrante/get', instance);
            cb(err, instance);
        })
    }
    Hanininstalaciones.remoteMethod(
        'CargarHanininstalacionesUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [ 
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // remote method before hooks
    Hanininstalaciones.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Hanininstalaciones key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Hanininstalaciones.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Hanininstalaciones.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Hanininstalaciones.observe('after save', function (ctx, next) {
        //socket.emit('/Hanininstalaciones/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Hanininstalaciones/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Hanininstalaciones.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Hanininstalaciones.observe('after delete', function (ctx, next) {
        pubsub.publish('/Hanininstalaciones/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Hanininstalaciones.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Hanininstalaciones.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Hanininstalaciones instance:', ctx.instance);
        } else {
            //console.log('About to update Hanininstalacioness that match the query %j:', ctx.where);
        }
        next();
    });
};