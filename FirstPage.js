import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FirstPage.css"; // Import the CSS file

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  const handleSubmit = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
    }

    if (messages.length === 0 && input.trim() === "") return;

    const response = await fetch("http://localhost:6969/gatherInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo: [...messages, input.trim()] }),
    });

    const data = await response.json();
    console.log("Server Response:", data);

    // Navigate to second page after submission with response data
    navigate("/second", { state: { initialResponse: data } });
  };

  return (
    <>
    <div className="navbar">DLTA Recommendation System</div>
    <div className="container">
      <div className="chat-box">
        <h2 className="header">Please tell us about your requirements</h2> {/* Add this line */}
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`input-box ${input.trim() !== "" ? "input-box-filled" : ""}`} // Add this line
          placeholder="Enter text..."
        />
        <div className="button-group">
          <button onClick={handleAdd} className="button button-add">
            ADD
          </button>
          <button onClick={handleSubmit} className="button button-submit">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </>
  );
}