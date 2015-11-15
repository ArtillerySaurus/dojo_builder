function CrossConnector() {

  // Make functions public here.
  this.getRoomName = getRoomName;
  this.getRoomResources = getRoomResources;
  this.getRoomDimensions = getRoomDimensions;
  this.getPosition = getPosition;
  this.setPosition = setPosition;
  this.getPrerequisites = getPrerequisites;
  this.getMaxRoomInstances = getMaxRoomInstances;
  this.getPrebuild = getPrebuild;
  this.setPrebuild = setPrebuild;
  this.setListPosition = setListPosition;
  this.getListPosition = getListPosition;

  var name = "CrossConnector";
  var dimensions = {width: 32, height: 32};
  var position = {x: 32, y: 32};
  var prerequisites = []; // Leave empty for none.
  var maxRoomInstances = 0;
  var doors = [{x: 0, y: 0}, {x: 0, y: 0}]; // For each door a new object witht he location of the door?

  // Resource list.
  var ghostTierResources = {
    credits: 500,
    salvage: 650,
    ferrite: 350,
    nanoSpores: 1200,
    forma: 1,
    capacity: -10,
    energy: -3
  };

  var shadowTierResources = {
    credits: 1500,
    salvage: 1950,
    ferrite: 1050,
    nanoSpores: 3600,
    forma: 1,
    capacity: -10,
    energy: -3
  };

  var stormTierResources = {
    credits: 5000,
    salvage: 6500,
    ferrite: 3500,
    nanoSpores: 12000,
    forma: 1,
    capacity: -10,
    energy: -3
  };

  var mountainTierResources = {
    credits: 15000,
    salvage: 19500,
    ferrite: 10500,
    nanoSpores: 36000,
    forma: 1,
    capacity: -10,
    energy: -3
  };

  var moonTierResources = {
    credits: 50000,
    salvage: 65000,
    ferrite: 35000,
    nanoSpores: 120000,
    forma: 1,
    capacity: -10,
    energy: -3
  };

  var roomRecources = [
    ghostTierResources,
    shadowTierResources,
    stormTierResources,
    mountainTierResources,
    moonTierResources
  ];

  function getRoomName() {
    return name;
  }

  function getRoomDimensions() {
    return dimensions;
  }

  function getRoomResources(clanTier) {
    return roomRecources[clanTier];
  }

  function getRoomDimensions() {
    return dimensions;
  }

  function getPosition() {
    return position;
  }

  function setPosition(newPosition){
    position.x = newPosition.x;
    position.y = newPosition.y;
  }

  function getPrerequisites() {
    return prerequisites;
  }

  function getMaxRoomInstances() {
    return maxRoomInstances;
  }

  function getDoors() {
    return doors;
  }

  function setPrebuild(value){
    prebuild = vaulue;
  }

  function getPrebuild(){
    return prebuild;
  }

  function setListPosition(newListPosition){
    listPosition = newListPosition;
  }

  function getListPosition(){
    return listPosition;
  }

}
