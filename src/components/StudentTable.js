import React from "react";

const students = [
  {
    id: "#ST001",
    name: "Aarav Sharma",
    class: "10-A",
    fees: "₹45,000",
    status: "Active",
    joined: "Oct 18, 2024",
    teacher: "John Doe",
  },
  {
    id: "#ST002",
    name: "Ananya Reddy",
    class: "9-B",
    fees: "₹42,000",
    status: "Pending",
    joined: "Oct 16, 2024",
    teacher: "Jane Smith",
  },
  {
    id: "#ST003",
    name: "Rahul Verma",
    class: "8-C",
    fees: "₹38,000",
    status: "Inactive",
    joined: "Oct 12, 2024",
    teacher: "Peter Johnson",
  },
  {
    id: "#ST004",
    name: "Sneha Patel",
    class: "10-B",
    fees: "₹50,000",
    status: "Active",
    joined: "Oct 10, 2024",
    teacher: "Emily Davis",
  },
];

const StudentTable = () => {
  return (
    <div className="card p-4 ">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className=" mb-0 fw-semibold">Recent Students</h4>
        <a href="" className="  text-primary  text-decoration-none">
          View Details
        </a>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle student-modern-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student</th>
              <th>Class</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Class Teacher</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td className="">{s.id}</td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-circle">{s.name.charAt(0)}</div>
                    <span className="">{s.name}</span>
                  </div>
                </td>

                <td>{s.class}</td>
                <td className="">{s.fees}</td>

                <td>
                  <span className={`status-pill ${s.status.toLowerCase()}`}>
                    {s.status}
                  </span>
                </td>

                <td>{s.joined}</td>

                <td>
                  <div className="d-flex align-items-center  gap-2">
                    <img
                      src={`https://i.pravatar.cc/40?img=${i + 12}`}
                      alt="teacher"
                      className="rounded-circle"
                      width="28"
                    />
                    <span>{s.teacher}</span>
                  </div>
                </td>

                <td className="text-center">
                  <button className="icon-btn view">
                    <i className="ti ti-eye fs-16"></i>
                  </button>

                  <button className="icon-btn download">
                    <i className="ti ti-download fs-16"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
