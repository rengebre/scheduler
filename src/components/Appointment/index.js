import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const Appointment = function(props) {
  const { time, interview, interviewers } = props;
  let showProps = {};
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  if (interview) {
    showProps = {
      student: interview.student,
      interviewer: interview.interviewer
    }
  }

  const formProps = {
    interviewers,
    onCancel: () => back(),
    onSave: () => console.log("Clicked Save")
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show {...showProps} />}
      {mode === CREATE && <Form {...formProps}/>}
    </article>
  )
}

export default Appointment;