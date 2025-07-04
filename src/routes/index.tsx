import {getAllProducts} from "../api/inventory-service.ts";
import {type QueryClient, useQuery} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";

export const Route = createFileRoute({
    loader: async ({ context }) => {
        const { queryClient } = context as { queryClient : QueryClient };
        const arr = ["name","price"];
        await queryClient.prefetchQuery({
            queryKey: ['products', arr.join("\n")],
            queryFn: () => getAllProducts(arr)
        })

        return { arr };
    },

    component: Index
})

function Index ()  {
    const navigate = useNavigate();
    const { arr } : { arr : string[] } = Route.useLoaderData();

    const { data, isPending, error, isError } = useQuery({
        queryKey: ['products', arr.join("\n")],
        queryFn: () => getAllProducts(arr)
    })

    return (
        <div className={'flex gap-3 flex-wrap border-gray-600 border-2 p-3'}>
        {isPending && <span>Loading...</span>}
            {isError && <span>something went wrong. {error.message}</span>}
            {data?.map((item) => (
                <div key={item.id} className={'border-1 border-gray-500 p-3 h-[100px] hover:bg-amber-400'} onClick={() => navigate({to: `/products/${item.id}`})}>
                    <h2>Name : {item.name}</h2>
                    <h4>price: {item.price}</h4>
                </div>
            ))}
        </div>
    )
}

