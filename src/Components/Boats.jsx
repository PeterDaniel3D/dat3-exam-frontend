import { useEffect, useState } from 'react'

const Boats = ({ facade }) => {
    const [boats, setBoats] = useState([])
    const [ownerId, setOwnerId] = useState(undefined)
    const [errorMsg, setErrorMsg] = useState('No boats found. May I suggest an Auction?!')

    useEffect(() => {
        if (ownerId === undefined) {
            facade.fetchData("GET", "ownerId/" + facade.getUser(), (data) => setOwnerId(data))
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
            facade.fetchData("GET", "boatsByOwner/" + ownerId.ownerId, (data) =>
                setBoats(data), setErrorMsg(''))
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
            [US-2] As an owner I would like to see my boats
            <hr />
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

            {/* <p>--- DEBUG ---<br />User: {facade.getUser()}<br />JSON: {JSON.stringify(ownerId)}</p> */}
        </div>
    )
}
export default Boats