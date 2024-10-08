import React from "react";
import axios from "axios";
import PublicationForm from "../components/PublicationForm";

const CreatePublication = () => {
  const onFormSubmit = (formData) => {
    axios
      .post("http://localhost:3000/publications", formData)
      .then((response) => {
        console.log("Publication created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating publication:", error);
      });
  };

  return (
    <PublicationForm formTitle="Create a New Publication" onFormSubmit={onFormSubmit} />
  );
};

export default CreatePublication;
