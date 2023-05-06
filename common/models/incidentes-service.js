var https = require("https");

module.exports = function (Incidentesservice) {
/*   Incidentesservice.ActualizaIncidentes = function (IdIncidente, Estado, cb) {
    var objeto = {
      IdIncidente: IdIncidente,
      Estado: Estado,
    };

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    instance
      .post("https://docker.hansa.com.bo:7017/api/incidentes", objeto)
      .then((res) => {
      })
      .catch((error) => {
        console.error(error);
      });

    var response = "Incidente Actualizado";
    cb(null, response);
  };
  Incidentesservice.remoteMethod("ActualizaIncidentes", {
    http: {
      path: "/ActualizaIncidentes",
      verb: "post",
    },
    accepts: [
      { arg: "IdIncidente", type: "string" },
      { arg: "Estado", type: "string" },
    ],
    returns: {
      arg: "status",
      type: "string",
    },
  }); */
};
