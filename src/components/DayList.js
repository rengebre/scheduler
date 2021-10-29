import React from 'react';
import DayListItem from './DayListItem';

const DayList = function (props) {
  
  const { days, value, onChange } = props;

  const dayListItemArray = days.map((elm) => {
    const dayListProps = { 
      ...elm,
      setDay: onChange,
      selected: (elm.name === value)
    }

    return (
      <DayListItem
        key={elm.id}
        {...dayListProps}
      />
    ) 
  });

  return (
    <ul>
      {dayListItemArray}
    </ul>);
}

export default DayList;