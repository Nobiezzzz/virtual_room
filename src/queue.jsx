import { QueueChangedContext } from './App';
import './queue.css';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io("wss://queue.galataluxe.com");

function Counter({ currentPatient }) {
  return (
    <div className="counter-section">
      <label className='service-label'>{currentPatient["serviceType"]}</label>
      <div className='counter'>{currentPatient["number"] < 10 ? "0" + currentPatient["number"] : currentPatient["number"]}</div>
    </div>
  );
}

export default function Queue() {
  const { queues, setQueues, setArrayOfValues, arrayOfValues, displayCurrentCounter, setCurrentValue } = useContext(QueueChangedContext);
  const [displayQueue, setDisplayQueue] = useState([]);

  useEffect(() => {
    const handleQueueUpdate = (data) => {
      if (data) {
        setQueues(data);
      }
    };

    const handleData = (data) => {
      const s = data["serviceType"] === "Consultation" ? "one" : data["serviceType"] === "Radio" ? "two" : data["serviceType"] === "Test" ? "three" : "four";
      if (queues[s].length > 0) {
        const first = queues[s][0];
        if (first["number"] !== data["number"]) {
          setArrayOfValues(prevArray => [...prevArray, data]);
        }
      } else {
        setArrayOfValues(prevArray => [...prevArray, data]);
      }
    };

    socket.on('queue', handleQueueUpdate);
    socket.on('new_data', handleData);

    return () => {
      socket.off('queue', handleQueueUpdate);
      socket.off('new_data', handleData);
    };
  }, [queues, setQueues, setArrayOfValues]);

  useEffect(() => {
    if (arrayOfValues.length > 0) {
      const newDisplayQueue = arrayOfValues.map((value, index) => ({
        serviceType: value.serviceType,
        number: value.number,
        patientId: value.patientId,
        delay: index * 4000
      }));
      setDisplayQueue(newDisplayQueue);
    }
  }, [arrayOfValues]);

  useEffect(() => {
    if (displayQueue.length > 0) {
      const { serviceType, number, patientId, delay } = displayQueue[0];
      const timerId = setTimeout(() => {
        setCurrentValue({ serviceType, number, patientId });
        displayCurrentCounter();
        setDisplayQueue(prevQueue => prevQueue.slice(1)); 
        setArrayOfValues(prevArray => prevArray.slice(1)); 
      }, delay);

      return () => clearTimeout(timerId); 
    }
  }, [displayQueue, setCurrentValue, displayCurrentCounter, setArrayOfValues]);

  return (
    <div className="queue">
      <p className="queue-title">Services</p>
      <Counter currentPatient={queues['one'].length > 0 ? queues['one'][0] : { number: 0, patientId: -1, serviceType: "Consultation" }} />
      <Counter currentPatient={queues['two'].length > 0 ? queues['two'][0] : { number: 0, patientId: -1, serviceType: "Radio" }} />
      <Counter currentPatient={queues['three'].length > 0 ? queues['three'][0] : { number: 0, patientId: -1, serviceType: "Test" }} />
      <Counter currentPatient={queues['four'].length > 0 ? queues['four'][0] : { number: 0, patientId: -1, serviceType: "Operation" }} />
    </div>
  );
}
