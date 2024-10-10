import React, { useState, useEffect } from "react";
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'pages/main';
import { DeadPage } from '../../DeadPage';
import Api from "api"

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<DeadPage />} />
          <Route path="/:userId" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    );
  };

const ProtectedRoute = () => {
    const { userId } = useParams();
    const [isValid, setIsValid] = useState(null);
    
    const [userName, setUserName] = useState([]);
    useEffect(() => {
        try
        {
          Api.validateUser(userId).then((response) =>{
                  if(response.ok)
                  {
                    setIsValid(true);
                    response.json().then((data) =>{
                      setUserName(data.userName)
                    })
                  }
                  else
                  {
                    alert("Invalid Id");
                    console.log("Invalid User Id");
                    setIsValid(false);
                  }
              }
          )
        }
        catch(error)
        {
            console.error('Error validating user ID:', error);
            setIsValid(false); // If there's an error, treat as invalid
        }
    }, [userId]);
  
    if (isValid === null) {
      return <div>Loading...</div>; // Or a loading spinner
    }
  
    return isValid ? <Main userId={userId} userName={userName}/> : <DeadPage />;
  };

export { App };