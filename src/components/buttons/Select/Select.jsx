import React, { useState } from 'react';
import style from './select.module.scss';

const Select = ({ options, labelName, inpType, placeholder }) => {
    const optionsSex = [
        { value: placeholder },
        { value: 'Мальчик' },
        { value: 'Девочка' },
    ];

    const optionsColor = [
        { value: placeholder },
        { value: 'Многоцветный' },
        { value: 'Черный' },
        { value: 'Шоколадный' },
        { value: 'Серый' },
        { value: 'Рыжий' },
        { value: 'Белый' },
    ];

    const optionsType = [
        { value: placeholder },
        { value: 'Кошка' },
        { value: 'Собака' },
        { value: 'Крыса' },
    ];

    const [selected, setSelected] = useState(options === 'sex'
    ? optionsSex[0].value
    : options === 'color'
        ? optionsColor[0].value
        : optionsType[0].value);
        

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <div>
            <label className={style.inpLabel} htmlFor="name">
                {labelName}
                <select className={style.inp} id="name" name={selected} value={selected} onChange={handleChange}
                    type={inpType} placeholder={placeholder}>
                    {options === 'sex' && (optionsSex.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    )))}
                    {options === 'color' && (optionsColor.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    )))}
                    {options === 'type' && (optionsType.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    )))}
                </select>
            </label>
        </div>
    );
};

export default Select;
