import React from "react";

export default function AuthForm({ title, children }) {
  return (

    <form className="max-w-md mx-auto p-6 bg-white">
      <h2 className="text-xl mb-4">{title}</h2>
      {children}
    </form>

  );
}
