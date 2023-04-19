import React, {useEffect, useState} from 'react'

function Hats(props){
    const [name, setName] = useState('');
    const [hats, setHats]= useState([])
    const fetchData = async () => {
		const url = 'http://localhost:8090/api/hats';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.hats);
            console.log(data)
		}
	};
    return (
        <>

        </>
    )
}

export default Hats
