$(function() {
   $('[data-toggle="tooltip"]').tooltip();
   $('[data-toggle="popover"]').popover();
});

// Gerindo Likes e deslikes -------------------------------
var likeDict = {};
function getId( nome ){

   // -----------------------------------------------------
   // retorna se o usário deu um like ou dislike no passeio
   // [ 0 , 0 ] -> neutro
   // [ 0 , 1 ] -> dislike
   // [ 1 , 0 ] -> like
   // -----------------------------------------------------

   if( !likeDict[ nome ] ){
      likeDict[ nome ] = [ false , false ];
   }return likeDict[ nome ];
}

function manageLike( src , nome ){

   // -----------------------------------------------------
   // muda o status do passeio conforme o botão que o usuário
   // pressionou:
   //
   // nome -> id do passeio
   // src  -> botao escolhido ( 1 para like e 0 para dislike )
   // -----------------------------------------------------

   let vals = getId( nome );
   let x1 = vals[ 0 ];
   let x2 = vals[ 1 ];

   vals[ 0 ] = ( src&& ( !x1 ) );
   vals[ 1 ] = ( ( !src) && ( !x2 ));
}

var likeAmnt = {};
function getAmnt( nome ){

   if( !likeAmnt[ nome ] ){

      // só para demonstração, num site de verdade a quantida
      // de de likes e dislikes seria provida pelo backend
      likeAmnt[ nome ] = [ 2 , 2 ];

   }return likeAmnt[ nome ];
}

function setAmnt( old_status , new_status , id ){

   let val = getAmnt[ id ];
   let pos;

   if( old_status.sum() ){
      pos = old_status.indexOf( 1 );
      val[ pos ]--;
   }

   if( new_status.sum() ){
      pos = new_status.indexOf( 1 );
      val[ pos ]++;
   }
}

function setLike( num , x ){
   
   // -----------------------------------------------------
   // muda o preenchimento do botão like e dislike com base
   // no que o cliente apertou
   // -----------------------------------------------------

   let nome = x.parentElement.id;
   let bool_val = ( num == 1 );
   let old_status , new_status;
   
   old_status = getId( nome )
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
