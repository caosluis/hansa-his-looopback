var pubsub = require('../../server/pubsub.js');

module.exports = function (Haninvisitasmapatiemporeal) {

    Haninvisitasmapatiemporeal.CargarHaninvisitasmapatiemporealUnaRegional = (DivisionID, RegionalID, ProyectoID, Anio, Mes, Day, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT *FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = " + Anio + " AND MONTH(fecha_inicio_plan) = " + Mes + " AND DAY(fecha_inicio_plan) = " + Day +
            " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " ORDER BY fecha_inicio_plan";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitasmapatiemporealEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'CargarHaninvisitasmapatiemporealUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.CargarHaninvisitasmapatiemporealUnaRegionalSupervisor = (DivisionID, RegionalID, InstalacionID, TipoOt, Anio, Mes, Day, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT *FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = " + Anio + " AND MONTH(fecha_inicio_plan) = " + Mes + " AND DAY(fecha_inicio_plan) = " + Day +
            " AND DivisionID = '" + DivisionID + "'" +
            " AND RegionID = '" + RegionalID + "'" +
            " AND InstalacionID = '" + InstalacionID + "'" +
            " AND TipoOt like '%" + TipoOt + "%'" +
            " ORDER BY fecha_inicio_plan";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitasmapatiemporealEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'CargarHaninvisitasmapatiemporealUnaRegionalSupervisor',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'TipoOt', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.CargarHaninvisitasmapatiemporealUnaRegionalSupervisorTodos = (DivisionID, RegionalID, InstalacionID, Anio, Mes, Day, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT *FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = " + Anio + " AND MONTH(fecha_inicio_plan) = " + Mes + " AND DAY(fecha_inicio_plan) = " + Day +
            " AND DivisionID = '" + DivisionID + "'" +
            " AND RegionID = '" + RegionalID + "'" +
            " AND InstalacionID = '" + InstalacionID + "'" +
            " ORDER BY fecha_inicio_plan";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitasmapatiemporealEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'CargarHaninvisitasmapatiemporealUnaRegionalSupervisorTodos',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.CargarHaninvisitasmapatiemporealUnaRegionalTecnico = (DivisionID, RegionalID, CodUsuarioID, ProyectoID, Anio, Mes, Day, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT *FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = " + Anio + " AND MONTH(fecha_inicio_plan) = " + Mes + " AND DAY(fecha_inicio_plan) = " + Day +
            " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND assigned_user_id = " + "'" + CodUsuarioID + "'" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " ORDER BY fecha_inicio_plan";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            // pubsub.publish('/HaninvisitasmapatiemporealEntrante/get', instance);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'CargarHaninvisitasmapatiemporealUnaRegionalTecnico',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'CodUsuarioID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.HaninVisitaEntrante = (VisitaID, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT *FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE VisitaID = " + "'" + VisitaID + "'";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            pubsub.publish('HANIN_VISITA_ENTRANTE_TIEMPO_REAL', instance);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'HaninVisitaEntrante',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'VisitaID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.HaninVisitasIndicadorTotalPanelIzquierdoTodos = (DivisionID, RegionalID, InstalacionID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT assigned_user_id,COUNT(visitaID) AS COUNT" +
            " FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan)=" + Anio + " AND MONTH(fecha_inicio_plan)=" + Mes + " AND DAY(fecha_inicio_plan)=" + Dia +
            " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND InstalacionID = " + "'" + InstalacionID + "'" +
            " GROUP BY assigned_user_id ";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'HaninVisitasIndicadorTotalPanelIzquierdoTodos',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.VisitasCreadas = (InstalacionID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT assigned_user_id,COUNT(visitaID) AS COUNT" +
            " FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = '" + Anio + "' AND MONTH(fecha_inicio_plan) = '" + Mes + "' AND DAY(fecha_inicio_plan) = '" + Dia + "'" +
            " AND InstalacionID = '" + InstalacionID + "'" +
            " GROUP BY assigned_user_id ";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'VisitasCreadas',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.VisitasFinalizadas = (InstalacionID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT assigned_user_id,COUNT(visitaID) AS COUNT" +
            " FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan)='" + Anio + "' AND MONTH(fecha_inicio_plan)='" + Mes + "' AND DAY(fecha_inicio_plan)='" + Dia + "'" +
            " AND InstalacionID = '" + InstalacionID + "'" +
            " AND Estado = 'Finalizado'" +
            " GROUP BY assigned_user_id ";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'VisitasFinalizadas',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.HaninVisitasIndicadorParcialPanelIzquierdoTodos = (DivisionID, RegionalID, InstalacionID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT hc.assigned_user_id,Count(hvmtr.VisitaID) AS COUNT" +
            " FROM hanin_cuadrilla hc" +
            " LEFT OUTER JOIN hanin_visitas_mapa_tiempo_real hvmtr ON hvmtr.assigned_user_id = hc.assigned_user_id" +
            " AND Estado = 'Finalizado'" +
            " AND DivisionID = '" + DivisionID + "'" +
            " AND RegionID = '" + RegionalID + "'" +
            " AND InstalacionID = '" + InstalacionID + "'" +
            " AND YEAR(fecha_inicio_plan)=" + Anio + " AND MONTH(fecha_inicio_plan)=" + Mes + " AND DAY(fecha_inicio_plan )=" + Dia +
            " AND hc.deleted ='0'" +
            " GROUP BY hc.assigned_user_id";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'HaninVisitasIndicadorParcialPanelIzquierdoTodos',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'InstalacionID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorVisitaTotalModal = (CodUsuario, DivisionID, RegionalID, ProyectoID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT 'Total'as Estado,COUNT(VisitaID) as count" +
            " FROM hanin_visitas_mapa_tiempo_real hvmtr" +
            " WHERE YEAR(fecha_inicio_plan )=" + Anio + " AND MONTH(fecha_inicio_plan )=" + Mes + " AND DAY(fecha_inicio_plan )=" + Dia +
            " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND CodUsuario IN('" + CodUsuario + "')" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " GROUP BY Estado";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorVisitaTotalModal',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'CodUsuario', type: ['string'] },
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorVisitaFinalizadoModal = (CodUsuario, DivisionID, RegionalID, ProyectoID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT 'Total'as Estado,COUNT(VisitaID) as count" +
            " FROM hanin_visitas_mapa_tiempo_real hvmtr" +
            " WHERE YEAR(fecha_inicio_plan )=" + Anio + " AND MONTH(fecha_inicio_plan )=" + Mes + " AND DAY(fecha_inicio_plan )=" + Dia +
            " AND Estado = 'Finalizado'"
        " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND CodUsuario IN('" + CodUsuario + "')" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " GROUP BY Estado";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorVisitaFinalizadoModal',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'CodUsuario', type: ['string'] },
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorVisitaEnProgresoModal = (CodUsuario, DivisionID, RegionalID, ProyectoID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT 'Total'as Estado,COUNT(VisitaID) as count" +
            " FROM hanin_visitas_mapa_tiempo_real hvmtr" +
            " WHERE YEAR(fecha_inicio_plan )=" + Anio + " AND MONTH(fecha_inicio_plan )=" + Mes + " AND DAY(fecha_inicio_plan )=" + Dia +
            " AND Estado = 'En Progreso'"
        " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND CodUsuario IN('" + CodUsuario + "')" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " GROUP BY Estado";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorVisitaEnProgresoModal',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'CodUsuario', type: ['string'] },
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorVisitaNuevoModal = (CodUsuario, DivisionID, RegionalID, ProyectoID, Anio, Mes, Dia, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT 'Total'as Estado,COUNT(VisitaID) as count" +
            " FROM hanin_visitas_mapa_tiempo_real hvmtr" +
            " WHERE YEAR(fecha_inicio_plan )=" + Anio + " AND MONTH(fecha_inicio_plan )=" + Mes + " AND DAY(fecha_inicio_plan )=" + Dia +
            " AND Estado = 'Nuevo'"
        " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND CodUsuario IN('" + CodUsuario + "')" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " GROUP BY Estado";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorVisitaNuevoModal',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'CodUsuario', type: ['string'] },
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.ActualizarInsertarBasedeDatos = (VisitaID, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "Exec hsp_hanin_visitas_cargar_mapa_tiempo_real" + "'" + VisitaID + "'";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'ActualizarInsertarBasedeDatos',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'VisitaID', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.CargarHaninOtmapatiemporealUnaRegional = (DivisionID, RegionalID, ProyectoID, Anio, Mes, Day, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT DISTINCT Ot" +
            " FROM hanin_visitas_mapa_tiempo_real" +
            " WHERE YEAR(fecha_inicio_plan) = " + Anio + " AND MONTH(fecha_inicio_plan) = " + Mes + " AND DAY(fecha_inicio_plan) = " + Day +
            " AND DivisionID = " + "'" + DivisionID + "'" +
            " AND RegionID = " + "'" + RegionalID + "'" +
            " AND ProyectoID = " + "'" + ProyectoID + "'" +
            " ORDER BY Ot";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'CargarHaninOtmapatiemporealUnaRegional',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionalID', type: ['string'] },
                { arg: 'ProyectoID', type: ['string'] },
                { arg: 'Anio', type: ['string'] },
                { arg: 'Mes', type: ['string'] },
                { arg: 'Dia', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorA1 = (DivisionID, RegionID, SupervisorID, FechaIni, FechaFin, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "select t.TotalTask, t.Completed, round(" +
            " (cast(t.Completed as float) / cast(t.TotalTask as float)) * 100,0)as CompletedPercentage" +
            " from (" +
            " select count(hvmtr.VisitaID) as TotalTask" +
            " , sum(case Estado when 'Finalizado' then 1 else 0 end) as Completed" +
            " FROM hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr " +
            " WHERE hs.id in ('" + SupervisorID + "') and" +
            " hvmtr.DivisionID ='" + DivisionID + "'and " +
            " hvmtr.RegionID in('" + RegionID + "') and" +
            " hvmtr.fecha_inicio_plan >= '" + FechaIni + "' AND " +
            " hvmtr.fecha_inicio_plan <='" + FechaFin + "' AND" +
            " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
            " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
            " hvmtr.assigned_user_id = hc.assigned_user_id and" +
            " hs.deleted =0 and" +
            " hshcc.deleted =0 and" +
            " hc.deleted =0 " +
            " ) as t;";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorA1',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionID', type: ['string'] },
                { arg: 'SupervisorID', type: ['string'] },
                { arg: 'FechaIni', type: ['string'] },
                { arg: 'FechaFin', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorA2 = (DivisionID, RegionID, SupervisorID, FechaFin, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "select t.TotalTask/3 TotalTask, t.Completed/3 Completed, round(" +
            " (cast(t.Completed as float) / cast(t.TotalTask as float)) * 100,0) as CompletedPercentage" +
            " from(" +
            "select count(hvmtr.VisitaID) as TotalTask" +
            " ,sum(case Estado when 'Finalizado' then 1 else 0 end) as Completed" +
            " FROM hanin_supervisor hs, hanin_supervisor_hanin_cuadrilla_c hshcc, hanin_cuadrilla hc, hanin_visitas_mapa_tiempo_real hvmtr " +
            " WHERE hs.id in ('" + SupervisorID + "') and" +
            " fecha_inicio_plan >= DATEADD(MONTH, -3, '" + FechaFin + "') AND" +
            " hvmtr.DivisionID = '" + DivisionID + "'and " +
            " hvmtr.RegionID in ('" + RegionID + "') and" +
            " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
            " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
            "  hvmtr.assigned_user_id = hc.assigned_user_id and" +
            " hs.deleted = 0 and" +
            " hshcc.deleted = 0 and" +
            " hc.deleted = 0" +
            ") as t; ";
        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorA2',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionID', type: ['string'] },
                { arg: 'SupervisorID', type: ['string'] },
                { arg: 'FechaFin', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorD1 = (DivisionID, RegionID, SupervisorID, FechaIni, FechaFin, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT hvmtr.VisitaID" +
            " FROM hanin_supervisor hs, hanin_supervisor_hanin_cuadrilla_c hshcc, hanin_cuadrilla hc, hanin_visitas_mapa_tiempo_real hvmtr" +
            " WHERE hs.id in ('" + SupervisorID + "') and" +
            " Estado = 'Nuevo' AND" +
            " hvmtr.fecha_inicio_plan >= '" + FechaIni + "' AND" +
            " hvmtr.fecha_inicio_plan <= '" + FechaFin + "' AND" +
            " hvmtr.DivisionID = '" + DivisionID + "' and" +
            " hvmtr.RegionID in ('" + RegionID + "') and" +
            " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
            " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and" +
            " hvmtr.assigned_user_id = hc.assigned_user_id and" +
            " hs.deleted = 0 and" +
            " hshcc.deleted = 0 and" +
            " hc.deleted = 0 ";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorD1',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionID', type: ['string'] },
                { arg: 'SupervisorID', type: ['string'] },
                { arg: 'FechaIni', type: ['string'] },
                { arg: 'FechaFin', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.IndicadorD2 = (DivisionID, RegionID, SupervisorID, FechaIni, FechaFin, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = "SELECT hvmtr.VisitaID" +
            " FROM hanin_supervisor hs,hanin_supervisor_hanin_cuadrilla_c hshcc ,hanin_cuadrilla hc,hanin_visitas_mapa_tiempo_real hvmtr " +
            " WHERE hs.id in ('" + SupervisorID + "') and" +
            " Estado <> 'Finalizado' AND" +
            " hvmtr.fecha_inicio_plan >= '" + FechaIni + "'  AND " +
            " hvmtr.fecha_inicio_plan <= '" + FechaFin + "' AND" +
            " hvmtr.DivisionID ='" + DivisionID + "'and " +
            " hvmtr.RegionID in('" + RegionID + "') and" +
            " hs.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_supervisor_ida and" +
            " hc.id = hshcc.hanin_supervisor_hanin_cuadrillahanin_cuadrilla_idb and " +
            " hvmtr.assigned_user_id = hc.assigned_user_id and" +
            " hs.deleted =0 and" +
            " hshcc.deleted =0 and" +
            " hc.deleted =0 ";

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'IndicadorD2',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'DivisionID', type: ['string'] },
                { arg: 'RegionID', type: ['string'] },
                { arg: 'SupervisorID', type: ['string'] },
                { arg: 'FechaIni', type: ['string'] },
                { arg: 'FechaFin', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.DashboardIncidentesFrecuencia = (cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = `SELECT COUNT(*)as CantidadPorMotivo,MotivoVisita 
                    FROM hanin_visitas_mapa_tiempo_real hvmtr
                    WHERE TipoOt ='02'
                    GROUP BY MotivoVisita`;

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'DashboardIncidentesFrecuencia',
        {
            http: { verb: 'get' },
            accepts: [],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.DashboardIncidentesMes = (FechaIni, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = `SELECT COUNT(*) as 'Visitas', MONTH(fecha_inicio_plan) AS 'Mes'
        FROM hanin_visitas_mapa_tiempo_real hvmtr
        WHERE fecha_inicio_plan >= DATEADD(MONTH, -3, '`+ FechaIni + `')
        AND TipoOt ='02'
        GROUP BY MONTH(fecha_inicio_plan)
        ORDER BY MONTH(fecha_inicio_plan) desc
        `;

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'DashboardIncidentesMes',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'FechaIni', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.TarjetaOt = (Ot, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = `SELECT*
        FROM hanin_visitas_mapa_tiempo_real hvmtr 
        WHERE Ot ='`+ Ot + `'
        AND TipoOt ='02'
        order by fecha_final_plan desc 
        `;

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'TarjetaOt',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'Ot', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    Haninvisitasmapatiemporeal.TarjetaOtInstalacion = (Ot, cb) => {
        var ds = Haninvisitasmapatiemporeal.dataSource
        var sql = `SELECT*
        FROM hanin_visitas_mapa_tiempo_real hvmtr 
        WHERE Ot ='`+ Ot + `'
        AND TipoOt ='01'
        order by fecha_final_plan desc 
        `;

        ds.connector.query(sql, (err, instance) => {

            if (err) console.error(err);
            cb(err, instance);
        })
    }
    Haninvisitasmapatiemporeal.remoteMethod(
        'TarjetaOtInstalacion',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'Ot', type: ['string'] }
            ],
            returns: { arg: 'data', type: ['Pedidoreporte'], root: true }
        }
    )
    /////////////////////////////////////////////////////////////////////////////////
    // remote method before hooks
    Haninvisitasmapatiemporeal.beforeRemote('revEngine', function (context, unused, next) {
        //console.log('Putting in the Haninvisitasmapatiemporeal key, starting the engine.');
        next();
    });

    // afterInitialize is a model hook which is still used in loopback
    Haninvisitasmapatiemporeal.afterInitialize = function () {
        // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
        //console.log('> afterInitialize triggered');
    };

    // the rest are all operation hooks
    // - http://docs.strongloop.com/display/public/LB/Operation+hooks
    Haninvisitasmapatiemporeal.observe('before save', function (ctx, next) {
        // console.log('> before save triggered:', ctx.Model.modelName, ctx.instance || ctx.data);
        next();
    });
    Haninvisitasmapatiemporeal.observe('after save', function (ctx, next) {
        //socket.emit('/Haninvisitasmapatiemporeal/POST',ctx.instance);
        pubsub.publish('VisitaEntranteFirebase', ctx.instance || ctx.data);
        // pubsub.publish('/Haninvisitasmapatiemporeal/POST', ctx.where.id);
        // console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
        // console.log(ctx.instance || ctx.data)
        next();
    });
    Haninvisitasmapatiemporeal.observe('before delete', function (ctx, next) {
        // console.log('> before delete triggered:', ctx.Model.modelName, ctx.instance);
        next();
    });
    Haninvisitasmapatiemporeal.observe('after delete', function (ctx, next) {
        pubsub.publish('/Haninvisitasmapatiemporeal/DELETE', (ctx.instance || ctx.where));
        // console.log('> after delete triggered:', ctx.Model.modelName, (ctx.instance || ctx.where));
        next();
    });

    // remote method after hook
    Haninvisitasmapatiemporeal.afterRemote('revEngine', function (context, remoteMethodOutput, next) {
        //console.log('Turning off the engine, removing the key.');
        next();
    });

    // model operation hook
    Haninvisitasmapatiemporeal.observe('before save', function (ctx, next) {
        if (ctx.instance) {
            //console.log('About to save a Haninvisitasmapatiemporeal instance:', ctx.instance);
        } else {
            //console.log('About to update Haninvisitasmapatiemporeals that match the query %j:', ctx.where);
        }
        next();
    });
};