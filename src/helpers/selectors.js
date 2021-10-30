export function getAppointmentsForDay(state, day) {
  let returnArray = [];

  state.days.forEach((elm) => {
    if (elm.name === day) {
      const { appointments } = elm;
      returnArray = appointments.map((elm) => {
        return state.appointments[elm];
      })
    }
  })

  return returnArray;
}

export function getInterviewersForDay(state, day) {
  let returnArray = [];

  state.days.forEach((elm) => {
    if (elm.name === day) {
      const { interviewers } = elm;
      returnArray = interviewers.map((elm) => {
        return state.interviewers[elm];
      })
    }
  })

  return returnArray;
};

export function getInterview(state, interview) {
  let retObj = null;

  if (interview) {
    const id = interview.interviewer;
    retObj = {
      ...interview,
      interviewer: state.interviewers[id]
    }
  }

  return retObj;
}
