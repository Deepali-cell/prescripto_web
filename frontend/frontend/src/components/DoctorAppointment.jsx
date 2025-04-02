import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { myContext } from "../context/StateProvider";
import { RelatedDoctors } from "./RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DoctorAppointment = ({ docId }) => {
  const { doctors, userData, backend_url, token, bookedSlots, setBookedSlots } =
    useContext(myContext);
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  const findDoctor = () => {
    const doctorInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctorInfo);
  };

  const getNextSevenDaysWithAutoTimeSlots = () => {
    const days = [];
    const currentDate = new Date();

    const allTimeSlots = [
      ["09:00 AM", "10:00 AM", "11:00 AM"],
      ["01:00 PM", "02:00 PM", "03:00 PM"],
      ["08:00 AM", "09:30 AM"],
      ["12:00 PM", "01:30 PM", "03:00 PM"],
      ["10:00 AM", "02:00 PM", "03:30 PM"],
      ["09:00 AM", "11:00 AM", "02:30 PM"],
      ["10:00 AM", "11:00 AM", "01:00 PM", "02:30 PM"],
    ];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      const randomTimeSlots =
        allTimeSlots[Math.floor(Math.random() * allTimeSlots.length)];

      days.push({
        date: nextDate.toISOString().split("T")[0],
        day: nextDate.toLocaleDateString("en-US", { weekday: "long" }),
        timeSlots: randomTimeSlots,
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const bookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    const appointmentData = {
      userId: userData._id,
      docId,
      slotDate: selectedDate,
      slotTime: selectedTime,
      userData,
      doctorData: docInfo,
      amount: docInfo.fees,
    };

    try {
      const response = await axios.post(
        `${backend_url}/api/user/bookappointment`,
        { appointmentData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        setBookedSlots((prev) => new Set(prev).add(selectedTime));
        setSelectedDate(null);
        setSelectedTime(null);
        navigate("/myappointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error booking appointment. Please try again.");
    }
  };
  useEffect(() => {
    findDoctor();
    setSchedule(getNextSevenDaysWithAutoTimeSlots());
  }, [doctors, docId]);
  return (
    docInfo && (
      <div className="md:px-20 mx-4">
        <div className="flex gap-4">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="bg-blue-500 h-[17em] w-[15em] rounded-md"
          />
          <div className="card bg-base-100 w-[50em] shadow-xl">
            <div className="card-body flex">
              <h2 className="card-title">
                {docInfo.name}
                <img src={assets.verified_icon} alt="" className="h-[1em]" />
              </h2>
              <h1>
                {docInfo.degree} - {docInfo.speciality}
                <div className="badge ml-2">{docInfo.experience}</div>
              </h1>
              <h1 className="text-gray-600 font-medium">About :-</h1>
              <p>{docInfo.about}</p>
              <h1 className="text-gray-600 font-medium">
                Appointment fee :-{" "}
                <span className="text-black">${docInfo.fees}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-4 ml-80 mt-10">
          {schedule.map(({ date, day }) => (
            <div
              key={date}
              className="cursor-pointer border rounded-lg"
              onClick={() => handleDateSelect(date)}
            >
              <div className="flex flex-col items-center px-[0.8em] pt-2">
                <h1 className="text-xl">{day}</h1>
                <p>{date}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedDate && (
          <div className="ml-80 mt-10">
            <h2 className="text-lg font-semibold">
              Available Time Slots for {selectedDate}:
            </h2>
            <ul className="flex gap-4 mt-2">
              {schedule
                .find((day) => day.date === selectedDate)
                .timeSlots.filter((slot) => !bookedSlots.has(slot))
                .map((slot, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 p-2 rounded-md cursor-pointer"
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div className="ml-80 mt-10">
          <button className="btn btn-primary" onClick={bookAppointment}>
            Book An Appointment
          </button>
        </div>
        <div className="text-center mt-20">
          <h1 className="text-2xl font-medium">Related Doctors</h1>
          <p className="mt-2">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
        <div className="mt-20">
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    )
  );
};
