import { useEffect, useState } from 'react'

const Auctions = ({ facade }) => {
    const [auctions, setAuctions] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const updateAuctions = (data) => {
        setAuctions(data)
    }

    useEffect(() => {
        facade.fetchData('GET', 'auctions', updateAuctions)
            .catch(err => {
                if (err.status) {
                    err.fullError.then(
                        event =>
                            setErrorMsg('(' + event.errorCode + ') ' + event.message),
                        updateAuctions([])
                    )
                } else console.log('Network Error')
            })
    }, [facade])

    return (
        <div>
            <br />
            <p>[US-1] As a user I would like to see all auctions</p>
            <hr />
            <table>
                <colgroup>
                    <col width={50} />
                    <col width={250} />
                    <col width={150} />
                    <col width={100} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                    {auctions.map((auction, index) => (
                        <tr key={index}>
                            <td>{auction.id}</td>
                            <td>{auction.name}</td>
                            <td>{auction.date}</td>
                            <td>{auction.time}</td>
                            <td>{auction.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errorMsg}
        </div>
    )
}
export default Auctions
