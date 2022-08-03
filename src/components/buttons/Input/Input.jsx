import React, { useState } from 'react';
import style from './input.module.scss';

const Input = ({ name, labelName, inpType, placeholder }) => {
    const [value, setValue] = useState('');

    return (
        <div>
            <label className={style.inpLabel} htmlFor="name">
                {labelName}
                <input className={style.inp} id="name" name={name} type={inpType} value={value} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
            </label>
        </div>
    );
};

export default Input;
