import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getSampleJdJSON } from './data/sampleJDJSON';
import Card from './components/Card/card.js';
import CustomSelect from './components/select/customSelect.js';
import { minExpOptions, groupedOptions, minPayOptions  } from './constants/constants.js';

function App() {
  const sampleJdData = getSampleJdJSON();
  const [data, setData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMinPay, setSelectedMinPay] = useState(null);
  const [selectedMinExp, setSelectedMinExp] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
