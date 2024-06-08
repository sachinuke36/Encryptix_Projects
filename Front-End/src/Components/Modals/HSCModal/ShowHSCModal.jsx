import React, { useEffect, useState, useContext } from 'react';
import './ShowHSCModal.css';
import { Context } from '../../../Context/StoreContext';

const ShowHSCModal = ({ title, status, resume, setResume }) => {
  const { updateResume } = useContext(Context);
  const statusName = status.replace(' ', '_');
  const [HSC, setHSC] = useState({
    Intermediate_status: '',
    year_of_completion: '',
    board: '',
    performance_scale: 'percentage',
    performance: '',
    stream: '',
    school: ''
  });
  const [SSC, setSSC] = useState({
    Matriculation_status: '',
    year_of_completion: '',
    board: '',
    performance_scale: 'percentage',
    performance: '',
    stream: '',
    school: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (statusName === 'Intermediate_status') {
      const updatedResume = { ...resume, education: [...resume.education, { HSC }] };
      setResume(updatedResume);
      updateResume(updatedResume); // Pass the updated resume here
    } else if (statusName === 'Matriculation_status') {
      const updatedResume = { ...resume, education: [...resume.education, { SSC }] };
      setResume(updatedResume);
      updateResume(updatedResume); // Pass the updated resume here
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    let value = e.target.value;

    if (e.target.type === 'number') {
      value = Number(value);
    }
    setHSC((prev) => ({ ...prev, [field]: value }));
    setSSC((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='hsc'>
      <div className="modal-wrapper"></div>
      <div className="hsc_content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="Intermediate_status flex-col">
            <label htmlFor="Intermediate_status">{status}</label>
            <div className="intermediate_status_inputs flex">
              <div>
                <input
                  type="radio"
                  onChange={handleChange}
                  value="Pursuing"
                  name={statusName}
                  id='pursuing'
                  checked={HSC[statusName] === "Pursuing"}
                />
                <label htmlFor="pursuing"> Pursuing</label>
              </div>
              <div>
                <input
                  type="radio"
                  onChange={handleChange}
                  value="Completed"
                  name={statusName}
                  id='completed'
                  checked={HSC[statusName] === "Completed"}
                />
                <label htmlFor="completed"> Completed</label>
              </div>
            </div>
          </div>
          <div className="year_of_completion flex-col">
            <label htmlFor="year_of_completion">Year of Completion</label>
            <input
              type="number"
              onChange={handleChange}
              value={HSC.year_of_completion || ''}
              name="year_of_completion"
              id="year_of_completion"
              required
            />
          </div>
          <div className="board flex-col">
            <label htmlFor="board">Board</label>
            <input
              type="text"
              name='board'
              onChange={handleChange}
              value={HSC.board || ''}
              required
            />
          </div>
          <div className="performance flex">
            <div className="performance_scale flex-col">
              <label htmlFor="performance_scale">Performance Scale</label>
              <select
                name="performance_scale"
                onChange={handleChange}
                value={HSC.performance_scale || ''}
                id="performance_scale"
              >
                <option value="percentage">Percentage</option>
                <option value="CGPA">CGPA (scale of 10)</option>
              </select>
            </div>
            <div className="performance flex-col">
              <label htmlFor="performance">Performance</label>
              <input
                type="number"
                onChange={handleChange}
                value={HSC.performance || ''}
                name='performance'
              />
            </div>
          </div>
          <div className="stream flex-col">
            <label htmlFor="stream">Stream</label>
            <input
              type="text"
              name="stream"
              onChange={handleChange}
              value={HSC.stream || ''}
              id="stream"
              required
            />
          </div>
          <div className="school flex-col">
            <label htmlFor="school">School</label>
            <input
              type="text"
              name="school"
              onChange={handleChange}
              value={HSC.school || ''}
              id="school"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ShowHSCModal;
