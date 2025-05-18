/** Button that attempts to use the token in context when clicked */
import React from "react";
import { useAuth } from "./AuthContext";

export default function Tablet() {
  // TODO: call authenticate when form is submitted
  const { authenticate } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authenticate();
      console.log("Authentication initiated successfully.");
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <section>
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        "Place your hand upon this stone tablet, and thus will your true self be
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Place your palm upon the tablet.</button>
      </form>
    </section>
  );
}
