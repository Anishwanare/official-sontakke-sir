import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../store/slices/userSlice";

const MessagesData = () => {
  const dispatch = useDispatch();
  const { messages = [], loading } = useSelector((state) => state.User); // Ensure `messages` is always an array

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const tableStyles = "py-2 px-4 border text-left";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-600 animate-pulse">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {messages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="border border-gray-200">
              <tr className="bg-gray-100 ">
                <th className={tableStyles}>Name</th>
                <th className={tableStyles}>Email</th>
                <th className={tableStyles}>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={message._id || message.id || index} className="hover:bg-gray-100 border border-gray-200">
                  <td className={tableStyles}>{message.name || "N/A"}</td>
                  <td className={tableStyles}>{message.email || "N/A"}</td>
                  <td className={tableStyles}>{message.message || "No message"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600">No messages found!</div>
      )}
    </div>
  );
};

export default MessagesData;
