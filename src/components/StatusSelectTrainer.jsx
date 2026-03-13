

const StatusSelectTrainer = ({ handleChange, className, value, name, error }) => {
    return (
        <div className={className}>
            <label className="form-label">Status <span className="text-danger"> *</span></label>
            <select
                className="form-select"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option value="1">Working</option>
                <option value="0">Resigned</option>
            </select>
            {error && (
                <div className="d-flex invalid-feedback">
                    {error}
                </div>
            )}


        </div>
    )
};
export default StatusSelectTrainer;