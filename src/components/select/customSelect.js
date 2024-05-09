import React from 'react';
import Select, { components } from 'react-select';

const Menu = (props) => {
  return (
    <>
      <components.Menu {...props}>
        {props.children}
      </components.Menu>
    </>
  );
};

export default function CustomSelect() {
  

  return (
    <Select
     isClearable
      placeholder={'Select'}
      styles={''}
      defaultValue={''}
      options={''}
      components={{ Menu }}
      onChange={''}
      isMulti = {true}
      isSearchable={false}
      // menuIsOpen={true}
    />
  );
}
