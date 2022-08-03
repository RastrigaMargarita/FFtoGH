import React from 'react';
import style from './title.module.scss';

const Title = ({ title }) => {

    return (
        <h1 className={style.title}>{title}</h1>
    );
};

export default Title;
