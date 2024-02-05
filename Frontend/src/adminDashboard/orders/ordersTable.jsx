import { Table,Container } from "react-bootstrap"
import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import LinearIndeterminate from "../components/progressBar";

const OrdersTable = () => {
 const data = useLoaderData();
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 10;
 const totalPages = Math.ceil(data.length / itemsPerPage);

 const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
 };

 const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
 };

 const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

 return (
    <>
    {!data?<LinearIndeterminate/>:
    <>
    <Container className='d-flex justify-content-between align-items-center mb-3 p-2 border-bottom border-3'>
            <h3 className='text-black '>Orders</h3>
        </Container>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Username</th>
            <th>Products</th>
            <th>Total price</th>
            <th>Date</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map(row => {
            var date = new Date(row.date);
            return (
              <tr key={row._id}>
                <td>{row.orderNumber}</td>
                <td>{row.userId.username}</td>
                <td>{row.products.length}</td>
                <td>{row.totalPrice}</td>
                <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                <td>{row.userId.phoneNumber}</td>
                <td>{row.userId.address}</td>
                <td className={`${row.status.toLowerCase() === "pending" ? 'bg-secondary' : row.status.toLowerCase() === 'recieved' ? 'bg-success' : 'bg-warning'}`}>{row.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={handlePrevPage}>Previous</a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : null}`} onClick={() => setCurrentPage(page)}>
              <a className="page-link" href="#">{page}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={handleNextPage}>Next</a>
          </li>
        </ul>
      </nav>
      </>}
    </>
 );
};

export default OrdersTable;
