import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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
      .catch(err => console.error(err));
  }, []);

  const setDay = day => setState(prev => ({...prev, day}));

   // Save and edit a interview booking. axios.put to add or update existing rows in the appointments database
   const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios
        .put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState((prev) => {
            return {
              ...prev,
              appointments
            }
          })
        })
    ) 
  }

  // delete an interview booking. axios.delete to remove from database
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => {
          setState(prev => {
            return {
              ...prev,
              appointments
            }
          })
        })
    )
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData;