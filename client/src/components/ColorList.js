import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("Colorlist", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log("colorToEdit", colorToEdit)
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("Colorlist .put", res.data)
        //? res.data setState
        setColorToEdit(res.data);
        setEditing(false)
        window.location.reload();
      })
      .catch(err => {
        console.log(".put fail", err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        console.log("Colorlist .delete", res)
        setColorToEdit(res.data)
        window.location.reload();
      })
      .catch(err => {
        console.log(".delete fail", err)
      })
  };

  // const addColor = e => {
  //   e.preventDefault();
  //   const newColor = {
  //     color: "",
  //     code: {
  //       hex: ""
  //     },
  //     id: ""
  //   }
  //   axiosWithAuth()
  //     .post(`colors`)
  //     .then(res => {
  //       console.log("ColorList .post", res)
  //     })
  //     .catch(err => {
  //       console.log(".post fail", err)
  //     })
  // }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form onSubmit={addColor}>
        <lable>
          Color Name:
          <input />
        </lable>
        <lable>
          Color Hex Code:
          <input
          type="text"
          name="hex"
          value={color.code.hex}
          onChange={e => }
          />
        </lable>
      </form> */}
    </div>
  );
};

export default ColorList;
