import {Button, Container,Carousel,Card} from 'react-bootstrap'
import { Form,Link } from 'react-router-dom'
import { useLoaderData,useSubmit } from 'react-router-dom'
import LinearIndeterminate from '../components/progressBar'
const ProductsPage = () =>{
  const data = useLoaderData()
  const submit = useSubmit()
    return(
        <div>
       {data?
       (
        <> <Container className='d-flex justify-content-between align-items-center mb-3 p-2 border-bottom border-3'>
            <h3 className='text-black '>Products</h3>
            <div className="d-flex align-items-center column-gap-4">
                <div className="dropdown">
            <a
    className="nav-link dropdown-toggle"
    href="#"
    id="filterDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Filter
  </a>
  <ul className="dropdown-menu px-0 py-1 mt-2 " aria-labelledby="filterDropdown" >
  <li className='border-bottom'>
    <a className='py-1 link px-3 text-black d-block link-underline link-underline-opacity-0'>
      New
    </a>
    </li>
    <li className='border-bottom' >
      <a className='py-1 px-3 text-black d-block link-underline link-underline-opacity-0'>
      Accepted
      </a>
    </li>
    <li className='border-bottom' >
      <a className='py-1 px-3 text-black d-block link-underline link-underline-opacity-0'>
      Pending
      </a>
    </li>
    <li className='' >
      <a className='py-1 px-3 text-black d-block link-underline link-underline-opacity-0'>
      Rejected
      </a>
    </li>
  </ul>
  </div>
                <Button className='bg-danger border-0'><i className="bi bi-trash-fill"></i> Remove rejected</Button>
                <Button variant='primary'><Link className="text-white " style={{textDecoration: "none"}} to={'add-product'}><i class="bi bi-plus-circle"></i> Add product</Link></Button>
            </div>
        </Container>
        <Container fluid className='d-flex justify-content-center flex-row flex-wrap column-gap-4 row-gap-4'>
          {data?data.map(product =>{
            console.log(product.details);
              
            
           return <Card key={product._id} style={{ width: '18rem' }}>
            <Carousel>
                    {product.details[0]?.images.map((image, index) => (
                        <Carousel.Item key={index} className='w-100 h-25'>
                            <img src={`http://localhost:4000/images/${image}`} className='d-block h-100 w-100 bg-white' alt="Product Image"/>
                        </Carousel.Item>
                    ))}
                </Carousel>
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
                {
                    product.status.toLowerCase() ==='new'?<div className="d-flex justify-content-center w-100"><Button className='bg-dark green-hover w-100 border-0'>Publish</Button></div> : product.status.toLowerCase() === 'accepted'?
                    <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary"><Link className='text-white' style={{textDecoration:'none'}} to={`edit-product/${product._id}`}><i className="bi bi-pencil-square"></i> Edit</Link></Button>
                    <Form method="DELETE">
                      <input name='id' type='hidden' value={`${product._id}`}/>
                    <Button type='submit' onClick={(e)=>{
                       e.preventDefault()
                       swal({
                         title: "Are you sure you want to delete?",
                         icon: "warning",
                         buttons: true,
                         dangerMode: true,
                       })
                       .then((willDelete) => {
                         if (willDelete) {
                           submit(e.target.form)
                           swal("Product was deleted successfully!", {
                             icon: "success",
                           });
               
                         } else {
                           
                         }
                       });
                    }} variant="danger"><i className="bi bi-trash-fill"></i> Delete</Button></Form></div> :product.status.toLowerCase() === 'rejected'?
                   <div className="d-flex justify-content-center w-100"><Button tabindex="-1" className='bg-danger w-100 border-0 pe-none'><i className="bi bi-x-lg"></i> Rejected</Button></div>:
                   <div className="d-flex justify-content-center w-100"><Button tabindex="-1" className='bg-secondary w-100 border-0 pe-none'><i className="bi bi-clock-history"></i> Pending</Button></div>
    }
            
          </Card.Body>
        </Card>
      
    
           
          }):<div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>}
        </Container>
        </>):(
        <LinearIndeterminate/>
        )}
        
        </div>
    )

}

export default ProductsPage