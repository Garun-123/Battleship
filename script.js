class Ship
{
    constructor(name,size)
    {
        this.name=name;
        this.size=size;
        this.hit=0;
    }
    
    sunk()
    {
        if(this.hit===this.size) {
            
            return true;
        }
        else {
            return false;
        }
    }

    hit()
    {
        
        this.hit++;
    }
    
}


 class GameBoard
 {
    constructor(ships,real)
    {
        this.ships=ships;
        this.real=real;
        this.diff=0;
    }

     createBoard(rows,cols,player)
     {
        let div;
        if(this.real==true)
        {
            div=document.querySelector(".board-1");
        }
        else{
            div=document.querySelector(".board-2");
        }
        
        for(let i=0;i<rows*cols;i++) {
        let cell=document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index",i);
        div.appendChild(cell);
        } 
     }
    overall()
    {
        let sum=0;
        for(let i=0;i<this.ships.length;i++)
        {
            sum+=this.ships[i].size;
        }
        if(sum<=64) return sum;
        
        else
            {
                this.diff=sum-64;
                return -1;
            }  
       
    }
    
    placeShip(ship_index,player)
    {
        if(this.overall()===-1) {
            displayMessage("remove a ship with "+this.diff+" or more cells");
            return;
        }
        else {

           let board;
           if(player.real==true)
           {
             board=".board-1";
           }
           else{
               board=".board-2";
           }
            let placed=false;
            let ship=this.ships[ship_index];
            while(!placed)
            {
                let isHorizontal=Math.random()<0.5;

                let row= isHorizontal?Math.floor(Math.random()*8):Math.floor(Math.random()*(8-ship.size+1));
                let col= isHorizontal?Math.floor(Math.random()*(8-ship.size+1)):Math.floor(Math.random()*8);
               
                let space=true;
                for(let i=0;i<ship.size;i++)
                {
                
                   let r=isHorizontal?row:row+i;
                    let c=isHorizontal?col+i:col;
                    let div=document.querySelector(`${board}>.cell[data-index="${r*8+c}"]`);
                    
                    if(div.textContent!=='')
                    {
                        space=false;
                        break;
                    }
                }
                if(space)
                {
                    for(let i=0;i<ship.size;i++)
                    {
                       
                        let r=isHorizontal?row:row+i;
                        let c=isHorizontal?col+i:col;
                        let div=document.querySelector(`${board}>.cell[data-index="${r*8+c}"]`);
                        div.textContent="1";
                    }
                    placed=true;
                }
            }
           }
        }
    
       
    hit(index,player)
    {  
        let flag;
        let board;
         if(player.real===true) board=".board-2";
         else board=".board-1";
        let div = document.querySelector(`${board}>.cell[data-index="${index}"]`);
        if(div.textContent==='')
        {
            div.textContent='MISS';
            return false;
        }
        else if(div.textContent==="1")
        {
            div.textContent="HIT";
            return true;
        }
        else 
        {
           flag="Choose again";
           return flag; 
        }
    }

    showturn(player)
    {
        if(player.real==true)
        {
            let div=document.querySelector(".turn");
            div.textContent="Your turn";
        }
        else{
            let div=document.querySelector(".turn");
            div.textContent="Computer's turn";
        }
    }

 }


class Player
{
    constructor(name,board,real)
    {
        this.name=name;
        this.board=board;
        this.real=real;
        this.flag;
        if(this.real===true)
        {
            this.flag=true;
        }
        else{
            this.flag=false;
        }
        this.score=0;
    } 
    
    switchTurn()
    {
       if(this.flag===true)
       {
           this.flag=false;
       }
       else{
           this.flag=true;
       }
    }
    increaseScore()
    {
      if(this.real===true)
        {
           this.score++;
        } 
        else{
           this.score++; 
        }
    }
}


function ComputerMove() {
    let index= Math.floor(Math.random()*64);
    let choice=GameBoard2.hit(index,computer);
    if(choice===true)
    {
        computer.increaseScore();
        setTimeout(ComputerMove(),1000);
    }
    else if(choice===false)
    {
        computer.switchTurn();
        player1.switchTurn();
    }
    else if(choice==="Choose again")
    {
        setTimeout(ComputerMove(),1000);
        
    }  
}
let ship1=new Ship("Carrier-1",5);
let ship2=new Ship("Battleship-1",4);
let ship3 = new Ship("Cruiser-1",3);
let ship4 = new Ship("Submarine-1",3);
let ship5 = new Ship("Destroyer-1",2);

let compship1=new Ship("Carrier-2",5);
let compship2=new Ship("Battleship-2",4);
let compship3 = new Ship("Cruiser-2",3);
let compship4 = new Ship("Submarine-2",3);
let compship5 = new Ship("Destroyer-2",2);

let ships=[ship1,ship2,ship3,ship4,ship5];
let ships2=[compship1,compship2,compship3,compship4,compship5];



let player_name;
let player1;
let btn=document.querySelector("button");
btn.addEventListener("click",(e)=>{
e.preventDefault();
let player=document.querySelector("input");
player_name=player.value;
player1= new Player(player_name,"board1",true);
let div=document.querySelector(".player-name>.player1");
div.textContent=player_name;
player.value="";
});



let cell=document.querySelector(".board-2");

cell.addEventListener("click",(e)=>{
    if(player1.flag===true)
    {
        GameBoard1.showturn(player1);
        let index=e.target.dataset.index;
        let hit=GameBoard1.hit(index,player1);
        if(hit===false)
        {
            player1.switchTurn();
            computer.switchTurn();
            GameBoard2.showturn(computer);
            setTimeout(ComputerMove,1000);
        }
        else{
            player1.increaseScore();
        }
    }
    else{
        displayMessage("It's not your turn");
    }
});

player1= new Player("Player1","board1",true);
let computer= new Player("Computer","board2",false);

let GameBoard1=new GameBoard(ships,player1.real);
let GameBoard2=new GameBoard(ships2,computer.real);

GameBoard1.createBoard(8,8,player1.real);
GameBoard2.createBoard(8,8,computer.real);

for(let i=0;i<5;i++)
{
    GameBoard1.placeShip(i,player1);
    GameBoard2.placeShip(i,computer);
}

