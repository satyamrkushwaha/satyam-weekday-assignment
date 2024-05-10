
import React, { useState } from 'react'
import '../../asset/styles/CustomCard.css'
import Button from '@mui/material/Button';
import UnlockIcon from '../../asset/images/unlock-image.png'

export default function Cards({ data }) {

  const { companyName, jobDetailsFromCompany, jobRole, location, minExp, minJdSalary, maxJdSalary, logoUrl, salaryCurrencyCode, jdLink } = data

  const [showMore, setShowMore] = useState(false)

  //Function to toggle show more/less
  const handleShowMore = () => {
    setShowMore(!showMore)
  }   
  return (
    <div className='card-container'>
      <div className='card-details-container'>
        <div className='logo-company-role-location'>
          <img  src={logoUrl} alt={`${companyName} logo`} />
          <div className='company-role-location'>
            <p className='company-name'>{companyName}</p>
            <p className='role'>{jobRole}</p>
            <p className='location'>{location}</p>
          </div>
        </div>
        <div className='salary-range'>
          <p>{`Estimated Salary: ${salaryCurrencyCode} ${minJdSalary}  - ${maxJdSalary} LPA`} <span aria-label="Offered salary range"> ✅</span> </p>
        </div>
        <div className='job-description'>
          <h4>About Company</h4>
          <h5>About us</h5>
          <p style={{ height: minExp || showMore  ? (showMore ? '350px' : '200px') : '255px' }}>{jobDetailsFromCompany}</p>
          <div className='view-job' style={{background: showMore ? 'none' : '', color: !showMore ? '' : 'red'}} onClick={handleShowMore}>{showMore ? 'Show Less' : 'Show More'}</div>
        </div>
        <div className='experience' style={{display: minExp ? '' : 'none'}}>
          <p>Minimum Experience</p>
          <p>{`${minExp? minExp : 'NA'} years`}</p>
        </div>
        <div>
          <Button  className='easy-apply' variant="contained" onClick={() => window.open(jdLink, '_blank')}>⚡️ Easy Apply</Button>
        </div>
        <div>
          <Button className='unlock-referral' variant="contained">
            <img src={UnlockIcon} alt="lock" />
            <img src={UnlockIcon} alt="lock" />
            Unlock referral asks</Button>
        </div>
      </div>
    </div>
  )
}
