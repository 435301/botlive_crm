import React, { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import FormInput from "../../components/FormInput";

const userTypeMap = {
  1: "Skill Center / School",
  2: "Founder",
  3: "Trainer",
  4: "Student",
};

const Settings = () => {
  const [settings, setSettings] = useState({});
  const { createMutation } = useCrud({
    entity: "setting",
    createUrl: "/setting/addCodeSetting",
  });

  const { useGetAll } = useCrud({
    entity: "setting",
    getAllUrl: "/setting/getSettings",
  });

  const { data: settingsCode = [] } = useGetAll();

  useEffect(() => {
    if (settingsCode.length > 0) {
      const formatted = {};
      settingsCode.forEach((item) => {
        formatted[item.userType] = {
          prefix: item.prefix,
          startNumber: item.startNumber,
        };
      });
      setSettings(formatted);
    }
  }, [settingsCode]);

  const handleChange = (userType, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [userType]: {
        ...prev[userType],
        [field]: value,
      },
    }));
  };


  const handleSubmit = (e, userType) => {
    e.preventDefault();
    const values = settings[userType];
    createMutation.mutate({
      prefix: values.prefix,
      startNumber: values.startNumber,
      userType: Number(userType),
    });
  };

  return (
    <div className="container-fluid">
      <div className="card shadow-sm p-3">
        <div className="card-body">
          <h4 className="mb-4">Code Settings</h4>

          {Object.keys(userTypeMap).map((type) => (
            <form
              key={type}
              onSubmit={(e) => handleSubmit(e, type)}
              className="row g-3 mt-4"
            >
              <h5 className="mb-3">{userTypeMap[type]}</h5>

              <div className="col-md-5">
                <FormInput
                  type="text"
                  label="Prefix"
                  value={settings[type]?.prefix || ""}
                  onChange={(e) =>
                    handleChange(type, "prefix", e.target.value)
                  }
                  placeholder="Enter prefix"
                />
              </div>

              <div className="col-md-5">
                <FormInput
                  type="text"
                  label="Start Number"
                  value={settings[type]?.startNumber || ""}
                  onChange={(e) =>
                    handleChange(type, "startNumber", e.target.value)
                  }
                  placeholder="Enter start number"
                />
              </div>

              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
