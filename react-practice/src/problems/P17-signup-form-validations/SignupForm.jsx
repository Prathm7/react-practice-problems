import React, { useState, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export default function SignupForm({ onSubmit }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const currentErrors = validate(values);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      const firstKey = Object.keys(currentErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 700));

      if (typeof onSubmit === "function") {
        onSubmit({
          name: values.name.trim(),
          email: values.email.trim(),
        });
      } else {
        console.log("Signup success:", {
          name: values.name.trim(),
          email: values.email.trim(),
        });
      }

      setValues({ name: "", email: "", password: "", confirmPassword: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        maxWidth: 420,
        margin: "24px auto",
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
      aria-describedby="signup-form-desc"
    >
      <h3 id="signup-form-desc" style={{ marginTop: 0 }}>
        Create an account
      </h3>

      <div style={{ marginBottom: 12 }}>
        <label
          htmlFor="name"
          style={{ display: "block", fontSize: 14, marginBottom: 6 }}
        >
          Full name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.name && errors.name)}
          aria-describedby={
            touched.name && errors.name ? "name-error" : undefined
          }
          placeholder="Your full name"
          style={{ width: "380px", padding: "8px 10px", fontSize: 14 }}
        />
        {touched.name && errors.name && (
          <div
            id="name-error"
            role="alert"
            style={{ color: "red", marginTop: 6, fontSize: 13 }}
          >
            {errors.name}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label
          htmlFor="email"
          style={{ display: "block", fontSize: 14, marginBottom: 6 }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.email && errors.email)}
          aria-describedby={
            touched.email && errors.email ? "email-error" : undefined
          }
          placeholder="you@example.com"
          style={{ width: "380px", padding: "8px 10px", fontSize: 14 }}
        />
        {touched.email && errors.email && (
          <div
            id="email-error"
            role="alert"
            style={{ color: "red", marginTop: 6, fontSize: 13 }}
          >
            {errors.email}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label
          htmlFor="password"
          style={{ display: "block", fontSize: 14, marginBottom: 6 }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.password && errors.password)}
          aria-describedby={
            touched.password && errors.password ? "password-error" : undefined
          }
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          style={{ width: "380px", padding: "8px 10px", fontSize: 14 }}
        />
        {touched.password && errors.password && (
          <div
            id="password-error"
            role="alert"
            style={{ color: "red", marginTop: 6, fontSize: 13 }}
          >
            {errors.password}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label
          htmlFor="confirmPassword"
          style={{ display: "block", fontSize: 14, marginBottom: 6 }}
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
          aria-describedby={
            touched.confirmPassword && errors.confirmPassword
              ? "confirm-error"
              : undefined
          }
          placeholder="Repeat your password"
          style={{ width: "380px", padding: "8px 10px", fontSize: 14 }}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div
            id="confirm-error"
            role="alert"
            style={{ color: "red", marginTop: 6, fontSize: 13 }}
          >
            {errors.confirmPassword}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            cursor: !isValid || isSubmitting ? "not-allowed" : "pointer",
            opacity: !isValid || isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? "Creating..." : "Create account"}
        </button>

        <div style={{ color: "#666", fontSize: 13 }}>
          {Object.keys(errors).length > 0
            ? "Fix errors to continue"
            : "All good"}
        </div>
      </div>
    </form>
  );
}
