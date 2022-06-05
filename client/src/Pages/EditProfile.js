import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";

import InputColumn from "../Atom/InputColumn";
import MainButton from "../Atom/MainButton";
import data from "../Assets/DataProfiles";
import MainNavbar from "../Component/MainNavbar";

import { API } from "../config/api";

const EditProfile = () => {
  const title = "Edit Profile";
  document.title = "DumbMerch | " + title;

  const [state] = useContext(UserContext);

  let navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null); //For image preview
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    image: "",
    phone: "",
    gender: "",
    address: "",
  });

  let { data: profiles, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/profile/" + id);
    return response.data.profile ;
  });
console.log(profiles);
  useEffect(() => {
    if (profiles) {
      setPreview(profiles.image);
      setForm({
        ...form,
        phone: profiles.phone,
        gender: profiles.gender,
        address: profiles.address,
      });
      setProfile(profiles);
    }
  }, [profiles]);

  const handleOnChange = (e) => {
    //update nilai saat isi value di kolom input
    // setState here
    setForm({
      ...form, //extarct state
      //beri nilai setState untuk value yg di kolom input, sesuai dengna name form control
      //updated = nilai e.setState berubah menjadi name, karena elemnt name ada smua di kolom input
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // console.log(state);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          //input dengan form data
          'content-type': 'multipart/form-data',
        },
      };

      let formData = new FormData();
      if (form.image) {
        formData.append("image", form?.image[0], form?.image[0]?.name);
      }
      formData.append("phone", form.phone);
      formData.append("gender", form.gender);
      formData.append("address", form.address);
      
      const response = await API.patch(
        "/profile/" + profile.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <MainNavbar />
      <Container>
        <h4 className="text-light my-4">Edit Profile</h4>
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="my-5">
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
          <input
            type="file"
            id="upload"
            name="image"
            hidden
            onChange={handleOnChange}
          />
          <label for="upload" className="text-white">
            Upload file
          </label>
          
          <InputColumn
            holder="phone"
            value={form?.phone}
            change={handleOnChange}
            name="phone"
          />
          <InputColumn
            holder="gender"
            value={form?.gender}
            change={handleOnChange}
            name="gender"
          />
          <InputColumn
            holder="address"
            value={form?.address}
            change={handleOnChange}
            name="address"
            as="textarea"
            rows={3}
          />
          <MainButton type="submit" color="success" btn="Save" />
        </form>
      </Container>
    </>
  );
};

export default EditProfile;
