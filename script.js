class Ship
{
    constructor(name,size)
    {
        this.name=name;
        this.size=size;
        this.shot=0;
       
    }
    
    sunk()
    {
        if(this.shot===this.size) {
            
            return true;
        }
        else {
            return false;
        }
    }

    hit()
    {
            this.shot++;
    }
    
}


 class GameBoard
 {
    constructor(ships,real)
    {
        this.ships=ships;
        this.real=real;
        this.diff=0;
        this.cnt=0;                     // this will be used for the hit mapping in the fire function
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
    
    placeShip(ship_index,player,new_board)
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
                        new_board[r*8+c]=this.cnt;       
                    }
                    placed=true;
                    this.cnt++;
                }
            }
           }
        }
    
       
    fire(index,player)
    {  
        let flag;
        let board;
         if(player.real===true) board=".board-2";
         else board=".board-1";
        let div = document.querySelector(`${board}>.cell[data-index="${index}"]`);
        if(div.textContent==='')
        {
            div.textContent='MISS';
            div.classList.add("miss");
            return false;
        }
        else if(div.textContent==="1")
        {
            let index=div.dataset.index;
            let num;
            

            div.textContent="HIT";
            div.classList.add("hit");
            if(player.real==true) {
                num=board2[index];
                if(num==-1)return;
                ships2[num].hit();
                if(ships2[num].sunk())
                    {
                       player.increaseScore(); 
                        score1.textContent=`Player Score: ${player.score}`
                        Message2.textContent=`Computer Ships remaining: ${ships.length-player.score}`;
                        if(player.score === ships2.length) {
                        alert(`${player.name} wins!`);
                        setTimeout(() => window.location.reload(), 1000);
                           }
                    }
            }
            else{
                num=board1[index];
                if(num==-1)return;
                ships[num].hit();
                    if(ships[num].sunk())
                    {
                       player.increaseScore(); 
                       score2.textContent=`Computer Score: ${player.score}`;
                       Message1.textContent=`Your Ships remaining: ${ships.length-player.score}`;
                       if(player.score === ships.length) {
                        alert(`${player.name} wins!`);
                        setTimeout(() => window.location.reload(), 1000);
                           }
                    } 
            }
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
            div.textContent="Turn: Your turn";
        }
        else{
            let div=document.querySelector(".turn");
            div.textContent="Turn: Computer's turn";
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
           this.score++; 
    }
}


function ComputerMove() {
    let index= Math.floor(Math.random()*64);
    let choice=GameBoard1.fire(index,computer);
    if(choice===true)
    {
        setTimeout(ComputerMove,1000);
    }
    else if(choice===false)
    {
        computer.switchTurn();
        player1.switchTurn();
        GameBoard1.showturn(player1);
    }
    else if(choice==="Choose again")
    {
        setTimeout(ComputerMove,1000);
        
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

let score1=document.querySelector(".Player-score");
let score2=document.querySelector(".Computer-score");

let Message1=document.querySelector(".Message1");
let Message2=document.querySelector(".Message2");

let cell=document.querySelector(".board-2");

cell.addEventListener("click",(e)=>{
    if(player1.flag===true)
    {
        GameBoard1.showturn(player1);
        let index=e.target.dataset.index;
        let hit=GameBoard2.fire(index,player1);
        if(hit===false)
        {
            player1.switchTurn();
            computer.switchTurn();
            GameBoard2.showturn(computer);
            setTimeout(ComputerMove,1000);
        }
    }

});

player1= new Player("Player1","board1",true);
let computer= new Player("Computer","board2",false);

let GameBoard1=new GameBoard(ships,player1.real);
let GameBoard2=new GameBoard(ships2,computer.real);

GameBoard1.createBoard(8,8,player1.real);
GameBoard2.createBoard(8,8,computer.real);

let board1=[];
let board2=[];

for(let i=0;i<64;i++)
{
    board1[i]=-1;
    board2[i]=-1;
}


for(let i=0;i<5;i++)
{
    GameBoard1.placeShip(i,player1,board1);
    GameBoard2.placeShip(i,computer,board2);
}

