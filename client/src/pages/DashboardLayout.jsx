import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import SmallSidebar from '../components/SmallSidebar';
import BigSidebar from '../components/BigSidebar';
import Navbar from '../components/Navbar';
import { createContext, useContext, useState } from 'react';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    // const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme);
    localStorage.setItem('darkTheme', !isDarkTheme);
  };

  const logoutUser = async () => {
    console.log('Logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        user,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {/* Context will provide user to all the components & pages within this page*/}
              <Outlet context={{ user }} />{' '}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
