import { redirect, useLoaderData, useParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job);
  return <h1>EditJob</h1>;
};

export default EditJob;
