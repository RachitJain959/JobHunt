import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitBtn } from '.';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

const SearchContainer = () => {
  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue="a"
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
