import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/ProfileSlice";

const Profile = () => {
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, control, formState, getFieldState } = useForm({
        defaultValues: profile
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "links"
    });

    const onSubmit = (data: any) => {

        if (formState.isValid) {
            setIsSubmitting(true);
            dispatch(updateProfile(data));
            setIsSubmitting(false);
        }
    }

    const onAddLink = () => {
        append("");
    }

    const onRemoveLink = (index: number) => {
        remove(index)
    }

    return (
        <>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="firstName" className={formState.errors.firstName && "p-error"}>First Name*</label>
                    <Controller name="firstName" control={control} rules={{ required: "First Name is required" }} render={({ field, fieldState }) => (
                        <>
                            <InputText id={field.name} {...field} placeholder="First Name" className={fieldState.error ? "p-invalid" : ""} />
                            {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                        </>
                    )} />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="lastName" className={formState.errors.lastName && "p-error"}>Last Name*</label>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last Name is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputText id={field.name} {...field} placeholder="Last Name" className={fieldState.error ? "p-invalid" : ""} />
                                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                            </>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="title" className={formState.errors.title && "p-error"}>Title*</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputText id={field.name} {...field} placeholder="Title" className={fieldState.error ? "p-invalid" : ""} />
                                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                            </>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="summary" className={formState.errors.summary && "p-error"}>Summary*</label>
                    <Controller
                        name="summary"
                        control={control}
                        rules={{ required: "Summary is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <InputTextarea id={field.name} {...field} placeholder="Summary" rows={5} className={fieldState.error ? "p-invalid" : ""} />
                                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                            </>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <div className="flex gap-4 items-center">
                        <label htmlFor="links" className="flex-grow">Links</label>
                        <Button type="button" icon="pi pi-plus" size="small" onClick={onAddLink} />
                    </div>
                    {!fields.length && <p>No Links added yet!</p>}
                    {
                        fields.map((link: any, index: number) => (
                            <div key={index} className="flex items-start gap-4">
                                <Controller
                                    name={`links.${index}`}
                                    control={control}
                                    rules={{ required: "Link is required" }}
                                    render={({ field, fieldState }) => (
                                        <div className="grow">
                                            <InputText placeholder={`Link ${index + 1}`} {...field} className={fieldState.error ? "p-invalid w-full" : "w-full"} />
                                            {fieldState.error && <small className="p-error block">{fieldState.error.message}</small>}
                                        </div>
                                    )}
                                />
                                <Button severity="danger" icon="pi pi-trash" onClick={() => onRemoveLink(index)} />
                            </div>
                        ))
                    }
                </div>
                <div className="form-footer text-end">
                    <Button type="submit" label="Save" disabled={!formState.isValid} loading={isSubmitting} />
                </div>
            </form>
        </>
    )

}

export default Profile;