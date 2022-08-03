const ModalPopupUni = ({ open, setOpen, contentInfo }) => {

  return <div className={open ? "ModalBeginPage" : "ModalBeginPage-none"} onClick={() => setOpen(false)}>

    <div className="ModalBeginPageBlock">
      <div
        className="cross"
        style={{ borderRadius: "30px" }}
      >
        +
      </div>
      <div className="ModalBeginPageBlock__block-row">

        {contentInfo}

      </div>
    </div>

  </div>
};

export default ModalPopupUni;