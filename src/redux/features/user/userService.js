import axiosInstance from "@/lib/axios";

const verifyUser = async () => {
  const response = await axiosInstance.post("/user/verify");
  return response?.data;
};

const userService = {
  verifyUser,
};

export default userService;
