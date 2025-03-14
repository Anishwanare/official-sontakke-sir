import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../../store/slices/coordinatorSlice";
import { Link } from "react-router-dom";
import { fetchSchools } from "../../store/slices/schoolSlice";

const Registration = () => {
  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [schoolVillage, setSchoolVillage] = useState("");
  const [talukka, setTalukka] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [headMasterName, setHeadMasterName] = useState("");
  const [headMasterMobile, setHeadMasterMobile] = useState("");
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState(null)
  const dispatch = useDispatch()
  const { coordinators } = useSelector((state) => state.Coordinator)
  const { schools } = useSelector((state) => state.School)


  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  // array of school IDs
  const validSchoolIds = [
    "E0224MHP5", "E03MH24Q6", "E0424MHR7", "E05MHT248", "E06MHA249",
    "E0724MH10", "E08M9HB11", "E09H1MC12", "E5U67T0151", "E8J88L0165",
    "E9B67G0175", "E8C65H0187", "E9G68F0196", "ED56JH2044", "EK78MH2133",
    "ES99KL0205", "EK23OP0218", "E0224MHP70", "E03MH24108", "E0444MHR81",
    "E05MHM2484", "E06MSA2454", "E0726MH154", "E08M5HB120", "E2G3KT0197",
    "E5U68T0174", "E8J68L0124", "E9B67P0173", "E9G60F0195", "ED56LH2099",
    "EK79MH2155", "ES99KD0206", "E01MH24S57", "E1M3HP0145", "E09H2MC174",
    "E8C65H0175", "E2H3KT0143", "E01MH24S4", "E1M2HP013", "EG23OP2156",
  ];




  // validate school id present in schools
  const checkSchoolIdExisite = (id) => {
    const isExistInArray = validSchoolIds.includes(id)
    const isValid = !schools.some((school) => school.schoolId === id)
    return isExistInArray && isValid
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validSchoolIds.includes(schoolId)) {
      return toast.error("Incorrect School ID");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/register`,
        {
          name,
          schoolId,
          password,
          schoolVillage,
          talukka,
          district,
          coordinator: selectedCoordinator,
          headMasterName,
          headMasterMobile,
        }, { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        toast.success(response.data?.message);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error("Error:", error.message);
    } finally {
      setName("");
      setSchoolId("");
      setPassword("");
      setSchoolVillage("");
      setDistrict("");
      setTalukka("");
      setSelectedCoordinator("");
      setHeadMasterName("");
      setHeadMasterMobile("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!schools || schools.length === 0) {
      dispatch(fetchSchools())
    }
  }, [dispatch, schools])

  useEffect(() => {
    if (!coordinators || coordinators.length === 0) {
      dispatch(fetchCoordinators())
    }
  }, [dispatch, coordinators])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 flex-col">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md my-5">
        <div className="flex justify-center mb-6">
          <img src="/logo.jpeg" alt="Logo" className="h-24" />
        </div>
        <div className="text-center p-2 text-2xl font-bold text-gray-700 underline">
          School Registration
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mb-2">
            <label htmlFor="name" className="block text-black">
              School Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border  dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="headmastername" className="block text-black">
              Head Master Name
            </label>
            <input
              type="text"
              id="headMasterName"
              value={headMasterName}
              onChange={(e) => setHeadMasterName(e.target.value)}
              placeholder="Head Master Name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="headmastermobile" className="block text-black">
              Head Master Mobile
            </label>
            <input
              type="text"
              id="headmastermobile"
              value={headMasterMobile}
              onChange={(e) => setHeadMasterMobile(e.target.value)}
              placeholder="Head Master Mobile"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="village" className="block text-black">
              Village
            </label>
            <input
              type="text"
              id="village"
              value={schoolVillage}
              onChange={(e) => setSchoolVillage(e.target.value)}
              placeholder="school Village"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="district" className="block text-black">
              District
            </label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="talukka" className="block text-black">
              Talukka
            </label>
            <input
              type="text"
              id="talukka"
              value={talukka}
              onChange={(e) => setTalukka(e.target.value)}
              placeholder="Talukka"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="coordinator" className="block text-gray-700">
              Coordinator
            </label>
            <select
              id="coordinator"
              name="coordinator"
              value={selectedCoordinator}
              onChange={(e) => setSelectedCoordinator(e.target.value)}
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black text-gray-700"
              required
            >
              <option value="" disabled>
                Select your Coordinator
              </option>
              {coordinators.map((coordinate, index) => (
                <option key={index} value={coordinate.id} className="">
                  {`${coordinate.firstName} ${coordinate.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="school-id" className="block text-black">
              School ID {schoolId && (isValid ? (
                <span className="text-green-500 text-sm">Valid</span>
              ) : (
                <span className="text-red-500 text-sm">Invalid ID</span>
              ))}
            </label>
            <input
              type="text"
              id="school-id"
              value={schoolId}
              onChange={(e) => { setSchoolId(e.target.value); setIsValid(checkSchoolIdExisite(e.target.value)) }}
              placeholder="school id"
              className={`px-2 block w-full mt-1 py-2 rounded-md shadow-sm ${isValid === true ? "focus:ring-yellow-500 focus:border-yellow-500" : "focus:ring-red-500 focus:border-red-500"} focus:ring-yellow-500 focus:border-yellow-500 border border-orange-400 dark:border-gray-600 text-black`}
              required
            />
          </div>
          <div className="mb-6">
            <span className="flex justify-between">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <label
                onClick={handleShowPassword}
                className="cursor-pointer text-yellow-500"
              >
                {show ? "Hide" : "Show"}
              </label>
            </span>
            <input
              type={show ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-black dark:border-gray-600 text-black"
              required
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-md hover:bg-yellow-600 focus:ring focus:ring-yellow-300 disabled:opacity-50"
              disabled={loading || isValid === false}
            >
              {loading ? "Loading..." : "Register School"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          <Link to="/" className="text-yellow-600 hover:underline">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
