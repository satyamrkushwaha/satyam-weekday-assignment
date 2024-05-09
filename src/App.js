import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getSampleJdJSON } from './data/sampleJDJSON';

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
      <div className='companies-list'>
        {data && data.map((item, index) => {
          return (<>
            <div className='company-card' key={item?.jdUid}>
              <div className='logo-company-role-location'>
                <img src={item.logoUrl} alt={`${item.companyName} logo`} />
                <div className='company-role-location'>
                  <p className='company-name'>{item.companyName}</p>
                  <p className='role'>{item.jobRole}</p>
                  <p className='location'>{item.location}</p>
                </div>
              </div>
            </div>
          </>
          )
        })}
      </div>
    </div>
  );
}

export default App;
