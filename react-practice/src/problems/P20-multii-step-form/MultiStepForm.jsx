import React, { useState } from "react";

const initialData = {
  name: "",
  email: "",
  city: "",
  country: "",
  password: "",
  confirmPassword: "",
};

function validateStep(step, data) {
  const errors = {};

  if (step === 0) {
    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errors.email = "Invalid email";
  }

  if (step === 1) {
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.country.trim()) errors.country = "Country is required";
  }

  if (step === 2) {
    if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (data.confirmPassword !== data.password)
      errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export default function MultiStepForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);

  const errors = validateStep(step, data);
  const isStepValid = Object.keys(errors).length === 0;

  const update = (field, value) => {
    setData((s) => ({ ...s, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const next = () => {
    const fieldsByStep = [
      ["name", "email"],
      ["city", "country"],
      ["password", "confirmPassword"],
    ];
    const fields = fieldsByStep[step] || [];
    setTouched((t) => {
      const copy = { ...t };
      fields.forEach((f) => (copy[f] = true));
      return copy;
    });

    if (!isStepValid) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = validateStep(2, data);
    if (Object.keys(finalErrors).length > 0) {
      setTouched((t) => ({ ...t, password: true, confirmPassword: true }));
      setStep(2);
      return;
    }

    setSubmitting(true);
    setServerMsg(null);

    try {
      await new Promise((res) => setTimeout(res, 800));
      setServerMsg("Submitted successfully!");
      if (typeof onSubmit === "function") onSubmit(data);
    } catch (err) {
      setServerMsg("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const FieldError = ({ name }) =>
    touched[name] && errors[name] ? (
      <div style={{ color: "red", fontSize: 13, marginTop: 6 }}>
        {errors[name]}
      </div>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 640,
        margin: "24px auto",
        padding: 18,
        border: "1px solid #eee",
        borderRadius: 8,
        fontFamily: "system-ui, Arial, sans-serif",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Multi-Step Form (Step {step + 1} of 4)</h3>

      <div
        style={{
          height: 8,
          background: "#f1f5f9",
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((step + 1) / 4) * 100}%`,
            background: "#2563eb",
            borderRadius: 6,
            transition: "width 240ms ease",
          }}
        />
      </div>

      {step === 0 && (
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Full name</label>
          <input
            name="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            style={{ width: "320px", padding: 10 }}
            placeholder="Your full name"
          />
          <FieldError name="name" />

          <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
            Email
          </label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            style={{ width: "320px", padding: 10 }}
            placeholder="you@example.com"
          />
          <FieldError name="email" />
        </div>
      )}

      {step === 1 && (
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>City</label>
          <input
            name="city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            style={{ width: "100%", padding: 10 }}
            placeholder="e.g. Mumbai"
          />
          <FieldError name="city" />

          <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
            Country
          </label>
          <input
            name="country"
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            onBlur={() => handleBlur("country")}
            style={{ width: "100%", padding: 10 }}
            placeholder="e.g. India"
          />
          <FieldError name="country" />
        </div>
      )}

      {step === 2 && (
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => update("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            style={{ width: "100%", padding: 10 }}
            placeholder="At least 6 characters"
          />
          <FieldError name="password" />

          <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
            Confirm password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            style={{ width: "100%", padding: 10 }}
            placeholder="Repeat password"
          />
          <FieldError name="confirmPassword" />
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Review your data</h4>
          <div style={{ background: "#fafafa", padding: 12, borderRadius: 6 }}>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>City:</strong> {data.city}
            </p>
            <p>
              <strong>Country:</strong> {data.country}
            </p>
            <p>
              <strong>Password:</strong>{" "}
              {data.password ? "●●●●●●" : "(not set)"}
            </p>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 18,
        }}
      >
        <div>
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || submitting}
            style={{
              padding: "8px 12px",
              marginRight: 8,
              opacity: step === 0 ? 0.6 : 1,
              cursor: step === 0 ? "not-allowed" : "pointer",
            }}
          >
            Back
          </button>
          {step < 3 && (
            <button
              type="button"
              onClick={next}
              disabled={!isStepValid || submitting}
              style={{
                padding: "8px 12px",
                background: isStepValid ? "#2563eb" : "#94a3b8",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: !isStepValid ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              Next
            </button>
          )}
        </div>

        <div>
          {step === 3 ? (
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 14px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Submitting..." : "Confirm & Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(3)}
              style={{ padding: "8px 12px" }}
            >
              Review
            </button>
          )}
        </div>
      </div>

      {serverMsg && (
        <div style={{ marginTop: 12, color: "green" }}>{serverMsg}</div>
      )}
    </form>
  );
}
