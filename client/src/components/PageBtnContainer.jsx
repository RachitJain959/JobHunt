import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { noOfPages, currentPage },
  } = useAllJobsContext();
  console.log(noOfPages, currentPage);
  return <h1>PageBtnContainer</h1>;
};

export default PageBtnContainer;
