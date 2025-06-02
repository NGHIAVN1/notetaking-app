import instance from "./RestClient";

// Create axios instance with auth header

const checklistService = {
  // Create a new checklist
  createChecklist: async (data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("/checklist/new", data, config);
    return response.data;
  },

  // Create a new checklist item for an existing note
  createChecklistItem: async (data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("/checklist/add-item", data, config);
    return response.data;
  },

  // Get all user's checklists
  getUserChecklists: async () => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get("/notes/checklist", config);
    return response.data;
  },

  // Get a specific checklist
  getChecklistById: async (id) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get(`/checklists/${id}`, config);
    return response.data;
  },

  // Update a checklist item
  updateChecklistItem: async (itemId, data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post(
      `/checklist/update-item/${itemId}`,
      data,
      config,
    );
    return response.data;
  },

  // Update a checklist
  updateChecklist: async (id, data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.put(`/checklists/${id}`, data, config);
    return response.data;
  },

  // Delete a checklist
  deleteChecklist: async (id) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.delete(`/checklists/${id}`, config);
    return response.data;
  },

  // Delete a checklist item
  deleteChecklistItem: async (itemId) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.delete(`/checklist/delete-item/${itemId}`, config);
    return response.data;
  },
};

export default checklistService;
