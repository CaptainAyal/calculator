// create display content
let displayText = document.createElement("p")
displayText.textContent = "0"
let displayDiv = document.querySelector(".display")
displayDiv.appendChild(displayText)

// create functions for addition/subtraction/multiplication/division
const add = (a, b)=>{return a+b};
const subtract = (a, b)=>{return a-b};
const multiply = (a, b)=>{return a*b};
const divide = (a, b)=>{return a/b};

//create variables
let num1;
let num2;
let operator;
let display=0;
let continueFunction = false

//create function "operate" that calls the above functions using the variables
const operate = function(a, b){
    a = Number(a)
    b = Number(b)
    return operator === "+" ? add (a, b)
        : operator === "-" ? subtract (a, b)
        : operator === "*" ? multiply (a, b)
        : operator === "/" ? divide (a, b)
        : "Error"
    
}

//create response for divide by 0
const snark = () =>{
    displayText.textContent = "Error. Click link below for more info"
    const snarky = document.createElement("a")
    const snarkLink = document.createTextNode("Click me for error info!")
    snarky.appendChild(snarkLink)
    snarky.title = "Click me for error info!"
    snarky.href = "https://googlethatforyou.com?q=Why%20can't%20I%20divide%20by%200"
    document.body.appendChild(snarky)
}

//clean up function used after operate and also for clear button 
// - might not be good, review when code is done if we can repurpose the function
// const cleanUp = function(){
// num1 = display
// operator = undefined
// num2 = undefined}
//add to unhighlight operator


//create function to populate display when number buttons are pressed. Decimal is a "number button"
const write = (input) =>{
    //fixes decimal bug -- what was the bug? first line doesn't work, bug seems fixed?
    // if (display != displayText.textContent) {display = displayText.textContent}
    display === 0 && input == "." ? display = "0."
    :input === "." && display.includes(".") ? input = ""
    :display === 0 ? display = input
    :display = display.toString() + input
}

let numBttn = document.querySelectorAll(".number")
numBttn.forEach(function(currentBttn){
    currentBttn.addEventListener("click", function(){
        //clears data in num1 after an equals push
        if(num1 !==undefined && operator ===undefined) {
            num1 = undefined
            display = 0
        }
        //allows for correct operation when stringing calculations together
        else if (continueFunction===true) {
            display = 0
            continueFunction=false
        }
  
        write(this.id)
        displayText.textContent = display
    })
})


//store display variable in num1 or 2 when operator is pushed and operator in operator variable
let opBttn = document.querySelectorAll(".operator")
//Function to highlight the operator
let opHighlight = (ID) => { document.getElementById(ID).className = "operatorToggle"}
let opReset = () => {
    if (document.querySelector(".operatorToggle")) { 
        document.querySelector(".operatorToggle").className = "operator"
}}

opBttn.forEach(function(currentBttn){
    currentBttn.addEventListener("click", function(){
        //Assuming all 3 variables are undefined - Sets num1 and operator. 
        if (num1 === undefined) {
            num1 = display
            display = 0
            displayText.textContent = display
            operator = this.id
            opHighlight(this.id)
        }
        //Sets the operator only when num1 is already selected. This is expected operation after an equals push
        else if (num2 === undefined && num1 !== undefined && operator === undefined){
            operator = this.id
            display = 0
            displayText.textContent = display
            opReset()
            opHighlight(this.id)
        }
        //Sets the operator only. This allows user to switch operator before starting to enter num2
        else if (num2 === undefined && num1 !== undefined && display ===0){
            opReset()
            opHighlight(this.id)
            operator = this.id
        }
        //Allows user to calculate total using operator key instead of equals. User may then enter num2 to continue calculations
        else if(num2 === undefined){
            num2 = display
            display = operate(num1, num2)
            displayText.textContent = display
            if (display === Infinity){snark()}
            else{
            num1 = display
            num2 = undefined
            display = 0
            operator = this.id
            continueFunction = true
            opReset()
            opHighlight(this.id)
            }
            }
        
})
})

//call the operate function when = is pressed, update the display with the answer
let eqBttn = document.querySelector("#equal")
eqBttn.addEventListener("click", () => {
    if(num1 === undefined || operator === undefined){}
    else{
        num2 = display
        display = operate(num1, num2)
        displayText.textContent = display
        if (display === Infinity){snark()}
        else{
        num1 = display
        num2 = undefined
        operator = undefined
        opReset()
    }
    }
})

//Clear button - sets num1, num2, display to 0. unapply operator.
let clBttn = document.querySelector("#clear")
clBttn.addEventListener("click", () =>{
    num1 = undefined
    num2 = undefined
    operator = undefined
    display = 0
    displayText.textContent = display
    continueFunction=false
    opReset()
})

//add backspace button
let bkSpace = document.querySelector("#back")
bkSpace.addEventListener("click", () =>{
    if (typeof display === "string") {
        display = display.slice(0, -1)
        if (display == "") display = 0
        displayText.textContent = display
    }
})

let numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
let opKeys = ["+", "-", "*", "/"]
let clrKey = ["Escape"]
let eqKey = ["Enter"]
let bkKey = ["Backspace", "Delete"]
//add keyboard support
document.addEventListener ("keydown", (event)=> {
    let keyName = event.key
    console.log(keyName)
    if(numKeys.includes(keyName)){
        //clears data in num1 after an equals push
        if(num1 !==undefined && operator ===undefined) {
            num1 = undefined
            display = 0
        }
        //allows for correct operation when stringing calculations together
        else if (continueFunction===true) {
            display = 0
            continueFunction=false
        }

        write(keyName)
        displayText.textContent = display
    } else if(opKeys.includes(keyName)){
        //Assuming all 3 variables are undefined - Sets num1 and operator. 
        if (num1 === undefined) {
            num1 = display
            display = 0
            displayText.textContent = display
            operator = keyName
            opHighlight(keyName)
        }
        //Sets the operator only when num1 is already selected. This is expected operation after an equals push
        else if (num2 === undefined && num1 !== undefined && operator === undefined){
            operator = keyName
            display = 0
            displayText.textContent = display
            opReset()
            opHighlight(keyName)
        }
        //Sets the operator only. This allows user to switch operator before starting to enter num2
        else if (num2 === undefined && num1 !== undefined && display ===0){
            opReset()
            opHighlight(keyName)
            operator = keyName
        }
        //Allows user to calculate total using operator key instead of equals. User may then enter num2 to continue calculations
        else if(num2 === undefined){
            num2 = display
            display = operate(num1, num2)
            displayText.textContent = display
            if (display === Infinity){snark()}
            else{
            num1 = display
            num2 = undefined
            display = 0
            operator = keyName
            continueFunction = true
            opReset()
            opHighlight(keyName)
            }
        }
    } else if(clrKey.includes(keyName)){
            num1 = undefined
            num2 = undefined
            operator = undefined
            display = 0
            displayText.textContent = display
            continueFunction=false
            opReset()
    } else if(eqKey.includes(keyName)){
        if(num1 === undefined || operator === undefined){}
        else{
        num2 = display
        display = operate(num1, num2)
        displayText.textContent = display
            if (display === Infinity){snark()}
            else{
            num1 = display
            num2 = undefined
            operator = undefined
            opReset()
    }}} else if(bkKey.includes(keyName)){
        if (typeof display === "string") {
            display = display.slice(0, -1)
            if (display == "") display = 0
            displayText.textContent = display
        }
    }
    })

// Need to clean up and make pretty
