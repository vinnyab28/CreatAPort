import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Templates = () => {
    return <div className="grid grid-cols-4">
        <Card title="Template 1">
            <a href="../assets/templates/template.html" target="_blank"><Button type="button" link={true} label="Template"></Button></a>
        </Card>
    </div>
}

export default Templates;