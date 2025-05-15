import instance from "./RestClient";

// Create axios instance with auth header

const labelService = {
  // Create a new checklist
  createLabel: async (label_name) => {
    const token = localStorage.getItem("user-data");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("/labels/new", { label_name }, config);
    return response.data;
  },

  // Get all user's checklists
  getLabels: async () => {
    const token = localStorage.getItem("user-data");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get("/labels", config);
    return response.data;
  },
};

export default labelService;
