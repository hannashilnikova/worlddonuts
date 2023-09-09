let question = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let containerH3 = document.querySelector('.container_h3')
let start_button = document.querySelector('.btn-start')
let container_start = document.querySelector('.start')
let container_main = document.querySelector('.main')

let signs_list = ['+', '-', '*', '/']
                //0  1  2  3
function getRandomSign(){
    return signs_list[randit(0,3)]
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторяется до тех пор, пока остаются элементы для перемешивания
    randomIndex = Math.floor(Math.random() * currentIndex); // Выбираем оставшийся элемент.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Меняем местами с текущим элементом.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Возвращаем перемешанный массив
}
class Question{
    constructor(){
        let a = randit(1,30)
        let b = randit(1,30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if(sign == '+'){
            this.correct_answer = a+b
        }else if (sign =='*'){
            this.correct_answer = a*b
        }else if (sign =='/'){
        this.correct_answer = a/b
        }else if (sign =='-'){
        this.correct_answer = a-b
        }
        this.answers=[
        randit(this.correct_answer-15, this.correct_answer-1),
        randit(this.correct_answer-15, this.correct_answer-1),
        this.correct_answer,
        randit(this.correct_answer-15, this.correct_answer-1),
        randit(this.correct_answer-15, this.correct_answer-1),
        ]
        shuffle(this.answers)
    }
    display(){
        question.innerHTML = this.question
        for (let i=0; i < answer_buttons.length; i +=1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }            
} 
function randit(min,max){
    return Math.round(Math.random() *(max-min) + min)
}
let total_question_asked
let current_question
let right_amount
start_button.addEventListener('click', function(){
container_main.style.display = 'flex'
container_start.style.display = 'none'
total_question_asked = 0
 current_question = new Question()
current_question.display()
right_amount = 0
setTimeout(function(){
container_main.style.display = 'none'
container_start.style.display = 'flex'
    containerH3.innerHTML=`Вы дали ${right_amount} правильных ответов ${total_question_asked}
      Точность - ${Math.round(right_amount * 100 / total_question_asked)}%`
    },10000)
})
//let question_list = [
     //new Question(`${a} + ${b}`,
   // randit((a+b)-15, (a+b)-1),
   // randit((a+b)-15, (a+b)-1),
      //  a+b,
    //randit((a+b)-15, (a+b)-1),
   // randit((a+b)-15, (a+b)-1)),
    //new Question('2 - 2', '3','2', '0', '5', '10'),
   // new Question('2 * 2', '3','2', '4', '5', '10'),
//]
for (let i=0; i < answer_buttons.length; i+=1){
    answer_buttons[i].addEventListener('click', function(){
    if (answer_buttons[i].innerHTML == current_question.correct_answer){
        console.log('Правильно')
        right_amount +=1
        answer_buttons[i].style.background = '#00FF00';
        anime({
            targets: answer_buttons[i],
            background: '#FFFFFF',
            duration: 500,
            delay:100,
            easing:'linear'
        })
    }else{
        console.log('Неправильно')
        answer_buttons[i].style.background = '#FF0000';
        anime({
            targets: answer_buttons[i],
            background: '#FFFFFF',
            duration: 500,
            delay:100,
            easing:'linear'
        })
    }
    total_question_asked +=1
    current_question = new Question()
    current_question.display()
    })
}
