const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab-item');
const panes = $$('.tab-pane');
const tabActive = $('.tab-item.active');
const line = $('.line');


function handleOnClickTabs() {

  tabs.forEach((item, index) => {
    item.onclick = function () {
      const pane = panes[index];

      handleActiveTab.call(this, pane)
      handleAnimationLineInTab.call(this);
    }
  })
}

function handleActiveTab(pane) {
  $('.tab-item.active').classList.remove('active');
  $('.tab-pane.active').classList.remove('active');

  this.classList.add('active');
  pane.classList.add('active');
}

function handleAnimationLineInTab() {
  line.style.left = this.offsetLeft + 'px';
  line.style.width = this.offsetWidth + 'px';
}


function init() {
  line.style.left = tabActive.offsetLeft + 'px';
  line.style.width = tabActive.offsetWidth + 'px';

  handleOnClickTabs();
}

let count = 0;
let defaultAmountMoneyPerRound = 175000;
const ArrToTotal = [];
(function calculatorTx(amountMoneyPerRound, amountRoundRisk, PercentTax, prevTotalMoney) {
  amountRoundRisk--;
  count++;
  if (amountRoundRisk >= 0) {
    ArrToTotal.push(amountMoneyPerRound);
    prevTotalMoney = ArrToTotal.reduce((acc, cur) => acc += cur) - amountMoneyPerRound;
    let moneyTax = amountMoneyPerRound / 100 * 5;
    console.group(`Tài Xỉu Avatar round ${count}:`);
    console.log('Place a bet:', amountMoneyPerRound.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    }).replace(/VND/g, 'xu'));
    console.log('You win: ', (amountMoneyPerRound - moneyTax).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    }).replace(/VND/g, 'xu'));
    console.log('You make a profit: ', ((amountMoneyPerRound - moneyTax) - prevTotalMoney)
      .toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      }).replace(/VND/g, 'xu'));
    console.log("Total amount of Money:",
      Number(ArrToTotal.reduce((acc, cur) => acc += cur)).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      }).replace(/VND/g, 'xu'));
    amountMoneyPerRound = Math.floor((amountMoneyPerRound * 2 + defaultAmountMoneyPerRound) +
      ((amountMoneyPerRound * 2 + defaultAmountMoneyPerRound) / 100 * PercentTax))
    calculatorTx(amountMoneyPerRound, amountRoundRisk, PercentTax, prevTotalMoney);
  }
  console.groupEnd();
})(defaultAmountMoneyPerRound, 9, 5, 0)
console.log("Amount of Money make per hour:", (35 * defaultAmountMoneyPerRound / 100 * 95).toLocaleString('it-IT', {
  style: 'currency',
  currency: 'VND'
}).replace(/VND/g, 'xu'));
console.log(ArrToTotal)

init();


