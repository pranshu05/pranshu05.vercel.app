const currentDate = new Date().getTime();
const birthDate = new Date("2005-10-04").getTime();
const ageInMilliseconds = currentDate - birthDate;
export const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));