import React, { useEffect } from 'react';

const BsModal = ({ children, toggleModal, onClick, closeIcon}) => {
    var showModal = toggleModal ? "show-modal" : "";
    useEffect(() => {
       if(toggleModal){
            document.body.classList.add('active-modal');
        }else{
            if(document.getElementsByClassName("show-modal").length === 1){
                document.body.classList.remove('active-modal');
            }
        }
    }, [toggleModal])
    return(
        <div className={`bs-modal modal-top ${showModal}`}>
        <div className="modal-frame">
        <div className="modal__backdrop" onClick={onClick}></div>
            <div className={`content-modal ${showModal}`}>
                <span title="close" className="close__modal" onClick={onClick} dangerouslySetInnerHTML={{__html: closeIcon}}></span>
                {
                    children
                }
            </div>
        </div>
    </div>
    )
}
export default BsModal;