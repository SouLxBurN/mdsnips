import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import './ViewMDSnippet.css';

export default function ViewMDSnippet() {
    const { id } = useParams<any>();
    const [title, setTitle] = useState('loading...');
    const [content, setContent] = useState('loading...');

    useEffect(() => {
        async function getSnippet(id: string) {
            try {
                const headers = new Headers();
                headers.append(
                    'Authorization',
                    'Basic ' + Buffer.from('soul:burn').toString('base64')
                );
                const response = await fetch(`http://localhost:3001/md/${id}`, {
                    headers: headers
                });
                if (response.ok) {
                    const json = await response.json();
                    setTitle(json.title);
                    setContent(json.body);
                } else {
                    setContent('Unauthorized');
                }
            } catch (err: any) {
                console.log(err.message);
                setContent(err.message);
            }
        }

        getSnippet(id);
    }, [id]);

    return (
        <div className="viewMDSnippet">
            <h1>{ title }</h1>
            <MDEditor.Markdown source={ content } />
        </div>
    );
}
