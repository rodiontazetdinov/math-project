'use strict';

const questions = [];
const answers = [];

const result = {
    correct: 0,
    notCorrect: 0
}



for (let i=0; i < 100; i++) {
    multiply();
}

for (let i=0; i < 100; i++) {
    question(i);
}

console.log(result);
console.log(answers);

function multiply () {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    const c = a * b;
    questions.push([`${a} * ${b} = ?`, `${c}`])
}

function question (i) {
    const answer = prompt(`сколько будет ${questions[i][0]}`, '');
    if (questions[i][1] == answer) {
        result.correct += 1;
    } else {
        result.notCorrect += 1;
        answers.push([questions[i], answer]);
    }
}

function getMathResult(num, mult) {
    let string = `${num}`;
    let base = num;
    if (typeof mult !== 'number'|| mult < num || mult === num ) {
        return num;
    } else {
        for (let i=0;i<mult-1;i++) {
            if (i === 0) {
                string += `---${num + base}`
            } else {
                num += base;
                string += `---${num + base}`
            }
        }
    }
    return string;
}

console.log(getMathResult(5,3));