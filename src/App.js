import React, { useEffect, useState } from 'react';
import { FaTwitter  } from "react-icons/fa";
import './App.scss';
import COLORS_ARRAY from "./colorsArray"


let quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("initial state quote a")
  const [author, setAuthor] = useState("initial state author a")
  const [randomNumber, setRandomNumber] = useState
    (0)

  const [quotesArray, setQuotesArray] = useState(null)
  const [changeColor, setChangeColor] = useState(' rgb(78, 85, 192)')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBURL)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteDBURL])


  const getRandomQuote = () => {
    let randInteger = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randInteger)
    setChangeColor(COLORS_ARRAY[randomNumber])
    setQuote(quotesArray[randInteger].quote)
    setAuthor(quotesArray[randInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={
        { backgroundColor: changeColor }}>
        <div>
          <wrapper id="quote-box" style={
            { color: changeColor }}>
            <h3>Random Quote: {randomNumber}</h3>

            <p id="text">
              "{quote}"
        </p>
            <p id="author"> -{author}</p>
           
            <div className="button">
            <a id="tweet-quote" style={
        { backgroundColor: changeColor }} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}><FaTwitter />Tweet Quote</a>
           </div>

            <button id="new-quote" style={
        { backgroundColor: changeColor }} onClick={() => getRandomQuote()}>Generate A Random Quote</button>
               
          </wrapper>
        </div>

      </header>
    </div>
  );
}

export default App;
