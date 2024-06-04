import React from 'react'
import './ResumeModal.css'

const ResumeModal = ({ resume, setShowResume }) => {
  return (
    <div className='Resume'>
      <div onClick={() => setShowResume(false)} className="modal-wrapper"></div>
      <div className="resume-content">
        <h3>Resume</h3>
        <div className="education">
          <h3>Education</h3>
          {resume?.education?.map((edu, index) => (
            <div key={index}>
              {edu.graduation && (
                <div className="graduation">
                  <h4>Graduation</h4>
                  <p>College: {edu.graduation.college_name}</p>
                  <p>Degree: {edu.graduation.degree}</p>
                  <p>{edu.graduation.performance_scale} : {edu.graduation.performance}</p>
                  <p>Stream: {edu.graduation.stream}</p>
                  <p>{edu.graduation.start_year} - {edu.graduation.end_year}</p>
                </div>
              )}
              {edu.HSC && (
                <div className="HSC">
                  <h4>HSC</h4>
                  <p>School: {edu.HSC.school}</p>
                  <p>Board: {edu.HSC.board}</p>
                  <p>{edu.HSC.performance_scale} : {edu.HSC.performance}</p>
                  <p>Stream: {edu.HSC.stream}</p>
                  <p>Year of Completion: {edu.HSC.year_of_completion}</p>
                </div>
              )}
              {edu.SSC && (
                <div className="SSC">
                  <h4>SSC</h4>
                  <p>School: {edu.SSC.school}</p>
                  <p>Board: {edu.SSC.board}</p>
                  <p>{edu.SSC.performance_scale} : {edu.SSC.performance}</p>
                  <p>Stream: {edu.SSC.stream}</p>
                  <p>Year of Completion: {edu.SSC.year_of_completion}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="experience box">
          <h4>Work Experience</h4>
          <div className="jobs">
            {resume?.job?.map((job, index) => (
              <div key={index}>
                <h4>Job</h4>
                <p>Designation: {job.designation}</p>
                <p>Profile: {job.profile}</p>
                <p>Organization: {job.organization}</p>
                <p>Location: {job.location}</p>
                <p>Description: {job.description}</p>
                <p>{job.start_date} to {job.end_date}</p>
              </div>
            ))}
          </div>
          <div className="jobs">
            {resume?.intern?.map((intern, index) => (
              <div key={index}>
                <h4>Intern</h4>
                <p>Designation: {intern.designation}</p>
                <p>Profile: {intern.profile}</p>
                <p>Organization: {intern.organization}</p>
                <p>Location: {intern.location}</p>
                <p>Description: {intern.description}</p>
                <p>{intern.start_date} to {intern.end_date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="projects box">
          <h4>Projects</h4>
          {resume?.project?.map((project, index) => (
            <div key={index}>
              <p>Title: {project.title}</p>
              <p>Description: {project.description}</p>
              <p>{project.start_date} to {project.end_date}</p>
            </div>
          ))}
        </div>

        <div className="skills box">
          <h4>Skills</h4>
          <div className="skills-container flex">
            {resume?.skills?.map((skill, index) => (
              <p key={index}>
                {skill}
              </p>
            ))}
          </div>
        </div>

        <div className="POR box">
          <h4>Positions of Responsibility</h4>
          <div className="POR-container flex">
            {resume?.POR?.map((por, index) => (
              <p key={index}>
                {por.description}
              </p>
            ))}
          </div>
        </div>

        <div className="Accomplishments box">
          <h4>Accomplishments</h4>
          <div className="Accomplishments-container flex">
            {resume?.accomplishments?.map((acc, index) => (
              <p key={index}>
                {acc}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
