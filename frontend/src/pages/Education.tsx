import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEducation } from "../store/EducationSlice";

const Education = () => {
    const education = useSelector((state: any) => state.education);
    const dispatch = useDispatch();

    const { register, handleSubmit, control } = useForm({
        defaultValues: { education: education }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "education"
    });

    const onSubmit = (data: any) => {
        dispatch(addEducation(data.education));
    };

    const onAddEducation = () => {
        append({
            name: "",
            degree: "",
            location: "",
            startYear: null,
            endYear: null,
            description: ""
        });
    };

    const onRemoveEducation = (index: number) => {
        remove(index);
    };

    return (
        <>
            <h1>Education</h1>
            {!fields.length && <p>No Education added yet!</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((edu, index) => (
                    <div key={edu.id} className="mb-4">
                        <div className="flex flex-col gap-1 mb-3">
                            <div className="flex gap-4 items-center">
                                <label htmlFor={`education.${index}.name`} className="flex-grow">Name</label>
                                <Button type="button" icon="pi pi-trash" severity="danger" onClick={() => onRemoveEducation(index)} />
                            </div>
                            <InputText id={`education.${index}.name`} placeholder="Name" required={true} {...register(`education.${index}.name`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`education.${index}.degree`}>Degree</label>
                            <InputText id={`education.${index}.degree`} placeholder="Degree" required={true} {...register(`education.${index}.degree`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`education.${index}.location`}>Location</label>
                            <InputText id={`education.${index}.location`} placeholder="Location" required={true} {...register(`education.${index}.location`)} />
                        </div>
                        <div className="flex gap-4 mb-3">
                            <div className="flex-grow">
                                <label htmlFor={`education.${index}.startYear`} className="block">Start Year</label>
                                <Calendar id={`education.${index}.startYear`} placeholder="Start Year" required={true} {...register(`education.${index}.startYear`)} yearRange="2000:2030" view="year" dateFormat="yy" />
                            </div>
                            <div className="flex-grow">
                                <label htmlFor={`education.${index}.endYear`} className="block">End Year</label>
                                <Calendar id={`education.${index}.endYear`} placeholder="End Year" required={true} {...register(`education.${index}.endYear`)} yearRange="2000:2030" view="year" dateFormat="yy" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`education.${index}.description`}>Description</label>
                            <InputText id={`education.${index}.description`} placeholder="Description" required={true} {...register(`education.${index}.description`)} />
                        </div>
                    </div>
                ))}
                <Button type="button" icon="pi pi-plus" size="small" onClick={onAddEducation} label="Add Education" />
                <hr />
                <Button type="submit">Save</Button>

            </form>
        </>
    );
};

export default Education;
