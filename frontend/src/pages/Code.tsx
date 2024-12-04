import { Button } from "primereact/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/AuthProvider";
import { useCode } from "../hooks/CodeContext";

const Code = () => {
    const { userID } = useAuth();
    const { saveCode, generateCode } = useCode();
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const profile = useSelector((state: any) => state.profile);
    const education = useSelector((state: any) => state.education);
    const experience = useSelector((state: any) => state.experience);
    const projects = useSelector((state: any) => state.projects);
    const skills = useSelector((state: any) => state.skills);

    const portfolioJSON = { profile, education, experience, projects, skills };

    const onSave = () => {
        setIsSaving(true);
        saveCode({ userID, data: { ...portfolioJSON } }).then(() => setIsSaving(false));
    }

    const onGenerate = () => {
        setIsGenerating(true);
        generateCode({ userID, body: { ...portfolioJSON } }).then(() => setIsGenerating(false));
    }

    return (
        <>
            <div className="flex justify-between py-3">
                <Button type="button" severity="info" size="small" icon="pi pi-save" label="Save" onClick={onSave} loading={isSaving}></Button>
                <Button type="button" size="small" icon="pi pi-reload" label="Generate" onClick={onGenerate} loading={isGenerating}></Button>
            </div>
            <div className="code-wrapper h-full overflow-auto border-2 border-red-800 bg-slate-200">
                <code>{JSON.stringify(portfolioJSON, null, 2)}</code>
            </div>
        </>
    )
}

export default Code;