import React, {useContext, useEffect, useState} from 'react'
import './Filters.css'
import { FaFilter } from "react-icons/fa";
import CreaTableSelect from 'react-select/creatable';
import { Context } from '../../Context/StoreContext';

const Filter = ({showFilter, setShowFilter}) => {
    const {all_jobs,setFilterOptions,filterOptions} = useContext(Context);
    const [profile,setProfile] = useState();

    const options = [
        { value: 'Software Developer', label: 'Software-developer' },
        { value: 'Backend Developer', label: 'Web developer' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Client Management Associate', label: 'Client Management Associate' },
        { value: 'Field Sales', label: 'Field Sales' }
      ]
    const locations = [
        { value: 'Delhi', label: 'Delhi' },
        { value: 'work from home', label: 'work from home' },
        { value: 'Banglore', label: 'Banglore' },
        { value: 'jaipur', label: 'jaipur' },
        { value: 'Mumbai', label: 'Mumbai' }
    ]

      const handleChange = (e)=>{
            setFilterOptions(prev=>({...prev, [e.target.name]:e.target.value}))
      }
      const handleProfile = profile =>{
        setFilterOptions(prev=>({...prev, title:profile.map((p)=>p.value)}))
      }
      const handleLocations = location =>{
        setFilterOptions(prev=>({...prev, location:location.map((l)=>l.value)}))
      }

      
      

    return (
        <div className="filters">
            <div className='filters-heading'>
                <div className="filter-logo">
                    <FaFilter />
                </div>
                <h3 >Filters</h3>
            </div>

            <div className='filters-inputs'>
              <form className='filters-content' onChange={handleChange}>
                <div className="filter-by-profile f-c">
                    <label>Profile</label>
                     <div className="profile-options">
                     <CreaTableSelect
                        onChange={handleProfile}
                        options={options}
                        isMulti
                    />
                    </div>
                    </div>
                <div className="location f-c">
                    <label>Location</label>
                   <div className="creatable">
                      <CreaTableSelect
                        onChange={handleLocations}
                        options={locations}
                        isMulti
                    />
                   </div>
                </div>
                    
                   
                <div className="annual_salary f-c">
                    <label htmlFor="annual-salary">Minimum salary/stipend</label>
                    <input type="number" name="min_salary" />
                </div>
                
              </form>
              {showFilter? <button onClick={()=>setShowFilter(prev=>!prev)} >Done</button>:null}
            </div>
        </div>
    )
}

export default Filter
