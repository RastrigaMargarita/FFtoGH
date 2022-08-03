import React from 'react';
import style from './spinner.module.scss';
import spinnerImg from './spinner.svg';

const Spinner = () => {
    return (
        <div className={style.spinner}>
            <img className={style.spinner__img} src={spinnerImg} alt="spinner"/>
        </div>
    );
};

export default Spinner;
