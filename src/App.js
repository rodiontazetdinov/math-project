import './App.css';

import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import { handleTime } from './utils/functions';

//добавить:
//начальный экран с выбором кол-ва примеров
//убрать умножение на 0, 1, 10, 100
//добавить обзор ошибок
//добавить коэфицент внимательности (разница между правильным ответом и неправильным)
//добавить коэфицент сосредоточенности (среднее время решения одного примера)

function App() {

  const [counter, setCounter] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  const [concentrationTime, setConcetrationtime] = useState(0);
  const [attention, setAttention] = useState('');

  const [isStarted, setIsStarted] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');
  //исправить на 49
  const [questionsCount, setQuestionsCount] = useState(2);
 
  const [result, setResult] = useState({
    correct: 0,
    notCorrect: 0,
    concentrationTime: 0,
    attention: ''
  });
  const [inputData, setInputData] = useState('');


function getQuestion () {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    const c = a * b;
    setQuestions([...questions, +c])
    return `${a} * ${b} = ?`;
}

function handleSubmit (e) {
  e.preventDefault();
  // setQuestions([...questions, inputData]);
  setAnswers([...answers, +inputData]);
  console.log(questions[counter], inputData);
  // questions[counter] == inputData? console.log('da') : console.log('net');
  questions[counter] == inputData? setResult((result) => ({...result, correct: result.correct + 1})) : setResult((result) => ({...result, notCorrect: result.notCorrect + 1}));
  console.log(result);
  setCounter(counter + 1);

  setInputData('');
  setQuestion(getQuestion());
  //добавить возможность регулировать кол-во примеров
  handleFinish(counter, questionsCount, isFinished, startTime);
  // console.log(questions);
  // console.log(answers, 'answers');
  // console.log(result);
}

function handleAttention (counter, questionsCount) {
  if (counter == questionsCount) {
    let questionsSum = questions.reduce((previuousAnswer, nextAnswer) => previuousAnswer + nextAnswer, 0);
    let answersSum = answers.reduce((previuousAnswer, nextAnswer) => previuousAnswer + nextAnswer, 0);
    console.log(questionsSum);
    console.log(answersSum);
    setResult((result) => ({...result, attention: `${answersSum / questionsSum * 100}%`}));
    console.log(answersSum);
  }
}

function handleFinish (counter, questionsCount, isFinished, startTime) {
  counter == questionsCount? setIsFinished(!isFinished) : setIsFinished(isFinished);
  counter == questionsCount?  setFinishTime(handleTime(startTime)) : setIsFinished(isFinished);
  handleAttention();
}


function handleChange (e) {
  setInputData(e.target.value)
}

function handleStartButton () {
  setQuestion(getQuestion());
  setIsStarted(!isStarted);
  setStartTime(performance.now());
}
  return (
    <div className="App">
      <header className="header">
        {isStarted?
          <div className='header__counter'>{counter}</div>
          :
          ''
        }
        
      </header>
      <main className='main'>
        {isStarted?
          !isFinished?
          <form className='exercise' onSubmit={handleSubmit}>
            <label className='exercise__label'>
              {question}
              <input className='exercise__input' type="text" name="name" onChange={handleChange} value={inputData}/>
            </label>
            <input className='exercise__input exercise__input_type_submit' type="submit" value="Ответить" />
          </form>
          :
          <ul className='exercise__result'>
            <li className='exercise__result-item'>
              Время: {`${finishTime} минут`}
            </li>
            <li className='exercise__result-item'>
              Правильно: {result.correct}
            </li>
            <li className='exercise__result-item'>
              Не правильно: {result.notCorrect}
            </li>
            <li className='exercise__result-item'>
              Концентрация: {result.concentrationTime}
            </li>
            <li className='exercise__result-item'>
              Внимательность: {result.attention}
            </li>
          </ul>
        :
          <button className='exercise__start-button' onClick={handleStartButton}>Go</button>
        }
      
      </main>
    </div>
  );
}

export default App;

