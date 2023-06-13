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

init();


