import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import payment from '../payment/Payment'
import { useNavigate } from 'react-router-dom';


const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [type, setType] = useState(localStorage.getItem('type'));
  const [meetUrl,setMeetUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(`https://backend-4-p3xw.onrender.com/api/appointments/${type}`, config);
      setAppointments(data);

      
    };
    fetchAppointments();
  }, [meetUrl]);

  const handleZoomMeetingLink = async (client,counselor) => {
    try{
      const { meet_url } = await axios.get(`https://backend-4-p3xw.onrender.com/zoom/get-meeting-link/${client}/${counselor}`);
      console.log(meet_url,'URL')
      setMeetUrl(meet_url)
    }catch(err){
      console.error(err)
    }

  };

  return (
    <div>
      <h2 className="text-xl mb-4">Your Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} className="border p-4 mb-4">
            <p>{type == 'client' ? 'Counselor' : 'Client'}: {appointment[type == 'client' ? 'counselor' : 'client'].name}</p>
            <p>Date: {new Date(appointment.date).toLocaleString()}</p>
            <p>Type: {appointment.sessionType}</p>
            <p>Status: {appointment.status}</p>

            <p>{type == 'counselor' ? <Button onClick={()=>handleZoomMeetingLink(appointment.client._id,appointment.counselor)}>Accept</Button> : ''}</p>
            <p>{appointment.link && (
              <><a href={appointment.link}>Click here</a>
            <Button onClick={()=> navigate('/payment')}>Payment</Button>
            </>)}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
