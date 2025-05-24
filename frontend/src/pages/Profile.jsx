import { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { myContext } from "../context/StateProvider";
import axios from "axios";
import { toast } from "react-toastify";

export const Profile = () => {
  const { userData, setuserData, token, backend_url, getUser } =
    useContext(myContext);
  const [edit, setedit] = useState(false);
  useEffect(() => {
    if (!userData) {
      setuserData({
        name: "",
        email: "",
        phone: "",
        gender: "male",
        address: {
          line1: "",
          line2: "",
        },
        dob: "",
      });
    }
  }, [userData, setuserData]);
  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/update`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          address: {
            line1: userData.address.line1,
            line2: userData.address.line2,
          },
          dob: userData.dob,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getUser();
        setedit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <>
        <Navbar />
        <div className="md:px-10  mb-5 mx-20 ">
          <div>
            <img src={userData.image} alt="" className="h-[10em]" />
            {edit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="my-2"
              />
            ) : (
              <h1 className="font-medium text-2xl my-4">{userData.name}</h1>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">
              Email :
              {edit ? (
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="my-2"
                />
              ) : (
                <span className="font-light text-black ">{userData.email}</span>
              )}
            </h4>

            <h4 className="font-medium text-gray-800 my-2">
              phone No :{" "}
              {edit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="my-2"
                />
              ) : (
                <span className="font-light text-black ">{userData.phone}</span>
              )}
            </h4>

            <h4 className="font-medium text-gray-800 my-2">
              Address :{" "}
              {edit ? (
                <>
                  <h4 className="font-medium text-gray-800 my-2">
                    Line 1:
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setuserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="my-2"
                    />
                  </h4>
                  <h4 className="font-medium text-gray-800 my-2">
                    Line 2:
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setuserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="my-2"
                    />
                  </h4>
                </>
              ) : (
                <span className="font-light text-black ">
                  {`${userData.address?.line1 || ""}, ${
                    userData.address?.line2 || ""
                  }`}
                </span>
              )}
            </h4>
            <p className=" my-2 border inline-block p-2 font-medium text-gray-800">
              Basic Information :-{" "}
            </p>
            <h4 className="font-medium text-gray-800 my-2">
              Gender :{" "}
              {edit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <span className="font-light text-black ">
                  {userData.gender}
                </span>
              )}
            </h4>
            <h4 className="font-medium text-gray-800 my-2">
              Date of Birth :{" "}
              {edit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setuserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="my-2"
                />
              ) : (
                <span className="font-light text-black ">{userData.dob}</span>
              )}
            </h4>
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
      </>
    )
  );
};
