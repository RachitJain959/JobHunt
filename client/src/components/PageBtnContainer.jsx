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
  console.log(pages);
  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container"></div>
      <button className="btn next-btn">
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
