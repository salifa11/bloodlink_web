import z from "zod";

export const productSchema = z.object({
  productName: z
    .string()
    .nonempty({ message: "Product Name is Required" })
    .min(3, { message: "Product Name must be at least 3 characters" }),
  price: z
    .string()
    .nonempty({ message: "Price is Required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  description: z
    .string()
    .nonempty({ message: "Description is Required" })
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z
    .string()
    .nonempty({ message: "Category is Required" }),
  stockQuantity: z
    .string()
    .nonempty({ message: "Stock Quantity is Required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Stock Quantity must be a non-negative number",
    }),
  quantity: z
    .string()
    .nonempty({ message: "Quantity is Required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive number",
    }),
  size: z
    .string()
    .nonempty({ message: "Size is Required" }),
});
