import React from "react";

const FormActions = ({
  onCancel,
  cancelText = "Cancel",
  saveText = "Save",
  className,
}) => {
  return (
    <div className={className}>
      <button
        type="button"
        className="btn btn-outline-secondary me-2"
        onClick={onCancel}
      >
        {cancelText}
      </button>

      <button type="submit" className="btn btn-primary">
          <i className="bi bi-check-circle me-1"></i>
        {saveText}
      </button>

    </div>
  );
};

export default FormActions;