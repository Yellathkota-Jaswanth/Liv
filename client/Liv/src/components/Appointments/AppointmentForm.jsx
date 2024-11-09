import { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Avatar, Button } from '@mui/material'
import { useEffect } from 'react';
import setAuthToken from "../../utils/setAuthToken";
import http from "../../utils/http";



const AppointmentForm = () => {
  const [counselors, setCounselors] = useState([]);
  const [date, setDate] = useState();
  const [sessionType, setSessionType] = useState('mental_health');
  const [selectedCounselor, setSelectedCounselor] = useState(''); // Declare state for selected counselor
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  useEffect(() => {
    console.log('useeffvt')
    const fetchCounselors = async () => {
      console.log('ddzdz')
      if(token){
        try {
          setAuthToken(token);
          const response = await http.get('http://localhost:5000/api/user/getcounselor');
          console.log(response.data)
          setCounselors(response.data);
        } catch (error) {
          console.error('Error fetching counselors:', error);
          alert('Failed to load counselors. Please try again later.'); // User-friendly error message
  
        }
      }

    };

    fetchCounselors();
  }, []);

  const handleChange = (e) => {
    setSelectedCounselor(e.target.value);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };

    try {
      setAuthToken(token);
//let dt = new Date(date).toISOString();
      await http.post(
        'http://localhost:5000/api/appointments/create',
        { counselorId: selectedCounselor, date, sessionType }
      );
      alert('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Failed to book appointment. Please try again later.'); // User-friendly error message

    }
  };

  if (counselors.length > 0 ) {
    return <form onSubmit={handleSubmit} className="max-w-md mx-auto">

    <select id="counselor" value={selectedCounselor} onChange={handleChange}>
            <option value="">Select a counselor</option>
            {counselors.map((counselor) => (
              <option key={counselor._id} value={counselor._id}>
                {counselor.name} {/* Assuming each counselor object has a 'name' property */}
              </option>
            ))}
          </select>
          
         
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="mental_health">Mental Health</option>
            <option value="relationship">Relationship</option>
            <option value="career">Career</option>
          </select>
          <Button type="submit" variant="contained" color="primary"  >Book Appointment</Button>
        </form>
  }
 return <></>
};

export default AppointmentForm;
