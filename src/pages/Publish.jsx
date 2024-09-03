import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/publish.css";
import { SiZebpay } from "react-icons/si";
const backurl = "http://localhost:3000";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

const Publish = ({ setDisplaySuccessPublish }) => {
  // Idée : Faire un handclick event
  const navigate = useNavigate();
  const [body, setBody] = useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: 0,
  });

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [brand, setBrand] = useState("");
  // const [size, setSize] = useState("");
  // const [color, setColor] = useState("");
  // const [condition, setCondition] = useState("");
  // const [city, setCity] = useState("");
  // const [price, setPrice] = useState(0);

  const [pictures, setPictures] = useState(null);

  const [isWaiting, setIsWaiting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // faire un append global pour toutes les paires clef/valeur
    // faire un menu déroulant pour le champ état
    setIsWaiting(true);
    try {
      const formData = new FormData();
      formData.append("title", body.title);
      formData.append("description", body.description);
      formData.append("price", body.price);
      formData.append("brand", body.brand);
      formData.append("size", body.size);
      formData.append("condition", body.condition);
      formData.append("color", body.color);
      formData.append("city", body.city);

      for (const pic of pictures) {
        console.log("pic", pic);
        formData.append("picture", pic);
      }

      // console.log("formData==>", formData);

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      setDisplaySuccessPublish(true);
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* {MyDropzone()} */}
        <div style={{ display: "flex" }}>
          <input
            style={{ flexShrink: 0 }}
            type="file"
            multiple="multiple"
            onChange={(event) => {
              // console.log(
              //   "type of event.target.files",
              //   typeof event.target.files
              // );
              // console.log(
              //   "est ce que event.target.files est un tableau ?",
              //   Array.isArray(event.target.files)
              // );
              // console.log(event.target.files);
              // console.log(event.target.files);
              // console.log(event.target.files[0]);
              // const tab = [...event.target.files];
              setPictures(event.target.files);
              // console.log(typeof pictures);
            }}
          />
        </div>
        <div>
          <p>
            <span>Titre</span>
            <input
              type="text"
              value={body.title}
              onChange={(event) => {
                const tab = { ...body };
                tab.title = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <p>
            <span>Décris ton article</span>
            {/* TODO Remplacer par un text_area */}
            <input
              type="text"
              value={body.description}
              onChange={(event) => {
                const tab = { ...body };
                tab.description = event.target.value;
                setBody(tab);
              }}
            />
          </p>
        </div>
        <div>
          <p>
            <span>Marque</span>{" "}
            <input
              type="text"
              value={body.brand}
              onChange={(event) => {
                const tab = { ...body };
                tab.brand = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <p>
            <span>Taille</span>{" "}
            <input
              type="text"
              value={body.size}
              onChange={(event) => {
                const tab = { ...body };
                tab.size = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <p>
            <span>Couleur</span>{" "}
            <input
              type="text"
              value={body.color}
              onChange={(event) => {
                const tab = { ...body };
                tab.color = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <p>
            <span>Etat</span>{" "}
            <input
              type="text"
              value={body.condition}
              onChange={(event) => {
                const tab = { ...body };
                tab.condition = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <p>
            <span>Lieu</span>{" "}
            <input
              type="text"
              value={body.city}
              onChange={(event) => {
                const tab = { ...body };
                tab.city = event.target.value;
                setBody(tab);
              }}
            />
          </p>
        </div>
        <div>
          <p>
            <span>Prix</span>{" "}
            <input
              type="number"
              value={body.price}
              onChange={(event) => {
                const tab = { ...body };
                tab.price = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <input type="checkbox" />
        </div>
        <button disable={isWaiting} type="submit">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default Publish;
