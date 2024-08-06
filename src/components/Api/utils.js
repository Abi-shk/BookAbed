// Function to retrieve the token from local storage
export const getToken = () => {
  // Get the token from local storage as a string
  const data = localStorage.getItem('token');
  
  // Parse the string into a JSON object
  const token = JSON.parse(data);
  
  // Check if the token exists and return it
  if (token) {
    return token; // Return the parsed token
  } else {
    return null; // Return null if no token exists
  }
};
