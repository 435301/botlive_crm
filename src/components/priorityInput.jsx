import styles from "../assets/css/style.module.css";

const PriorityInput = ({ value, onChange }) => {
    const options = Array.from({ length: 15 }, (_, i) => i + 1);

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