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

  // difficulty --> an integer that represents how many "clicks" will happen to render the board from a solved board
  static defaultProps = { nrows: 5, ncols: 5, difficulty: 4 };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create solved board (array-of-arrays of false values)
    for (let i = 0; i < this.props.ncols; i++) {
      let row = [];
      for (let j = 0; j < this.props.nrows; j++) {
        row.push(false);
      }
      board.push(row);
    }

    // "click" the board n times (where n is difficulty level)
    for (let i = 0; i < parseInt(this.props.difficulty); i++) {
      //generate a random coordinate
      let y = Math.floor(Math.random() * parseInt(this.props.ncols));
      let x = Math.floor(Math.random() * parseInt(this.props.nrows));
      let coord = `${y}-${x}`;
      this.flipCellsAround(coord, board);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCell(y, x, board) {
    let { ncols, nrows } = this.props;
    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      board[y][x] = !board[y][x];
    }
  }

  flipCellsAround(coord, board) {
    let [y, x] = coord.split('-').map(Number);

    // TODO: flip this cell and the cells around it
    this.flipCell(y, x, board);
    this.flipCell(y, x + 1, board);
    this.flipCell(y, x - 1, board);
    this.flipCell(y - 1, x, board);
    this.flipCell(y + 1, x, board);
  }
  // win when every cell is turned off
  // TODO: determine is the game has been won

  checkForWin() {
    let { hasWon, board } = this.state;
    hasWon = board.every(row => {
      return row.every(cell => !cell);
    });

    this.setState({ board, hasWon });
  }

  afterClick(coord, board) {
    this.flipCellsAround(coord, board);
    this.checkForWin();
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
            flipCellsAround={() =>
              this.afterClick(`${y}-${x}`, this.state.board)
            }
          />
        );
      }
      rows.push(
        <div className="rowContainer" key={y}>
          {cellsArray}
        </div>
      );
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
