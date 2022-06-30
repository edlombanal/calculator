
function addText(term,num){
    console.log('hit!');
    terms[term].textContent=terms[term].textContent+num;
}

function add(num1,num2){
    return parseFloat(num1)+parseFloat(num2);
}

function operate(num1,num2,op){
    switch(op){
        case "":
            return num1;
            break;
        case "+":
            return add(num1,num2);
            break;
    };
}

//State Variables
//  term1 : add to first term
//  term2 : add to second term
//  term3 : execute operation
//  term4 : operation concluded
var termSelect = 1;

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const terms = [document.querySelector('.result'),document.querySelector('.first'),document.querySelector('.second'),document.querySelector('.third')]

//Event Listeners for numbers
numbers.forEach((e)=>{
    e.addEventListener('click',()=>{
        addText(0,e.textContent);
    });
});

//Event Listener for equal
equal.addEventListener('click',()=>{
    if(termSelect === 4){
        terms[1].textContent = terms[0].textContent;
        terms[0].textContent = operate(terms[1].textContent,terms[3].textContent,terms[2].textContent);
    }else{
        addText(3,terms[0].textContent);
        terms[0].textContent = operate(terms[1].textContent,terms[3].textContent,terms[2].textContent);
        termSelect = 4;
    }
});

//Event Listeners for operators
operators.forEach((e)=>{
    e.addEventListener('click',()=>{
        switch(termSelect){
            case 1:
                addText(1,terms[0].textContent);
                addText(2,e.textContent);
                terms[0].textContent = " ";
                termSelect = 2;
                break;
            case 2:
                terms[2].textContent = e.textContent;
                terms[3].textContent = terms[0].textContent;
                terms[0].textContent=operate(terms[1].textContent,terms[0].textContent,e.textContent);
                

        };
        
    });
});

