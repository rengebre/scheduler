import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

const Appointment = function(props) {
  const { id, time, interview } = props;
  let showProps = {}
  
  if (interview) {
    showProps = {
      student: interview.student,
      interviewer: interview.interviewer
    }
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ? <Show {...showProps} /> : <Empty />}
    </article>
  )
}

export default Appointment;