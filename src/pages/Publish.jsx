import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/publish.css";
import { SiZebpay } from "react-icons/si";
const backurl = "http://localhost:3000";

const Publish = () => {
  // Idée : Faire un handclick event

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

  return (
    <div className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("event.target=>", event);
          // setPicture(e.target.files[0])
          // event.target[0].files
        }}
      >
        <div style={{ display: "flex" }}>
          <input style={{ flexShrink: 0 }} type="file" />
        </div>
        {/* <div>
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
            <span>Décris ton article</span>{" "}
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
              type="text"
              value={body.price}
              onChange={(event) => {
                const tab = { ...body };
                tab.price = event.target.value;
                setBody(tab);
              }}
            />
          </p>
          <input type="checkbox" />
        </div> */}
        <button type="submit"> Soumettre </button>
      </form>
    </div>
  );
};

export default Publish;
