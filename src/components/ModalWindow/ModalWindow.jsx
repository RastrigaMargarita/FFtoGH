import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import style from './modalWindow.module.scss';
import Title from "../Title/Title";
import Button from "../buttons/Button/Button";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 328,
    bgcolor: 'mint',
    boxShadow: 24,
    p: '56px 22px 32px 22px',
    textAlign: 'center',
    background: '#FFFFFF',
    borderRadius: '20px',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ModalWindow = ({openModalWindow, setOpenModalWindow}) => {
    const handleClose = () => setOpenModalWindow(false);

    return (
        <div>
            <Modal
                open={openModalWindow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <div className={style.modalWindow__title_wrap}>
                        <Title title='Вы успешно зарегистрировались!'/>
                    </div>
                    <Button onclick={() => setOpenModalWindow(false)} colorBtn='red'
                            typeBtn='middle' isLink={true} path={"/admin"}>
                        Перейти в кабинет
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalWindow;
