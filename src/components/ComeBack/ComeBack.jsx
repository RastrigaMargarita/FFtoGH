import React from 'react';
import style from './comeBake.module.scss';
import {NavLink} from "react-router-dom";

const ComeBack = ({ path="" }) => {
    return (
        <div className={style.comeBake}>
            <NavLink className={style.comeBake__link} to={path}>Назад</NavLink>
        </div>
    );
};

export default ComeBack;
