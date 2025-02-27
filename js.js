// create display content
let displayText = document.createElement("p")
displayText.textContent = "0"
let displayDiv = document.querySelector(".display")
displayDiv.appendChild(displayText)

// create function for addition
const add = (a, b)=>{return a+b};

// create function for subtraction
const subtract = (a, b)=>{return a-b};

// create function for multiplication
const multiply = (a, b)=>{return a*b};

// create function for division
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
    return operator === "a" ? add (a, b)
        : operator === "s" ? subtract (a, b)
        : operator === "m" ? multiply (a, b)
        : operator === "d" ? divide (a, b)
        : "Error"
    
}

//clean up function used after operate and also for clear button 
// - might not be good, review when code is done if we can repurpose the function
// const cleanUp = function(){
// num1 = display
// operator = undefined
// num2 = undefined}
//add to unhighlight operator


//create function to populate display when number buttons are pressed
const write = (input) =>{
    display === 0 ? display = input
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
opBttn.forEach(function(currentBttn){
    currentBttn.addEventListener("click", function(){
        //Sets num1 and operator. This is a normal expected flow from user
        if (num1 === undefined) {
            num1 = display
            display = 0
            displayText.textContent = display
            operator = this.id
        }
        //Sets the operator only when num1 is already selected. This is expected operation after an equals push
        else if (num2 === undefined && num1 !== undefined && operator === undefined){
            operator = this.id
            display = 0
            displayText.textContent = display
        }
        //Sets the operator only. This allows user to switch operator before starting to enter num2
        else if (num2 === undefined && num1 !== undefined && display ===0){
            operator = this.id
        }
        //Allows user to calculate total using operator key instead of equals. User may then enter num2 to continue calculations
        else if(num2 === undefined){
            num2 = display
            display = operate(num1, num2)
            displayText.textContent = display
            num1 = display
            num2 = undefined
            operator = this.id
            continueFunction = true
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
        num1 = display
        num2 = undefined
        operator = undefined
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
})

//After this is working do more:
//Add if/else arguments to make the operate function call if operator is pushed after num2
//Add if/else argument to allow for changing operater if num2 has not been entered

//Round result decimals to 10 places
//What to do with early = press?
//Clear button - sets num1, num2, display, result and maybe others to 0. unapply operator. More?
//Add snark for divide by 0
//After calculation, new number press clears calculator


//xtra - add decimal ability. Don't let them add more than 1
//add backspace button
//add keyboard support