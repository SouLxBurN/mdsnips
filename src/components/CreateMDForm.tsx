import { useState } from 'react';
import MDTitle from './MDTitle';
import MDEditor from '@uiw/react-md-editor';
import { MDSnippet, createMDSnippet } from '../service/MDApi'
import useWindowDimensions from '../hooks/useWindowDimensions';

interface CreateMDFormProps {
    onSuccess(newSnippet: MDSnippet): void
    onFailure(error: unknown): void
}

export default function CreateMDForm(props: CreateMDFormProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { width, height } = useWindowDimensions();

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
        <form className="editor__form" onSubmit={(e: React.FormEvent) => saveSnippet(e)}>
            <div className="editor">
                <MDTitle
                    value={title}
                    onChange={(value) => {
                        setTitle(value);
                    }}
                />
                <MDEditor
                    preview={width > 860 ? 'live' : 'edit'}
                    value={content}
                    visiableDragbar={false}
                    height={height * 0.75}
                    toolbarHeight={50}
                    onChange={(val) => {
                        setContent(val!);
                    }}
                />
                <div className="editor__bottomBar">
                    <button className="editor__submitButton">Create Snippet</button>
                </div>
            </div>
        </form>
    );
}
