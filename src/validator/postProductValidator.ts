import z from 'zod'

export const Initial_Product_Values = {
    name: "",
    category: "",
    price: 0,
    stock: 0
} as PostFormTypes

export type PostFormTypes = {
    name: string;
    category: string;
    price: number;
    stock: number;
}

export const postProductFormKeys : Array<[keyof PostFormTypes, string, string]> = [
    ["name", "string", "Product Name"],
    ["category", "string", "Product Category"],
    ["price", "number", "Price"],
    ["stock", "number", "stock"],
];

export const createProductPostSchema = z.object({
    name: z.string().min(3, "Product Name must have 3 to 100 characters").max(100, "Product Name must be between 3 to 100 characters"),
    category: z.string().min(3, "Product Name must have 3 to 50 characters").max(50, "Product Name must have 3 to 100 characters"),
    price: z.number().min(1,"price of the product should be least 1"),
    stock: z.number().min(1,"stock of the product should be least 1")
})
