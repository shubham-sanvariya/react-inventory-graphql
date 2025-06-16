import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNewProduct} from "../api/inventory-service.ts";
import type {Product} from "../types/product.ts";
import {useNavigate} from "@tanstack/react-router";


export const useProductMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNewProduct,
        onMutate: async (product) => {

            const queriesToCancel = [
                ['products', ["name", "price"].join("\n")],
                ['products']
            ]
            await Promise.all(
                queriesToCancel.map((key) => {
                    queryClient.cancelQueries({queryKey: key})
                })
            )

            const previousProducts = queryClient.getQueryData<Product[]>(['products']) || [];

            queryClient.setQueryData(['products'], [...previousProducts, product]);

            return {previousProducts}
        },

        onError: (_, __, context) => {
            if (context?.previousProducts){
                queryClient.setQueryData(["products"],context.previousProducts)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            }).then()
        },
        onSuccess: () => {
            navigate({
                to: "/"
            }).then()
        }
    })
};
