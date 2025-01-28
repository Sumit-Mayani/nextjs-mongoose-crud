"use client";

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const backgroundColor =
    type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor,
        color: "white",
        padding: "15px 25px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
          padding: "0 5px",
        }}
      >
        ×
      </button>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
