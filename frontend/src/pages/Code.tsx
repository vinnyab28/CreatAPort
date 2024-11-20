import { useSelector } from "react-redux";

const Code = () => {
    const profile = useSelector((state: any) => state.profile);
    const education = useSelector((state: any) => state.education);
    const experience = useSelector((state: any) => state.experience);
    const projects = useSelector((state: any) => state.projects);
    const skills = useSelector((state: any) => state.skills);

    const portfolioJSON = { profile, education, experience, projects, skills };

    return (
        <div className="code-wrapper h-full overflow-auto border-2 border-red-800 bg-slate-200">
            <code>{JSON.stringify(portfolioJSON, null, 2)}</code>
        </div>
    )
}

export default Code;