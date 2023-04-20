import React, {useEffect, useState } from 'react';

function ShoesForm(){

    // const url = 'http://localhost:8090/api/shoes';
    const [manufacturer, setManufacturer] = useState('')
    const [model_name, setModel_name] = useState('')
    const [color, setColor] = useState('')
    const [picture_url, setPictureUrl] = useState('')
    const [bins, setBins] = useState([])
    const [bin, setBin] = useState('')

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/'
        const response = await fetch(url);
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            setBins(data.bins)
            console.log(data)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.manufacturer = manufacturer;
        data.model_name = model_name;
        data.color = color;
        data.picture_url = picture_url;
        data.bin = bin;

        const attendeeUrl = 'http://localhost:8080/api/shoes/';
        const fetchOptions = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const attendeeResponse = await fetch(attendeeUrl, fetchOptions);
        if (attendeeResponse.ok) {
        setManufacturer('');
        setModel_name('');
        setColor('');
        setPictureUrl('');
        }
      }

      const handleManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      }

      const handleModelName = (event) => {
        const value = event.target.value;
        setModel_name(value);
      }

      const handleColor = (event) => {
        const value = event.target.value;
        setColor(value);
      }

      const handlePicture = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
      }

      const handleBin = (event) => {
        const value = event.target.value;
        setBin(value);
      }


      return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create Shoe</h1>
					<form onSubmit={handleSubmit} id="create-shoe-form">
						<div className="form-floating mb-3">
							<input
                                onChange={handleModelName}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
                                value={model_name}
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                onChange={handlePicture}
								placeholder="Picture Href"
								required
								type="text"
								name="picture"
								id="picture"
								className="form-control"
                                value={picture_url}
							/>
							<label htmlFor="picture">Picture url</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                onChange={handleManufacturer}
								placeholder="manufacturer"
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
                                value={manufacturer}
							/>
							<label htmlFor="fabric">manufacturer</label>
						</div>
                        <div className="form-floating mb-3">
							<input
                                onChange={handleColor}
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
							<select onChange={handleBin} value={bin} required name="bin" id="bin" className="form-select">
								<option value=''>Choose a bin</option>
								{bins.map((bin) => (
                                <option key={bin.id} value={bin.id}>
                                    {bin.closet_name}
                                </option>
                            ))}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
    )
}


export default ShoesForm
