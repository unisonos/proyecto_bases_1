import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const requestURL = "http://localhost:3000/collections";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get(requestURL)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Collection Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {collections.map((collection) => (
            <Table.Row key={collection.collection_id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link
                  to={`/collections/${collection.collection_id}/publications`}
                  className="text-cyan-600 hover:underline"
                >
                  {collection.collection_name}
                </Link>
              </Table.Cell>
              <Table.Cell>{collection.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Collections;
