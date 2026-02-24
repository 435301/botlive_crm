import styles from "../assets/css/style.module.css";

const priorityColors = {
    low: "green",
    medium: "orange",
    high: "red",
    urgent: "purple",
};

const PriorityInput = ({ value, onChange }) => {
    const options = ["low", "medium", "high", "urgent"];

    return (
        <div>
            <label>Priority<span className="text-danger"> *</span></label>
            <div
                className={styles.priorityMainDiv}>
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={styles.priorityButton}
                        style={{
                            border: value === option ? "2px solid grey" : "1px solid #ccc",
                            backgroundColor: priorityColors[option],
                            opacity: value === option ? 1 : 0.7,
                        }}
                    >
                        {option.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PriorityInput;