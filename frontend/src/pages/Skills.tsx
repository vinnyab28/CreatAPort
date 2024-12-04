import { Button } from 'primereact/button';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
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
            <Link to="/education"><Button type="submit" label='Save & Next'></Button></Link>
        </form>
    </>)
}

export default Skills;