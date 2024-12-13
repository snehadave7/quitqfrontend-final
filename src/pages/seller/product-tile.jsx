import { Button, Card } from "react-bootstrap";

function SellerProductTile({
  formData,
  product,
  setFormData,
  setOpenCreateProductDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  // console.log(product);
  return (
    <Card className="mx-auto" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`https://localhost:7152/${product.imageUrl}`}
        alt={product?.title}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{product?.name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-semibold text-primary">${product?.price}</span>
          <span>Stock: {product?.stock}</span>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedId(product?.id);
              setFormData(product);
              // console.log(formData);
            }}
            variant="dark"
          >
            Edit
          </Button>
          <Button onClick={()=>{
            handleDelete(product?.id)
          }} variant="danger">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SellerProductTile;
