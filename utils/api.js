// const BASE_URL = "http://localhost:5000/api";

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
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...headers,
//       },
//       body: data ? JSON.stringify(data) : undefined,
//     });

//     // Check if response is OK
//     const responseData = await response.json();
//     if (!response.ok) {
//       throw new Error(responseData?.message || "Request failed");
//     }

//     return responseData;
//   } catch (error) {
//     throw new Error(error.message || "Network error");
//   }
// };

const BASE_URL = "http://localhost:5000/api";

export const apiCall = async (method, endpoint, options = {}) => {
  const { data, params, token, headers = {} } = options;

  // Build query string if params exist
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

    // Check if response is OK
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.message || "Request failed");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

// Register new user
export const registerUser = async (userData) => {
  return apiCall('POST', '/auth/register', {
    data: {
      email: userData.email,
      password: userData.password,
      name: userData.name
    }
  });
};

// Login user
export const loginUser = async (credentials) => {
  return apiCall('POST', '/auth/login', {
    data: credentials
  });
};