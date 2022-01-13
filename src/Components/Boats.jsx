import { useEffect, useState } from 'react'

const Boats = ({ facade }) => {
    const [boats, setBoats] = useState([])
    const [owners, setOwners] = useState([])
    const [ownerId, setOwnerId] = useState(1)
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        setOwnerId(event.target.value);
    }

    useEffect(() => {
        facade.fetchData("GET", "boatsByOwner/" + ownerId, (data) =>
            setBoats(data), setErrorMsg(''))
            .catch(err => {
                if (err.status) {
                    err.fullError.then(
                        event =>
                            setErrorMsg("(" + event.errorCode + ") " + event.message),
                        setBoats([]))
                } else console.log("Network Error")
            })
        facade.fetchData("GET", "owners", (data) => setOwners(data))
    }, [facade, ownerId])

    return (
        <div>
            <br />
            [US-2] As an owner I would like to see my boats
            <hr />
            <p>
                <select onChange={handleChange}>
                    {owners.map((owner, index) => (
                        <option key={index} value={owner.id}>{owner.name}</option>
                    ))}
                </select>
            </p>
            <table>
                <colgroup>
                    <col width={50} />
                    <col width={100} />
                    <col width={100} />
                    <col width={100} />
                    <col width={100} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Brand</th>
                        <th>Make</th>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                    {boats.map((boat, index) => (
                        <tr key={index}>
                            <td>{boat.id}</td>
                            <td>{boat.brand}</td>
                            <td>{boat.make}</td>
                            <td>{boat.name}</td>
                            <td>{boat.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{errorMsg}</p>
        </div>
    )
}
export default Boats