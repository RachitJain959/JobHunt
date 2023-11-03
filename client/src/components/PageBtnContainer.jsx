import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
  const {
    data: { noOfPages, currentPage },
  } = useAllJobsContext();
  console.log(noOfPages, currentPage);
  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container"></div>
      <button className="btn next-btn">
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
