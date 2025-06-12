import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:9191/graphql",
    headers: {
        "Content-Type": "application/json"
    },

})

export const getAllProducts = async (keys?: string[]) => {

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
