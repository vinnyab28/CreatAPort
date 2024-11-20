import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../store/ExperienceSlice";

const Experience = () => {
    const experience = useSelector((state: any) => state.experience);
    const dispatch = useDispatch();

    const { register, handleSubmit, control } = useForm({
        defaultValues: { experience: experience }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "experience"
    });

    const onSubmit = (data: any) => {
        dispatch(addExperience(data.experience));
    };

    const onAddExperience = () => {
        append({
            companyName: "",
            jobTitle: "",
            location: "",
            startYear: null,
            endYear: null,
            description: ""
        });
    };

    const onRemoveExperience = (index: number) => {
        remove(index);
    };

    return (
        <>
            <h1>Experience</h1>
            {!fields.length && <p>No Experience added yet!</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((exp, index) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex flex-col gap-1 mb-3">
                            <div className="flex gap-4 items-center">
                                <label htmlFor={`experience.${index}.companyName`} className="flex-grow">Company Name</label>
                                <Button type="button" icon="pi pi-trash" severity="danger" onClick={() => onRemoveExperience(index)} />
                            </div>
                            <InputText id={`experience.${index}.companyName`} placeholder="Company Name" required={true} {...register(`experience.${index}.companyName`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`experience.${index}.jobTitle`}>Job Title</label>
                            <InputText id={`experience.${index}.jobTitle`} placeholder="Job Title" required={true} {...register(`experience.${index}.jobTitle`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`experience.${index}.location`}>Location</label>
                            <InputText id={`experience.${index}.location`} placeholder="Location" required={true} {...register(`experience.${index}.location`)} />
                        </div>
                        <div className="flex gap-4 mb-3">
                            <div className="flex-grow">
                                <label htmlFor={`education.${index}.startYear`} className="block">Start Year</label>
                                <Calendar id={`education.${index}.startYear`} placeholder="Start Year" required={true} {...register(`experience.${index}.startYear`)} yearRange="2000:2030" />
                            </div>
                            <div className="flex-grow">
                                <label htmlFor={`experience.${index}.endYear`} className="block">End Year</label>
                                <Calendar id={`experience.${index}.endYear`} placeholder="End Year" required={true} {...register(`experience.${index}.endYear`)} yearRange="2000:2030" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`experience.${index}.description`}>Description</label>
                            <InputTextarea id={`experience.${index}.description`} rows={10} placeholder="Description" required={true} {...register(`experience.${index}.description`)} />
                        </div>
                    </div>
                ))}
                <Button type="button" icon="pi pi-plus" size="small" onClick={onAddExperience} label="Add Experience" />
                <hr />
                <Button type="submit">Save</Button>

            </form>
        </>
    );
};

export default Experience;
