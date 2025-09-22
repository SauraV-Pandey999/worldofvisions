var globals={};
var level="";
  function insert(n, char) {
    var cell = $('.board .cell:nth-child('+(n+1)+')');;
    if(!cell.hasClass('occupied')) {
        cell.text(char);
        cell.css({color : char == "X" ? "green" : "red"});
        cell.addClass('occupied');
    }
  }
function clearall() {
    for(var i=0;i<9;i++)
	{
	        var cell = $('.board .cell:nth-child('+(i+1)+')');;
    	    if(cell.hasClass('occupied')) 
		      {
        		cell.text("");
        		cell.removeClass('occupied');
    		  }
	}
  }

  var AIAction = function(pos) {

    this.markat = pos;
    this.minimaxVal = 0;
    this.applyTo = function(state) {
        var next = new State(state);
        next.board[this.markat] = state.turn;
        if(state.turn === "O")
            next.numomoves++;
        next.advanceTurn();
        return next;
    }
};

AIAction.ASCENDING = function(action1, action2) {
    if(action1.minimaxVal < action2.minimaxVal)
        return -1; 
    else if(action1.minimaxVal > action2.minimaxVal)
        return 1; 
    else
        return 0; 
}

AIAction.DESCENDING = function(action1, action2) {
    if(action1.minimaxVal > action2.minimaxVal)
        return -1; 
    else if(action1.minimaxVal < action2.minimaxVal)
        return 1; 
    else
        return 0; 
}

var AI = function(level) {
    var intellilevel = level;
    var game = {};
    function minimaxValue(state) {
        if(state.isTerminal()) {
            return Game.score(state);
        }
        else {
            var stateScore; 
            if(state.turn === "X")
                stateScore = -1000;
            else
                stateScore = 1000;
            var positionchoices = state.emptyCells();
            var stateschoices = positionchoices.map(function(pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });
            stateschoices.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") {
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            return stateScore;
        }
    }

    function makenoobmove(turn) {
        var availablechoices = game.currentState.emptyCells();
        var noobdecisioncell = availablechoices[Math.floor(Math.random() * availablechoices.length)];
        var action = new AIAction(noobdecisioncell);
        var next = action.applyTo(game.currentState);
        insert(noobdecisioncell, turn);
        game.advanceTo(next);
    }

    function makeexpertmove(turn) {
        var available = game.currentState.emptyCells();

        var actionchoices = available.map(function(pos) {
            var action =  new AIAction(pos); 
            var next = action.applyTo(game.currentState);              action.minimaxVal = minimaxValue(next); 
            return action;
        });

        if(turn === "X")
            actionchoices.sort(AIAction.DESCENDING);
        else
            actionchoices.sort(AIAction.ASCENDING);


        var doaction = actionchoices[0];
        var next = doaction.applyTo(game.currentState);
        insert(doaction.markat, turn);
        game.advanceTo(next);
    }

  
    this.plays = function(_game){
        game = _game;
    };

    this.notify = function(turn) {
        switch(intellilevel) {
            case "noob": makenoobmove(turn); break;
            case "expert": makeexpertmove(turn); break;
        }
    };
};
  
  //STATE
  var State=function(old)
  {
    this.turn="";
    this.numomoves=0;
    this.result="still running";
    this.board=[];
    if(typeof old!=="undefined")    //new state is to be constructed from old state
      {
        var len=old.board.length;
        this.board=new Array(len);
        for(var i=0;i<len;i++)
          {
            this.board[i]=old.board[i];
          }
        this.numomoves=old.numomoves;
        this.result=old.result;
        this.turn=old.turn;
      }
    this.advanceTurn=function()
    {
      if(this.turn==="X")
        this.turn="O";
      else
        this.turn="X";
    };
    
    this.emptyCells=function()
    {
      var emptycellindices=[];
      for(var i=0;i<9;i++)
        {
          if(this.board[i]==="E")
            {
              emptycellindices.push(i);
            }
        }
      return emptycellindices;
    };
    
    this.isTerminal=function()
    {
      var b=this.board;
        for(var i=0;i<=6;i=i+3) {
            if(b[i]!=="E" && b[i]===b[i+1] && b[i+1]==b[i+2]) 
            {
                this.result=b[i]+"-won";
                return true;
            }
        }
        for(var i=0;i<=2;i++) {
            if(b[i]!=="E" && b[i]===b[i+3] && b[i+3]===b[i+6]) {
                this.result=b[i]+"-won"; //update the state result
                return true;
            }
        }
        for(var i=0,j=4;i<=2;i=i+2,j=j-2) {
            if(b[i]!=="E" && b[i]==b[i+j] && b[i+j]===b[i+2*j]) {
                this.result=b[i]+"-won";
                return true;
            }
        }
        var available = this.emptyCells();
        if(available.length == 0) {
            this.result = "draw";
            return true;
        }
        else {
          //$("#deb").append("<p>You are in isTerminal()</p>");
            return false;
        }
    };
  };
  
  
  
  //GAME
  var Game=function(aiplayer)
  {
    this.ai=aiplayer;
    this.currentState=new State();
    this.currentState.board=["E","E","E","E","E","E","E","E","E"];
    this.currentState.turn="X";
    this.status="beginning";
    this.advanceTo=function(_state)
    {
      this.currentState=_state;
      if(_state.isTerminal())
        {
          //$("#deb").append("<p>You are in advanceTo()</p>");
          this.status="ended";
          
          if(_state.result==="X-won")
            {
              swal("Woohoo", "You won!", "success");
                 createnewgame(level);
            }
          else if(_state.result==="O-won")
            {
              swal("Boohoo", "You lost!", "error");
                 createnewgame(level);
            }
          else
            {
              swal("Bleh", "Just a draw, who cares..", "error");
                 createnewgame(level);
            }
        }
      else
        {
          
          if(this.currentState.turn==="O")
            {
              this.ai.notify("O");
              //$("#deb").append("<p>We are now notifying AI!</p>");
            }
        }
    };
    this.start=function()
    {
      if(this.status==="beginning")
        {
          //$("#deb").append("<p>Fuck YOU</p>");
          this.advanceTo(this.currentState);
          this.status="running";
        }
    }
  };
  Game.score=function(_state)
  {
    if(_state.result==="X-won")
    {return 10-_state.numomoves;}
    else if(_state.result==="O-won")
    {return -10+_state.numomoves;}
    else
      {return 0;}
  }
  
  
   $(".cell").each(function() {
     var $this = $(this);
     
     $this.click(function() {
         if((globals.game.status === "running" ) && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
             var indx=parseInt($this.attr("id"));
             var next = new State(globals.game.currentState);
             next.board[indx] = "X";
             insert(indx, "X");
             next.advanceTurn();
             globals.game.advanceTo(next);
         }
     });
 });
function createnewgame(level)
{
    var ai=new AI(level);
    globals.game=new Game(ai);
    ai.plays(globals.game);
    globals.game.start();
    clearall();
}
$("#reset").click(function(){
  swal("Leaving?", "What Happened? Couldn't Cope up?", "info");
   createnewgame(level);
});





$(document).ready(function(){
  swal({
  title: "Welcome",
  text: "Select your difficulty level",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3ae527",
  confirmButtonText: "Expert",
  cancelButtonText: "Noob",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
    swal("Whoa you seem confident", "Good luck trying to win", "success");
    level="expert";
       createnewgame(level);

  } else {
        swal("Easy Peasy lemon squeezy", "Enjoy", "success");
    level="noob";
       createnewgame(level);

    //$("#deb").append(globals.game.status);
  }
});
  
});//EOF