import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MDTitle from './MDTitle';
import MDEditKey from './MDEditKey';
import MDEditor from '@uiw/react-md-editor';
import { MDSnippet, updateMDSnippet, deleteMDSnippet, getSnippet } from '../service/MDApi';
import useWindowDimensions from '../hooks/useWindowDimensions';
import rehypeSanitize from 'rehype-sanitize';

interface UpdateMDFormProps {
    id: string;
    onSaveSuccess(newSnippet: MDSnippet): void;
    onError(error: unknown): void;
    onDelete(): void;
}

export default function UpdateMDForm(props: UpdateMDFormProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [updateKey, setUpdateKey] = useState<string>('');
    const { width, height } = useWindowDimensions();
    const history = useHistory();

    async function saveSnippet(e: React.FormEvent) {
        e.preventDefault();
        try {
            const newSnippet = await updateMDSnippet({
                id: props.id,
                title: title,
                body: content,
                updateKey: updateKey
            });
            props.onSaveSuccess(newSnippet!);
        } catch (error) {
            props.onError(error);
        }
    }

    async function deleteSnippet(e: React.FormEvent) {
        e.preventDefault();
        try {
            await deleteMDSnippet({
                id: props.id,
                updateKey: updateKey
            });
            props.onDelete();
        } catch (error) {
            props.onError(error);
        }
    }

    useEffect(() => {
        async function getWrapper(id: string) {
            try {
                const currSnippet = await getSnippet(id);
                setTitle(currSnippet.title);
                setContent(currSnippet.body);
            } catch (error) {
                history.push({
                    pathname: '/'
                });
                console.log('I have failed you!');
            }
        }
        getWrapper(props.id);
    }, [props.id, history]);

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
                    previewOptions={{rehypePlugins: [rehypeSanitize]}}
                    value={content}
                    preview={width > 860 ? 'live' : 'edit'}
                    visiableDragbar={false}
                    height={height * 0.70}
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
                    <button className="editor__submitButton">Update Snippet</button>
                    <button className="editor__submitButton red" onClick={(e) => deleteSnippet(e)}>Delete</button>
                </div>
            </div>
        </form>
    );
}
