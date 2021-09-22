import { useEffect, useState } from 'react';
import MDTitle from './MDTitle';
import MDEditKey from './MDEditKey';
import MDEditor from '@uiw/react-md-editor';
import { MDSnippet, updateMDSnippet, getSnippet } from '../service/MDApi';
import useWindowDimensions from '../hooks/useWindowDimensions';

interface UpdateMDFormProps {
    id: string;
    onSuccess(newSnippet: MDSnippet): void;
    onFailure(error: unknown): void;
}

export default function UpdateMDForm(props: UpdateMDFormProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [updateKey, setUpdateKey] = useState<string>('');
    const { width, height } = useWindowDimensions();

    async function saveSnippet(e: React.FormEvent) {
        e.preventDefault();
        try {
            const newSnippet = await updateMDSnippet({
                id: props.id,
                title: title,
                body: content,
                updateKey: updateKey
            });
            props.onSuccess(newSnippet!);
        } catch (error) {
            props.onFailure(error);
        }
    }

    useEffect(() => {
        async function getWrapper(id: string) {
            const currSnippet = await getSnippet(id);
            setTitle(currSnippet!.title);
            setContent(currSnippet!.body);
        }
        getWrapper(props.id);
    }, [props.id]);

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
                    value={content}
                    preview={width > 860 ? 'live' : 'edit'}
                    visiableDragbar={false}
                    height={height * 0.75}
                    onChange={(val) => {
                        setContent(val!);
                    }}
                />
                <div className="editor__bottomBar">
                    <MDEditKey
                        value={updateKey}
                        onChange={(value) => {
                            setUpdateKey(value);
                        }}
                    />
                    <button className="submitButton">Save</button>
                </div>
            </div>
        </form>
    );
}
