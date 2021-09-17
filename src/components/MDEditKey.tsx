interface MDEditKeyProps {
    value: string,
    onChange(value: string): void
}

export default function MDEditKey(props: MDEditKeyProps) {
    return (
        <div className="editor__editKey">
            <span>Edit Key:</span>
            <input className="editor__editKeyInput"
                type="password"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    )
}
