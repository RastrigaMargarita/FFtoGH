import React from 'react';
import style from './button.module.scss';

const Button = ({ children, btnName, colorBtn = 'white', typeBtn = 'small', submit, img, onClick }) => {

    return (
        <div className={`${typeBtn === 'big' ? style.wrap__bigBtn : typeBtn === 'middle' ? style.wrap__middleBtn : style.wrap__smallBtn} ${style.wrap}`}>
            <button onClick={() => onClick()} className={`${colorBtn === 'red' ? style.button__red : style.button__white} 
                ${style.button} 
                ${typeBtn === 'big' ? style.button__big : typeBtn === 'middle' ? style.button__middle : style.button__small}
                ${img === 'clip' ? style.button_clip : ''}
                ${img === 'basket' ? style.button_basket : ''}`}
                type={submit}
            >
                {children ? children : (btnName ?  btnName : "укажи имя кнопки:)")}
            </button>
        </div>
    );
};

export default Button;