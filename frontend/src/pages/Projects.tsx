import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../store/ProjectsSlice";

const Projects = () => {
    const projects = useSelector((state: any) => state.projects);
    const dispatch = useDispatch();

    const { register, handleSubmit, control } = useForm({
        defaultValues: { projects: projects }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "projects"
    });

    const onSubmit = (data: any) => {
        dispatch(addProject(data.projects));
    };

    const onAddProject = () => {
        append({ title: "", description: "", sourceCodeLink: "", previewLink: "" });
    };

    const onRemoveProject = (index: number) => {
        remove(index);
    };

    return (
        <>
            <h1>Projects</h1>
            {!fields.length && <p>No Projects added yet!</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((project, index) => (
                    <div key={index} className="mb-4">

                        <div className="flex justify-between items-center">
                            <h2>Project #{index + 1}</h2>
                            <Button severity="danger" icon="pi pi-trash" onClick={() => onRemoveProject(index)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`projects.${index}.title`}>Title</label>
                            <InputText id={`projects.${index}.title`} placeholder="Project Title" required={true} {...register(`projects.${index}.title`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`projects.${index}.description`}>Description</label>
                            <InputText id={`projects.${index}.description`} placeholder="Project Description" required={true} {...register(`projects.${index}.description`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`projects.${index}.sourceCodeLink`}>Source Code Link</label>
                            <InputText id={`projects.${index}.sourceCodeLink`} placeholder="Source Code Link" required={true} {...register(`projects.${index}.sourceCodeLink`)} />
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label htmlFor={`projects.${index}.previewLink`}>Preview Link</label>
                            <InputText id={`projects.${index}.previewLink`} placeholder="Preview Link" required={true} {...register(`projects.${index}.previewLink`)} />
                        </div>
                    </div>
                ))}
                <Button type="button" icon="pi pi-plus" size="small" onClick={onAddProject} label={fields.length ? "Add Another Project" : "Add Project"} />
                <hr />
                <Button type="submit">Save</Button>

            </form>
        </>
    );
};

export default Projects;
