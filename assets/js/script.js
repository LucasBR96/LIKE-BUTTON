$(function() {
   $('[data-toggle="tooltip"]').tooltip();
   $('[data-toggle="popover"]').popover();
})

function setLike( x ){
   
   let og , swp;

   og  = "fa";
   swp = "far"
   if ( x.classList.contains( swp ) ){
      og = "far";
      swp = "fa";
   }

   x.classList.remove( og );
   x.classList.add( swp );

}