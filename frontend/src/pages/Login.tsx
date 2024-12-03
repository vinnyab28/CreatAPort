import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Password } from "primereact/password";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useToast } from "../hooks/ToastContext";
import "../styles/login.css";

const Login = () => {
    const { login } = useAuth();
    const { showSuccessToast } = useToast();
    const navigate = useNavigate();
    const msgs = useRef<Messages>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, control, handleSubmit, formState } = useForm();

    const onSubmit = (values: any) => {
        setIsSubmitting(true);
        const { email, password } = values;
        const body = { email, password }
        axios.post("http://localhost:3001/login", body, { withCredentials: true }).then(res => {
            showSuccessToast(res.data.message);
            login(res.data.body.token);
            navigate("/profile");
        }).catch(err => {
            const ERROR_MESSAGE = err?.response?.data?.message ?? "Internal Server Error";
            if (msgs.current) {
                msgs.current?.clear();
                if (err.status === 403) {
                    msgs.current?.show({ id: '1', sticky: true, severity: 'info', summary: 'Info', detail: ERROR_MESSAGE, closable: false });
                } else {
                    msgs.current?.show({ id: '1', sticky: true, severity: 'error', summary: 'Error', detail: ERROR_MESSAGE, closable: false });
                }
            }
        }).finally(() => {
            setIsSubmitting(false);
        })
    }
    return <>
        <div className="container-wrapper h-full">
            <div className="container ml-auto h-full">
                <Card title="Login" className="md:w-1/2 p-fluid h-full flex items-center ml-auto border-black border-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Messages ref={msgs} />
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor="Email" className={formState.errors.email && "p-error"}>Email*</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "E-mail is required", pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email format',
                                    },
                                    maxLength: { value: 100, message: "Max length exceeded" }
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <InputText id={field.name} {...field} placeholder="Email" type="email" keyfilter="email" className={fieldState.error && "p-invalid"} maxLength={100} />
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
                                        <Password id={field.name} {...field} placeholder="Password" className="p-fluid" inputClassName={fieldState.error && "p-invalid"} feedback={false} toggleMask />
                                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                                    </>
                                )}
                            />
                            <p className="self-end">Don't have an account? <Link to="/signup">Create here</Link></p>
                        </div>
                        <div className="form-footer text-center mt-10">
                            <Button type="submit" label="Login" loading={isSubmitting} />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    </>
}

export default Login;