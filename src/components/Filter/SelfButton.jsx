import React from 'react';

const SelfButton = (props) => {
    return (
        <button className={props.color ? 'SelfButton-nonactive' : "SelfButton"} style={{width: props.width, cursor: 'pointer'}} id={props.id}>
            <p className="SelfButton__text">
                {
                    props.text
                }
            </p>
        </button>
    );
};

export default SelfButton;

