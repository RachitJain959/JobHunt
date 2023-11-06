import { useLocation, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
  const {
    data: { noOfPages, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length: noOfPages }, (_, index) => {
    return index + 1;
  }); //underscore is a complex object(undefined), which we don't care about,not important. The only thing that I care about here is the index.

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathname);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== noOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    // after current page
    if (currentPage !== noOfPages && currentPage !== noOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }

    // dots
    if (currentPage < noOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: noOfPages,
        activeClass: currentPage === noOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = noOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > noOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
