import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

export const AddDoctors = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null); 

  const { atoken, backend_url } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate file extension
      if (image) {
        const validExtensions = ['image/jpeg', 'image/png', 'image/gif']; // Allowed MIME types
        if (!validExtensions.includes(image.type)) {
          toast.error("Please upload a valid image file (JPEG, PNG, GIF).");
          return;
        }
      }

      const formData = new FormData(); // Create a FormData object
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
      formData.append("about", about);
      if (image) formData.append("image", image); // Append the image file

      const { data } = await axios.post(
        `${backend_url}/api/admin/doctors`,
        formData,
        {
          headers: { atoken, "Content-Type": "multipart/form-data" }, // Set the content type
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setSpeciality("");
      setDegree("");
      setExperience("");
      setFees("");
      setAddress1("");
      setAddress2("");
      setAbout("");
      setImage(null); // Reset image
    } catch (error) {
      toast.error("An error occurred while adding the doctor.");
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium my-2">Add Doctor</h1>
        <form onSubmit={handleSubmit} className="border px-10 py-4">
          <div className="flex gap-10">
            <div className="flex flex-col my-4">
              <label className="text-gray-700 font-medium my-2">
                Doctor Name
              </label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="text-gray-700 font-medium my-2">
                Speciality
              </label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium my-2">
                Doctor Email
              </label>
              <input
                type="email"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium my-2">Degree</label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium my-4">
                Doctor Password
              </label>
              <input
                type="password"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="text-gray-700 font-medium my-4">
                Experience
              </label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <label className="text-gray-700 font-medium my-4">Fees</label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="text-gray-700 font-medium">Address</label>
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg my-4"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                className="border outline-none px-2 py-2 w-72 rounded-lg"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col my-4">
            <label className="text-gray-700 font-medium">About</label>
            <textarea
              className="border outline-none rounded-lg px-2 py-2"
              placeholder="Write about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col my-4">
            <label className="text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              className="border outline-none px-2 py-2 w-72 rounded-lg"
              accept="image/jpeg, image/png, image/gif" // Accept specific image formats
              onChange={(e) => setImage(e.target.files[0])} // Get the selected file
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-2 rounded-full"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </>
  );
};
