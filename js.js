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

//create function "operate" that calls the above functions using the variables
const operate = function(a, b){
    return operator === "a" ? add (a, b)
        : operator === "s" ? subtract (a, b)
        : operator === "m" ? multiply (a, b)
        : operator === "d" ? divide (a, b)
        : "Error"
}

//create function to populate display when number buttons are pressed
const write = (input) =>{
    display === 0 ? display = input
    :display = display.toString() + input
}
let numBttn = document.querySelectorAll(".number")
numBttn.forEach(function(currentBttn){
    currentBttn.addEventListener("click", function(){
        console.log(this.id)
        write(this.id)
        console.log(display)
        let displayDiv = document.querySelector(".display")
        displayDiv.removeChild(displayDiv.firstChild)
        let newDisplay = document.createElement("p")
        newDisplay.textContent = display
        displayDiv.appendChild(newDisplay)
    })
})

//store display variable in num1 or 2 when operator is pushed

//store the operator in variable when it is pushed

//call the operate function when = is pressed, update the display with the answer

//After this is working do more:
//Add if/else arguments to make the operate function call if operator is pushed after num2
//Add if/else argument to allow for changing operater if num2 has not been entered
//Store result of operator in Num1
//Round result decimals to 10 places
//What to do with early = press?
//Clear button - sets num1, num2, display, result and maybe others to 0. unapply operator. More?
//Add snark for divide by 0
//After calculation, new number press clears calculator


//xtra - add decimal ability. Don't let them add more than 1
//add backspace button
//add keyboard support