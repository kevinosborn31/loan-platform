import { calculateAge } from "./calculateAge";

const testCalculateAge = (
  birthDate: Date,
  expectedAge: number
) => {
  const result = calculateAge(birthDate);
  expect(result).toBe(expectedAge);
};

test("calculates age correctly for today’s birthdate", () => {
  const today = new Date();
  testCalculateAge(today, 0);
});

test("calculates age correctly for a birthdate exactly one year ago", () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  testCalculateAge(oneYearAgo, 1);
});

test("calculates age correctly for a birthdate later in the current year", () => {
  const futureBirthDate = new Date();
  futureBirthDate.setFullYear(futureBirthDate.getFullYear() - 25);
  futureBirthDate.setMonth(futureBirthDate.getMonth() + 1); // A future month
  testCalculateAge(futureBirthDate, 24);
});
