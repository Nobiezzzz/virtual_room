import './App.css'
import Head from './head'
import Queue from './queue'
import Footer from './footer'
import video from './../public/video-kamech.mov'
import React, { createContext, useRef,   useEffect,  useState} from 'react';
import YouTube from 'react-youtube'
export const QueueChangedContext = createContext(null);  
function App() {
  const [queues , setQueues] =  useState({one:[],two:[],three:[],four:[],})
  const [currentValue , setCurrentValue] = useState({number:0 , serviceType:"" , patientId:-1});
  
  const [arrayOfValues, setArrayOfValues] = useState([]);
  const counerContainer = useRef();
  const counterUpdate = useRef();
  const youtubeID = "8006zuLNJlk"
  function displayCurrentCounter(){
    
      counerContainer.current.classList ='counter-update-container1';
      counterUpdate.current.classList ='counter-update1';
      setTimeout(()=>{
        counerContainer.current.classList ='';
        counterUpdate.current.classList ='';
      },4000);
    }
 
  
  return (
  <div>
    <div className="main"
    >
      <Head />
      <QueueChangedContext.Provider value={{queues , setQueues ,setArrayOfValues , arrayOfValues , displayCurrentCounter , setCurrentValue }}>
      <iframe
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&mute=1&loop=1&playlist=${youtubeID}`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>

      <Queue />
      </QueueChangedContext.Provider>
      <Footer />
    </div>
    <div ref={counerContainer} className="counter-update-container">
      <div ref={counterUpdate} className='counter-update'>
        <div className="counter-update-title">
          {currentValue.serviceType}
        </div>
        <div className="counter1">
         {currentValue.number}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
