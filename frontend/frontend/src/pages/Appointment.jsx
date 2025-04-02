import { DoctorAppointment } from "../components/DoctorAppointment";
import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";

export const Appointment = () => {
  const { docId } = useParams();
  return (
    <>
      <Layout>
        <DoctorAppointment docId={docId} />
      </Layout>
    </>
  );
};
