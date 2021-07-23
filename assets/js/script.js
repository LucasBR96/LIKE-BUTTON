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

function setColors( par ){

   let val = likeDict[ par.id ];
   let child, tag, old;
   for( let i = 0 ; i < 2 ; i++ ){

      child = par.children[ i ];
      tag = "far";
      old = "fa";
      if ( val[ i ] ){
         tag = "fa";
         old = "far";
      }
      child.classList.remove( old );
      child.classList.add( tag );
   }
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

   let val = getAmnt( id );
   let pos;

   console.log( old_status );
   if( old_status[0] || old_status[1] ){
      pos = old_status.indexOf( true );
      val[ pos ]--;
   }

   console.log( new_status );
   if( new_status[0] || new_status[1] ){
      pos = new_status.indexOf( true );
      val[ pos ]++;
   }
}

function setLike( num , x ){
   
   // -----------------------------------------------------
   // muda o preenchimento do botão like e dislike com base
   // no que o cliente apertou
   // -----------------------------------------------------

   let par = x.parentElement;
   let bool_val = ( num == 1 );
   let oldStatus, newStatus;

   oldStatus = getId( par.id ).map( x => x )
   manageLike( bool_val , par.id );
   setColors( par );
   newStatus = getId( par.id );

   setAmnt( oldStatus , newStatus , par.id );
   let numLikes = getAmnt( par.id );
   console.log( bool_val , par.id , newStatus, numLikes );

}

function strip( x ){
   for( let field in x ){
      console.log( field , x[ field ] );
   }
}