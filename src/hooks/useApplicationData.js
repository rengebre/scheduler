import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // calculate the amount of spots available for the day and return the updated days state variable to setState with.
  // @params: state.day, state.appointments, state.days, isDelete -> (true if cancelling interview, false or left out otherwise)
  const updateSpots = function(state, id, isDelete) {
    const { day, appointments, days } = state;

    if (appointments[id].interview && !isDelete) {
      return [...days];
    }

    for (let i = 0; i < days.length; i++) {
      if (days[i].name === day) {
        let counter = 0; 
        days[i].appointments.forEach(element => {
          if(appointments[element].interview === null) {
            counter++;
          }
        });

        // increment/decrement to include current appointment cancelation/booking
        isDelete ? counter++ : counter--;

        const returnDay = {
          ...days[i],
          spots: counter
        }
    
        let returnDays = [...days]
        returnDays[i] = returnDay;

        return returnDays;
      }
    }
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

    const days = updateSpots(state, id, false);

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

    const days = updateSpots(state, id, true);

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