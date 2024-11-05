interface SizeProps {
    label: number;
    selected: boolean;
    onClick(label: number, selected: boolean): void;
}

export const Size: React.FC<SizeProps> = (props) => {
    return (
        <div
            onClick={() => {
                props.onClick(props.label, !props.selected)
            }} style={{
                background: props.selected ? 'gray' : 'white',
                padding: '5px',
                border: '1px solid gray'
            }}
        >
            {props.label}
        </div>
    )
}