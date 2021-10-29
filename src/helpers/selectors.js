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
