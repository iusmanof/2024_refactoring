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
  let totalAmount = 0;
  let volumeCredits = 0;

  let result = `Statement for ${invoice[0].customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice[0].performances) {
    const play = plays[perf.playID];

    // [ 1) Перенос кода в функцию amountFor() ]
    let thisAmount = amountFor(perf, play);
    // let thisAmount = 0

    // switch(play.type){
    //     case "tragedy":
    //         thisAmount = 4000
    //         if(perf.audience > 30){
    //             thisAmount += 1000 * (perf.audience - 30)
    //         }
    //         break;

    //     case "comedy":
    //         thisAmount = 30000
    //         if(perf.audience > 20){
    //             thisAmount += 1000 + 500 *(perf.audience - 20)
    //         }
    //         break;

    //     default:
    //         throw new Error (`unknown type: ${play.type}`)
    // }

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += `   ${play.name}: ${format(thisAmount / 100)}`;
    result += `   (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(perf, play) {
  let thisAmount = 0;

  switch (play.type) {
    case 'tragedy':
      thisAmount = 4000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;

    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 1000 + 500 * (perf.audience - 20);
      }
      break;

    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

const result = statement(invoices, plays);
console.log(result);

module.exports = { statement, invoices, plays };
