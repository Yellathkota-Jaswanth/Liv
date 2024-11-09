import AppointmentForm from '../Appointments/AppointmentForm';

const AppointmentsPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <AppointmentForm />
    </div>
  );
};

export default AppointmentsPage;
