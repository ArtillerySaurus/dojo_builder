/*


  Properties
  ==========

Prerequisites
level
costs
image
width
height

*/

function someObj() {

   // Make functions public here.
   this.someMethod = someMethod;



   function tester() {

      alert('boo');

   }
   
   // Shorter version. Doesnt need to be added to the list.
   this.tester2 = function() {

      alert('boo2');

   }

}



//o_obj = new someObj(); // Create object.
//o_obj.tester(); //alerts "boo"
//o_obj.tester2(); //alerts "boo2"