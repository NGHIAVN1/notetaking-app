import instance from "./RestClient";
import UserContext from "../context/user-context";
import { useContext } from "react";
const addNote = (titleInput, contentInput, collectionInput, userToken) => {
  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const newNote = instance.post(
    "Notes/new",
    {
      title: titleInput,
      content: contentInput,
      collectionId: collectionInput,
    },
    config
  );

  return newNote;
};
export default addNote;
