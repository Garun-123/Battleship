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
    
    placeShip(ship_index)
    {
        if(this.overall()===-1) {
            displayMessage("remove a ship with "+this.diff+" or more cells");
            return;
        }
        else {
           
           if(this.real==true)
           {
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
                    let div=document.querySelector(`.cell[data-index="${r*8+c}"]`);
                    
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
                        div.textContent=ship.name;
                    }
                    placed=true;
                }
            }
           }
        }
    }

    showturn(player)
    {
        if(player.chance===1)
        {
            displayMessage("Your turn");
        }
        else{
            displayMessage("Computer's turn");
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
        this.chance;
        if(this.real==true)
            {
                this.chance=1;
            } 
            else{
                this.chance=2;
            }
    } 
    

    turn()
    {
      if(this.chance===1)
      {
        this.chance==2;
      }
      else{
        this.chance=1;
      }
    }

    
    score()
    {
       
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




let computer= new Player("Computer","board2",false);

let GameBoard1=new GameBoard(ships,player1.real);
let GameBoard2=new GameBoard(ships2,computer.real);

GameBoard1.createBoard(8,8,player1.real);
GameBoard2.createBoard(8,8,computer.real);

