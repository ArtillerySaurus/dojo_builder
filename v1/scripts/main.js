/*

To-do:
export as image
Floors
Prerequisites
Move body with all elements in it. Like google maps
Make it look nice(ish). ROUNDED CORNERS!!!
Moddifier not on forma!
Not square items dont handle being rotated and snapped well.
Elements snap to the hidden roomBar rooms.
After snapping elements wont turn?
Add an option to prebuild a dojo and calculate only costs afterwards.


*/

var currentLayer = 0;
// var layers array;
var rankModifier = 1;
var currentMousePos = { x: -1, y: -1 };
var dojoCosts = {
  Credits : 0,
  Alloy_Plate : 0,
  Circuits : 0,
  Control_Module : 0,
  Ferrite : 0,
  Gallium : 0,
  Morphics : 0,
  Nano_Spores : 0,
  Neural_Sensors : 0,
  Neurodes : 0,
  Orokin_Cell : 0,
  Rubedo : 0,
  Salvage : 0,
  Plastids : 0,
  Polymer_Bundle : 0,
  Argon_Crystal : 0,
  Cryotic : 0,
  Oxium : 0,
  Tellurium : 0,
  Forma : 0,
  Energy : 0,
  Capacity : 0,
};

var resourceLinks = {
  Credits : "http://warframe.wikia.com/wiki/Credits",
  Alloy_Plate : "http://warframe.wikia.com/wiki/Alloy_Plate",
  Circuits : "http://warframe.wikia.com/wiki/Circuits",
  Control_Module : "http://warframe.wikia.com/wiki/Control_Module",
  Ferrite : "http://warframe.wikia.com/wiki/Ferrite",
  Gallium : "http://warframe.wikia.com/wiki/Gallium",
  Morphics : "http://warframe.wikia.com/wiki/Morphics",
  Nano_Spores : "http://warframe.wikia.com/wiki/Nano_Spores",
  Neural_Sensors : "http://warframe.wikia.com/wiki/Neural_Sensors",
  Neurodes : "http://warframe.wikia.com/wiki/Neurodes",
  Orokin_Cell : "http://warframe.wikia.com/wiki/Orokin_Cell",
  Rubedo : "http://warframe.wikia.com/wiki/Rubedo",
  Salvage : "http://warframe.wikia.com/wiki/Salvage",
  Plastids : "http://warframe.wikia.com/wiki/Plastids",
  Polymer_Bundle : "http://warframe.wikia.com/wiki/Polymer_Bundle",
  Argon_Crystal : "http://warframe.wikia.com/wiki/Argon_Crystal",
  Cryotic : "http://warframe.wikia.com/wiki/Cryotic",
  Oxium : "http://warframe.wikia.com/wiki/Oxium",
  Tellurium : "http://warframe.wikia.com/wiki/Tellurium",
  Forma	 : "http://warframe.wikia.com/wiki/Forma",
  Enery	 : "http://warframe.wikia.com/wiki/Clan_Dojo#Energy",
  Capacity	 : "http://warframe.wikia.com/wiki/Clan_Dojo#Capacity",
};

$(function() {
  $( ".draggable" ).draggable({
    snap: false,
    snapMode: 'outer',
    helper: clone,
    cursor: "pointer",
    stop: handleDragStop
  });

  $('#clanRank').on('change', function() {
    rankModifier = this.value; // or $(this).val()
    updateDojoCosts();
  });

    $( document ).tooltip();

   $(document).mousemove(function(event) {
       currentMousePos.x = event.pageX;
       currentMousePos.y = event.pageY;
   });

});

function clone( event ) {
  var roomName = event.target.dataset.roomname;
  return '<div class="draggableClone helperClone '+ roomName +'"></div>';
}

function handleDragStop( event, ui ) {

  var roomName = event.target.dataset.roomname;
  var offsetXPos = parseInt( ui.offset.left );
  var offsetYPos = parseInt( ui.offset.top ) - $('.roomBar').height() - 1;

  addClone(offsetXPos, offsetYPos, roomName);
}

function addClone(offsetXPos, offsetYPos, roomName){
  var newClone = ('<div class="draggableClone ui-widget-content '+ roomName +'" data-roomName="'+ roomName +'"  title="'+ roomName +'" style="left: '+ offsetXPos +'px; top: '+ offsetYPos +'px;"></div>')
  $( ".dojoArea" ).append(newClone);

  updateDojoCosts();
  bindClone();
}

