import { statement, invoices, plays } from './statement'; // no .js

test('correctly generates statement for BigCo', () => {
  const expectedOutput =
    `<h1>Statement for BigCo</h1>\n` +
    `<table>\n` +
    `<tr><th>play</th><th>seats</th><th>cost</th></tr>\n` +
    `<tr><td>Hamlet</td><td>$290.00</td><td>55</td></tr>\n` +
    `<tr><td>As You Like It</td><td>$570.00</td><td>45</td></tr>\n` +
    `<tr><td>Othello</td><td>$140.00</td><td>40</td></tr>\n` +
    `<p>Amount owed is <em>$1,000.00</em></p>\n` +
    `<p>You earned <em>59</em> credits</p>\n` +
    `</table>\n`;

  expect(statement(invoices, plays)).toBe(expectedOutput);
});
