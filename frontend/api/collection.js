import instance from "./RestClient";

const collectionService = {
  getNotesCollection: async () => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get("/collection/get", config);
    return response.data;
  },
  createNotesCollection: async (data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("/collection/new", data, config);
    return response.data;
  },
};

export default collectionService;
