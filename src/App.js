import logo from './logo.svg';
import './asset/styles/App.css';
import React, { useEffect, useState } from 'react';
import { getSampleJdJSON } from './data/sampleJDJSON';
import CustomSelect from './components/select/customSelect.js';
import Card from './components/card/customCard.js';
import { minExpOptions, groupedOptions, minPayOptions } from './constants/constants.js';
import NoResults from './components/errorStates/noResults.js';

function App() {
  const sampleJdData = getSampleJdJSON();
  const [data, setData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMinPay, setSelectedMinPay] = useState(null);
  const [selectedMinExp, setSelectedMinExp] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [scrolled, setScrolled] = useState(false);


  //Data Fetched from sampleJdJSON
  const fetchData = () => {
    setLocationOptions(sampleJdData.map((jd) => ({ value: jd.location, label: jd.location })).filter((option, index, self) => self.findIndex((t) => t.value === option.value) === index));
    const newData = getMoreData(currentPage, itemsPerPage);
    setData(prevJobs => [...prevJobs, ...newData]);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const getMoreData = (page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sampleJdData.slice(start, end);
  };


///Filtering logic
  const filterData = () => {
    return data.filter(item => {
      let roleFilter = true;
      let property1Filter = true;
      let property2Filter = true;
      let property3Filter = true;

      if (selectedRole && selectedRole.length > 0) {
        roleFilter = selectedRole.some(role => item.jobRole === role.value);
      }

      if (selectedMinPay) {
        property1Filter = item.minJdSalary !== null && selectedMinPay.value <= item.minJdSalary;
      }

      if (selectedMinExp) {
        property2Filter = item.minExp !== null && selectedMinExp.value >= item.minExp;
      }

      if (selectedLocation && selectedLocation.length > 0) {
        property3Filter = selectedLocation.some(property => item.location === property.value);
      }

      return roleFilter && property1Filter && property2Filter && property3Filter;
    });
  };

  const filteredData = filterData();


  useEffect(() => {
    fetchData();
  }, []);



//Function to handle scroll for the infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);


//Function to handle scroll for the filter to show border when scroll
  useEffect(() => {
    const handleFilterScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleFilterScroll);
    return () => {
      window.removeEventListener('scroll', handleFilterScroll);
    };
  }, []); 


  return (
    <div className="App">
      <div className={`filter-container ${scrolled ? 'scrolled' : ''}`}>
        <CustomSelect isMulti={true} options={groupedOptions} placeholder="Role" setSelectedOption={setSelectedRole} />
        <CustomSelect isMulti={false} options={minPayOptions} placeholder="Minimum Base Pay Salary" setSelectedOption={setSelectedMinPay} />
        <CustomSelect isMulti={false} options={minExpOptions} placeholder="Experience" setSelectedOption={setSelectedMinExp} />
        <CustomSelect isMulti={true} options={locationOptions} placeholder="Location" setSelectedOption={setSelectedLocation} />
      </div>
      <div className='main-container'>
        <div className='companies-list'>
          {data && (filteredData.map((item) => {
            return (<>
              <div className='company-card' key={item?.jdUid}>
                <Card data={item} />
              </div>
            </>
            )
          }))}
          {filteredData.length === 0 && <NoResults />}
        </div>
      </div>
    </div>
  );
}

export default App;
