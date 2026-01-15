// // 


// const BASE_URL = "http://localhost:5000/api";

// /**
//  * Generic API caller using the fetch API
//  * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
//  * @param {string} endpoint - API endpoint starting with /
//  * @param {object} options - Optional data, params, and token
//  */
// export const apiCall = async (method, endpoint, options = {}) => {
//   const { data, params, token, headers = {} } = options;

//   // Build query string if params exist
//   const query = params
//     ? "?" + new URLSearchParams(params).toString()
//     : "";

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}${query}`, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }), // Attach JWT token if provided
//         ...headers,
//       },
//       body: data ? JSON.stringify(data) : undefined,
//     });

//     // Parse the JSON response
//     const responseData = await response.json();
    
//     // Check if the HTTP status code is in the 200-299 range
//     if (!response.ok) {
//       throw new Error(responseData?.message || "Request failed");
//     }

//     return responseData;
//   } catch (error) {
//     throw new Error(error.message || "Network error");
//   }
// };

// /**
//  * Auth APIs
//  */

// // Register new user
// export const registerUser = async (userData) => {
//   return apiCall('POST', '/auth/register', {
//     data: {
//       email: userData.email,
//       password: userData.password,
//       name: userData.name
//     }
//   });
// };

// // Login user
// export const loginUser = async (credentials) => {
//   return apiCall('POST', '/auth/login', {
//     data: credentials
//   });
// };

// /**
//  * Profile and Donor APIs
//  */

// /**
//  * Updates the user's profile with donor information.
//  * Maps the frontend "Donate Blood" form fields to the backend User model.
//  * * @param {object} donorData - Data from the DonateBlood form
//  * @param {string} token - User's authentication token
//  */
// export const updateDonorProfile = async (donorData, token) => {
//   return apiCall('PUT', '/profile/update', {
//     data: {
//       userName: donorData.fullName,
//       phone: donorData.phone,
//       location: donorData.city, // Backend model uses 'location'
//       age: parseInt(donorData.age),
//       bloodGroup: donorData.bloodGroup // Backend model maps this to 'bloodgroup'
//     },
//     token: token
//   });
// };

// /**
//  * Fetches the current logged-in user's profile
//  */
// export const getProfile = async (token) => {
//   return apiCall('GET', '/profile', { token });
// };



const BASE_URL = "http://localhost:5000/api";

export const apiCall = async (method, endpoint, options = {}) => {
  const { data, params, token, headers = {} } = options;

  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  try {
    const response = await fetch(`${BASE_URL}${endpoint}${query}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.message || "Request failed");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

// Auth APIs
export const registerUser = async (userData) => {
  return apiCall('POST', '/auth/register', {
    data: {
      email: userData.email,
      password: userData.password,
      name: userData.name
    }
  });
};

export const loginUser = async (credentials) => {
  return apiCall('POST', '/auth/login', {
    data: credentials
  });
};

// Profile & Donor APIs
export const getProfile = async (token) => {
  return apiCall('GET', '/profile', { token });
};

// Fetch all users/donors (Admin Only)
export const getAllDonors = async (token) => {
  return apiCall('GET', '/profile/all', { token }); // We will create this route next
};

export const updateDonorProfile = async (donorData, token) => {
  return apiCall('PUT', '/profile/update', {
    data: {
      userName: donorData.fullName,
      phone: donorData.phone,
      location: donorData.city, // Maps 'city' to 'location' for backend
      age: parseInt(donorData.age),
      bloodGroup: donorData.bloodGroup // Maps to 'bloodGroup' in profileController
    },
    token: token
  });
};

export const registerAsDonor = async (donorData, token) => {
  try {
    const response = await fetch("http://localhost:5000/api/donor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(donorData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    return data;
  } catch (error) {
    throw error;
  }
};