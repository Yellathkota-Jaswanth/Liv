import AppointmentList from '../Appointments/AppointmentList';

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AppointmentList />
    </div>
  );
};

export default Dashboard;
