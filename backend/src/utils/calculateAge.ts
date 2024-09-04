export function calculateAge(birthDate: Date): number {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let age = today.getFullYear() - birthYear;
  const monthDifference = today.getMonth() - birthMonth;
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDay)
  ) {
    age--;
  }

  return age;
}
