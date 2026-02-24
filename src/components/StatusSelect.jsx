

const StatusSelect = ({ formData, handleChange , className}) => {
    return (
        <div className={className}>
            <label className="form-label">Status <span className="text-danger"> *</span></label>
            <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>


        </div>
    )
};
export default StatusSelect;