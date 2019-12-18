window.onload = function() {
    Game.init()

    document.getElementsByClassName('tryAgain').onclick=()=>{
      document.getElementsByClassName('night')
      Game.init()
    }
  }