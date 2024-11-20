import { Button } from 'primereact/button';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSkills } from '../store/SkillsSlice';

const Skills = () => {
    const skills = useSelector((state: any) => state.skills);
    const dispatch = useDispatch();
    const [value, setValue] = useState([]);
    const { register, handleSubmit } = useForm({
        defaultValues: skills
    });

    const onSubmit = (data: any) => {
        dispatch(addSkills(data));
    }
    return (<>
        <h1>Skills</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
                <label htmlFor="skills">Skills</label>
                {/* <Chips id="skills" required={true} {...register("skills")} /> */}
            </div>
            <hr />
            <Button type="submit">Save</Button>
        </form>
    </>)
}

export default Skills;