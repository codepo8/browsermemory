var old = null,
    mom = null, 
    clickable = true,
    allsolved = 0,
    moves = 0,
    failelm = null, 
    delay = 1500;

function init(){
  var browsers = 'ie-fx-op-cr-sf-ny'.split( '-' ),
      ar = browsers.concat( browsers ),
      sa = [],
      cards = document.querySelector('#cards'),
      out = '', i = 0, x = 0;
  while (ar.length) {
    sa.push( ar.splice( Math.random() * ar.length, 1) );
  };
  while (sa.length) {
    ar.push( sa.pop() );
  };

  for ( i = 0; i < ar.length; i++ ) {
    x = 10 * Math.random() -5;
    out += '<section class="container"><div class="card">'+
           '<figure class="front"></figure>'+
           '<figure class="back ' + ar[ i ] + '"></figure>'+
           '</div></section>';
  }
  cards.innerHTML = out + '<aside>Moves: '+
                          '<span id="moves">0</span></aside>';
  cards.innerHTML += '<aside id="win"><p>All found&hellip; - resetting</p>'+
                     '</aside>';
  cards.addEventListener( 'click', checkcard, false );
  moveelm = document.querySelector( '#moves' );
  document.body.className = document.body.className.replace( 'win', '' );

  if ( document.body.style.WebkitPerspective === undefined && 
       document.body.style.MozPerspective === undefined ) {
    delay = 500;
    document.body.className = 'notransforms';
  }  

}

function checkcard( e ) {
  
  if ( !clickable ) { return; }
  if ( e.target.tagName !== 'FIGURE' ) { return; }
  mom = e.target.parentNode;
  if ( mom.solved ) { return; }

  if ( !old ) {
    old = mom;
    mom.className += ' flipped';
  } else {
    mom.className += ' flipped';
  }

  if ( old && mom && old !== mom ) {
    if ( old.lastChild.className === mom.lastChild.className ) {
      old.solved = mom.solved = true;
      old = null;
      allsolved++;
      if( allsolved === 6 ) { 
        win(); 
      }
    } else {
      clickable = false;
      x = setTimeout( clear, delay );
    }
    moves++;
    moveelm.innerHTML = moves;
  }

}
  
function win() {

  document.body.className += ' win';
  setTimeout( function() {
    var cards = document.querySelectorAll( '.card' );
    for (i = cards.length-1; i >= 0; i-- ) {
      cards[ i ].className = cards[ i ].className.replace( ' flipped', '' );
    }  
    setTimeout( init, 1000 );
  }, 3000);

}

function clear() {

  clickable = true;
  old.className = old.className.replace(' flipped','');
  mom.className = mom.className.replace(' flipped','');
  old = null;
  mom = null;
  clearTimeout(x);

}

window.addEventListener ( 'load', init, false );
