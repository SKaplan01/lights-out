import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = { hasWon: false, board: this.createBoard() };
  }

  static defaultProps = { nrows: 3, ncols: 3, chanceLightStartsOn: 0.5 };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.ncols; i++) {
      let row = [];
      for (let j = 0; j < this.props.nrows; j++) {
        Math.random() > this.props.chanceLightStartsOn
          ? row.push(false)
          : row.push(true);
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    hasWon = board.every(row => {
      return row.every(cell => !cell);
    });

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    let rows = [];
    for (let y = 0; y < this.props.ncols; y++) {
      let cellsArray = [];
      for (let x = 0; x < this.props.nrows; x++) {
        cellsArray.push(
          <Cell
            key={`${y}-${x}`}
            isLit={this.state.board[y][x]}
            flipCellsAround={() => this.flipCellsAround(`${y}-${x}`)}
          />
        );
      }
      rows.push(<div>{cellsArray}</div>);
    }
    return (
      // if the game is won, just show a winning msg & render nothing else
      // TODO
      <div className="boardContainer">
        {this.state.hasWon ? 'You won' : rows}
      </div>
      // make table board
      // TODO
    );
  }
}

export default Board;