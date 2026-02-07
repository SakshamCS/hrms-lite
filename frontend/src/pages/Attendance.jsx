import { useEffect, useState } from "react";
import api from "../api/client";
import Button from "../components/Button";
import Input from "../components/Input";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [form, setForm] = useState({
    date: "",
    status: "Present",
  });

  // Fetch employees once
  useEffect(() => {
    api.get("/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  // Filter employees based on search
  useEffect(() => {
    if (!search) {
      setFilteredEmployees([]);
      return;
    }

    const q = search.toLowerCase();

    const results = employees.filter(
      (emp) =>
        emp.full_name.toLowerCase().includes(q) ||
        emp.employee_id.toLowerCase().includes(q),
    );

    setFilteredEmployees(results);
  }, [search, employees]);

  const fetchAttendance = async (employeeId) => {
    try {
      setLoading(true);
      const res = await api.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.post("/attendance", {
        employee_id: selectedEmployee,
        date: form.date,
        status: form.status,
      });
      fetchAttendance(selectedEmployee);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to mark attendance");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Attendance</h2>

      {/* Search Employee */}
      <div className="bg-white p-6 rounded-md shadow space-y-3">
        <label className="block text-sm font-medium">Search Employee</label>

        <input
          type="text"
          placeholder="Type employee name or ID..."
          className="border rounded-md px-3 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Nice touch */}
        <p className="text-xs text-gray-500">
          Search by employee name or employee ID
        </p>

        {filteredEmployees.length > 0 && (
          <ul className="border rounded-md divide-y max-h-48 overflow-y-auto">
            {filteredEmployees.map((emp) => (
              <li
                key={emp.employee_id}
                onClick={() => {
                  setSelectedEmployee(emp.employee_id);
                  setSearch(`${emp.full_name} (${emp.employee_id})`);
                  setFilteredEmployees([]);
                  fetchAttendance(emp.employee_id);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">{emp.full_name}</div>
                <div className="text-sm text-gray-500">
                  {emp.employee_id} · {emp.department}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mark Attendance */}
      {selectedEmployee && (
        <form
          onSubmit={markAttendance}
          className="bg-white p-6 rounded-md shadow space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                className="border rounded-md px-3 py-2 w-full"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Present</option>
                <option>Absent</option>
              </select>
            </div>
          </div>
          <Button type="submit">Mark Attendance</Button>
        </form>
      )}

      {/* Records */}
      {loading && <p>Loading attendance...</p>}

      {!loading && records.length === 0 && selectedEmployee && (
        <p className="text-gray-500">No attendance records.</p>
      )}

      {!loading && records.length > 0 && (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{r.date}</td>
                  <td
                    className={`p-3 font-medium ${
                      r.status === "Present" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Attendance;
