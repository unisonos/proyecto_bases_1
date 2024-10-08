import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";
import { Link, useSearchParams } from "react-router-dom";

const PublicationsTable = () => {
  const [publications, setPublications] = useState([]);
  const [searchParams] = useSearchParams();
  const speciesName = searchParams.get('species_name');  // Obtener 'species_name' de la query string
  const requestURL = "http://localhost:3000/publications";  // Cambiar según tu endpoint real

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get(`${requestURL}?s=${speciesName}`);
        setPublications(response.data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    if (speciesName) {
      fetchPublications();
    }
  }, [speciesName]);

  const onButtonClick = (item) => {
    axios
      .delete(`${requestURL}/${item.publication_id}`)
      .then((response) => {
        setPublications((prevData) =>
          prevData.filter((pub) => pub.publication_id !== item.publication_id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="overflow-x-auto mx-auto mt-8 max-w-4xl">
      <h2 className="text-2xl font-bold">Publications related to "{speciesName}"</h2>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Publisher</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>ISBN</Table.HeadCell>
          <Table.HeadCell>DOI</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {publications.length > 0 ? (
            publications.map((pub) => (
              <Table.Row key={pub.publication_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {pub.title}
                </Table.Cell>
                <Table.Cell>{pub.publisher}</Table.Cell>
                <Table.Cell>{pub.date}</Table.Cell>
                <Table.Cell>{pub.isbn}</Table.Cell>
                <Table.Cell>{pub.doi}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/edit-publication/${pub.publication_id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <Button onClick={() => onButtonClick(pub)} className="ml-2">
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center">No publications found for this species.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PublicationsTable;
