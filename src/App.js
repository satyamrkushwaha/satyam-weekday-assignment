import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getSampleJdJSON } from './data/sampleJDJSON';
import Card from './components/Card/card.js';
import CustomSelect from './components/select/customSelect.js';

function App() {
  const sampleJdData = getSampleJdJSON();
  const [data, setData] = useState([]);

  const [selectedRole, setSelectedRole] = useState(null);

  const engineeringOptions = [
    {
      label: 'Frontend',
      value: 'frontend',
    },
    {
      label: 'Backend',
      value: 'backend',
    },
    {
      label: 'Andriod',
      value: 'android',
    },
    {
      label: 'Ios',
      value: 'ios',
    },
    {
      label: 'Tech Lead',
      value: 'tech lead',
    },
  ];

  const groupedOptions = [
    {
      label: 'ENGINEERING',
      options: engineeringOptions,
    },
  ];



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
        <CustomSelect isMulti={true} options={groupedOptions} placeholder="Role" setSelectedOption={setSelectedRole} />
      </div>
      <div className='main-container'>
        <div className='companies-list'>
          {data && (data.filter((item) => {
            if (selectedRole) {
              let roleFilter = true;
              if (selectedRole && selectedRole.length > 0) {
                roleFilter = selectedRole.some((role) => item.jobRole === role.value);
              }
              return roleFilter
            } else {
              return true;
            }
          }).map((item, index) => {
            return (<>
              <div className='company-card' key={item?.jdUid}>
                <Card data={item} />
                {index + 1}
              </div>

            </>

            )
          }))}
        </div>
      </div>
    </div>
  );
}

export default App;
