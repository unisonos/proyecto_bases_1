import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

const SERVER_ADDRESS = "http://localhost:3000/";
const API_ENDPOINTS = {
  publications: `${SERVER_ADDRESS}publications`,
  countries: `${SERVER_ADDRESS}countries`,
  authors: `${SERVER_ADDRESS}authors`,
  institutions: `${SERVER_ADDRESS}institutions`,
};

const PublicationForm = (props) => {
  const [authors, setAuthors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const onFormSubmit = props?.onFormSubmit ? props.onFormSubmit : () => {};
  const formTitle = props?.formTitle ?? "";
  const [author, setAuthor] = useState(props?.author ?? "");
  const [country, setCountry] = useState(props?.country ?? "");
  const [date, setDate] = useState(props?.date ?? "");
  const [doi, setDoi] = useState(props?.doi ?? "");
  const [institution, setInstitution] = useState(props?.institution ?? "");
  const [isbn, setIsbn] = useState(props?.isbn ?? "");
  const [publisher, setPublisher] = useState(props?.publisher ?? "");
  const [title, setTitle] = useState(props?.title ?? "");

  const getCountries = () => {
    axios.get(API_ENDPOINTS.countries).then((response) => {
      setCountries(response.data);
    });
  };

  const getAuthors = () => {
    axios.get(API_ENDPOINTS.authors).then((response) => {
      setAuthors(response.data);
    });
  };

  const getInstitutions = () => {
    axios.get(API_ENDPOINTS.institutions).then((response) => {
      setInstitutions(response.data);
    });
  };

  const handleAuthorChange = (e) => {
    const { value } = e.target;
    setAuthor(value);
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setCountry(value);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setDate(value);
  };

  const handleDoiChange = (e) => {
    const { value } = e.target;
    setDoi(value);
  };

  const handleInstitutionChange = (e) => {
    const { value } = e.target;
    setInstitution(value);
  };

  const handleIsbnChange = (e) => {
    const { value } = e.target;
    setIsbn(value);
  };

  const handlePublisherChange = (e) => {
    const { value } = e.target;
    setPublisher(value);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    getAuthors();
    getCountries();
    getInstitutions();
  }, []);

  useEffect(() => {
    setAuthor(props?.author ?? "");
    setCountry(props?.country ?? "");
    setDate(props?.date ?? "");
    setDoi(props?.doi ?? "");
    setInstitution(props?.institution ?? "");
    setIsbn(props?.isbn ?? "");
    setPublisher(props?.publisher ?? "");
    setTitle(props?.title ?? "");
    console.log("Props:", props);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({
      title,
      author,
      date,
      publisher,
      isbn,
      doi,
      country,
      institution,
    });
  };

  return (
    <div className="flex flex-col gap-8 mx-auto w-full max-w-4xl">
      <h1>{formTitle}</h1>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <label>Title *</label>
        <input className="mb-4 w-full" type="text" name="title" value={title} onChange={handleTitleChange} required />

        <label htmlFor="author">Author *</label>
        <select className="mb-4 w-full" id="author" name="author" value={author} onChange={handleAuthorChange} required>
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.author_id} value={author.author_id}>
              {author.first_name}{author.last_name_1 ? ` ${author.last_name_1}` : ""}{author.last_name_2 ? ` ${author.last_name_2}` : ""}
            </option>
          ))}
        </select>

        <label htmlFor="country">Country *</label>
        <select className="mb-4 w-full" id="country" name="country" value={country} onChange={handleCountryChange} required>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country_name}
            </option>
          ))}
        </select>

        <label htmlFor="publisher">Publisher *</label>
        <input className="mb-4 w-full" id="publisher" type="text" name="publisher" value={publisher} onChange={handlePublisherChange} required />

        <label htmlFor="date">Date *</label>
        <input className="mb-4 w-full" id="date" type="date" name="date" value={date} onChange={handleDateChange} required />

        <label htmlFor="doi">DOI *</label>
        <input className="mb-4 w-full" id="doi" type="text" name="doi" value={doi} onChange={handleDoiChange} required />

        <label htmlFor="isbn">ISBN *</label>
        <input className="mb-4 w-full" id="isbn" type="text" name="isbn" value={isbn} onChange={handleIsbnChange} required />

        <label htmlFor="institution">Institution *</label>
        <select className="mb-4 w-full" id="institution" name="institution" value={institution} onChange={handleInstitutionChange} required>
          <option value="">Select an institution</option>
          {institutions.map((institution) => (
            <option key={institution.institution_id} value={institution.institution_id}>
              {institution.institution_name}
            </option>
          ))}
        </select>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default PublicationForm;
