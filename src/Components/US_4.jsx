import { useEffect, useState } from 'react'
import URL from '../settings'

const US_4 = ({ facade }) => {
    const [boats, setBoats] = useState([])
    const [boat, setBoat] = useState({ name: '', brand: '', make: '', year: '', imageURL: '' })
    const [createBoat, setCreateBoat] = useState({ name: '', brand: '', make: '', year: '', imageURL: '', ownerId: '' })
    const [ownerId, setOwnerId] = useState()
    const [boatId, setBoatId] = useState()
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setCreateBoat({ ...createBoat, [id]: value })
    }


    const updateInputFields = (event) => {
        setBoatId(event.target.value);
    }

    const filter = () => {
        return boats.map((boat) => {
            if (boat.id === boatId) setBoat(boat)
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        createBoat.ownerId = ownerId

        // try {
        //     const options = facade.makeOptions('PUT', true, createBoat)
        //     await fetch(URL + '/boat', options)
        //         .catch(err => {
        //             if (err.status) {
        //                 err.fullError.then(
        //                     event =>
        //                         setErrorMsg("(" + event.errorCode + ") " + event.message),
        //                     setCreateBoat({ name: '', brand: '', make: '', year: '', imageURL: '', ownerId: ownerId }))
        //             } else console.log("Network Error")
        //         })
        // } finally {
        //     setCreateBoat({ name: '', brand: '', make: '', year: '', imageURL: '', ownerId: ownerId })
        // }

    }

    useEffect(() => {
        if (ownerId === undefined) {
            facade.fetchData("GET", "ownerId/" + facade.getUser(), (data) => setOwnerId(data.ownerId))
                .catch(err => {
                    if (err.status) {
                        err.fullError.then(
                            event =>
                                setErrorMsg("(" + event.errorCode + ") " + event.message),
                            setOwnerId(undefined))
                    } else console.log("Network Error")
                })
        }
        if (ownerId !== undefined) {
            facade.fetchData("GET", "boatsByOwner/" + ownerId, (data) => setBoats(data))
                .catch(err => {
                    if (err.status) {
                        err.fullError.then(
                            event =>
                                setErrorMsg("(" + event.errorCode + ") " + event.message),
                            setBoats([]))
                    } else console.log("Network Error")
                })
        }
    }, [facade, ownerId])

    return (
        <div>
            <br />
            [US-4] As an owner I would like to update an existing boat
            <hr />
            <p>
                <select onChange={updateInputFields}>
                    {boats.map((boat, index) => (
                        <option key={index} value={boat.id}>{boat.name}</option>
                    ))}
                    <option hidden>Choose boat...</option>
                </select>
            </p>
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
                            <td><input type='text' required value={createBoat.imageURL} onChange={handleChange} id='imageURL' /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align='right'><input type='submit' value='Add' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <p>{errorMsg}</p>
            {ownerId === undefined ? (<>Fetching id...</>) : (<></>)}
            {boatId === undefined ? (<>Boat id unknown...</>) : (boatId)}
            {/* <p>--- DEBUG ---<br />{JSON.stringify({
                name: createBoat.name,
                brand: createBoat.brand,
                make: createBoat.make,
                year: createBoat.make,
                imageURL: createBoat.imageURL,
                ownerId: ownerId
            })}</p> */}
        </div>
    )
}

export default US_4
