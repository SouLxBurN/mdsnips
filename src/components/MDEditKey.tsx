interface MDEditKeyProps {
    value: string,
    onChange(value: string): void
}

export default function MDEditKey(props: MDEditKeyProps) {
    return (
        <div className="editor__editKey">
            <input className="editor__editKeyInput"
                type="password"
                value={props.value}
                placeholder="Edit Key"
                onChange={(e) => props.onChange(e.target.value)}
                required
            />
        </div>
    )
}
