function makeHeading(index) {
  switch (index) {
    case 0:
      return "Kindergarten";
    case 1:
      return "1st Grade";
    case 2:
      return "2nd Grade";
    case 3:
      return "3rd Grade";

    default:
      return `${index}th Grade`;
  }
}
export default makeHeading;
