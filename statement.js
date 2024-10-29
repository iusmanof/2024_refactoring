const invoices = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 45,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

function statement(invoice, plays) {
  return renderPlainText(invoice, plays)
}

function renderPlainText(invoice, plays) {
  let result = `Statement for ${invoice[0].customer}\n`;

  for (let perf of invoice[0].performances) {
    result += `   ${playFor(perf).name}: ${usd(amountFor(perf))}`;
    result += `   (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
  result += `You earned ${totalVolumeCredits(invoice)} credits\n`;
  return result;
}

function totalAmount(invoice) {
  let result = 0;

  for (let perf of invoice[0].performances) {
    result += amountFor(perf);
  }

  return result;
}

function totalVolumeCredits(invoice) {
  let result = 0;

  for (let perf of invoice[0].performances) {
    result += volumeCreditsFor(perf);
  }

  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function volumeCreditsFor(aPerfomance) {
  let result = 0;
  result += Math.max(aPerfomance.audience - 30, 0);

  if ('comedy' === playFor(aPerfomance).type)
    result += Math.floor(aPerfomance.audience / 5);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerfomance, play) {
  let result = 0;

  switch (playFor(aPerfomance).type) {
    case 'tragedy':
      result = 4000;
      if (aPerfomance.audience > 30) {
        result += 1000 * (aPerfomance.audience - 30);
      }
      break;

    case 'comedy':
      result = 30000;
      if (aPerfomance.audience > 20) {
        result += 1000 + 500 * (aPerfomance.audience - 20);
      }
      result += 300 * aPerfomance.audience;
      break;

    default:
      throw new Error(`unknown type: ${play.type}`);
  }

  return result;
}

statement(invoices, plays);
module.exports = { statement, invoices, plays };
