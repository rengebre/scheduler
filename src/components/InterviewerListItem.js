import React from 'react';

import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = function(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected":selected,
  })

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
        {selected && name}
      </li>
    )
}

export default InterviewerListItem;