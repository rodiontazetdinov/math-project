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

  const [isStarted, setIsStarted] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');
 
  const [result, setResult] = useState({
    correct: 0,
    notCorrect: 0
  });
  const [inputData, setInputData] = useState('');


function getQuestion () {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    const c = a * b;
    setAnswers([...answers, +c])
    return `${a} * ${b} = ?`;// `${c}`;
}

function handleSubmit (e) {
  e.preventDefault();
  setAnswers([...answers, inputData]);
  answers[counter] == inputData? setResult({...result, correct: result.correct + 1}) : setResult({...result, notCorrect: result.notCorrect + 1});
  setCounter(counter + 1);

  setInputData('');
  setQuestion(getQuestion());
  //добавить возможность регулировать кол-во примеров
  counter == 99? setIsFinished(!isFinished) : setIsFinished(isFinished);
  counter == 99?  setFinishTime(handleTime(startTime)): setIsFinished(isFinished);
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
          </ul>
        :
          <button className='exercise__start-button' onClick={handleStartButton}>Go</button>
        }
      
      </main>
    </div>
  );
}

export default App;

