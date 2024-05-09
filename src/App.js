import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getSampleJdJSON } from './data/sampleJDJSON';
import Card from './components/Card/card.js';
import CustomSelect from './components/select/customSelect.js';

function App() {
  const sampleJdData = getSampleJdJSON();
  const [data, setData] = useState([]);



  //Data Fetched from sampleJdJSON
  const fetchData = () => {
    setData(sampleJdData);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
     <div className='filter-container'>
        <CustomSelect/>
      </div>
    <div className='main-container'>
      <div className='companies-list'>
        {data && data.map((item, index) => {
          return (<>
            <div className='company-card' key={item?.jdUid}>
              <Card data={item} />
            </div>
          </>
          )
        })}
      </div>
      </div>
    </div>
  );
}

export default App;
