import { useEffect, useState } from "react";
import api from "../api/client";
import Button from "../components/Button";
import Input from "../components/Input";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", form);
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating employee");
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Employees</h2>

      {/* Create Employee */}
      <form
        onSubmit={createEmployee}
        className="bg-white p-6 rounded-md shadow space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Employee ID"
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            required
          />
          <Input
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Add Employee</Button>
      </form>

      {/* States */}
      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && employees.length === 0 && (
        <p className="text-gray-500">No employees found.</p>
      )}

      {/* Table */}
      {!loading && employees.length > 0 && (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employee_id} className="border-t">
                  <td className="p-3">{emp.employee_id}</td>
                  <td className="p-3">{emp.full_name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3 text-right">
                    <Button
                      variant="danger"
                      onClick={() => deleteEmployee(emp.employee_id)}
                    >
                      Delete
                    </Button>
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

export default Employees;
