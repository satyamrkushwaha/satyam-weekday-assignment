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
  const [selectedMinPay, setSelectedMinPay] = useState(null);
  const [selectedMinExp, setSelectedMinExp] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);


  const minExpOptions = [
    {
      label: '1 Year',
      value: 1,
    },
    {
      label: '2 Years',
      value: 2,
    },
    {
      label: '3 Years',
      value: 3,
    },
    {
      label: '4 Years',
      value: 4,
    },
    {
      label: '5 Years',
      value: 5,
    },
    {
      label: '6 Years',
      value: 6,
    },
    {
      label: '7 Years',
      value: 7,
    },
    {
      label: '8 Years',
      value: 8,
    },
    {
      label: '9 Years',
      value: 9,
    },
    {
      label: '10 Years',
      value: 10,
    },
  ];

  const minPayOptions = [
    {
      label: '1 LPA',
      value: 1,
    },
    {
      label: '10 LPA',
      value: 10,
    },
    {
      label: '20 LPA',
      value: 20,
    },
    {
      label: '30 LPA',
      value: 30,
    },
    {
      label: '40 LPA',
      value: 40,
    },
    {
      label: '50 LPA',
      value: 50,
    },
    {
      label: '60 LPA',
      value: 60,
    },
    {
      label: '70 LPA',
      value: 70,
    },
    {
      label: '80 LPA',
      value: 80,
    },
    {
      label: '90 LPA',
      value: 90,
    },
    {
      label: '100 LPA',
      value: 100,
    },
  ];


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
    setLocationOptions(sampleJdData.map((jd) => ({ value: jd.location, label: jd.location })).filter((option, index, self) => self.findIndex((t) => t.value === option.value) === index));
    setData(sampleJdData);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className='filter-container'>
      <CustomSelect isMulti={true} options={groupedOptions} placeholder="Role" setSelectedOption={setSelectedRole} />
        <CustomSelect isMulti={false} options={minPayOptions} placeholder="Minimum Base Pay Salary" setSelectedOption={setSelectedMinPay} />
        <CustomSelect isMulti={false} options={minExpOptions} placeholder="Experience" setSelectedOption={setSelectedMinExp} />
        <CustomSelect isMulti={true} options={locationOptions} placeholder="Location" setSelectedOption={setSelectedLocation} />
      </div>
      <div className='main-container'>
        <div className='companies-list'>

          {data && (data.filter((item) => {
            if (selectedRole || selectedMinPay || selectedMinExp || selectedLocation) {
              let roleFilter = true;
              let property1Filter = true;
              let property2Filter = true;
              let property3Filter = true;


              if (selectedRole && selectedRole.length > 0) {
                roleFilter = selectedRole.some((role) => item.jobRole === role.value);
              }
              if (selectedMinPay) {
                property1Filter = item.minJdSalary !== null && selectedMinPay.value <= item.minJdSalary;
              }
              if (selectedMinExp) {
                property2Filter = item.minExp !== null && selectedMinExp.value >= item.minExp;
              }
              if (selectedLocation && selectedLocation.length > 0) {
                property3Filter = selectedLocation.some((property) => item.location === property.value);
              }
              return roleFilter && property1Filter && property2Filter && property3Filter
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
          })) }
        </div>
      </div>
    </div>
  );
}

export default App;
