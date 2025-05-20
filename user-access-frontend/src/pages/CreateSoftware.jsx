import { useState } from "react";
import { createSoftware } from "../api/software";

function CreateSoftware() {
  const [software, setSoftware] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSoftware(software);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={software.name}
        onChange={(e) => setSoftware({ ...software, name: e.target.value })}
      />
      <textarea
        value={software.description}
        onChange={(e) =>
          setSoftware({ ...software, description: e.target.value })
        }
      />
      <select
        multiple
        onChange={(e) =>
          setSoftware({
            ...software,
            accessLevels: [...e.target.selectedOptions].map((o) => o.value),
          })
        }
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
