exports.getVillain = function(villain_id) {
  console.log("villains.getVillain: "+villain_id);
  var all_villains = getAllDatabaseRows();
  for(var i=1; i<all_villains.length; i++){
    var u = all_villains[i].split(',');
    if(u[0].trim()==villain_id.trim()){
      villain={
        name:u[0].trim(),
        games_played:u[1].trim(),
        lost:u[2].trim(),
        won:u[3].trim(),
      }
    }
  }
  return villain;
}

exports.updateVillain = function(villain_id, new_info) {
  console.log("villains.getVillain");
  var villain={
    name:"test"
  };
  return villain;
}
