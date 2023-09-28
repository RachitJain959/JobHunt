import { Form, useNavigation, useOutletContext } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const { user } = useOutletContext();
  const navigating = useNavigation();
  const isSubmitting = navigating.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center"></div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
