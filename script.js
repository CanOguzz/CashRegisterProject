let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
const EPSILON = 0.0001;
const priceElm = document.getElementById("price");
priceElm.innerText = `Price: $${price}`;
// Define all the variables

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");

//create purchase function

const purchase = () => {
  
    const userInput =  cashInput.value; 

    //define base values for changes
    const baseValues = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        ONE: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "ONE HUNDRED": 100
    };

    //calcullate total change in drawer
    let totalCID = 0;

    for(let i =0; i < cid.length; i++){
        totalCID += cid[i[1]];
    }
    // Convert totalCID to a string and format it to have exactly two digits after the decimal point
    totalCID = totalCID.toFixed(2);

    //calculate changeOwed 
    let changeOwed = userInput - price;

    const changeArray = [];

    //if userInput is less than price
    if(userInput < price){
        alert("Customer does not have enough money to purchase the item")
    //if userInput is equal to price   
    }else if(userInput == price){
        changeDue.textContent = "No change due - customer paid with exact cash";
    //if changeOwed is greater than totalCID
    } else if (changeOwed > totalCID) {
        changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }else{
    //reverse the cid array beacuse we want to start with the highest denomination
    cid = cid.reverse();

    //loop through the cid array
    
    for(let i = 0; i < cid.length; i++){
        //get the currency name
        const currency = cid[i][0];
        //get the base value of the currency
        const currencyValue = baseValues[currency];
        //get the currency amount
        let currencyAmount = cid[i][1];
        //initialize the currencyUsed variable
        let currencyUsed = 0

        //while changeOwed is greater than the currencyValue and currencyAmount is greater than 0
        while(changeOwed >= currencyValue && currencyAmount > 0){
            //subtract the currencyValue from changeOwed
            changeOwed -= currencyValue
            changeOwed= changeOwed.toFixed(2);
            currencyAmount -=currencyValue
            currencyUsed += currencyValue
            }

        if(currencyUsed > 0){
            changeArray.push([currency,currencyUsed])
            cid[i][1] = currencyAmount
            }
        
        // Recalculate totalCID after giving change
        totalCID = 0;
        for(let i =0; i < cid.length; i++){
            totalCID += cid[i][1];
        }
        totalCID = totalCID.toFixed(2);
        }

    

    // Print the formatted changeArray
    // Convert the changeArray to the desired format
    const formattedChangeArray = changeArray.map(change => `${change[0]}: $${parseFloat(change[1]).toFixed(2)}`).join(", ");

    // Print the formatted changeArray
    console.log(formattedChangeArray);

    // Update the changeDue element based on the status
    if (changeOwed > 0) {
        changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    //This is done to handle precision errors in JavaScript's floating point arithmetic. If the absolute difference is less than epsilon, it means the cash register has just enough funds to give the correct change and will be closed after the transaction
    } else if (Math.abs(changeOwed - totalCID) < EPSILON) {
        changeDue.innerText = "Status: CLOSED" +  " " + formattedChangeArray;
    } else {
        changeDue.innerText = "Status: OPEN" + " " + formattedChangeArray;
    }

    }

}

// add event listener to the purchase button  
purchaseButton.addEventListener("click", purchase); 
