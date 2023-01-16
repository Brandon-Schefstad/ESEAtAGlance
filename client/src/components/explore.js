const string = 'combat1combat2combat3combat4combat5"';
const searcher = "15";
console.log(string.split(searcher).length - 1);

function findAmountOfSubstring(string, searcher) {
  // Iterate through string, checking if each letter matches the first letter of searcher
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.slice(i, i + searcher.length) === searcher) {
      count += 1;
    }
  }
  return count;
}
console.log(findAmountOfSubstring(string, searcher));
