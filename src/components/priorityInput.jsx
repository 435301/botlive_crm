

const PriorityInput = ({ value, onChange }) => {

    return (
        <div>
            <label>
                Priority <span className="text-danger"> *</span>
            </label>

            <input
                type="number"
                className="form-control"
                min={1}
                max={15}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                placeholder="Enter priority"
            />
        </div>
    );
};

export default PriorityInput;