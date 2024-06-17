import React, { useState, useEffect } from 'react';

function QuoteMachine() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].text);
        setAuthor(data[randomIndex].author);
      });
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="container">
      <div id="text">{quote}</div>
      <div id="author">- {author}</div>
      <button id="new-quote" onClick={fetchQuote}>New Quote</button>
      <a id="tweet-quote" href="#" onClick={tweetQuote}>
        Tweet Quote
      </a>
    </div>
  );
}

export default QuoteMachine;