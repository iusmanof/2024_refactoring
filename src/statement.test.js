import { statement, invoices, plays } from './statement'; // no .js

test('correctly generates statement for BigCo', () => {
  const expectedOutput =
    `Statement for BigCo\n` +
    `   Hamlet: $290.00   (55 seats)\n` +
    `   As You Like It: $570.00   (45 seats)\n` +
    `   Othello: $140.00   (40 seats)\n` +
    `Amount owed is $1,000.00\n` +
    `You earned 59 credits\n`;

  expect(statement(invoices, plays)).toBe(expectedOutput);
});
