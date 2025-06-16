import axios from "axios";
import type {Product} from "../types/product.ts";
import type {PostFormTypes} from "../validator/postProductValidator.ts";


const api = axios.create({
    baseURL: "http://localhost:9191/graphql",
    headers: {
        "Content-Type": "application/json"
    },

})

export const getAllProducts = async (keys?: string[]): Promise<Product[]> => {

    const query = `query MyQuery {
          getProducts {
            id
            ${keys && keys.length > 0 ? keys.join("\n") : "name category price stock"}
          }
}`;

    try {

        const response = await api.post("", {
            query: query,
        })

        if (response.data.errors) {
            new Error(response.data.errors[0].message);
        }

        return response.data.data.getProducts;

    } catch (e: unknown) {
        console.error("Error fetching products:", e);
        throw e;
    }
}

export const getProductById = async (id: number): Promise<Product> => {
    const query = `query GetProductById {
  getProductById(id: ${id}) {
    name
    price
    stock
    category
    id
  }
}`

    try {
        const response = await api.post('', {
            query
        })

        if (response.data.errors) {
            new Error(response.data.errors[0].message);
        }

        return response.data.data.getProductById;
    } catch (e: unknown) {
        console.error("Error fetching product By Id:", e);
        throw e;
    }
}

export const createNewProduct = async (postValues: PostFormTypes): Promise<Product> => {
    const mutation = `
        mutation CreateNewProduct($input: CreateProductInput!) {
            saveNewProduct(input: $input) {
                name
                price
                stock
                category
            }
        }
    `;
    try {
        const response = await api.post('', {
            query : mutation,
            variables : {
                input : postValues
            }
        })

        if (response.data.errors) {
           new Error(response.data.errors[0].message);
        }

        return response.data.data.saveNewProduct;
    } catch (e: unknown) {
        console.error("Error saving new Product", e);
        throw e;
    }
}

