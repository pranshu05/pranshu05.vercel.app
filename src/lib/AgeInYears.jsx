const currentDate = new Date();
const birthDate = new Date("2005-10-04");
const ageInMilliseconds = currentDate - birthDate;
export const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
