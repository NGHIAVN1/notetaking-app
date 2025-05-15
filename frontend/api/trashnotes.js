import instance from "./RestClient";

function tokenAuthor() {
  const token = localStorage.getItem("user-data");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

const trashNotes = {
  getTrashNotes: async () => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.get("/trash/get", config);
    return response.data;
  },

  deleteNote: async (noteId) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post(
      "/trash/delete",
      { _id: noteId },
      config,
    );
    return response;
  },

  restoreTrashNotes: async (noteId) => {
    const token = localStorage.getItem("user-data");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await instance.post(
      "/trash/restore",
      { _id: noteId },
      config,
    );
    return response;
  },
};
export default trashNotes;
