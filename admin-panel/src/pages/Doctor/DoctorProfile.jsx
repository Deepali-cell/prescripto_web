import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorProfile = () => {
  const { profile, setprofile, getprofile, doctortoken, backend_url } =
    useContext(DoctorContext);
  const [edit, setedit] = useState(false);
  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/updateprofile`,
        {
          fees: profile.fees,
          available: profile.available,
          address: {
            line1: profile.address.line1,
            line2: profile.address.line2,
          },
        },
        { headers: { Authorization: `Bearer ${doctortoken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setedit(false);
        getprofile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (doctortoken) {
      getprofile();
    }
  }, [doctortoken]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {profile ? (
        <div className="text-center">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto mb-4 object-cover"
          />
          {edit ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setprofile((prev) => ({ ...prev, name: e.target.value }))
              }
              className="my-2"
            />
          ) : (
            <h2 className="text-3xl font-semibold text-gray-800">
              {profile.name}
            </h2>
          )}

          <p className="text-lg mt-2 text-gray-600">
            <strong>Specialization:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.speciality}
                onChange={(e) =>
                  setprofile((prev) => ({
                    ...prev,
                    speciality: e.target.value,
                  }))
                }
                className="my-2"
              />
            ) : (
              <p>{profile.speciality}</p>
            )}
          </p>
          <p className="text-lg mt-2 text-gray-600">
            <strong>Degree:</strong>
            {edit ? (
              <input
                type="text"
                value={profile.degree}
                onChange={(e) =>
                  setprofile((prev) => ({ ...prev, degree: e.target.value }))
                }
                className="my-2"
              />
            ) : (
              <p> {profile.degree}</p>
            )}
          </p>
          <p className="text-lg mt-2 text-gray-600">
            <strong>Fees:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.fees}
                onChange={(e) =>
                  setprofile((prev) => ({ ...prev, fees: e.target.value }))
                }
                className="my-2"
              />
            ) : (
              <p> ${profile.fees}</p>
            )}
          </p>
          <p className="text-lg mt-2 text-gray-600">
            <strong>About:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.about}
                onChange={(e) =>
                  setprofile((prev) => ({ ...prev, about: e.target.value }))
                }
                className="my-2"
              />
            ) : (
              <p>{profile.about}</p>
            )}
          </p>
          <p className="text-lg mt-2 text-gray-600">
            <strong>Experience:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.experience}
                onChange={(e) =>
                  setprofile((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                className="my-2"
              />
            ) : (
              <p> {profile.experience} years</p>
            )}
          </p>

          {/* Address Fields */}
          <p className="text-lg mt-2 text-gray-600">
            <strong>Address Line 1:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.address.line1}
                onChange={(e) =>
                  setprofile((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="my-2"
              />
            ) : (
              <p> {profile.address.line1}</p>
            )}
          </p>
          <p className="text-lg mt-2 text-gray-600">
            <strong>Address Line 2:</strong>{" "}
            {edit ? (
              <input
                type="text"
                value={profile.address.line2}
                onChange={(e) =>
                  setprofile((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="my-2"
              />
            ) : (
              <p>{profile.address.line2} </p>
            )}
          </p>

          <div className="mt-4 flex items-center justify-center">
            <input
              onChange={() =>
                edit &&
                setprofile((prev) => ({ ...prev, available: !prev.available }))
              }
              type="checkbox"
              checked={profile.available}
              readOnly
              className="mr-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg text-gray-600">Available</span>
          </div>
          <div className="flex gap-4 mt-2">
            {edit ? (
              <button
                className="px-2 py-2 border display-inline-block border-gray-500 rounded-md"
                onClick={updateProfile}
              >
                Save Information
              </button>
            ) : (
              <button
                className="px-2 py-2 border display-inline-block border-gray-500 rounded-md"
                onClick={() => setedit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">
            No profile information available.
          </p>
        </div>
      )}
    </div>
  );
};
