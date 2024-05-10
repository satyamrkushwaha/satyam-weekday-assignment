export const customStyleSelected = {
    container: styles => ({
        ...styles,
        "@media only screen and (max-width: 900px)": {
            ...styles["@media only screen and (max-width: 900px)"],
            minWidth: "30%"
        },
        "@media only screen and (max-width: 600px)": {
            ...styles["@media only screen and (max-width: 600px)"],
            minWidth: "100%"
        },
    }),

    control: styles => ({
        ...styles,
        fontSize: '13px',
        textAlign: 'left',
        minWidth: '150px',
        alignItems: 'center',
        cursor: 'default',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '38px',
        transition: 'all 100ms ease 0s',
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(204, 204, 204)',
        borderRadius: '4px',
        borderStyle: 'solid',
        borderWidth: '1px',
        outline: '0px !important',
        "&:hover": {
            border: '1px solid #e6e7e9',
            borderColor: "#e6e7e9",
            outline: 'none !important'
        },
        "@media only screen and (max-width: 600px)": {
            ...styles["@media only screen and (max-width: 600px)"],
            minWidth: "100%"
        },
    }),

    dropdownIndicator: base => ({
        ...base,
        cursor: "pointer",

    }),
    menu: base => ({
        ...base,
        border: 'solid 1px #e6e7e9',
        fontSize: "12px",
        boxShadow: '0px 0px 25px rgba(0,0,0,0.05), 0px 0px 5px rgba(0,0,0,0.05)',
    }),
    menuList: base => ({
        ...base,
        padding: '2px'
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            // backgroundColor: isSelected ? 'rgb(73, 67, 218,0.5)' :'#fff',
            color: isSelected ? '#fff' : '#5e5e5e',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            borderRadius: "2px",
            padding: '10px 8px',
            fontSize: '13px',
            textTransform: 'capitalize',
            "&:hover": {
                backgroundColor: '#DEEBFF',
            },
        };
    },

};