import React, { useState, useEffect } from 'react';

const HatList = (props) => {

    const [hats, setHats] = useState([])

	const fetchData = async () => {
		const url = 'http://localhost:8090/api/hats/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setHats(data.hats);
			console.log('this is locations', data);
		}
	};


    async function deleteTask(id) {
        try {
            const response = await fetch(`http://localhost:8090/api/hats/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
            const data = await response.json();
            console.log(data)
            setHats(hats.filter((hats) => hats.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }
	useEffect(() => {
		fetchData();
	}, []);

    return (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Fabric</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Location</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {hats.map(hats => {
            return (
            <tr key={hats.id}>
                <td>{ hats.name }</td>
                <td>{ hats.fabric }</td>
                <td>{ hats.color }</td>
                <td>
                    <img
                    src={hats.picture}
                    width={150}
                    alt='pic img'
                    />
                </td>
                <td>{ hats.location }</td>
                <td>
                    <button onClick={() => deleteTask(hats.id) }>Delete</button>
                </td>
            </tr>
            );
        })}
        </tbody>
    </table>
    )
}
export default HatList
