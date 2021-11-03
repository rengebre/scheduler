import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form"

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

describe("Form", () => {
  it("renders without student name if not provided", () => {
    const formProps = {
      interviewers
    }
    const { getByPlaceholderText } = render(<Form {...formProps}/>) 
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const formProps = {
      interviewers,
      student: "Lydia Miller-Jones"
    }
    const { getByTestId } = render(<Form {...formProps}/>) 
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();

    const formProps = {
      interviewers,
      onSave
    }
    const { getByText } = render(<Form {...formProps}/>)

    fireEvent.click(getByText(/save/i))

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();

    const formProps = {
      interviewers,
      onSave,
      student: "Lydia Miller-Jones",
      interviewer: 2
    }

    const { queryByText, getByText } = render(<Form {...formProps}/>)

    fireEvent.click(getByText(/save/i))

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 2);
  });
});
