import { useEffect, useState } from "react";
import { getSoftwareList, requestAccess } from "../api/requests";

function RequestAccess() {
  const [softwares, setSoftwares] = useState([]);
  const [form, setForm] = useState({
    softwareId: "",
    accessType: "",
    reason: "",
  });

  useEffect(() => {
    getSoftwareList().then(setSoftwares);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    requestAccess(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        onChange={(e) => setForm({ ...form, softwareId: e.target.value })}
      >
        {softwares.map((sw) => (
          <option key={sw.id} value={sw.id}>
            {sw.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setForm({ ...form, accessType: e.target.value })}
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <textarea
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
      />
      <button type="submit">Request Access</button>
    </form>
  );
}
