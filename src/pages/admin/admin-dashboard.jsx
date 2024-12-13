import React, { useEffect, useState } from "react";
import { Table, Container, Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCategoryRevenueReport,
  GetProductRevenueReport,
  GetSubCategoryRevenueReport,
  GetTopSellersReport,
} from "../../service/reportSlice";

const AdminDashboard = () => {
  const { reportList } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    if (activeReport) {
      if (activeReport === "topSellers") {
        dispatch(GetTopSellersReport());
      } else if (activeReport === "productRevenue") {
        dispatch(GetProductRevenueReport());
      } else if (activeReport === "categoryRevenue") {
        dispatch(GetCategoryRevenueReport());
      } else if (activeReport === "subcategoryRevenue") {
        dispatch(GetSubCategoryRevenueReport());
      }
    }
  }, [activeReport, dispatch]);

  const renderReport = () => {
    switch (activeReport) {
      case "topSellers":
        return (
          <Card>
            <Card.Header className="bg-dark text-white">
              Top Sellers by Revenue
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Seller Name</th>
                    <th>Total Quantity Sold</th>
                    <th>Total Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((seller) => (
                    <tr key={seller.sellerId}>
                      <td>{seller.sellerId}</td>
                      <td>{seller.sellerName}</td>
                      <td>{seller.totalQuantitySold}</td>
                      <td>{seller.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      case "productRevenue":
        return (
          <Card>
            <Card.Header className="bg-success text-white">
              Revenue by Products
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Total Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      case "categoryRevenue":
        return (
          <Card>
            <Card.Header className="bg-info text-white">
              Revenue by Categories
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Total Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((category) => (
                    <tr key={category.id}>
                      <td>{category.categoryId}</td>
                      <td>{category.categoryName}</td>
                      <td>{category.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      case "subcategoryRevenue":
        return (
          <Card>
            <Card.Header className="bg-warning text-white">
              Revenue by Subcategories
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Subcategory Name</th>
                    <th>Total Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((subcategory) => (
                    <tr key={subcategory.subcategoryId}>
                      <td>{subcategory.subCategoryId}</td>
                      <td>{subcategory.subCategoryName}</td>
                      <td>{subcategory.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      default:
        return <p>Please select a report to generate.</p>;
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setActiveReport("topSellers")}
          >
             Top Sellers 
          </Button>
        </Col>
        <Col md={3}>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setActiveReport("productRevenue")}
          >
            Product Revenue
          </Button>
        </Col>
        <Col md={3}>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setActiveReport("categoryRevenue")}
          >
            Category Revenue
          </Button>
        </Col>
        <Col md={3}>
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setActiveReport("subcategoryRevenue")}
          >
            Subcategory Revenue
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>{renderReport()}</Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
