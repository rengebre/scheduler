import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

const interviewers = [
  {
    id: 1,
    avatar: "https://i.imgur.com/LpaY82x.png",
    name: "Sylvia Palmer"
  },
  {
    id: 4,
    avatar: "https://i.imgur.com/FK8V841.jpg",
    name: "Cohana Roy"
  },
  {
    id: 6,
    avatar: "https://i.imgur.com/TdOAdde.jpg",
    name: "Susan Reynolds"
  }
] 

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    const appointmentProps = {
      id: 1,
      time: "12pm",
      interview: { student: "Russell", interviewer: 3 },
      interviewers,
      bookInterview: () => console.log("Booked Interview"),
      cancelInterview: () => console.log("Canceled Interview")
    }
    render(<Appointment {...appointmentProps}/>);
  });
});
