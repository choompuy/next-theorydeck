export function ConfidenceBar({ value }: { value: number }) {
    return (
        <div>
            <div className="progress">
                <div style={{ width: `${value}%` }} />
            </div>
            <small>{value}% confidence</small>
        </div>
    );
}
