import React, { useState,useEffect } from 'react';
import './head.css'

export default function Head(){
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
    }, []);
    return(
        
            <div className="head">
                <div className="date">
                    <p className="date-text">
                        {currentDateTime.toLocaleDateString()} <br />
                        {currentDateTime.getHours()}:{currentDateTime.getMinutes()} 
                        {currentDateTime.getHours() > 12 ? ' PM' : ' AM'}
                    </p>
                </div>
                <div className="titles">
                    Welcome to Kameche Clinic <br />
                    Bienvenue a la Clinique de Kameche <br />
                    مرحبا بكم في عيادة كماش
                </div>
                <img src='logo.png' alt="logo" className="logo" />
            </div>
       
    )
}