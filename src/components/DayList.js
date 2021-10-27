import React from 'react';
import DayListItem from './DayListItem';

const DayList = function (props) {

  console.log(props);
  
  const { days, value, onChange } = props;

  const dayListItemArray = days.map((elm) => {
    const props = { 
      ...elm,
      setDay: onChange,
      selected: (elm.name === value)
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