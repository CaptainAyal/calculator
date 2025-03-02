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

//create function to populate display when number buttons are pressed. Decimal is a "number button"
const write = (input) =>{
    display.length >= 20 ? {}
    :display === 0 && input == "." ? display = "0."
    :input === "." && display.includes(".") ? input = ""
    :display === 0 ? display = input
    :display = display.toString() + input

    displayText.textContent = display
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
        
    })
})

//Make +/- key work
let negBttn = document.querySelector("#neg")
negBttn.addEventListener("click", () => {
    //exit loop for "0"
    if(display === 0 && continueFunction === false) {}
    //uses correct var for after calculations
    else if ((display === 0 && continueFunction === true) || (num1 == display)){ 
        num1.toString()[0] === "-" ? num1 = num1.toString().slice(1)
        :num1 = "-" + num1
        displayText.textContent = display = num1
    }
    else{
        display.toString()[0] === "-" ? display = display.toString().slice(1)
        :display = "-" + display
        displayText.textContent = display
}
})

//Make x^2 button work
let sqBttn = document.querySelector("#sq")
sqBttn.addEventListener("click", () => {
    if (continueFunction === true) {
        num1 = num1**2
        displayText.textContent = num1
        
        }   
    else if(operator !== undefined){
        display = display**2
        displayText.textContent = display
        
        }
    else{
        display = display**2
        displayText.textContent = num1 = display
        }
    })

//store display variable in num1 or 2 when operator is pushed and operator in operator variable
let opBttn = document.querySelectorAll(".operator")

//Function to highlight/unhighlight the operator
let opHighlight = (ID) => { document.getElementById(ID).className = "operatorToggle"}
let opReset = () => {
    if (document.querySelector(".operatorToggle")) { 
        document.querySelector(".operatorToggle").className = "operator"
}}

//These get called a lot together, make them one function
let cleanUpOp = (ID) => {
    operator = ID
    opReset()
    opHighlight(ID)
    }

//Another group called together
let eqFunc = () => {
    num2 = display
    display = operate(num1, num2)
    displayText.textContent = display
    if (display === Infinity){snark()}
    else{
    num1 = display
    num2 = undefined
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
            display = 0
            displayText.textContent = display
            cleanUpOp(this.id)
        }
        //Sets the operator only. This allows user to switch operator before starting to enter num2
        else if (num2 === undefined && num1 !== undefined && display ===0){
            cleanUpOp(this.id)
        }
        //Allows user to calculate total using operator key instead of equals. User may then enter num2 to continue calculations
        else if(num2 === undefined){
            eqFunc()
            display = 0
            continueFunction = true
            cleanUpOp(this.id)
            }
            })
})


//call the operate function when = is pressed, update the display with the answer
let eqBttn = document.querySelector("#equal")
eqBttn.addEventListener("click", () => {
    if(num1 === undefined || operator === undefined){}
    else{
        eqFunc()
        operator = undefined
        opReset()
    }
    }
)

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
    if(numKeys.includes(keyName)){
        numBttn.forEach(function(currentBttn){
            if(currentBttn.id === keyName) {currentBttn.click()}})
    } else if(opKeys.includes(keyName)){
        opBttn.forEach(function(currentBttn){
            if(currentBttn.id === keyName) {currentBttn.click()}})
    } else if(clrKey.includes(keyName)){clBttn.click()
    } else if(eqKey.includes(keyName)){eqBttn.click()
    } else if(bkKey.includes(keyName)){bkSpace.click()}
    })


