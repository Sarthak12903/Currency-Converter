const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdown){
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name ==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}


const updateFlag = (element)=>{
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let Image = element.parentElement.querySelector("img");
    Image.src = newSrc;
}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<1){
        amtVal= 1;
        amount.value = "1"
    }

    const newURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`;
     
    let promise = await fetch(newURL);
    const data = await promise.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalAmount = rate*Number(amtVal);
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
    
    


})


