function Alert({ type = "success", message }) {
  if (!message) return null;

  return (
    <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}>
      {message}
    </div>
  );
}

export default Alert;