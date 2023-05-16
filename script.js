/*HINTS FOR CALCULATOR
 */
// 1. GRAB ALL THE BUTTONS FIRST
const btns = document.querySelectorAll(".btn");

//importing the audio file
const audioFile = new Audio("./aa.wav");
// 2. GRAB THE DISPLAY ELEMENT and make display element as 0(zero)
const displayElem = document.querySelector(".display");
let stringToDisplay = "";
let latestOperator = "";
const operators = ["+", "-", "%", "*", "/"];
// 3. LOOP THROUGH ALL THE BUTTONS
// console.log("btns:",btns)
btns.forEach((btn) => {
  // console.log("btn:",btn.innerText)
  // 4. ADD CLICK EVENT LISTNER TO THE BUTTON (inside the lopp)
  btn.addEventListener("click", () => {
    let clickedButton = btn.innerText;
    // 5. GET THE CONTENT OF THE BUTTON and CHECK WHAT BUTTON IS BEING PRESSED

    // blocks user to cli8ck the operator if there is no string and if user press the operator button
    if (operators.includes(clickedButton) && !stringToDisplay.length) {
      return;
    }

    if (clickedButton === "AC") {
      stringToDisplay = "";
      return displayResult("");
    }
    if (clickedButton === "←") {
      stringToDisplay = stringToDisplay.slice(0, -1);
      return displayResult(stringToDisplay);
    }
    if (operators.includes(clickedButton)) {
      latestOperator = clickedButton;
      // console.log("stringToDisplay:", stringToDisplay)
      // console.log("latestOperator is:", latestOperator)

      const lastCharacter = stringToDisplay.slice(-1);
      // console.log("lastCharacter:", lastCharacter)

      if (operators.includes(lastCharacter)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
        // const lastCharacter = stringToDisplay.slice(-1)
        //  console.log("lastCharacter:", lastCharacter)
      }
    }

    if (clickedButton === "=") {
      const lastCharacter = stringToDisplay.slice(-1);

      if (operators.includes(lastCharacter)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
      return displayTotal(stringToDisplay);
    }

    // console.log("clickedButton:",clickedButton)
    stringToDisplay = stringToDisplay + clickedButton;
    // console.log("stringToDisplay:",stringToDisplay)
    displayResult(stringToDisplay);
  });
});
// 10. CREATE A FUNCTION THAT HANDLES THE DISPLAY OF THE ELEMENT ON THE SCREEN

const displayResult = (value) => {
  displayElem.innerText = value || "0";
};

const displayTotal = (value) => {
  const prankedData = sendRandom();

  if (prankedData) {
    audioFile.play();
    displayElem.style.background = "#f53030bd";
    setTimeout(() => (displayElem.style.background = ""), 2000);
  }

  console.log("pranked data is:", prankedData);
  let totalValue = eval(value).toString();
  stringToDisplay = totalValue;
  displayResult(totalValue);
};
// HOMEWORK
/*
if (val === ".")
1. finds the last occurance of the last operator, 
This is done to handle cases where the decimal point is entered after an operator. 
             For example, if the expression is "5+4*", 
            the decimal point should be allowed after the "*", not after the "+".
2. SLICE THAT OUT 
3. check if lastNumberSet already includes a decimal point. 
If it does, it means that a decimal point has already been entered for the current number
use : lastNumberSet.includes(".") and return nothing
4. If there is no lastOperator (which means the expression doesn't have an operator yet) and 
   strToDisplay already includes a decimal point, it means that the decimal point has already 
   been entered for the first number in the expression.
5.  check if (!lastOperator && strToDisplay.includes(".")) then return 
*/

const sendRandom = () => {
  let randomNumber = Math.round(Math.random() * 10);
  return randomNumber < 3 ? randomNumber : 0;
};
// 8. TRICKY: TO CONTROL THE POINT AND EQUALS TO OPERATOR
// 9. CREATE A FUNCTION THAT CALCULATES THE TOTAL VALUE OF THE OPERATION
