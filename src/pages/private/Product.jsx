import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./schema/product.schema";
import "../../css/product.css";

const Product = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onAddProduct = (data) => {
    console.log(data);
    // Handle product submission here
  };

  return (
    <>
      <form onSubmit={handleSubmit(onAddProduct)}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            {...register("productName")}
            type="text"
            placeholder="Enter product name"
          />
          {errors.productName && <p>{errors.productName.message}</p>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            {...register("price")}
            type="number"
            placeholder="Enter product price"
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            {...register("category")}
            type="text"
            placeholder="Enter product category"
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            {...register("stockQuantity")}
            type="number"
            placeholder="Enter stock quantity"
          />
          {errors.stockQuantity && <p>{errors.stockQuantity.message}</p>}
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            {...register("quantity")}
            type="number"
            placeholder="Enter quantity"
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        <div className="form-group">
          <label>Size</label>
          <input
            {...register("size")}
            type="text"
            placeholder="Enter size"
          />
          {errors.size && <p>{errors.size.message}</p>}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default Product;





