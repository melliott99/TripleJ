import React, { useState, useEffect } from "react";
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'pages/main';
import { DeadPage } from '../../DeadPage';
import Api from "api"

// const App = () => {
//     return (
//         <Router>
//       <Routes>
//         <Route path="/" element={<DeadPage />} />
//         <Route path="/:userId" element={<MainWrapper />} />
//       </Routes>
//     </Router>
//   );
// };

// const MainWrapper = () => {
//   const { userId } = useParams();
//   return <Main userId={userId} />;
// };

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
  
    useEffect(() => {
        try
        {
            Api.validateUser(userId).then((response) =>{
                // response.json().then((data) => {
                    if(response.ok)
                        {
                            console.log("response ok and data is ");
                            setIsValid(true);
                        }
                    // console.log("UserName is : " + data)
                    // if(data.userName != '')
                    // {
                    //     setIsValid(true);    
                    // }
                })
            // )
        }
        catch(error)
        {
            console.error('Error validating user ID:', error);
            setIsValid(false); // If there's an error, treat as invalid
        }
    //   validateUserId();
    }, [userId]);
  
    if (isValid === null) {
      return <div>Loading...</div>; // Or a loading spinner
    }
  
    return isValid ? <Main userId={userId} /> : <DeadPage />;
  };

export { App };