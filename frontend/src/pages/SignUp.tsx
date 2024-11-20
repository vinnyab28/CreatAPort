import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, control, handleSubmit, formState } = useForm();

    const onSubmit = () => {

    }
    return (<>
        <div className="container mx-auto h-full flex items-center">
            <Card title="Create Account" className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="Name" className={formState.errors.name && "p-error"}>Name*</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <InputText id={field.name} {...field} placeholder="Name" className={fieldState.error ? "p-invalid" : ""} maxLength={100} />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="Email" className={formState.errors.email && "p-error"}>Email*</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "E-mail is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <InputText id={field.name} {...field} keyfilter="email" placeholder="Email" className={fieldState.error ? "p-invalid" : ""} maxLength={100} />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="Password" className={formState.errors.password && "p-error"}>Password*</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Password id={field.name} {...field} placeholder="Password" className={fieldState.error ? "p-invalid p-fluid" : "p-fluid"} feedback={false} toggleMask />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-3">
                        <label htmlFor="Password" className={formState.errors.confirmPassword && "p-error"}>Confirm Password*</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{ required: "Confirm Password is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Password id={field.name} {...field} placeholder="Confirm Password" className={fieldState.error ? "p-invalid p-fluid" : "p-fluid"} feedback={false} toggleMask />
                                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                </>
                            )}
                        />
                    </div>
                    <div className="form-footer text-center mt-10">
                        <Button type="submit" label="SignUp" loading={isSubmitting} />
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </form>
            </Card>
        </div>
    </>)
}

export default SignUp;