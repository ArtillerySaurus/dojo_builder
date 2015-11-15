/*
To-do:
Export as image.
Export and import json?
Floors/levels.
Prerequisites for rooms, give some visual feedback.
Make it look nice(ish). ROUNDED CORNERS!!!
Delete objects.
Tooltip containing url to room?
Snap to rooms and in particular, doors on doors? Or add clear markers to the door areas as to align them properly.
Dont allow removal of StarterHall.
Add an option to prebuild a dojo and calculate only costs afterwards or before.
Write help file.

Bugs (possible old ones.):
Not square items dont handle being rotated and snapped well.
Elements snap to the hidden roomBar rooms.
After snapping elements wont turn?
Snap to grid on PLACEMENT.
z-indexes fucked again with objects and infocontainer
Initial position of the dojoArea doesnt work on larger screens. Seems like it doesnt work at all. Could be the containment shizzle. Check initial position, then containment.
*/

var activeObjects = [];

var gridSize = 8;
var hideRoomborders = false;
var infoContainerOpen = true;
var roomBarOpen = true;
var dojoTier = 0;
var currentLayer = 0;
var displayAllLayers = false;
var currentMousePos = { x: -1, y: -1 };
var dojoCosts = {
  credits : 0,
  alloyPlate : 0,
  circuits : 0,
  controlModule : 0,
  ferrite : 0,
  gallium : 0,
  morphics : 0,
  nanoSpores : 0,
  neuralSensors : 0,
  neurodes : 0,
  orokinCell : 0,
  rubedo : 0,
  salvage : 0,
  plastids : 0,
  polymerBundle : 0,
  argonCrystal : 0,
  cryotic : 0,
  oxium : 0,
  tellurium : 0,
  forma : 0,
  energy : 0,
  capacity : 0
};

var resourceLinks = {
  credits : "http://warframe.wikia.com/wiki/Credits",
  alloyPlate : "http://warframe.wikia.com/wiki/Alloy_Plate",
  circuits : "http://warframe.wikia.com/wiki/Circuits",
  controlModule : "http://warframe.wikia.com/wiki/Control_Module",
  ferrite : "http://warframe.wikia.com/wiki/Ferrite",
  gallium : "http://warframe.wikia.com/wiki/Gallium",
  morphics : "http://warframe.wikia.com/wiki/Morphics",
  nanoSpores : "http://warframe.wikia.com/wiki/Nano_Spores",
  neuralSensors : "http://warframe.wikia.com/wiki/Neural_Sensors",
  neurodes : "http://warframe.wikia.com/wiki/Neurodes",
  orokinCell : "http://warframe.wikia.com/wiki/Orokin_Cell",
  rubedo : "http://warframe.wikia.com/wiki/Rubedo",
  salvage : "http://warframe.wikia.com/wiki/Salvage",
  plastids : "http://warframe.wikia.com/wiki/Plastids",
  polymerBundle : "http://warframe.wikia.com/wiki/Polymer_Bundle",
  argonCrystal : "http://warframe.wikia.com/wiki/Argon_Crystal",
  cryotic : "http://warframe.wikia.com/wiki/Cryotic",
  oxium : "http://warframe.wikia.com/wiki/Oxium",
  tellurium : "http://warframe.wikia.com/wiki/Tellurium",
  forma	 : "http://warframe.wikia.com/wiki/Forma",
  enery	 : "http://warframe.wikia.com/wiki/Clan_Dojo#Energy",
  capacity	 : "http://warframe.wikia.com/wiki/Clan_Dojo#Capacity",
};

$(function() {

  $( ".draggable" ).draggable({
    snap: true,
    snapMode: 'outer',
    helper: clone,
    cursor: "pointer",
    stop: handleDragStop,
    tolerance: "pointer",
    scroll: false,
    grid: [gridSize, gridSize]
  });

  // Constrain the dojoArea from going out of bounds.
  var cw = $(window).width();
  var ch = $(window).height();
  var map = $('.dojoArea');
  var mw = map.outerWidth( );
  var mh = map.outerHeight( );
  var x1 = -mw + cw; // Right
  var y1 = -mh + ch; // Bottom
  var x2 = 0; // Left
  var y2 = 0; // Right

  $( ".dojoArea" ).draggable({
    scroll: false,
    containment: [x1, y1, x2, y2]
  });

  $('#clanRank').on('change', function() {
    dojoTier = $(this).val();
    updateDojoCosts();
  });

  $( document ).tooltip();

  $(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
  });

  $('.toggleInfoContainer').on('click', function(e) {
    $("#openInfoContainer").toggle();

    if(infoContainerOpen){ // Close container.
      $(".infoContainer").animate({
        right: '-'+$(".infoContainer").outerWidth()+'px',
        opacity: '0.5'
      });
      infoContainerOpen = false;
    }else{ // Open container.
      $(".infoContainer").animate({
        right: '0px',
        opacity: '1.0'
      });
      infoContainerOpen = true;
    }

    $("#closeInfoContainer").toggle();
  });

  $('.toggleRoomBar').on('click', function(e) {
    $("#openRoomBar").toggle();

    if(roomBarOpen){ // Close container.
      $(".roomBar").animate({
        top: '-'+$(".roomBar").outerHeight()+'px',
        opacity: '0.5'
      });
      roomBarOpen = false;
    }else{ // Open container.
      $(".roomBar").animate({
        top: '0px',
        opacity: '1.0'
      });
      roomBarOpen = true;
    }

    $("#closeRoomBar").toggle();
  });

  $('#roomBorders').change(function() {
    // Some weird inversing is happening here. Use LOGIC to figure out wtf is going on.
    if($(this).is(":checked")) {
      hideRoomborders = false;
      $(".draggableClone ").addClass("cloneBorders");
    }else{
      hideRoomborders = true;
      $(".draggableClone ").removeClass("cloneBorders");
    }

  });

  placeStarterHall();

});

