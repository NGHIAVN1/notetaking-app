import instance from "./RestClient";

function tokenAuthor() {
  const token = localStorage.getItem("user-data");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

const systemNotes = {
  addNote: async (data) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("notes/new", data, config);
    return response;
  },

  getNotes: async () => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get("notes/", config);
    return response.data;
  },

  updateNote: async (noteData) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post("notes/update", noteData, config);
    return response;
  },

  deleteNote: async (noteId) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post(
      "notes/delete",
      { _id: noteId },
      config,
    );
    return response;
  },
};
export default systemNotes;
