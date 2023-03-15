import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "../components/home.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Container } from "@mui/system";

export function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <Container className="home-container" maxWidth="md">
      <h2>Adauga un task!</h2>
      <input
        className="input-text"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      {todos.map((todo, index) => (
        <div key={index} className="todo-list-items">
          <h1>{todo.todo}</h1>
          <EditIcon className="icons" variant="contained" onClick={() => handleUpdate(todo)}>
            update
          </EditIcon>
          <DeleteIcon className="icons" variant="contained" onClick={() => handleDelete(todo.uidd)}>
            delete
          </DeleteIcon>
        </div>
      ))}
      {isEdit ? (
        <div className="checked-icon">
          <CheckBoxIcon variant="contained" onClick={handleEditConfirm}>
            confirm
          </CheckBoxIcon>
        </div>
      ) : (
        <div className="add-icon">
          <AddIcon variant="contained" onClick={writeToDatabase}>
            add
          </AddIcon>
        </div>
      )}
      <div className="logout-icon">
        <LogoutIcon variant="contained" onClick={handleSignOut}>
          logout
        </LogoutIcon>
      </div>
    </Container>
  );
}
