import { useEffect, useState } from 'react'

const US_3 = ({ facade }) => {

    const [createBoat, setCreateBoat] = useState({ name: '', brand: '', make: '', year: '', imageURL: '' })

    const handleChange = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setCreateBoat({ ...createBoat, [id]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const options = facade.makeOptions('POST', true, createBoat)
            await fetch(URL + '/boat', options)
        } finally {
            setCreateBoat({ name: '', brand: '', make: '', year: '', imageURL: '' })
        }
    }

    return (
        <div>
            <br />
            [US-3] As an owner I would like to add a new boat
            <hr />
            <form onSubmit={handleSubmit}>
                <table>
                    <colgroup>
                        <col width={70} />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' required value={createBoat.name} onChange={handleChange} id='name' /></td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td><input type='text' required value={createBoat.brand} onChange={handleChange} id='brand' /></td>
                        </tr>
                        <tr>
                            <td>Make</td>
                            <td><input type='text' required value={createBoat.make} onChange={handleChange} id='make' /></td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td><input type='text' required value={createBoat.year} onChange={handleChange} id='year' /></td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td><input type='text' required value={createBoat.imageURL} onChange={handleChange} id='image' /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align='right'><input type='submit' value='Add' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {/* Debug */}
            {/* {JSON.stringify({ brand: createBoat.brand, make: createBoat.make, name: createBoat.name, image: createBoat.image })} */}
        </div >
    )
}

export default US_3
