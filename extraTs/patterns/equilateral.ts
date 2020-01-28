let i: number;
let j: number;
let k: number;
function equilateral(n: number): void {
  if (n < 11 && n > 1) {
    for (i = 0; i < n; i++) {
      let row: string = ' ';

      for (j = 0; j < n - i; j++) {
        row = row + ' ';
      }

      for (k = 0; k <= i; k++) {
        row = row + '* ';
      }

      console.log(row);
    }
  } else {
    console.log('wrong input');
  }
}
export default equilateral;