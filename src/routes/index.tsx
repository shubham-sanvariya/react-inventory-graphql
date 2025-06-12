import {getAllProducts} from "../api/inventory-service.ts";
import type {Product} from "../types/product.ts";

export const Route = createFileRoute({
    component: Index,
    loader: async () => {
       const products : Product[] = await getAllProducts(["name","stock"]);
        console.log(products)
        return {products}
    },
    errorComponent: ( {error} ) => <div>something went wrong. {error.message}</div>
})

function Index ()  {
    const { products } = Route.useLoaderData();
    return (
        <div>
            {products.map((item) => (
                <div key={item.id}>
                    <h2>Name : {item.name}</h2>
                    <h4>price: {item.stock}</h4>
                    <h4>price: {item.price}</h4>
                </div>
            ))}
        </div>
    )
}

