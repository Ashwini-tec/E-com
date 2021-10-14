const controller = require("../../controller/joinUsController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "join us our team router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/joinUs',
          config: controller.joinUsDetail
        },
        {
          method: 'GET',
          path: '/joinUs',
          config: controller.joinUsDetailFetchAll
        },
        {
          method: 'DELETE',
          path: '/joinUs/{id}',
          config: controller.deleteJoinUsDeatil
        }
      ]
    )
  }
};
