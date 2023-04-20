import React, { useEffect, useState } from 'react';

function Shoes(props) {

    const buttonStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };


  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/shoes';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes);
      console.log(data);
    }
  };

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:8080/api/shoes/` + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setShoes(shoes.filter((shoe) => shoe.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>model name</th>
            <th>manufacturer</th>
            <th>color</th>
            <th>picture</th>
            <th>bin</th>
          </tr>
        </thead>
        <tbody>
          {console.log(props.data)}
          {shoes.map((shoe) => {
            return (
              <tr key={shoe.id}>
                <td>{shoe.model_name}</td>
                <td>{shoe.manufacturer}</td>
                <td>{shoe.color}</td>

                <td>
                  <img src={shoe.picture_url} width={150} alt="pic img" />
                </td>

                <td>{shoe.bin}</td>
                <td>
                  <button style={buttonStyle} variant="danger" onClick={() => deleteTask(shoe.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Shoes;
