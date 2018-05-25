let MD5 = require('../utils/md5.js');

function sign(signdata, API_CODE){
      var signdata = signdata;
      var info_data = sort(signdata) + 'key=' + API_CODE;
      console.log(info_data)
      info_data = MD5.hexMD5(info_data).toUpperCase();
      return info_data;
}
function sort(signdata){
      var sdic = Object.keys(signdata).sort();
      var return_data='';
      for (var ki in sdic) {
            return_data = return_data + sdic[ki] + "=" + signdata[sdic[ki]] + '&'
      }
      return return_data;
}
module.exports={
      sign,
}