function bindClone(){
  $( ".draggableClone" ).draggable({
    // snap: true,
    // snapMode: 'outer',
    containment: ".dojoArea",
    cursor: "pointer",
    stop: checkClonePosition,
    grid: [ 8, 8 ]
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

  if((currentMousePos.x > removeContainer.left
    && currentMousePos.y > removeContainer.top)
    && (currentMousePos.x < (removeContainer.left + containerWidth)
    && currentMousePos.y < (removeContainer.top + containerHeight))){
      $(ui.helper).remove();
      $(ui.draggable).remove();
      updateDojoCosts();
    }
  }

  function updateDojoCosts(){

    // Set all values of array to 0;
    for (var k in dojoCosts) {
      dojoCosts[k] = 0;
    }

    if($( ".draggableClone" ).length === 0){
      $(".resourceContainer").empty();
    }else{

      var i = -1;
      $( ".draggableClone" ).each(function( index ) {
        i++;
        var roomName = $( this ).data("roomname");
        if(roomName !== undefined){

          var roomCosts = getRoomMaterials(roomName);
          for (var k in roomCosts) {
            if (roomCosts.hasOwnProperty(k)) {
              dojoCosts[k] += roomCosts[k];
            }
          }

          $(".resourceContainer").empty();

          for (var k in dojoCosts) {
            if (dojoCosts.hasOwnProperty(k) && dojoCosts[k] !== 0) {

              var container = "<tr><td><a href='"+ resourceLinks[k] +"'>"+ k +": </a></td><td><span id='"+ k +"'></span></td></tr>";

              $(".resourceContainer").append(container);
              $("#"+ k).empty().append((dojoCosts[k] * rankModifier));
            }
          }

          var container = "<tr><td><a href='http://warframe.wikia.com/wiki/Clan_Dojo#Dojo_Room_Limitations'>Rooms: </a></td><td><span id='Rooms'></span></td></tr>";
          $(".resourceContainer").append(container);
          $("#Rooms").empty().append(i +"/100");

        }

      });
    }
  }

  function getRoomMaterials(roomName){
    var roomCosts = {
      Credits : 0,
      Alloy_Plate : 0,
      Circuits : 0,
      Control_Module : 0,
      Ferrite : 0,
      Gallium : 0,
      Morphics : 0,
      Nano_Spores : 0,
      Neural_Sensors : 0,
      Neurodes : 0,
      Orokin_Cell : 0,
      Rubedo : 0,
      Salvage : 0,
      Plastids : 0,
      Polymer_Bundle : 0,
      Argon_Crystal : 0,
      Cryotic : 0,
      Oxium : 0,
      Tellurium : 0,
      Forma : 0,
      Energy : 0,
      Capacity : 0,
    };

    switch(roomName) {
      case "bio_lab":
      case "chem_lab":
      case "energy_lab":
      case "oracle":
      case "tenno_lab":
      roomCosts.Credits = 1000;
      roomCosts.Salvage = 650;
      roomCosts.Circuits = 350;
      roomCosts.Polymer_Bundle = 350;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -2;
      roomCosts.Energy = -5;
      break;
      case "cross_connector":
      case "elevator":
      case "ellbow_connector":
      case "extended_hallway":
      case "straight_hallway":
      case "tshaped_connector":
      roomCosts.Credits = 500;
      roomCosts.Salvage = 650;
      roomCosts.Ferrite = 350;
      roomCosts.Nano_Spores = 350;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -10;
      roomCosts.Energy = -3;
      break;
      case "great_hall":
      case "greater_hall":
      case "hall_grand":
      case "hall_grandest":
      roomCosts.Credits = 1000;
      roomCosts.Alloy_Plate = 150;
      roomCosts.Ferrite = 600;
      roomCosts.Rubedo = 300;
      roomCosts.Forma = 1;
      roomCosts.Capacity = 200;
      roomCosts.Energy = -2;
      break;
      case "large_garden":
      roomCosts.Credits = 1000;
      roomCosts.Salvage = 850;
      roomCosts.Ferrite = 750;
      roomCosts.Nano_Spores = 2500;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -15;
      roomCosts.Energy = -8;
      break;
      case "observatory":
      roomCosts.Credits = 1000;
      roomCosts.Salvage = 500;
      roomCosts.Ferrite = 800;
      roomCosts.Circuits = 200;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -2;
      roomCosts.Energy = -5;
      break;
      case "obstacle_course":
      roomCosts.Credits = 1000;
      roomCosts.Alloy_Plate = 650;
      roomCosts.Ferrite = 400;
      roomCosts.Rubedo = 1200;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -10;
      roomCosts.Energy = -10;
      break;
      case "orokin_lab":
      roomCosts.Credits = 1000;
      roomCosts.Ferrite = 800;
      roomCosts.Circuits = 350;
      roomCosts.Polymer_Bundle = 350;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -2;
      roomCosts.Energy = -5;
      break;
      case "reactor":
      roomCosts.Credits = 500;
      roomCosts.Salvage = 650;
      roomCosts.Circuits = 350;
      roomCosts.Alloy_Plate = 150;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -5;
      roomCosts.Energy = +25;
      break;
      case "small_garden":
      roomCosts.Credits = 750;
      roomCosts.Salvage = 650;
      roomCosts.Ferrite = 550;
      roomCosts.Nano_Spores = 2000;
      roomCosts.Forma = 1;
      roomCosts.Capacity = -10;
      roomCosts.Energy = -6;
      break;
      case "starter_hall":
      // Nothing right?
      roomCosts.Capacity = 200;
      roomCosts.Energy = -2;
      break;
    }

    return roomCosts;

  }
