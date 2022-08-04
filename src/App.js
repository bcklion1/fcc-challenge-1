import React,{useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import $ from 'jquery';
import "jqueryui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'


  function randQuote(qJSON){
    let chosen= qJSON.quotes[
      Math.floor(Math.random() * qJSON.quotes.length)
    ];
    let currentQuote = chosen.quote;
    let currentAuthor=chosen.author;
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
    return chosen
  }

  function randColor(){
    let colors =  [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];
    return colors[Math.floor(Math.random() * colors.length)]
  }

function App() {
  const [colorData,setColor] = useState(randColor())
  let style={
    backgroundColor:colorData,
    width:"100%",
    height:"100%",
    position:"absolute",
    top:"0",
    margin:"0"
    // padding:"0"
    // border:"0"
  }
  

  var quotesData = (function () {
    var quotesData = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        'dataType': "json",
        'success': function (data) {
            quotesData = data;
        }
    });
    return quotesData;
})();

  return (
    
    <h1 class="d-flex align-items-center justify-content-center" style={style}>
      <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <QuoteBox id="quote-box" changeColor={setColor} color={colorData} json={quotesData}>
      
      </QuoteBox>
      
    </h1>
  );
}

function QuoteBox(props){
    let style={
      backgroundColor:"white",
      margin:"10px",
      width:"35%",
      height:"35%",
      borderRadius:10
    }
    let btnStyle={
      // border:"1px solid black",
      position:"absolute",
      top:"60%",
      width:"35%",
    }
    let smallPadding={
      margin:3,
      marginBottom:10
    }
    let selected = randQuote(props.json)

    let twtLink='https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + selected.quote + '" ' + selected.author)
    return(
      <div  style={style} id="quote-box">
        <div id="text">
          <Quote id="text" color={props.color} quote={selected.quote}/>
        </div>
        <div id="author">
          <Author author={selected.author}/>
        </div>
          <div class="d-flex align-items-center justify-content-around" style={btnStyle}>
            <div>
            <button id="new-quote" style={{...smallPadding,backgroundColor:props.color}} onClick={() => props.changeColor(randColor())} type="button" class="btn btn-primary">New Quote</button>
            </div>
            <div></div>
            <div style={{padding:0}}>
            <button style={smallPadding} type="button" class="btn btn-primary"><FontAwesomeIcon icon={faTumblr}/></button>
            <a target="_blank" rel="noopener noreferrer" href={twtLink} id='tweet-quote'><button style={smallPadding} type="button" class="btn btn-primary"><FontAwesomeIcon icon={faTwitter}/></button></a>
            
            </div>
            
          </div>
          
      
      </div>
    )
  }


function Author(props){
  let style={
    textAlign:"right",
    fontSize:"25%",
    paddingRight:10
  }
  return(
    <p style={style}>- {props.author}</p>
  )
}

function Quote(props){
  let style={
    padding:"5%",
    fontSize:"50%",
    textAlign:"center",
    color:props.color,
    marginBottom:0,
    paddingBottom:"3%"
  }
  return(
    <h1 style={style}><FontAwesomeIcon icon={faQuoteLeft}/> {props.quote}</h1>
  )
}


  

export default App;
