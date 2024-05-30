import React, { useState, useEffect } from 'react'; 
import './footer.css'; 

export default function Footer() { 
    const [isTranslated, setIsTranslated] = useState(false); 
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsTranslated(prevState => !prevState);
        }, 5000);
        return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
    }, []);
    return ( 
        <div className="footer">
            <p className='footer-text'>
                {isTranslated ? 'اوقات العمل من السبت الى الخميس من 9 صباحا الى 5 مساء' : 'les horaires de travail sont du samedi au jeudi de 3h à 17h'}
            </p> 
        </div> 
    ); 
}