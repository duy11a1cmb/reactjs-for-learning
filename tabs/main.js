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
let DefaultAmountMoneyPerRound = 40000;
const ArrToTotal = [];

calculatorTx(DefaultAmountMoneyPerRound, 9, 5);

function calculatorTx(amountMoneyPerRound, amountRoundRisk, PercentTax) {
  amountRoundRisk--;
  count++;

  if (amountRoundRisk >= 0) {
    console.group(`Tài Xỉu Avatar round ${count}:`);
    ArrToTotal.push(amountMoneyPerRound);
    console.log(amountMoneyPerRound);
    console.log("Total amount of Money:", Number(ArrToTotal.reduce((acc, cur) => acc += cur)))
    amountMoneyPerRound = Math.floor((amountMoneyPerRound * 2 + DefaultAmountMoneyPerRound) +
      ((amountMoneyPerRound * 2 + DefaultAmountMoneyPerRound) / 100 * PercentTax))
    calculatorTx(amountMoneyPerRound, amountRoundRisk, PercentTax);
  }
  console.groupEnd();
}

console.log("Amount of Money make per hour:", 35 * 40000);


init();


