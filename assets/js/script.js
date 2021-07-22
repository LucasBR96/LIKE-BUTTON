$(function() {
   $('[data-toggle="tooltip"]').tooltip();
   $('[data-toggle="popover"]').popover();
});

var likeDict = {};
function getId( nome ){

   if( !likeDict[ nome ] ){
      likeDict[ nome ] = [ false , false ];
   }return likeDict[ nome ]
}

function setById( nome , val ){
   likeDict[ nome ] = val;
}

function manageLike( src , nome ){

   let vals = getId( nome );
   let x1 = vals[ 0 ];
   let x2 = vals[ 1 ];

   vals[ 0 ] = ( src&& ( !x1 ) );
   vals[ 1 ] = ( ( !src) && ( !x2 ));
}

function setLike( num , x ){
   
   let nome = x.parentElement.id;
   let bool_val = ( num == 1 );

   manageLike( bool_val , nome );
   let val = likeDict[ nome ];
   //console.log( bool_val , nome , val );

   let child, tag, old;
   for( let i = 0 ; i < 2 ; i++ ){

      child = x.parentElement.children[ i ];
      tag = "far";
      old = "fa"
      if ( val[ i ] ){
         tag = "fa";
         old = "far";
      }

      child.classList.remove( old )
      child.classList.add( tag );
   }
   
}
