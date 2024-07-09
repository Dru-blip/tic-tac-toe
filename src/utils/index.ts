export function checkWinner(cells: string[]) {
    const offsets = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let offset of offsets) {
        const [a, b, c] = offset;
        if (cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return "";
}

export function checkForDraw(cells:string[]){
    let winner=checkWinner(cells)

    if(!winner && !isBoardFull(cells)){
        return false
    }
    return true;
}

export function evaluate(cells: string[]) {
    const winner = checkWinner(cells);

    if (winner === 'X') {
        return 10;
    } else if (winner === 'O') {
        return -10;
    }
    return 0;
}

export function isBoardFull(cells: string[]) {
    return cells.every(cell => cell !== '');
}

export function findOptimalMove(cells: string[]) {
    let bestMove = -1;
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {
        if (cells[i] === '') {
            cells[i] = 'O';
            const moveScore = minimax(cells, 0, true);
            cells[i] = '';
            
            if (moveScore < bestScore) {
                bestScore = moveScore;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

export function minimax(cells: string[], depth: number, isMax: boolean) {
    const score = evaluate(cells);

    if (score === 10 || score === -10) {
        return score;
    }

    if (isBoardFull(cells)) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (cells[i] === '') {
                cells[i] = 'X';
                best = Math.max(best, minimax(cells, depth + 1, !isMax));
                cells[i] = '';
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (cells[i] === '') {
                cells[i] = 'O';
                best = Math.min(best, minimax(cells, depth + 1, !isMax));
                cells[i] = '';
            }
        }
        return best;
    }
}
