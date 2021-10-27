import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss"

const InterviewerList = function(props) {
  const { interviewers, setInterviewer, interviewer } = props;
  
  const interviewerListArray = interviewers.map((elm) => {
    let selected = false;

    if (interviewer === elm.id) {
      selected = true;
    }

    const props = {
      ...elm,
      setInterviewer: () => setInterviewer(elm.id),
      selected
    }

    return (
      <InterviewerListItem 
        key={elm.id}
        {...props}
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

export default InterviewerList;