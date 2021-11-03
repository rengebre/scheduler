import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss"

const InterviewerList = function(props) {
  const { interviewers, onChange, value } = props;
  
  
  const interviewerListArray = interviewers.map((elm) => {
    const interviewerProps = {
      ...elm,
      setInterviewer: () => onChange(elm.id),
      selected: (elm.id === value)
    }
    
    return (
      <InterviewerListItem 
      key={elm.id}
      {...interviewerProps}
      />
    );
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListArray}
      </ul>
    </section>
    )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;