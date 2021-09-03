import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './CreateMDSnippet.css';

export default function CreateMDSnippet() {
    const [title, setTitle] = useState<string>('');
    const [value, setValue] = useState<string>('# Start Here');

    async function saveSnippet(e: React.FormEvent) {
        e.preventDefault();
        const payload = {
            title: title,
            body: value
        };
        try {
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + Buffer.from('soul:burn').toString('base64'));
            headers.append('Content-Type', 'application/json');
            const response = await fetch(`http://localhost:3001/md`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const json = await response.json();
                console.log(json);
            } else {
                console.error(response.statusText);
            }
        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <div className="createMDSnippet">
            <h1>SouLxSnips</h1>
            <form onSubmit={(e: React.FormEvent) => saveSnippet(e)}>
                <div className="editor">
                    <div className="editor__title">
                        <span>Title:</span>
                        <input className="editor__titleInput"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <MDEditor
                        value={value}
                        height={500}
                        onChange={(val) => {
                            setValue(val!);
                        }}
                    />
                    <div className="editor__bottomBar">
                        <button className="submitButton">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
