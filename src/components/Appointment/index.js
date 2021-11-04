import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const Appointment = function(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  // Form states
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETE = "ERROR_DELETE";

  // navigation between states
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // save interview element
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // Show loading screen while waiting for api request to complete
    transition(SAVING);

    // call bookInterview, update page mode to SHOW once information has been sent to the server
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW, true);
      })
      .catch(() => {
        transition(ERROR_SAVING, true);
      })
  };
    
  const deleteInterview = function() {
    // Switch to deleting page, removing the confirm page from our history array
    transition(DELETING, true)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY, true);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
    })
  }

  const confirmProps = {
    message: "Are you sure you would like to delete?",
    onConfirm: deleteInterview,
    onCancel: () => back()
  }

  const errorSavingProps = {
    message: "Couldn't schedule interview",
    onClose: () => back()
  }

  const errorDeleteProps = {
    message: "Couldn't cancel interview",
    onClose: () => back()
  }
  
  let formProps = {
    interviewers,
    onCancel: back,
    onSave: save
  }
    
  let showProps = {};
  if (interview) {
    const student = interview.student;
    const interviewer = interview.interviewer;

    showProps = {
      student,
      interviewer,
      onEdit: () => transition(CREATE),
      onDelete: () => transition(CONFIRM)
    }

    formProps = {
      ...formProps,
      student,
      interviewer: interviewer.id 
    }
  }


  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show {...showProps} />}
      {mode === CREATE && <Form {...formProps}/>}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && <Confirm {...confirmProps}/>}
      {mode === ERROR_SAVING && <Error {...errorSavingProps}/>}
      {mode === ERROR_DELETE && <Error {...errorDeleteProps}/>}
    </article>
  )
}

export default Appointment;