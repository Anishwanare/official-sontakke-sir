import { useState,useEffect } from "react";

export const useOnline = ()=>{
      const [isUserOnline, setIsUserOnline] = useState(null)

      useEffect(() => {
        const updateOnlineStatus = () => {
          setIsUserOnline(navigator.onLine);
        };
      
        // Set initial status
        updateOnlineStatus();
      
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
      
        return () => {
          window.removeEventListener("online", updateOnlineStatus);
          window.removeEventListener("offline", updateOnlineStatus);
        };
      }, []);
      
      return isUserOnline
}