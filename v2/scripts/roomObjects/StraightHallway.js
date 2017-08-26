function StraightHallway() {

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

  var name = "StraightHallway"; // Same as 'class' name.
  var dimensions = {width: 8, height: 16};
  var position = {x: 8, y: 16};
  var prerequisites = []; // Leave empty for none.
  var maxRoomInstances = 5;
  var doors = [{x: 0, y: 0}, {x: 0, y: 0}]; // For each door a new object witht he location of the door?
  var prebuild =false;
  var listPosition;

  // Resource list.
  var ghostTierResources = {
    credits: 1000,
    circuits: 350,
    salvage: 650,
    polymerBundle: 350,
    forma: 1,
    capacity: -2,
    energy: -5
  };

  var shadowTierResources = {
    credits: 3000,
    salvage: 1950,
    circuits: 1050,
    polymerBundle: 1050,
    forma: 1,
    capacity: -2,
    energy: -5
  };

  var stormTierResources = {
    credits: 10000,
    salvage: 6500,
    circuits: 3500,
    polymerBundle: 3500,
    forma: 2,
    capacity: -2,
    energy: -5
  };

  var mountainTierResources = {
    credits: 30000,
    salvage: 19500,
    circuits: 10500,
    polymerBundle: 10500,
    forma: 5,
    capacity: -2,
    energy: -5
  };

  var moonTierResources = {
    credits: 100000,
    salvage: 65000,
    circuits: 35000,
    polymerBundle: 35000,
    forma: 15,
    capacity: -2,
    energy: -5
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
