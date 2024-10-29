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
  const statementData = {}
  statementData.customer = invoice[0].customer
  statementData.performances = invoice[0].performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return renderPlainText(statementData, invoice, plays)
}

function enrichPerformance(aPerfomance){
  const result = Object.assign({}, aPerfomance)
  result.play = playFor(result)
  result.amount = amountFor(result)
  result.volumeCredits = volumeCreditsFor(result)
  return result
}

function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `   ${perf.play.name}: ${usd(perf.amount)}`;
    result += `   (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0)
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
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

  if ('comedy' === aPerfomance.play.type)
    result += Math.floor(aPerfomance.audience / 5);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerfomance, play) {
  let result = 0;

  switch (aPerfomance.play.type) {
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
      throw new Error(`unknown type: ${aPerfomance.play.type}`);
  }

  return result;
}

statement(invoices, plays);
module.exports = { statement, invoices, plays };
