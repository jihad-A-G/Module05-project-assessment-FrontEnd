import { Container } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Link,useLoaderData,Form,useSubmit } from "react-router-dom"
import { useState } from "react"
const AddProduct = () =>{
    const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedDetails, setSelectedDetails] = useState([]);
    const {categories,brands,details} = useLoaderData()
    const submit = useSubmit()
    const [formData,setFormData] = useState({})
    const handleCategoryChange = (event) => {
        const { checked, value } = event.target;
        setSelectedCategories((prev) =>
           checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
       };
       
       const handleBrandChange = (event) => {
        const { checked, value } = event.target;
        setSelectedBrands((prev) =>
           checked ? [...prev, value] : prev.filter((item) => item !== value)
        );

       };
       
       const handleDetailChange = (event) => {
        const { checked, value } = event.target;
        setSelectedDetails((prev) =>
           checked ? [...prev, value] : prev.filter((item) => item !== value)
        );

       };
    return(
    <>
    <div className="container">
    <Link style={{textDecoration:'none'}} className="text-black mb-2"><i class="bi bi-arrow-left"> Back</i></Link>
    <Container className='d-flex align-items-center mb-5 p-1 border-bottom border-3'>
            <h3 className='text-black '>Add product</h3>
        </Container>
  <div className="row">
    <div className="col-md-8 order-md-1">
      <Form className="needs-validation" method="POST">
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              name="productName"
              placeholder=""
              defaultValue=""
              required=""
            />
            <div className="invalid-feedback">
              Valid product name is required.
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder=""
              defaultValue=""
              required=""
              rows={7}
            />
            <div className="invalid-feedback">Valid description is required.</div>
          </div>
        </div>
        <h4>Categories</h4>
        <div className="custom-control custom-checkbox">
        {categories.map((c) => (
            <div key={`${c._id}`} className="mb-3">
            <label  htmlFor={`${c.name}`}>
            <input
            type={'checkbox'}
            id={`${c.name}`}
            value={c._id}
            onClick={handleCategoryChange}
          /> {c.name}
            </label>
        </div>
      ))}
        </div>
      <hr className="mb-4" />

        <h4>Brands</h4>
        <div className="custom-control custom-radio">
        {brands.map((b) => (
            <div key={`${b._id}`} className="mb-3">
            <label  htmlFor={`${b.name}`}>
            <input
            type={'radio'}
            id={`${b.name}`}
            value={b._id}
            name="brand"
          /> {b.name}
            </label>
        </div>
      ))}
        </div>
      <hr className="mb-4" />
      <input type="hidden" name="formData" value={JSON.stringify(formData)} />

        
        <h4>Details</h4>
        <div className="custom-control custom-checkbox">
        {details.map((d) => (
        <div key={`${d._id}`} className="mb-3">
            <label  htmlFor={`${d.specificName}`}>
            <input
            type={'checkbox'}
            id={`${d.specificName}`}
            value={d._id}
            onClick={handleDetailChange}
          /> {d.specificName}
            </label>
        </div>
      ))}
        </div>
        <hr className="mb-4" />

        <Button onClick={(e)=>{
        e.preventDefault()
        setFormData({...formData,categories:selectedCategories,details:selectedDetails})

        swal({
          title: "Are you sure you want to Add this product?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
          submit(e.target.form)
            swal("product was added successfully!", {
              icon: "success",
            });

          } else {
            
          }
        });
      }} type='submit' className='green-btn'>Add</Button>
      </Form>
    </div>
  </div>
</div>

    </>
    )
}

export default AddProduct