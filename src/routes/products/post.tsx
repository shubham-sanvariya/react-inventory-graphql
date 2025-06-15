import {useForm} from "@tanstack/react-form";
import {
    createProductPostSchema,
    Initial_Product_Values,
    postProductFormKeys
} from "../../validator/postProductValidator.ts";

export const Route = createFileRoute({
    component: Post
})

function Post() {

    const postProductForm = useForm({
        defaultValues: Initial_Product_Values,
        validators: {
            onChange: createProductPostSchema
        },
        asyncDebounceMs: 300,
        onSubmit: async () => {

        }
    })

    return (
        <div className={'flex flex-col justify-center items-center p-2 m-2'}>
            <h1>Add a Product</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                postProductForm.handleSubmit()
            }} id={"product-form"} className={'flex flex-col items-center'}>
                {postProductFormKeys.map((item, index) => (
                    <postProductForm.Field name={item[0]} key={index}>
                        {(field) => (
                            <>
                                <div className={'flex flex-col  mt-2'}>
                                    <label htmlFor={item[0]}>Enter {item[2]}</label>
                                    <input
                                        className="border-2"
                                        id={item[0]}
                                        name={item[0]}
                                        type={item[1]}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder={item[2]}
                                    />
                                </div>
                                {(field.state.meta.isTouched || postProductForm.state.isSubmitted) && Array.isArray(field.state.meta.errors) && field.state.meta.errors.length > 0 &&(
                                    <div className={'text-red-500'}>
                                        {typeof field.state.meta.errors[0] === 'object' && 'message' in field.state.meta.errors[0]
                                            ? field.state.meta.errors[0].message
                                            : String(field.state.meta.errors[0])}
                                    </div>
                                )}
                            </>
                        )}
                    </postProductForm.Field>
                ))}
                <button className={'border-1 mt-2 text-center w-20 bg-cyan-100'} type="submit" form={"product-form"} disabled={postProductForm.state.isSubmitting}>Post</button>
            </form>
        </div>
    )
}
