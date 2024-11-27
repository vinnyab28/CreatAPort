import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const Code = () => {
    const profile = useSelector((state: any) => state.profile);
    const education = useSelector((state: any) => state.education);
    const experience = useSelector((state: any) => state.experience);
    const projects = useSelector((state: any) => state.projects);
    const skills = useSelector((state: any) => state.skills);

    const portfolioJSON = { profile, education, experience, projects, skills };

    return (
        <>
            <div className="flex justify-between py-3">
                <Button type="button" severity="info" size="small" icon="pi pi-save" label="Save"></Button>
                <Button type="button" size="small" icon="pi pi-reload" label="Generate"></Button>
            </div>
            <div className="code-wrapper h-full overflow-auto border-2 border-red-800 bg-slate-200">
                <code>{JSON.stringify(portfolioJSON, null, 2)}</code>
            </div>
        </>
    )
}

export default Code;