import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/interviewerList";

const Form = function(props) {
  const { interviewers, onCancel, onSave } = props;
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setStudent(() => "");
    setInterviewer(() => null);
  }

  const cancel = function() {
    reset();
    onCancel();
  }

  const validate = function() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("You must select an interviewer");
      return;
    }
  
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        {error && <section className="appointment__validation">{error}</section>}
        <InterviewerList 
          onChange={setInterviewer}
          interviewers={interviewers}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;