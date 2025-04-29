import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const navbarRef = useRef(null);
  const [navbar, setNavbar] = useState(0);

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.offsetHeight;
        setNavbar(height);
        document.getElementById('page').style.marginTop = `${height}px`;
      }
    };
    updateNavbarHeight(); // Set initial height
    window.addEventListener('resize', updateNavbarHeight);
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <>
      <div className="navigation-banner" ref={navbarRef}>
        <div className='flex flex-row justify-between'>
          <h1>Wedding Planner</h1>
          <div className="flex flex-row justify-between align-center">
            <Link to="/">Overview</Link>
            <Link to="/guest_list">Guest List</Link>
            <Link to="/task_list">Task List</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/budget">Budget</Link>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div id="page">
        <Outlet />
      </div>

    </>
  )
}

export default App;
