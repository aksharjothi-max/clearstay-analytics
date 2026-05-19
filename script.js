
const header = document.querySelector('[data-header]');
const progress = document.getElementById('scrollProgress');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

function updateScrollUi(){
  const top = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if(progress) progress.style.width = height > 0 ? `${(top/height)*100}%` : '0%';
  if(header) header.classList.toggle('scrolled', top > 12);
}
window.addEventListener('scroll', updateScrollUi, {passive:true});
updateScrollUi();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const revenueInput = document.getElementById('monthlyRevenue');
const improvementInput = document.getElementById('improvementRate');
const monthsInput = document.getElementById('monthsMeasured');
const calcResult = document.getElementById('calcResult');
function formatMoney(num){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(num || 0)}
function updateCalc(){
  if(!revenueInput || !improvementInput || !monthsInput || !calcResult) return;
  const monthly = Number(revenueInput.value) || 0;
  const rate = (Number(improvementInput.value) || 0) / 100;
  const months = Number(monthsInput.value) || 12;
  calcResult.textContent = formatMoney(monthly * rate * months);
}
[revenueInput, improvementInput, monthsInput].forEach(input=>input && input.addEventListener('input', updateCalc));
updateCalc();
