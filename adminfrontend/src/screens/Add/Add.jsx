import { useState, useEffect, useContext } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";



const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [data, setData] = useState({
    foodName: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.foodName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        foodName: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding food item"
      );
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
  }, []);

  return (
    <div className="screen">
      <div className="container">
        <form onSubmit={onSubmitHandler} className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="preview"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
          <div className="add-food-name flex-col">
            <p>Name</p>
            <input
              type="text"
              name="foodName"
              value={data.foodName}
              onChange={onChangeHandler}
              placeholder="Type here"
              required
            />
          </div>
          <div className="add-food-description flex-col">
            <p>Description</p>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              rows="6"
              placeholder="Write content here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Category</p>
              <select
                onChange={onChangeHandler}
                value={data.category}
                name="category"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="₹150"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;

