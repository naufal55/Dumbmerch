import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardImage from "../Component/CardImage";
import foto from "../Assets/avatar.png"
import CardTransaction from "../Component/CardTransaction";
import CardRating from "../Component/CardRating";
import { useNavigate } from "react-router-dom";
import MainButton from "../Atom/MainButton";
import MainNavbar from "../Component/MainNavbar";

import { UserContext } from "../context/userContext";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const Profile = () => {
  const title = "Profile";
  document.title = "DumbMerch | " + title;

  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [idFile, setIdFile] = useState();
  const [comment, setComment] = useState({
    comment: "",
    totalRate: 0,
  });
  const [productFile, setProductFile] = useState();
  // const [dataRating,setDataRating] = useState();
  const [star, setStar] = useState(0);

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions/" + state.user.id);
    // setDataRating(Response.data.transactions)
    return response.data.transactions;
  });
  
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile/" + state.user.id);
    return response.data.profile;
  });

  const handleRate = (set) => {
    setStar(set);
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      setImageFile(null);
      setProductFile(null);
      setIdFile(null);
      setShow(false);

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Store data with FormData as object
      const body = JSON.stringify(comment);

      // Insert product data
      const response = await API.patch("/rating/" + idFile, body, config);
      // console.log(response.data);
      // console.log(comment);
      // console.log(star);
      // console.log(comment.totalRate);

      navigate("/homepage");
    } catch (error) {
      console.log(error);
    }
  });
  const handleChangeProfile = () => {
    navigate("/edit-profile/" + state.user.id);
  };
  const handleChange = (e) => {
    setComment({
      ...comment,
      comment: e.target.value,
      totalRate: star,
    });
  };

  const handleClose = () => {
    setImageFile(null);
    setProductFile(null);
    setIdFile(null);
    setShow(false);
  };

  return (
    <>
      <MainNavbar title={title} />
      <Container className="mt-3">
        <Row className="d-flex justify-content-center align-items-start my-auto bg-none">
          <div className=" col-sm-12 col-md-7">
            <h4 className="text-danger my-4">My Profile</h4>

            <Row className="gap-3">
              <Col sm={12} md={5}>
              
              <CardImage src={profile?.image || foto} />
                {/* <CardImage src={foto} /> */}
              </Col>
              <Col sm={12} md={6}>
                <div>
                  <p className="text-danger my-1 fw-bold">Name</p>
                  <p className="text-light mb-4">{state.user.name}</p>
                </div>
                <div>
                  <p className="text-danger my-1 fw-bold">Email</p>
                  <p className="text-light mb-4">{state.user.email}</p>
                </div>
                <div>
                  <p className="text-danger my-1 fw-bold">Phone</p>
                  <p className="text-light mb-4">
                    {profile?.phone ? profile?.phone : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-danger my-1 fw-bold">Gender</p>
                  <p className="text-light mb-4">
                    {profile?.gender ? profile?.gender : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-danger my-1 fw-bold">Address</p>
                  <p className="text-light mb-4">
                    {profile?.address ? profile?.address : "-"}
                  </p>
                </div>

                <div>
                  <MainButton
                    click={handleChangeProfile}
                    color="success"
                    type="button"
                    btn="Change my profile"
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="col-sm-12 col-md-5">
            <h4 className="text-danger my-4 ">My Transaction</h4>

            {transactions?.length !== 0 ? (
              <>
                {transactions?.map((item,index) => (
                  <div key={index} className="mb-3">
                    <CardTransaction
                      image={item.product.image}
                      namabarang={item.product.title}
                      tglBeli={item.CreatedAt}
                      harga={item.product.price}
                      desc={item.product.desc}
                      click={() => {
                        setShow(true);
                        setImageFile(item.product.image);
                        setProductFile(item.product.title);
                        setIdFile(item.rating.id);
                        setComment({
                          comment: item.rating.comment,
                          totalRate: item.rating.totalRate,
                        });
                      }}
                      val={item.rating.totalRate}
                      per={item.rating.totalRate}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p className="text-danger">data empty</p>
            )}
          </div>
        </Row>

        {/* {transactions?.map((item) => ( */}
        <div className="mb-3">
          <CardRating
            rate={handleRate}
            change={handleChange}
            onSubmit={(e) => handleSubmit.mutate(e)}
            submit={handleSubmit}
            close={handleClose}
            vRate={comment.totalRate}
            value={comment.comment}
            show={show}
            gambar={imageFile}
            name={productFile}
          />
        </div>
      </Container>
    </>
  );
};

export default Profile;
