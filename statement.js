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

// [ 8) замена переменной volumeCredits]
// [ 9) aParam and var-result ]
function volumeCreditsFor(aPerfomance){
  let result = 0;
  result += Math.max(aPerfomance.audience - 30, 0);
    
  if ('comedy' === playFor(aPerfomance).type) result += Math.floor(aPerfomance.audience / 5);
  return result;
}

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
    // [ 8) замена переменной volumeCredits]
    volumeCredits += volumeCreditsFor(perf)
    // [ 4) Замена временной переменной ]
    // const play = plays[perf.playID];
    // const play = playFor(perf);

    // [ 1) Перенос кода в функцию amountFor() ]
    // [ 5) встраивание переменной playFor(perf)]
    let thisAmount = amountFor(perf, playFor(perf));
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

    // [ 8) замена переменной volumeCredits]
    // volumeCredits += Math.max(perf.audience - 30, 0);
    
    // // [ 5) встраивание переменной playFor(perf)]
    // if ('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // [ 5) встраивание переменной playFor(perf)]
    // [ 7) встраивание переменной amountFor(perf)]
    result += `   ${playFor(perf).name}: ${format(amountFor(perf) / 100)}`;
    result += `   (${perf.audience} seats)\n`;
    // [ 7) встраивание переменной amountFor(perf)]
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

// [ 1) Перенос кода в функцию amountFor()]
// [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
function amountFor(aPerfomance, play) {
  // [ 2) Перименование thisAmount в result ]
  let result = 0;

  // [ 6) изменение обьявления функции playFor(aPerfomance)]
  switch (playFor(aPerfomance).type) {
    case 'tragedy':

      // [ 2) Перименование thisAmount в result ]
      result = 4000;
      // [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
      if (aPerfomance.audience > 30) {

        // [ 2) Перименование thisAmount в result ]
        // [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
        result += 1000 * (aPerfomance.audience - 30);
      }
      break;

    case 'comedy':
      // [ 2) Перименование thisAmount в result ]
      result = 30000;
      // [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
      if (aPerfomance.audience > 20) {
        // [ 2) Перименование thisAmount в result ]
        // [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
        result += 1000 + 500 * (aPerfomance.audience - 20);
      }
      // [ 2) Перименование thisAmount в result ]
      // [ 3) Имя параметра влючает в себя имя типа; a - неопределенный артикль = нет информации; Переименование perf в aPerfomance ]
      result += 300 * aPerfomance.audience;
      break;

    default:
      throw new Error(`unknown type: ${play.type}`);
  }

  // [ 2) Перименование thisAmount в result ]
  return result;
}

// [ 4) Замена временной переменной ]
function playFor(aPerformance){
  return plays[aPerformance.playID]
}

const result = statement(invoices, plays);
console.log(result);

module.exports = { statement, invoices, plays };
