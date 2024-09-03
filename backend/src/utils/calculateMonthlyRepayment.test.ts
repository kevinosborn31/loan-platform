import { testMonthlyRepayment } from './testing/testMonthlyRepayment';

test('calculates monthly repayment correctly for standard loan', () => {
    testMonthlyRepayment(20000, 5, 5, 500, 387);
});

test('calculates monthly repayment correctly with zero interest rate', () => {
    testMonthlyRepayment(20000, 0, 5, 500, 342);
});

test('calculates monthly repayment correctly with zero fees', () => {
    testMonthlyRepayment(15000, 7, 3, 0, 463);
});

test('calculates monthly repayment correctly with high fees', () => {
    testMonthlyRepayment(15000, 7, 3, 2000, 525);
});