import axiosInstance from "@/lib/axios";

const getCategories = async () => {
  const response = await axiosInstance.get("/category/getcategory");
  return response.data;
};

const generalService = {
  getCategories,
};

export default generalService;
