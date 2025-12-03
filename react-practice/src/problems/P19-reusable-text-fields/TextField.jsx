import React from "react";

export default function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  helperText = "",
  ...rest
}) {
  const hasError = Boolean(error);

  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: "block",
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: hasError ? "1px solid red" : "1px solid #ccc",
          outline: "none",
          fontSize: 14,
        }}
        {...rest}
      />

      {hasError ? (
        <p
          id={`${name}-error`}
          role="alert"
          style={{ marginTop: 6, color: "red", fontSize: 13 }}
        >
          {error}
        </p>
      ) : helperText ? (
        <p style={{ marginTop: 6, color: "#666", fontSize: 13 }}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
