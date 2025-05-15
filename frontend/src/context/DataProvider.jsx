import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../util/auth";

const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   const [token, setToken_] = useState(localStorage.getItem("token"));

//   const [archivedNotes, setArchivedNotes] = useState(() => {
//     const storedArchivedNotes = localStorage.getItem("archivedNotes");
//     return storedArchivedNotes ? JSON.parse(storedArchivedNotes) : [];
//   });
//   const [deletedNotes, setDeletedNotes] = useState(() => {
//     const storedDeletedNotes = localStorage.getItem("deletedNotes");
//     return storedDeletedNotes ? JSON.parse(storedDeletedNotes) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   useEffect(() => {
//     localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
//   }, [archivedNotes]);

//   useEffect(() => {
//     localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
//   }, [deletedNotes]);

//   return (
//     <DataContext.Provider
//       value={{
//         notes,
//         authenticate,
//         setNotes,
//         archivedNotes,
//         setArchivedNotes,
//         deletedNotes,
//         setDeletedNotes,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

export default DataContext;
