import React, {useState} from 'react';
import style from './textarea.module.scss';

const Textarea = ({ labelName, inpType, placeholder }) => {
    const [value, setValue] = useState('');

    return (
        <div>
            <label className={style.inpLabel} htmlFor="name">
                {labelName}
                <textarea className={style.inp} id="name" name='textarea' type={inpType} rows="6" cols="30" wrap='hard' value={value} placeholder={placeholder} onChange={(e) => {setValue(e.target.value)}}/>
            </label>
        </div>
    );
};

export default Textarea;
