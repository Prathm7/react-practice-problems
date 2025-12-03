import React, { useState } from "react";
import Modal from "./Modal";

export default function AppModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <h3>Modal demo</h3>

      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
        <p>This is a simple modal. Press ESC or click outside to close.</p>

        <label>
          Your name: <input placeholder="Type name" />
        </label>

        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => {
              alert("Saved");
              setOpen(false);
            }}
          >
            Save
          </button>
          <button style={{ marginLeft: 8 }} onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
