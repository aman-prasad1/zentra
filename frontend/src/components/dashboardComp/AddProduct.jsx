import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../features/admin/adminSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setFormData({ ...formData, images: files });
  };

  const convertToBlobFile = async (file) => {
    if (file instanceof File) return file; // Already a file from input
    const res = await fetch(file); // file here is a URL
    const blob = await res.blob();
    return new File([blob], "image.png", { type: blob.type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    for (const img of formData.images) {
      const file = await convertToBlobFile(img);
      data.append("product-images", file);
    }

    dispatch(createProduct(data));
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          autoComplete="off"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="number"
          name="price"
          autoComplete="off"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          autoComplete="off"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          autoComplete="off"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
