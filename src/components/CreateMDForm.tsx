import { useState } from 'react';
import MDTitle from './MDTitle';
import MDEditor from '@uiw/react-md-editor';
import { MDSnippet, createMDSnippet } from '../service/MDApi'

interface CreateMDFormProps {
    onSuccess(newSnippet: MDSnippet): void
    onFailure(error: unknown): void
}

export default function CreateMDForm(props: CreateMDFormProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('# Start Here');

    async function saveSnippet(e: React.FormEvent) {
        e.preventDefault();
        try {
            const newSnippet = await createMDSnippet({
                title: title,
                body: content
            });
            props.onSuccess(newSnippet!);
        } catch(error) {
            props.onFailure(error);
        }
    }

    return (
        <form onSubmit={(e: React.FormEvent) => saveSnippet(e)}>
            <div className="editor">
                <MDTitle
                    value={title}
                    onChange={(value) => {
                        setTitle(value);
                    }}
                />
                <MDEditor
                    value={content}
                    height={500}
                    onChange={(val) => {
                        setContent(val!);
                    }}
                />
                <div className="editor__bottomBar">
                    <button className="submitButton">Save</button>
                </div>
            </div>
        </form>
    );
}
