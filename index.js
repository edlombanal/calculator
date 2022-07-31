
function addText(term,num){
    terms[term].textContent=terms[term].textContent+num;
}

function add(num1,num2){
    return parseFloat(num1)+parseFloat(num2);
}

function subtract(num1,num2){
    return parseFloat(num1)-parseFloat(num2);
}

function multiply(num1,num2){
    return parseFloat(num1)*parseFloat(num2);
}

function divide(num1,num2){
    if(num2==0){
        termSelect = 6;
        return "NaN"
    }else{
        return parseFloat(num1)/parseFloat(num2);
    }  
}

function modder(num1,num2){
    if(num2==0){
        termSelect = 6;
        return "NaN"
    }else{
        return parseFloat(num1)%parseFloat(num2);
    }  
}

function add(num1,num2){
    if(num2==null){
        num2=0;
    }
    return parseFloat(num1)+parseFloat(num2);
}

function operate(num1,num2,op){
    let result;
    switch(op){
        case "":
            result = num1;
            break;
        case "+":
            result = add(num1,num2);
            break;
        case "-":
            result = subtract(num1,num2);
            break;
        case "/":
            result = divide(num1,num2);
            break;
        case "x":
            result = multiply(num1,num2);
            break;
        case "%":
            result = modder(num1,num2);
            break;
        default:
            break;
    };
    if(result == 'NaN'){
        return result;
    }
    return Math.round(result*100)/100;
}

//State Variables
// stage1
// no numbers in any term

// stage2
// numbers in term 0

// stage3
// number in term 1 and current operator

// stage4
// number in term 1, current operator, and number entered

// stage5
// number in term 1, operator, term2, and result

// stage6
// NaN

var termSelect = 1;

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clearb = document.querySelector('#clear');
const clearnumb = document.querySelector('#clearnum');
const sign = document.querySelector('.sign');
const point = document.querySelector('.point');
const terms = [document.querySelector('.result'),document.querySelector('.first'),document.querySelector('.second'),document.querySelector('.third')];

//Event Listeners for numbers
numbers.forEach((e)=>{
    e.addEventListener('click',()=>{
        addText(0,e.textContent);
        switch(termSelect){
            case 1:
                termSelect = 2;
                break;
            case 3:
                termSelect = 4;
                break;
            case 5:
            case 6:
                terms[0].textContent = '';
                terms[1].textContent = '';
                terms[2].textContent = '';
                terms[3].textContent = '';
                addText(0,e.textContent);
                termSelect = 2;
                break;
            default:
                break;
        };
    });
});

// Event Listener for equal
equal.addEventListener('click',()=>{
    switch(termSelect){
        case 1:
            break;
        case 2:
            break;
        case 3:
            terms[3].textContent = 0;
            terms[0].textContent = terms[1].textContent;
            termSelect = 5;
            break;
        case 4:
            terms[3].textContent = terms[0].textContent;
            terms[0].textContent = operate(terms[1].textContent,terms[0].textContent,terms[2].textContent);
            termSelect = 5;
            break;
        case 5:
            terms[1].textContent = terms[0].textContent;
            terms[0].textContent = operate(terms[1].textContent,terms[3].textContent,terms[2].textContent);
            break;
        case 6:
            break;
        default:
            break;
    }
});

//Event Listeners for operators
operators.forEach((e)=>{
    e.addEventListener('click',()=>{
        let opResult;
        switch(termSelect){
            case 1:
                terms[1].textContent = 0;
                terms[2].textContent = e.textContent;
                termSelect = 3;
                break;
            case 2:
                terms[1].textContent = terms[0].textContent;
                terms[2].textContent = e.textContent;
                terms[0].textContent = '';
                termSelect = 3;
                break;
            case 3:
                terms[2].textContent = e.textContent;
                break;
            case 4:
                opResult = operate(terms[1].textContent,terms[0].textContent,terms[2].textContent);
                if(opResult=='NaN'){
                    terms[3].textContent = terms[0].textContent;
                    terms[0].textContent = opResult;
                    termSelect = 6;
                    break;
                }
                terms[1].textContent = opResult;
                terms[2].textContent = e.textContent;
                terms[0].textContent = '';
                termSelect = 3;
                break;
            case 5:
                terms[1].textContent = terms[0].textContent;
                terms[2].textContent = e.textContent;
                terms[3].textContent = '';
                terms[0].textContent = '';
                termSelect = 3;
                break;
            case 6:
                terms[1].textContent = 0;
                terms[2].textContent = e.textContent;
                terms[3].textContent = '';
                terms[0].textContent = '';
                termSelect = 3;
                break;
            default:
                break;
        };
    });
});

//Event Listeners for clear buttons
clearb.addEventListener('click',()=>{
    terms[0].textContent = '';
    terms[1].textContent = '';
    terms[2].textContent = '';
    terms[3].textContent = '';
    termSelect = 1;
});

clearnumb.addEventListener('click',()=>{
    terms[0].textContent = '';
    switch(termSelect){
        case 1:
            break;
        case 2:
            termSelect = 1;
            break;
        case 3:
            break;
        case 4:
            termSelect = 3;
            break;
        case 5:
        case 6:
            terms[0].textContent = '';
            terms[1].textContent = '';
            terms[2].textContent = '';
            terms[3].textContent = '';
            termSelect = 1;
            break;
        default:
            break;
    }
});

//Event Listeners for decimals
point.addEventListener('click',()=>{
    if(terms[0].textContent == ''){
        terms[0].textContent = '0.';
    }
});
