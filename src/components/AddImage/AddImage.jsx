import React from 'react';
import style from './addImage.module.scss';
import imgTest from './animalImg.png';
import imgClose from './close.svg';

const AddImage = ({ deleteImage, srcImage, id }) => {


    return (
        <div className={style.addImage}>
            <img width={74} height={74} className={style.addImage__img} src={srcImage} alt="img" />
            <div className={style.addImage__overlay}>
                <button className={style.addImage__btn} id='deleteImageId' onClick={(event) => deleteImage(event, id)}>
                    <img src={imgClose} className={style.addImage_hover} alt="addImage-hover" />
                </button>
            </div>
        </div>
    );
};

export default AddImage;
