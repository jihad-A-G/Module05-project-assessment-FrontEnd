import {Card,Button,Carousel} from 'react-bootstrap'
import '../admin-style.css'
// eslint-disable-next-line react/prop-types
const ProductCard = ({data}) =>{
  console.log(data);
    return(
        <>
        <Card style={{ width: '18rem' }}>
        <Carousel>
                {data.details[0].images.map((image, index) => (
                    <Carousel.Item key={index} className='w-100 h-25'>
                        <img src={`http://localhost:4000/images/${image}`} className='d-block h-100 w-100' alt="Product Image"/>
                    </Carousel.Item>
                ))}
            </Carousel>
      <Card.Body>
        <Card.Title>{data.productName}</Card.Title>
        <Card.Text>
          {data.description}
        </Card.Text>
            {
                data.status.toLowerCase() ==='new'?<div className="d-flex justify-content-center w-100"><Button className='bg-dark green-hover w-100 border-0'>Publish</Button></div> : data.status.toLowerCase() === 'accepted'?
                <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary"><i className="bi bi-pencil-square"></i> Edit</Button>
                <Button variant="danger"><i className="bi bi-trash-fill"></i> Delete</Button></div> :data.status.toLowerCase() === 'rejected'?
               <div className="d-flex justify-content-center w-100"><Button tabindex="-1" className='bg-danger w-100 border-0 pe-none'><i className="bi bi-x-lg"></i> Rejected</Button></div>:
               <div className="d-flex justify-content-center w-100"><Button tabindex="-1" className='bg-secondary w-100 border-0 pe-none'><i className="bi bi-clock-history"></i> Pending</Button></div>
}
        
      </Card.Body>
    </Card>

        </>
    )

}

export default ProductCard