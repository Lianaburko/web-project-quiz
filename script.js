let que_count = 0;
let total_amount = localStorage.getItem("number_of_questions"); 
let timeValue = 15;
let corrAnsw = 0;
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'
let counter;
let widthValue = 0;
const quiz_box = document.querySelector(".quiz_box")
const next_btn = quiz_box.querySelector(".next_btn");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
//const result_box = 'end_quiz.html';

let n = parseInt(localStorage.getItem("active_cat")); 


function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }
  
function getRandomElements(array, total_amount) {
    const result = [];
    const arrayCopy = array.slice();
  
    if (total_amount > arrayCopy.length) {
      return arrayCopy;
    }
  
    for (let i = 0; i < total_amount; i++) {
      const randomIndex = getRandomIndex(arrayCopy.length);
      const randomElement = arrayCopy[randomIndex];
  
      result.push(randomElement);
      arrayCopy.splice(randomIndex, 1);
    }
  
    return result;
}
  
const catNElements = elements.filter((element) => element.cat === n);
  
const questions = getRandomElements(catNElements, total_amount);



startTimer(timeValue);
showQuestions(que_count);
queCounter(que_count+1);
startTimerLine(0);

next_btn.onclick =()=>{
    if (que_count < total_amount - 1){
        que_count++;
        showQuestions(que_count);
        queCounter(que_count+1);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    }
    else{
        window.location.href = "end_quiz.html";
    }
}

// numb
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    console.log(index)
    let que_tag = '<span>' +  (que_count+1) + '. ' + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[1] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[2] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns){
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        corrAnsw++; 
    }
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    
    for (let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

function queCounter(index){ 
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span> <p> ' + index +' </p> из ' + total_amount + ' вопросов </span>'
    bottom_ques_counter.innerHTML = totalQuesCountTag;

}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + 'px'
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

localStorage.setItem("number_of_corr_Answ", corrAnsw);