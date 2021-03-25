import React, { useState, Fragment } from "react";
import { BsModal, BsSlide, BsTab, BsCollapse, BsLazyLoadImage } from "../shared";



// Sử dụng lazy load image
export const BsImage = () => {
  return (
    <BsLazyLoadImage className="img" src="/images/logo.png" alt="" />
  );
}


// Sử dụng modal

export const Modal = () => {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <Fragment>
      <button type="button" className="createAccount" onClick={() => setToggleModal(true)}>
        Create New Account
      </button>

      <BsModal
        closeIcon='<i class="fas fa-times"></i>'
        toggleModal={toggleModal}
        onClick={() => setToggleModal(false)}
      >

      </BsModal>
    </Fragment>
  );
}

// Sử dụng slide

var slideSettings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  centerMode: false,
  centerPadding: "0",
  dots: false,
  fade: false,
  autoplay: true,
  infinite: false,
  draggable: false,
  swipeToSlide: false,
  touchMove: false,
  swipe: false,
  nextArrowSetting: {
    label: "next page1",
    className: "list__control next__btn"
  },
  prevArrowSetting: {
    label: "prev page1",
    className: "list__control prev__btn"
  },
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
};
export const Slide = () => {
  return (
    <BsSlide {...slideSettings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </BsSlide>
  );
}

// Sử dụng collapse

export const collapseDemo = [
  {
    head: "Câu hỏi 1",
    content: "COLLAPSE 1",
    iconNormal: '<i class="far fa-plus-square"></i>',
    iconActive: '<i class="far   fa-minus-square"></i>'
  },
  {
    head: "Câu hỏi 2",
    content: "COLLAPSE 2",
    iconNormal: '<i class="far fa-plus-square"></i>',
    iconActive: '<i class="far   fa-minus-square"></i>'
  },
  {
    head: "Câu hỏi 2",
    content: "COLLAPSE 2",
    iconNormal: '<i class="far fa-plus-square"></i>',
    iconActive: '<i class="far   fa-minus-square"></i>'
  }
];
export const Collapse = () => {
  return (
    <BsCollapse {...collapseDemo} />
  );
}



// Sử dụng tab

var tabDemo = [
  {
    label: "tab1",
    main: () => <div>tab1</div>
  },
  {
    label: "hoho",
    main: () => <div>hoho</div>
  },
  {
    label: "tab3",
    main: () => <div>tab3</div>
  },
  {
    label: "tab4",
    main: () => <div>tab4</div>
  }
];
export const Tab = () => {
  return (
    <main id="main">
      <BsTab {...tabDemo} />
    </main>
  );
}

