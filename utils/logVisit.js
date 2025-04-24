
export default async function logVisit(pageVisited) {
    try {
      // Ensure this runs only on the client side
      if (typeof window === "undefined") return;
  
      // Check if this page visit has already been logged in the current session
      const sessionKey = `visitLogged_${pageVisited}`;
      if (sessionStorage.getItem(sessionKey)) {
        return; // Exit if already logged
      }
  
      // Send POST request to /visit endpoint
      const response = await fetch("https://veteran-api-for-kim.vercel.app/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageVisited }),
      });
  
      const result = await response.json();
  
      if (!result.Success) {
        console.error("Failed to log visit:", result.Message);
        return;
      }
  
      // Mark this page as logged in sessionStorage
      sessionStorage.setItem(sessionKey, "true");
      console.log("Visit logged successfully:", result.visitor);
    } catch (error) {
      console.error("Error logging visit:", error.message);
    }
  }