import React, { useState } from 'react';
import './Emodal.css';
import GraduationModal from '../graduationModal/GraduationModal';
import ShowHSCModal from '../HSCModal/ShowHSCModal';
import DDModal from '../DDModal/DDModal';

const Emodal = ({ resume, setShowEdu, setResume }) => {
  const [showGradModal, setShowGradModal] = useState(false);
  const [showHSCModal, setShowHSCModal] = useState(false);
  const [showSSCModal, setShowSSCModal] = useState(false);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);
  const [showPhDModal, setShowPhDModal] = useState(false);
  const [graduation, setGraduation] = useState({});
  const [diploma, setDiploma] = useState({
        college:'',
        start_year:'',
        stream:'',
        end_year:'',
        performance_scale:'percentage',
        performance:''
  });
  const [PhD, setPhD] = useState({
       college:'',
        start_year:'',
        stream:'',
        end_year:'',
        performance_scale:'percentage',
        performance:''
  });


  return (
    <>
      <div onClick={() => setShowEdu(false)} className="modal-wrapper"></div>
      <div className='education-content'>
        <div className="graduation_information">
          {showGradModal ? <GraduationModal setShowGradModal={setShowGradModal} setResume={setResume} resume={resume} graduation={graduation} setGraduation={setGraduation} /> : null}
          <p className='blue' onClick={() => setShowGradModal(true)}>+ Add graduation/post graduation</p>
        </div>
        <div className="hsc_information">
          {showHSCModal ? <ShowHSCModal
            setResume={setResume} resume={resume}
            title={"Senior Secondary or Equivalent (XII) details"}
            status={"Intermediate status"}
          /> : null}
          <p className='blue' onClick={() => setShowHSCModal(true)}>+ Add senior secondary(12th)</p>
        </div>
        <div className="ssc_information">
          {showSSCModal ? <ShowHSCModal
            setResume={setResume} resume={resume}
            title={" Secondary (X) details"}
            status={"Matriculation status"}
          /> : null}
          <p className='blue' onClick={() => setShowSSCModal(true)}>+ Add Secondary school(10th)</p>
        </div>
        <div className="degree_diploma">
          {showDiplomaModal ? <DDModal
            diploma={diploma} setDiploma={setDiploma}
            PhD={PhD} setPhD={setPhD}
            title={"Diploma details"}
            setShowDiplomaModal={setShowDiplomaModal}
          /> : null}
          <p className='blue' onClick={() => setShowDiplomaModal(true)}>+ Add diploma</p>
        </div>
        <div className="degree_diploma">
          {showPhDModal ? <DDModal
            PhD={PhD} setPhD={setPhD}
            diploma={diploma} setDiploma={setDiploma}
            title={"PhD details"}
          /> : null}
          <p className='blue' onClick={() => setShowPhDModal(true)}>+ Add PhD</p>
        </div>
      </div>
    </>
  );
};

export default Emodal;
