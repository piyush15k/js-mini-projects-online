const BASE_URL='https://api.exchangerate-api.com/v4/latest/USD';


const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg');


for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement('option');
    newOption.innerText=currCode;
    newOption.value=currCode;
    if (select.name==='from' && currCode==='USD'){
        newOption.selected='selected';
    }else if(select.name==='to' && currCode==='INR'){
         newOption.selected='selected';
    }
    select.append(newOption);
  
  }
  select.addEventListener('change', (evt)=>{
    updateFlag(evt.target);
  });
}  

const updateFlag=(element)=>{
  let currCode= element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector('img'); 
  img.src=newSrc;
};

btn.addEventListener('click',async (evt)=>{
  evt.preventDefault();
  let amount=document.querySelector('.amount input');
  let amtVal=amount.value;
  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value='1';
  }

  const URL=`https://api.exchangerate-api.com/v4/latest/${fromCurr.value.toLowerCase()}`;
  let response= await fetch(URL);
  let data= await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmount= rate*amtVal;
  msg.innerHTML=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
});                                                                                                                                                       