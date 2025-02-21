import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../../../store/slices/coordinatorSlice";

const CoordinateData = () => {
  const dispatch = useDispatch()
  const { coordinators, error, loading } = useSelector((state) => state.Coordinator)

  useEffect(() => {
    dispatch(fetchCoordinators())
  }, [dispatch]);

  const tableStyles = "py-2 px-4 border";

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center py-4">Loading coordinators...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : coordinators.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  border ">
            <thead>
              <tr className="bg-gray-100">
                <th className={tableStyles}>Sr. no</th>
                <th className={tableStyles}>Name</th>
                <th className={tableStyles}>Email</th>
                <th className={tableStyles}>Phone</th>
                <th className={tableStyles}>District</th>
                <th className={tableStyles}>Talukka</th>
                <th className={tableStyles}>Password</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {coordinators.map((coordinator, index) => (
                <tr key={coordinator.id || index} className="hover:bg-gray-100">
                  <td className={tableStyles}>{index + 1}</td>
                  <td className={tableStyles}>
                    {coordinator.firstName} {coordinator.lastName}
                  </td>
                  <td className={tableStyles}>{coordinator.email}</td>
                  <td className={tableStyles}>{coordinator.phone}</td>
                  <td className={tableStyles}>{coordinator.district}</td>
                  <td className={tableStyles}>{coordinator.talukka}</td>
                  <td className={tableStyles}>{coordinator.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4">No Coordinators Found!</div>
      )}
    </div>
  );
};

export default CoordinateData;
