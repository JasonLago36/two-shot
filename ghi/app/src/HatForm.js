import React, { useEffect, useState } from 'react';

function HatForm(props) {
	const [name, setName] = useState('');
	const [picture, setPicture] = useState('');
	const [fabric, setFabric] = useState('');
	const [color, setColor] = useState('');
	const [location, setLocation] = useState('');
	const [locations, setLocations] = useState([]);

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleFabricChange = (event) => {
        const value = event.target.value
        setFabric(value)
    }

    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }

    const handlePictureChange = (event) => {
        const value = event.target.value
        setPicture(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }

	// let spinnerClasses = 'd-flex justify-content-center mb-3';
	// let dropdownClasses = 'form-select d-none';
	// if (locations.length > 0) {
	//     spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
	//     dropdownClasses = 'form-select';
	// }
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};

		data.name = name;
		data.fabric = fabric;
		data.color = color;
		data.picture = picture;
		data.location_id = location;

		const hatUrl = 'http://localhost:8090/api/hats/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(hatUrl, fetchConfig);
		if (response.ok) {
			const newHats = await response.json();
            console.log("new hats object", newHats)
			setName('');
			setFabric('');
			setColor('');
			setPicture('');
			setLocation('');
		}
	};

	const fetchData = async () => {
		const url = 'http://localhost:8100/api/locations/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
			console.log('this is locations', data);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new location</h1>
					<form onSubmit={handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
								value={name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handlePictureChange}
								placeholder="Picture Href"
								required
								type="text"
								name="picture"
								id="picture"
								className="form-control"
								value={picture}
							/>
							<label htmlFor="picture">Picture</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFabricChange}
								placeholder="Fabric"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
								value={fabric}
							/>
							<label htmlFor="fabric">Fabric</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleColorChange}
								placeholder="Color"
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
								value={color}
							/>
							<label htmlFor="picture">Color</label>
						</div>
						<div className="mb-3">
							<select
								onChange={handleLocationChange}
								value={location}
								required
								className="form-select"
							>
								<option>Choose a Location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.closet_name}
										</option>
									);
								})}
							</select>
						</div>

						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default HatForm;
