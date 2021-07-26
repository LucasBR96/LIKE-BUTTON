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
      tag = "far"; // Botão vazio
      old = "fa";  // Botão preenchido
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

   // -----------------------------------------------------
   // muda a quantidade de likes e dislikes de um passeio 
   // com base na escolha de um cliente
   // -----------------------------------------------------

   let val = getAmnt( id );
   let pos;

   //console.log( old_status );
   if( old_status[0] || old_status[1] ){
      pos = old_status.indexOf( true );
      val[ pos ]--;
   }

   //console.log( new_status );
   if( new_status[0] || new_status[1] ){
      pos = new_status.indexOf( true );
      val[ pos ]++;
   }
}

function pushAmntToCard( par ){

   // -----------------------------------------------------
   // sincroniza a quantidade de likes e dislikes de um 
   // passeio com o que é mostrado pelo arquivo http
   // -----------------------------------------------------

   let id = par.id;
   let children = par.children;
   let amnt;

   for( i = 0; i < 2 ; i++ ){
      amnt = getAmnt( id )[ i ];
      //console.log( amnt );
      children[ i ].firstChild.data = amnt.toString();
   }
}

function logClickEvent( likeButton , nomePasseio ){

   // ------------------------------------------------------
   // Mostra na tela o que aconteceu quando o usuario
   // deu like ( ou dislike )
   // ------------------------------------------------------

   let s1 = "O card escolhido foi " + nomePasseio;
   
   let escolha = "Dislike";
   if( likeButton ){ 
      escolha = "Like"; 
   }
   let s2 = "O usuário clicou em " + escolha;

   let a = getId( nomePasseio )[ 0 ]; 
   let b = getId( nomePasseio )[ 1 ];
   let s3 = "neutra";
   if ( a && ( !b ) ){
      s3 = "positiva";
   }else if( ( !a ) && b ){
      s3 = "negativa";
   }
   s3 = "A opinião do usuário agora é " + s3;

   a = getAmnt( nomePasseio )[ 0 ].toString(); 
   b = getAmnt( nomePasseio )[ 1 ].toString();
   s4 = "Esse passeio agora tem " + a + " Likes e " + b + " Dislikes";

   console.log( [ s1 , s2 , s3 , s4 ].join( "\n" ) , "\n" );
} 

function setLike( num , x ){
   
   // -----------------------------------------------------
   // muda o preenchimento do botão like e dislike com base
   // no que o cliente apertou, além de alterar a quantidade
   // de likes e dislikes de cada passeio.
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
   pushAmntToCard( par );

   
   logClickEvent( bool_val , par.id );

}

function loadLikeDiv( nome ){

   let s = `
   <div class = "container", id ="${nome}">
      <i onclick = "setLike( 1 , this  )" class = "far fa-thumbs-up mx-2">2</i>
      <i onclick = "setLike( 0 , this  )" class = "far fa-thumbs-down mx-2">2</i>
   </div>
   `;

   $( s ).appendTo( "#" + nome );
}