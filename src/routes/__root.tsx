import {createRootRoute, Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import '../index.css'

export const Route = createRootRoute({
    component: () => (
        <>
            <div className={'flex justify-center gap-2 '}>
                <Link to={"/"} className={'active:font-semibold bg-cyan-100 text-xl text-red-500'}>
                    Home
                </Link>
            </div>
            <hr/>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    )
})
