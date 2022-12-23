module.exports = (arrayOfAccommodations, domain, listOfAccomms) => {
  const reducedArr = Object.values(listOfAccomms);
  const flattenedArrayOfAccommodations = reducedArr
    .map((list) => {
      return list.join(', ');
    })
    .join(', ')
    .split(', ');
  return arrayOfAccommodations
    .map((accomm) => {
      return accomm.name;
    })
    .filter((accomm) => {
      return flattenedArrayOfAccommodations.includes(accomm);
    });
};
