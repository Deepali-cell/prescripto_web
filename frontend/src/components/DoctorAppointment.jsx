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

  // ✅ Find doctor from context
  const findDoctor = () => {
    const doctorInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctorInfo);
  };

  // ✅ Generate next 7 days schedule with random times
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

  // ✅ Handle date and time selection
  const handleDateSelect = (date) => setSelectedDate(date);
  const handleTimeSelect = (time) => setSelectedTime(time);

  // ✅ Book Appointment API
  const bookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      const appointmentData = {
        userId: userData._id,
        docId,
        slotDate: selectedDate,
        slotTime: selectedTime,
        userData: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        },
        doctorData: {
          name: docInfo.name,
          specialization: docInfo.specialization,
          image: docInfo.image,
        },
        amount: docInfo.fee || 500,
      };

      const response = await axios.post(
        `${backend_url}/api/user/bookappointment`,
        appointmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Appointment booked successfully!");
        setBookedSlots([
          ...bookedSlots,
          { slotDate: selectedDate, slotTime: selectedTime, docId },
        ]);
        navigate("/myappointment");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    findDoctor();
    setSchedule(getNextSevenDaysWithAutoTimeSlots());
  }, [doctors, docId]);

  if (!docInfo) return null;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      {/* ✅ Doctor Info Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="h-64 w-full md:w-60 rounded-lg object-cover shadow-md"
        />

        <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="h-5" />
          </h2>

          <p className="text-lg mt-2">
            {docInfo.degree} - {docInfo.speciality}
            <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm inline-block">
              {docInfo.experience}
            </span>
          </p>

          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-1">About:</h3>
            <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-700 font-medium">
              Appointment Fee:
              <span className="text-black font-semibold ml-1">
                ₹{docInfo.fees}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* ✅ Date Selection */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Select a Date:</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {schedule.map(({ date, day }) => (
            <div
              key={date}
              onClick={() => handleDateSelect(date)}
              className={`cursor-pointer border rounded-md p-3 text-center transition-all duration-200 
                ${
                  selectedDate === date
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                }
              `}
            >
              <h4 className="font-semibold">{day}</h4>
              <p className="text-sm">{date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Time Slot Selection */}
      {selectedDate && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            Available Time Slots for {selectedDate}:
          </h3>

          <div className="flex flex-wrap gap-3">
            {schedule
              .find((day) => day.date === selectedDate)
              .timeSlots.filter((slot) => !bookedSlots.has(slot))
              .map((slot, index) => (
                <div
                  key={index}
                  onClick={() => handleTimeSelect(slot)}
                  className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-200 text-sm
                    ${
                      selectedTime === slot
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }
                  `}
                >
                  {slot}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ✅ Book Button */}
      <div className="mt-10">
        <button
          onClick={bookAppointment}
          className="
            bg-red-600 hover:bg-red-700 text-white 
            px-6 py-3 rounded-lg shadow 
            transition-all duration-200
          "
        >
          Book Appointment
        </button>
      </div>

      {/* ✅ Related Doctors */}
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-semibold">Related Doctors</h1>
        <p className="mt-2 text-gray-600">
          Browse our trusted medical professionals.
        </p>
      </div>

      <div className="mt-10">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  );
};
