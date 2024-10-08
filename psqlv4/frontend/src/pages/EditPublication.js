import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PublicationForm from "../components/PublicationForm";

const SERVER_ADDRESS = "http://localhost:3000/";
const API_ENDPOINTS = {
  publications: `${SERVER_ADDRESS}publications`,
  countries: `${SERVER_ADDRESS}countries`,
  authors: `${SERVER_ADDRESS}authors`,
  institutions: `${SERVER_ADDRESS}institutions`,
};

const EditPublication = () => {
  const { id } = useParams(); // Obtener el ID de la publicación desde la URL
  const [publication, setPublication] = useState({
    title: "",
    author: "",
    date: "",
    publisher: "",
    isbn: "",
    doi: "",
    country: "",
    institution: "",
  });

  useEffect(() => {
    console.log("ID:", id);
    // Obtener los datos de la publicación para precargar el formulario
    axios.get(`${API_ENDPOINTS.publications}?id=${id}`).then((response) => {
      console.log("Publication:", response.data);
      setPublication(response.data[0]);
    });
  }, [id]);

  const handleSubmit = (formData) => {
    axios
      .put("http://localhost:3000/publications", { ...formData, id })
      .then((response) => {
        console.log("Publication updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating publication:", error);
      });
  };

  return (
    <PublicationForm formTitle="Edit Publication" onFormSubmit={handleSubmit} {...publication} />
  );
};

export default EditPublication;