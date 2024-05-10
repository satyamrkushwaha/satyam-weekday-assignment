import React from 'react';
import Select, { components } from 'react-select';
import { customStyleSelected } from './selectStyle';

const Menu = (props) => {
    return (
        <>
            <components.Menu {...props}>
                {props.children}
            </components.Menu>
        </>
    );
};

export default function CustomSelect(props) {
    const { options, placeholder, setSelectedOption, isMulti } = props;

    return (
        <Select
            isClearable
            placeholder={placeholder}
            styles={customStyleSelected}
            defaultValue={''}
            options={options}
            components={{ Menu }}
            onChange={setSelectedOption}
            isMulti={isMulti}
            isSearchable={false}
        // menuIsOpen={true}
        />
    );
}
