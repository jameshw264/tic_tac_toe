let turn = '';
let game_end = 0;
const game_board_object = (() => {
    let game_board = ['','','','','','','','',''];

    const change_board = (new_game_board) => {
        game_board = new_game_board;
        display_controller.change_display(game_board);
    }

    return {
        game_board,
        change_board
    };

})();

const display_controller = (() => {
    const change_display = (game_board) => {
        game_board.forEach(change_display_id);
    }
    const change_display_id = function (item, index) {
        document.getElementById(index).textContent = item;
    }

    const change_turn = (turn) => {
        console.log(turn)
        const turn_container = document.querySelector('.turn');
        if (turn == 'player1'){
            turn_container.textContent = 'Turn: Player 1'
        } else {
            turn_container.textContent = 'Turn: Player 2'
        }
        
    }
    const game_board = game_board_object.game_board;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box =>{
        box.onclick = function () {
            game_controller.perform_go(box.id);
        }
    })
    
    return {
        change_display,
        change_turn
    };
})();

const player = (sign) => {
    const place_sign = (spot) => {
        game_board = game_board_object;
        game_board = game_board.game_board;
        if (game_board[spot] == ''){
            game_board[spot] = sign;
            if (turn == 'player1'){
                turn = 'player2';
            } else {
                turn = 'player1';
            }
        }
        game_board_object.change_board(game_board);
        display_controller.change_turn(turn);
    }
    return {sign, place_sign}
};

const game_controller = (() => {
    const number = Math.floor(Math.random() * Math.floor(2))
    if (number == 1){
        turn = 'player1'
    } else {
        turn = 'player2'
    }
    display_controller.change_turn(turn);
    const player1 = player('X');
    const player2 = player('O');
    
    const perform_go = (id) => {
        if (game_end == 0){
            if (turn == 'player1'){
                player1.place_sign(id)
                check_win();
            } else {
                player2.place_sign(id)
                check_win();
            }
        }

    }
    const check_win = () => {
        const modal = document.querySelector('.modal');
        game_board = game_board_object;
        game_board = game_board.game_board;
        let spaces = 0;
        game_board.forEach(box =>{
            if (box != ''){
                spaces ++
            }
        })
        console.log(turn)
        
        if (game_board[0] != '' && game_board[0] == game_board[3] && game_board[3] == game_board[6] || game_board[1] != '' && game_board[1] == game_board[4] && game_board[4] == game_board[7] || game_board[2] != '' && game_board[2] == game_board[5] && game_board[5] == game_board[8] || game_board[0] != '' && game_board[0] == game_board[4] && game_board[4] == game_board[8] || game_board[2] != '' && game_board[2] == game_board[4] && game_board[4] == game_board[6] || game_board[0] != '' && game_board[0] == game_board[1] && game_board[1] == game_board[2] || game_board[3] != '' && game_board[3] == game_board[4] && game_board[4] == game_board[5] || game_board[6] != '' && game_board[6] == game_board[7] && game_board[7] == game_board[8]){
            const win_div = document.createElement('div');
            win_div.classList.add('winner-container');
            if (turn == 'player2'){
                win_div.textContent = 'Player 1 wins!';
                
            } else {
                win_div.textContent = 'Player 2 wins!';
            }
            modal.appendChild(win_div);
            game_end = 1;
            modal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                  location.reload()
                }
              }
        } else if (spaces == 9){
            const win_div = document.createElement('div');
            win_div.classList.add('winner-container');
            win_div.textContent = 'Draw!';
            modal.appendChild(win_div);
            game_end = 1;
            modal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                  location.reload()
                }
              }
        }
    }
    return {
        perform_go,
    };
})();