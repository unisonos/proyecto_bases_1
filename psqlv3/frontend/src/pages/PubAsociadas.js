import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { useParams } from "react-router-dom";

const PublicationsByCollection = () => {
  const { collection_id } = useParams(); // Obtener el ID de la colección de la URL
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/collections/${collection_id}/publications`)
      .then((response) => {
        setPublications(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load publications");
      });
  }, [collection_id]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Publications for Collection</h1>
      {error && <p className="text-red-500">{error}</p>}
      {publications.length > 0 ? (
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Publisher</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>ISBN</Table.HeadCell>
            <Table.HeadCell>DOI</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {publications.map((publication) => (
              <Table.Row key={publication.publication_id}>
                <Table.Cell>{publication.title}</Table.Cell>
                <Table.Cell>{publication.publisher}</Table.Cell>
                <Table.Cell>{publication.date}</Table.Cell>
                <Table.Cell>{publication.isbn}</Table.Cell>
                <Table.Cell>{publication.doi}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No publications found for this collection.</p>
      )}
    </div>
  );
};

export default PublicationsByCollection;
