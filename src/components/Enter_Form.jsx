import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Enter_Form = ({ details, setdetails }) => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getdata = async () => {
    try {
      const response = await api.get("/endpoint");
      setdetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const filteredDetails = details.filter((detail) => {
    const matchesCategory = categoryFilter
      ? detail.category === categoryFilter
      : true;

    const matchesSearchTerm = detail.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  const sortedDetails = [...filteredDetails].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedDetails.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedDetails.length / itemsPerPage);

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {/* Sticky Navbar */}
      {/* navnew */}

      <nav class="navbar bg-body-tertiary sticky-top">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/">
            E-Shop
          </Link>
          <form class="d-flex" role="search">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select me-2"
              value={categoryFilter}
            >
              <option value="">All Categories</option>
              <option value="men's clothing">Men's Clothing</option>

              <option value="shoes">Shoes</option>
              <option value="smartphone">Smartphone</option>
              <option value="audio">Audio</option>
              <option value="laptop">Laptop</option>
              <option value="smart home">Smart Home</option>
              <option value="gaming">Gaming</option>
              <option value="beauty">Beauty</option>
            </select>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select select-category"
              value={sortOrder}
            >
              <option value="asc">Sort by Price (Low to High)</option>
              <option value="desc">Sort by Price (High to Low)</option>
            </select>
          </form>
        </div>
      </nav>
      {/* navnew */}

      <div className="container mt-4 mb-4">
        <h1>Products</h1>
        <div className="row mt-5">
          {currentProducts.length > 0 ? (
            currentProducts.map((detail) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={detail.id}>
                <Link
                  to={`/EditForm/${detail.id}`}
                  className="card h-100 text-decoration-none"
                >
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {highlightText(detail.title)}
                    </h5>
                    <div className="img">
                      <img
                        src={detail.image}
                        className="card-img-top"
                        alt={detail.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </div>
                    <p className="card-text price">Price: ₹{detail.price}</p>
                    <p className={`card-text truncated-description`}>
                      {detail.description}
                    </p>
                    <p className="card-text">Category: {detail.category}</p>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enter_Form;
