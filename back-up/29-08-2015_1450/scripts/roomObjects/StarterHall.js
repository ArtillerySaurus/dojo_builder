
function StarterHall() {

  // Make functions public here.
  this.getRoomName = getRoomName;
  this.getRoomResources = getRoomResources;
  this.getRoomDimensions = getRoomDimensions;
  this.getPosition = getPosition;
  this.setPosition = setPosition;
  this.getPrerequisites = getPrerequisites;
  this.getMaxRoomInstances = getMaxRoomInstances;
  this.getDoors = getDoors;
  this.getPrebuild = getPrebuild;
  this.setPrebuild = setPrebuild;
  this.setListPosition = setListPosition;
  this.getListPosition = getListPosition;

  var name = "StarterHall";
  var dimensions = {width: 32, height: 64};
  var position = {x: 32, y: 32};
  var prerequisites = []; // Leave empty for none.
  var maxRoomInstances = 1;
  var doors = [{x: 0, y: 0}, {x: 0, y: 0}]; // For each door a new object with the location of the door?

  // Resource list.
  var ghostTierResources = {};
  var shadowTierResources = {};
  var stormTierResources = {};
  var mountainTierResources = {};
  var moonTierResources = {};

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
