import React from 'react';
import DayListItem from './DayListItem';

const DayList = function (props) {
  const { days, day, setDay } = props;

  const dayListItemArray = days.map((elm) => {
    let selected = false;

    if (elm.name === day) {
      selected = true;
    }

    const props = { 
      ...elm,
      setDay,
      selected
    }

    return (
      <DayListItem
        key={elm.id}
        {...props}
      />
    ) 
  });

  return (
    <ul>
      {dayListItemArray}
    </ul>);
}

export default DayList;