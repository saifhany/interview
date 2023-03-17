/*
This program takes as input the 2D arrays rows and passengers, which represent the seating layout and the number of passengers in each row, respectively. It first checks if there are enough seats for all passengers, and returns an error message if not.

It then creates a seating array to represent the actual seating arrangement, and iterates over each seat in the seating layout. If there are passengers waiting in the queue and the current seat is an aisle or window seat, it assigns the seat to the passenger(s) in the queue. Otherwise, it assigns the seat to an empty seat.

The program keeps track of the current row, column, and direction of seating (left or right), and updates these values as needed. Once all seats have been assigned, the final seating array is logged to the console.

Note that this is just one possible solution to the problem, and there may be other ways to implement the seat assignment algorithm */

function seatPassengers(rows, cols, passengers) {
  const totalSeats = rows.reduce((acc, row) => acc + row, 0);
  const numPassengers = passengers.reduce((acc, row) => acc + row[1], 0);
  if (numPassengers > totalSeats) {
    console.log('Error: Not enough seats for all passengers');
    return;
  }
  
  let seating = [];
  let row = 0;
  let col = 0;
  let direction = 'right';
  for (let i = 0; i < totalSeats; i++) {
    if (!seating[row]) seating[row] = [];
    if (passengers.length > 0 && (i === 0 || col === 0 || col === cols[row] - 1)) {
      const [passRow, numPass] = passengers[0];
      if (numPass > cols[row]) {
        console.log('Error: Too many passengers in queue for row');
        return;
      }
      for (let j = 0; j < numPass; j++) {
        if (direction === 'right') {
          seating[row][col + j] = 'X';
        } else {
          seating[row][col - j] = 'X';
        }
      }
      passengers.shift();
    } else {
      seating[row][col] = '-';
    }
    
    if (direction === 'right') {
      col++;
      if (col === cols[row]) {
        row++;
        col--;
        direction = 'left';
      }
    } else {
      col--;
      if (col < 0) {
        row++;
        col++;
        direction = 'right';
      }
    }
  }
  
  console.log(seating);
}

const rows = [ [3,4], [4,5], [2,3], [3,4] ];
const passengers = [ [3,2], [4,3], [2,3], [3,4] ];
seatPassengers(rows, passengers);

