var pubsub = require("../../server/pubsub.js");
module.exports = function (Hanintareasmapatiemporeal) {
  Hanintareasmapatiemporeal.CargarHanintareasmapatiemporealUnaRegional = (
    DivisionID,
    RegionalID,
    Anio,
    Mes,
    Day,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT *FROM hanin_tareas_mapa_tiempo_real" +
      " WHERE YEAR(fecha_inicio_plan) = " +
      Anio +
      " AND MONTH(fecha_inicio_plan) = " +
      Mes +
      " AND DAY(fecha_inicio_plan) = " +
      Day +
      " AND iddivision_c = " +
      "'" +
      DivisionID +
      "'" +
      " AND idregional_c = " +
      "'" +
      RegionalID +
      "'" +
      " ORDER BY fecha_inicio_plan";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      // pubsub.publish('/HanintareasmapatiemporealEntrante/get', instance);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod(
    "CargarHanintareasmapatiemporealUnaRegional",
    {
      http: { verb: "get" },
      accepts: [
        { arg: "DivisionID", type: ["string"] },
        { arg: "RegionalID", type: ["string"] },
        { arg: "Anio", type: ["string"] },
        { arg: "Mes", type: ["string"] },
        { arg: "Dia", type: ["string"] },
      ],
      returns: { arg: "data", type: ["Pedidoreporte"], root: true },
    }
  );
  Hanintareasmapatiemporeal.HaninTareaEntrante = (TareaID, cb) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT *FROM hanin_tareas_mapa_tiempo_real" +
      " WHERE TareaID = " +
      "'" +
      TareaID +
      "'";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      pubsub.publish("HANIN_TAREA_ENTRANTE_TIEMPO_REAL", instance);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("HaninTareaEntrante", {
    http: { verb: "get" },
    accepts: [{ arg: "VisitaID", type: ["string"] }],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTareaTotalModal = (
    CodUsuario,
    DivisionID,
    RegionalID,
    Anio,
    Mes,
    Dia,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT 'Total'as status,COUNT(TareaID) as count" +
      " FROM hanin_tareas_mapa_tiempo_real htmtr" +
      " WHERE YEAR(fecha_inicio_plan )=" +
      Anio +
      " AND MONTH(fecha_inicio_plan )=" +
      Mes +
      " AND DAY(fecha_inicio_plan )=" +
      Dia +
      " AND iddivision_c = " +
      "'" +
      DivisionID +
      "'" +
      " AND idregional_c = " +
      "'" +
      RegionalID +
      "'" +
      " AND user_name IN('" +
      CodUsuario +
      "')";
    console.log(sql);

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTareaTotalModal", {
    http: { verb: "get" },
    accepts: [
      { arg: "CodUsuario", type: ["string"] },
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionalID", type: ["string"] },
      { arg: "Anio", type: ["string"] },
      { arg: "Mes", type: ["string"] },
      { arg: "Dia", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTareaInstalacionModal = (
    CodUsuario,
    DivisionID,
    RegionalID,
    Anio,
    Mes,
    Dia,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT tipotarea_c,COUNT(TareaID) as count" +
      " FROM hanin_tareas_mapa_tiempo_real htmtr" +
      " WHERE YEAR(fecha_inicio_plan )=" +
      Anio +
      " AND MONTH(fecha_inicio_plan )=" +
      Mes +
      " AND DAY(fecha_inicio_plan )=" +
      Dia +
      " AND tipotarea_c = 'Instalacion'" +
      " AND iddivision_c = " +
      "'" +
      DivisionID +
      "'" +
      " AND idregional_c = " +
      "'" +
      RegionalID +
      "'" +
      " AND user_name IN('" +
      CodUsuario +
      "')" +
      " GROUP BY tipotarea_c";
    console.log(sql);

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTareaInstalacionModal", {
    http: { verb: "get" },
    accepts: [
      { arg: "CodUsuario", type: ["string"] },
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionalID", type: ["string"] },
      { arg: "Anio", type: ["string"] },
      { arg: "Mes", type: ["string"] },
      { arg: "Dia", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTareaInspeccionModal = (
    CodUsuario,
    DivisionID,
    RegionalID,
    Anio,
    Mes,
    Dia,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT tipotarea_c,COUNT(TareaID) as count" +
      " FROM hanin_tareas_mapa_tiempo_real htmtr" +
      " WHERE YEAR(fecha_inicio_plan )=" +
      Anio +
      " AND MONTH(fecha_inicio_plan )=" +
      Mes +
      " AND DAY(fecha_inicio_plan )=" +
      Dia +
      " AND tipotarea_c = 'Inspeccion'" +
      " AND iddivision_c = " +
      "'" +
      DivisionID +
      "'" +
      " AND idregional_c = " +
      "'" +
      RegionalID +
      "'" +
      " AND user_name IN('" +
      CodUsuario +
      "')" +
      " GROUP BY tipotarea_c";
    console.log(sql);

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTareaInspeccionModal", {
    http: { verb: "get" },
    accepts: [
      { arg: "CodUsuario", type: ["string"] },
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionalID", type: ["string"] },
      { arg: "Anio", type: ["string"] },
      { arg: "Mes", type: ["string"] },
      { arg: "Dia", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.TareasPorVisita = (VisitaID, cb) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "SELECT *" +
      " FROM hanin_tareas_mapa_tiempo_real htmtr" +
      " WHERE VisitaID = " +
      "'" +
      VisitaID +
      "'";
    console.log(sql);

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("TareasPorVisita", {
    http: { verb: "get" },
    accepts: [{ arg: "VisitaID", type: ["string"] }],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.FotosPorVisita = (VisitaID, cb) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select hv.id as VisitaID,t.id TareaID,hf.id FotoID,hf.name,hf.description,tc.tipotarea_c,hf.tipo_documento_c,hf.tipo_foto_c" +
      " FROM hanin_visita hv,tasks t ,hanin_fotos hf,tasks_cstm tc " +
      " WHERE hv.id = " +
      "'" +
      VisitaID +
      "'" +
      " and hv.id = t.parent_id" +
      " and hf.parent_id = t.id" +
      " and t.id = tc.id_c ";

    console.log(sql);

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("FotosPorVisita", {
    http: { verb: "get" },
    accepts: [{ arg: "VisitaID", type: ["string"] }],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTiempoInspeccion = (
    DivisionID,
    RegionID,
    SupervisorID,
    FechaIni,
    FechaFin,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select hs.id,user_name,COUNT(TareaID ) as cantidad_tareas,MIN(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))as duracion_minima,MAX(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))as duracion_maxima,SUM(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))/COUNT(TareaID )as duracion_promedio" +
      " from hanin_tareas_mapa_tiempo_real htmtr,hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr" +
      " where hs.id in ('" +
      SupervisorID +
      "') and" +
      " htmtr.fecha_inicio_plan >= '" +
      FechaIni +
      "' AND" +
      " htmtr.fecha_inicio_plan <='" +
      FechaFin +
      "' AND" +
      " hvmtr.DivisionID ='" +
      DivisionID +
      "'and" +
      " hvmtr.RegionID in('" +
      RegionID +
      "') and" +
      " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
      " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
      " hvmtr.assigned_user_id = hc.assigned_user_id and" +
      " htmtr.parent_id = hvmtr.VisitaID and" +
      " hs.deleted =0 and" +
      " hshcc.deleted =0 and" +
      " hc.deleted =0 and" +
      " fecha_inicio_real_c <>'1900-01-01 00:00:00'and" +
      " fecha_fin_real_c  <> '1900-01-01 00:00:00'and" +
      " tipotarea_c ='01'" +
      " group by user_name,hs.id" +
      " ORDER by user_name";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTiempoInspeccion", {
    http: { verb: "get" },
    accepts: [
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionID", type: ["string"] },
      { arg: "SupervisorID", type: ["string"] },
      { arg: "FechaIni", type: ["string"] },
      { arg: "FechaFin", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTiempoInstalacion = (
    DivisionID,
    RegionID,
    SupervisorID,
    FechaIni,
    FechaFin,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select user_name,COUNT(TareaID ) as cantidad_tareas,MIN(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))as duracion_minima,MAX(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))as duracion_maxima,SUM(DATEDIFF(minute,fecha_inicio_real_c,fecha_fin_real_c ))/COUNT(TareaID )as duracion_promedio" +
      " from hanin_tareas_mapa_tiempo_real htmtr,hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr" +
      " where hs.id in ('" +
      SupervisorID +
      "') and" +
      " htmtr.fecha_inicio_plan >= '" +
      FechaIni +
      "' AND " +
      " htmtr.fecha_inicio_plan <='" +
      FechaFin +
      "' AND" +
      " hvmtr.DivisionID ='" +
      DivisionID +
      "'and " +
      " hvmtr.RegionID in('" +
      RegionID +
      "') and" +
      " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
      " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
      " hvmtr.assigned_user_id = hc.assigned_user_id and" +
      " htmtr.parent_id = hvmtr.VisitaID and" +
      " hs.deleted =0 and" +
      " hshcc.deleted =0 and" +
      " hc.deleted =0 and" +
      " fecha_inicio_real_c <>'1900-01-01 00:00:00'and" +
      " fecha_fin_real_c  <> '1900-01-01 00:00:00'and" +
      " tipotarea_c ='02'" +
      " group by user_name" +
      " ORDER by user_name";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTiempoInstalacion", {
    http: { verb: "get" },
    accepts: [
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionID", type: ["string"] },
      { arg: "SupervisorID", type: ["string"] },
      { arg: "FechaIni", type: ["string"] },
      { arg: "FechaFin", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorTareasporCuadrilla = (
    DivisionID,
    RegionID,
    SupervisorID,
    FechaIni,
    FechaFin,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select user_name,COUNT(TareaID)as cantidad,case when tipotarea_c ='01' then 'Inspeccion' when tipotarea_c ='02' then 'Instalacion' END as tipotarea_c" +
      " FROM hanin_tareas_mapa_tiempo_real htmtr,hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr" +
      " where hs.id in ('" +
      SupervisorID +
      "') and" +
      " htmtr.fecha_inicio_plan >= '" +
      FechaIni +
      "' AND " +
      " htmtr.fecha_inicio_plan <='" +
      FechaFin +
      "' AND" +
      " hvmtr.DivisionID ='" +
      DivisionID +
      "'and " +
      " hvmtr.RegionID in('" +
      RegionID +
      "') and" +
      " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
      " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
      " hvmtr.assigned_user_id = hc.assigned_user_id and" +
      " htmtr.parent_id = hvmtr.VisitaID and" +
      " hs.deleted =0 and" +
      " hshcc.deleted =0 and" +
      " hc.deleted =0" +
      " group BY user_name,tipotarea_c" +
      " ORDER by user_name";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorTareasporCuadrilla", {
    http: { verb: "get" },
    accepts: [
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionID", type: ["string"] },
      { arg: "SupervisorID", type: ["string"] },
      { arg: "FechaIni", type: ["string"] },
      { arg: "FechaFin", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorC1 = (
    DivisionID,
    RegionID,
    SupervisorID,
    FechaIni,
    FechaFin,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select SUM(DATEDIFF(MINUTE ,fecha_inicio_real_c,fecha_fin_real_c ))/COUNT(TareaID )as duracion_promedio" +
      " from hanin_tareas_mapa_tiempo_real htmtr,hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr" +
      " where hs.id in ('" +
      SupervisorID +
      "') and" +
      " htmtr.fecha_inicio_plan >= '" +
      FechaIni +
      "' AND " +
      " htmtr.fecha_inicio_plan <= '" +
      FechaFin +
      "' AND" +
      " hvmtr.DivisionID ='" +
      DivisionID +
      "'and " +
      " hvmtr.RegionID in('" +
      RegionID +
      "') and" +
      " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
      " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
      " hvmtr.assigned_user_id = hc.assigned_user_id and" +
      " hs.deleted =0 and" +
      " hshcc.deleted =0 and" +
      " hc.deleted =0 and" +
      " fecha_inicio_real_c <>'1900-01-01 00:00:00'and" +
      " fecha_fin_real_c  <> '1900-01-01 00:00:00'and" +
      " tipotarea_c ='02'";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorC1", {
    http: { verb: "get" },
    accepts: [
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionID", type: ["string"] },
      { arg: "SupervisorID", type: ["string"] },
      { arg: "FechaIni", type: ["string"] },
      { arg: "FechaFin", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.IndicadorC2 = (
    DivisionID,
    RegionID,
    SupervisorID,
    FechaIni,
    FechaFin,
    cb
  ) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "select SUM(DATEDIFF(MINUTE ,fecha_inicio_real_c,fecha_fin_real_c ))/COUNT(TareaID )as duracion_promedio" +
      " from hanin_tareas_mapa_tiempo_real htmtr,hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr" +
      " where hs.id in ('" +
      SupervisorID +
      "') and" +
      " htmtr.fecha_inicio_plan >= DATEADD(MONTH, -3, '" +
      FechaFin +
      "') and" +
      " hvmtr.DivisionID ='" +
      DivisionID +
      "'and " +
      " hvmtr.RegionID in('" +
      RegionID +
      "') and" +
      " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
      " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
      " hvmtr.assigned_user_id = hc.assigned_user_id and" +
      " hs.deleted =0 and" +
      " hshcc.deleted =0 and" +
      " hc.deleted =0 and" +
      " fecha_inicio_real_c <>'1900-01-01 00:00:00'and" +
      " fecha_fin_real_c  <> '1900-01-01 00:00:00'and" +
      " tipotarea_c ='02'";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("IndicadorC2", {
    http: { verb: "get" },
    accepts: [
      { arg: "DivisionID", type: ["string"] },
      { arg: "RegionID", type: ["string"] },
      { arg: "SupervisorID", type: ["string"] },
      { arg: "FechaIni", type: ["string"] },
      { arg: "FechaFin", type: ["string"] },
    ],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////
  Hanintareasmapatiemporeal.ActualizarInsertarBasedeDatos = (TareaID, cb) => {
    var ds = Hanintareasmapatiemporeal.dataSource;
    var sql =
      "Exec hsp_hanin_tareas_cargar_mapa_tiempo_real" + "'" + TareaID + "'";

    ds.connector.query(sql, (err, instance) => {
      if (err) console.error(err);
      cb(err, instance);
    });
  };
  Hanintareasmapatiemporeal.remoteMethod("ActualizarInsertarBasedeDatos", {
    http: { verb: "get" },
    accepts: [{ arg: "TareaID", type: ["string"] }],
    returns: { arg: "data", type: ["Pedidoreporte"], root: true },
  });
  /////////////////////////////////////////////////////////////////////////////////

  // remote method before hooks
  Hanintareasmapatiemporeal.beforeRemote("revEngine", function (
    context,
    unused,
    next
  ) {
    //console.log('Putting in the Hanintareasmapatiemporeal key, starting the engine.');
    next();
  });

  // afterInitialize is a model hook which is still used in loopback
  Hanintareasmapatiemporeal.afterInitialize = function () {
    // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
    //console.log('> afterInitialize triggered');
  };

  // the rest are all operation hooks
  // - http://docs.strongloop.com/display/public/LB/Operation+hooks
  Hanintareasmapatiemporeal.observe("before save", function (ctx, next) {
    // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
    next();
  });
  Hanintareasmapatiemporeal.observe("after save", function (ctx, next) {
    //socket.emit('/Hanintareasmapatiemporeal/POST',ctx.instance);
    pubsub.publish("VisitaEntranteFirebase", ctx.instance || ctx.data);
    // pubsub.publish('/Hanintareasmapatiemporeal/POST', ctx.where.id);
    // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
    // console.log(ctx.instance || ctx.data)
    next();
  });
  Hanintareasmapatiemporeal.observe("before delete", function (ctx, next) {
    // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
    next();
  });
  Hanintareasmapatiemporeal.observe("after delete", function (ctx, next) {
    pubsub.publish(
      "/Hanintareasmapatiemporeal/DELETE",
      ctx.instance || ctx.where
    );
    // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
    next();
  });

  // remote method after hook
  Hanintareasmapatiemporeal.afterRemote("revEngine", function (
    context,
    remoteMethodOutput,
    next
  ) {
    //console.log('Turning off the engine, removing the key.');
    next();
  });

  // model operation hook
  Hanintareasmapatiemporeal.observe("before save", function (ctx, next) {
    if (ctx.instance) {
      //console.log('About to save a Hanintareasmapatiemporeal instance:', ctx.instance);
    } else {
      //console.log('About to update Hanintareasmapatiemporeals that match the query %j:', ctx.where);
    }
    next();
  });
};
