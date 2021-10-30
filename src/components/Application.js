import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  const appointmentArray = dailyAppointments.map(elm => {
    const interview = getInterview(state, elm.interview);
    const appointmentProps = {
      ...elm,
      interview,
      interviewers
    }

    return (<Appointment key={elm.id} {...appointmentProps}/>);
  });

  const setDay = day => setState(prev => ({...prev, day}));

  useEffect(() => {
    const promises = [];
    promises.push(axios.get('/api/days'));
    promises.push(axios.get('/api/appointments'));
    promises.push(axios.get('/api/interviewers'));

    Promise.all(promises)
      .then((response) => {
        let days = response[0].data;
        let appointments = response[1].data;
        let interviewers = response[2].data;

        setState(prev => {
          return {
            ...prev,
            days,
            appointments,
            interviewers
          }
        });
      })
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
