import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const requestURL = "http://localhost:3000/publications";

const Component = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(requestURL)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onButtonClick = (item) => {
    console.log("Button clicked", item);
    axios.delete(`${requestURL}?id=${item.publication_id}`).then((response) => {
      console.log(response.data);
      // Vuelve a cargar la lista después de eliminar el ítem
      setData((prevData) => prevData.filter(pub => pub.publication_id !== item.publication_id));
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Title </Table.HeadCell>
          <Table.HeadCell>Publisher</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>ISBN</Table.HeadCell>
          <Table.HeadCell>DOI</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.title}
              </Table.Cell>
              <Table.Cell>{item.publisher}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.isbn}</Table.Cell>
              <Table.Cell>{item.doi}</Table.Cell>
              <Table.Cell>
                  <Link
                    to={`/edit-publication/${item.publication_id}`} // Navegar a la página de edición
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                  <Button onClick={() => onButtonClick(item)}>Delete</Button>
                </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Component;
