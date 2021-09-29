interface MDTitleProps {
    value: string,
    onChange(value: string): void
}

export default function MDTitle(props: MDTitleProps) {
    return (
        <div className="editor__title">
            <input className="editor__titleInput"
                type="text"
                placeholder="Title"
                maxLength={64}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    )
}
