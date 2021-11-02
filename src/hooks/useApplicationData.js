import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // return the most recent count of available spots prior to adding or deleting an interview
  const updateSpots = function(day, appointments, days) {
    for (let i = 0; i < days.length; i++) {
      if (days[i].name === day) {
        let counter = 0; 
        days[i].appointments.forEach(element => {
          if(appointments[element].interview === null) {
            counter++;
          }
        });

        return { spots: counter, index: i };
      }
    }
  }

  // restructure the days state value to pass to setState to update the spots value to reflect adding or removing of interviews. returns the day element. If cancelling an interview, cancel=true, if booking, cancel=false
  const updateStateOnSpotChange = function(cancel) {
    let { spots, index } = updateSpots(state.day, state.appointments, state.days);
    cancel ? spots++ : spots--;

    const day = {
      ...state.days[index],
      spots
    }

    let days = [...state.days]
    days[index] = day;

    return days;
  }


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

    const days = updateStateOnSpotChange();

    return (
      axios
        .put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState((prev) => {
            return {
              ...prev,
              days,
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

    const days = updateStateOnSpotChange(true);

    return (
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => {
          setState(prev => {
            return {
              ...prev,
              days,
              appointments
            }
          })
        })
    )
  }

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData;