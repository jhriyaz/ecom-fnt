import axiosInstance from "@/lib/axios";

const login = async (userData) => {
  const response = await axiosInstance.post("/user/signin", userData);

  return response.data;
};

const authService = {
  login,
};

export default authService;
