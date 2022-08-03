import { useState } from "react";

const FullScreenPhoto = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div
            className={openModal ? "wrapper active" : ""}
            onClick={() => setOpenModal(false)}
        >
            <div
                className={openModal ? "content" : ""}
                onClick={() => setOpenModal(false)}
            >
                <div onClick={(e) => {setOpenModal(true); e.stopPropagation()}}>{children}</div>
            </div>
        </div>
    );
};

export default FullScreenPhoto;
