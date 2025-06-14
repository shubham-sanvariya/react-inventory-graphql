import {type QueryClient, useQuery} from "@tanstack/react-query";
import {getProductById} from "../../api/inventory-service.ts";

export const Route = createFileRoute({
    loader: async ({context, params}) => {
        const { id } = params as { id : string };
        console.log(id);
        const {queryClient} = context as { queryClient: QueryClient }
        await queryClient.prefetchQuery({
            queryKey: ['product', id],
            queryFn: () => getProductById(Number(id))
        })

        return { id }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useLoaderData();

    const { data, isPending, error, isError, isSuccess } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(Number(id))
    })

    return <>
        {isPending && <div>Loading...</div>}
        {isError && <div>something went wrong. {error.message}</div>}
        {isSuccess && <div className="flex flex-col justify-center items-center gap-2 p-2">
            <h2>Name : {data?.name}</h2>
            <h4>price: {data?.price}</h4>
            <h4>price: {data?.category}</h4>
            <h4>price: {data?.stock}</h4>
        </div>}
    </>
}
