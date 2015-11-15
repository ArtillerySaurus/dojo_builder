/*

http://www.webmonkey.com/2010/02/make_oop_classes_in_javascript/

  Properties
  ==========

Prerequisites
level
costs
image
width
height

*/

function Oracle() {

   // Make functions public here.
   this.getRoomName = getRoomName;
   this.getRoomDimensions = getRoomDimensions;
   this.getRoomResources = getRoomResources;
   
   var name = "oracle";
   var dimensions = {width: 32, height: 52};
   
   // Resource list.
   var ghostTierResources = {
      credits: 1000,
      salvage: 650,
      circuits: 350,
      polymer_bundle: 350,
      forma: 1,
      capacity: -2,
      energy: -5,
      doors: 1
   };
   
   var shadowTierResources = {
      credits: 3000,
      salvage: 1950,
      circuits: 1050,
      polymer_bundle: 1050,
      forma: 1,
      capacity: -2,
      energy: -5,
      doors: 1
   };
   
   var stormTierResources = {
      credits: 10000,
      salvage: 6500,
      circuits: 3500,
      polymer_bundle: 3500,
      forma: 2,
      capacity: -2,
      energy: -5,
      doors: 1
   };
   
   var mountainTierResources = {
      credits: 30000,
      salvage: 19500,
      circuits: 10500,
      polymer_bundle: 10500,
      forma: 5,
      capacity: -2,
      energy: -5,
      doors: 1
   };
   
   var moonTierResources = {
      credits: 100000,
      salvage: 65000,
      circuits: 35000,
      polymer_bundle: 35000,
      forma: 15,
      capacity: -2,
      energy: -5,
      doors: 1
   };
   
   var roomResources = [
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

}