function placeStarterHall(){

  var dojoAreaSize = {x: $(".dojoArea").width(), y: $(".dojoArea").height()}
  var starterHall = new StarterHall();
  // Because the containment fucked up when centering the dojoArea, this has to be redone aswell.
  // var offsetXPos = (dojoAreaSize.x / 2) - (starterHall.getRoomDimensions().width / 2);
  // var offsetYPos = (dojoAreaSize.y / 2) - (starterHall.getRoomDimensions().height / 2);
  var offsetXPos = ($(window).width() / 2) - (starterHall.getRoomDimensions().width / 2);
  var offsetYPos = ($(window).height() / 2) - (starterHall.getRoomDimensions().height / 2);

  addClone(offsetXPos, offsetYPos, "StarterHall");

}

function clone( event ) {
  var roomName = event.target.dataset.roomname;
  return '<div class="draggableClone helperClone '+ roomName +'"></div>';
}

function handleDragStop( event, ui ) {

  var roomName = event.target.dataset.roomname;

  if(roomName != "portal" && roomName != "trade_post"){
    var editedX = ~$(".dojoArea").position().left+1;
    var editedY = ~$(".dojoArea").position().top+1;
    var offsetXPos = parseInt(editedX + ui.offset.left);
    var offsetYPos = parseInt((editedY + ui.offset.top));

    addClone(offsetXPos, offsetYPos, roomName);

  }
}

function addClone(offsetXPos, offsetYPos, roomName){

  var newRoom = getObjectFromName(roomName);

  newRoom.setPosition({x: offsetXPos, y: offsetYPos});
  newRoom.setListPosition(activeObjects.length);
  activeObjects.push(newRoom);

  var borders = " cloneBorders ";

  if(hideRoomborders){
    borders = "";
  }

  var newClone = ('<div class="draggableClone '+ borders +' ui-widget-content '+ newRoom.getRoomName() +'" data-roomName="'+ newRoom.getRoomName() +'"  data-roomListPosition="'+ newRoom.getListPosition() +'"  title="'+ newRoom.getRoomName() +'" style="left: '+ newRoom.getPosition().x +'px; top: '+ newRoom.getPosition().y +'px;"></div>')
  $( ".dojoArea" ).append(newClone);

  updateDojoCosts();
  bindClone();
}

function getObjectFromName(name){

  var returnObject;

  switch(name){
    case "StarterHall":
    returnObject = new StarterHall();
    break;
    case "CrossConnector":
    returnObject = new CrossConnector();
    break;
    case "TConnector":
    returnObject = new TConnector();
    break;
  }

  return returnObject;

}

function bindClone(){
  $( ".draggableClone" ).draggable({
    snap: true,
    snapMode: 'outer',
    containment: ".dojoArea",
    cursor: "pointer",
    stop: checkClonePosition,
    grid: [ gridSize, gridSize ],
    scroll: false,
    tolerance: "pointer"
  });

  $('.draggableClone').on('click', function() {
    var angle = ($(this).getRotateAngle()*1) + 90;
    $(this).rotate(angle);
  });

}

function checkClonePosition( event, ui ){

  var removeContainer = $(".removeRoom").offset();
  var containerHeight = $(".removeRoom").height();
  var containerWidth = $(".removeRoom").width();

  var roomName = event.target.dataset.roomname;

  if((currentMousePos.x > removeContainer.left
    && currentMousePos.y > removeContainer.top)
    && (currentMousePos.x < (removeContainer.left + containerWidth)
    && currentMousePos.y < (removeContainer.top + containerHeight))){

      if(roomName === "StarterHall"){
        ui.helper.css({top: ui.originalPosition.top, left: ui.originalPosition.left});
      }else{
        $(ui.helper).remove();
        $(ui.draggable).remove();
        updateDojoCosts();
      }
    }
  }

  function updateDojoCosts(){

    // Set all values of array to 0;
    for (var k in dojoCosts) {
      dojoCosts[k] = 0;
    }

    for (var i = 0; i < activeObjects.length; i++) {
      var roomResources = activeObjects[i].getRoomResources(dojoTier);
      Object.keys(roomResources).forEach(function (key) {
        dojoCosts[key] += roomResources[key];
      });

    }

    $(".resourceContainer").empty();

    for (var k in dojoCosts) {
      if (dojoCosts.hasOwnProperty(k) && dojoCosts[k] !== 0) {

        var container = "<tr><td><a href='"+ resourceLinks[k] +"'>"+ k +": </a></td><td><span id='"+ k +"'></span></td></tr>";

        $(".resourceContainer").append(container);
        $("#"+ k).empty().append((dojoCosts[k]));
      }
    }

    var container = "<tr><td><a href='http://warframe.wikia.com/wiki/Clan_Dojo#Dojo_Room_Limitations'>Rooms: </a></td><td><span id='Rooms'></span></td></tr>";
    $(".resourceContainer").append(container);
    $("#Rooms").empty().append(i +"/100");



  }
