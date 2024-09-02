import { useState } from "react";
import axios from "axios";

const Testing = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);

  //   on crée le formdata puis on lui rajoute des paires clefs valeur avec formData.append("name",name)
  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("picture", picture);
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   pas besoin de spécifier si c'est un du text ou du file
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(handleSubmit) => {
          console.log("blabla");
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setPicture(e.target.files[0]);
          }}
        />
        <button> Envoyer </button>
      </form>

      {/* pas besoin de préciser la value */}
      {/* on s'intéresse à event.target.files, il y a autant d'index que de fichiers */}
      {/* on veut stocker la photo dans un state donc dans le onChange on fait un setPicture */}
      {/* on va créer un form data avec des paires clef valeur puis l'envoyer */}
    </div>
  );
};
