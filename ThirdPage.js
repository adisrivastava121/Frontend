import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./ThirdPage.css"; // Import the CSS file

export default function ThirdPage() {
  const location = useLocation();
  const [jsonData, setJsonData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.responseData) {
      setJsonData(location.state.responseData);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:6969/preferedProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo: jsonData, customerID: location.state.customerID, userSummary: location.state.userSummary }),
    });

    const result = await response.json();
    console.log("Server Response:", result);

    // Navigate to fourth page after submission with response data
    navigate("/fourth", { state: { preferredProducts: result } });
  };

  return (
    <div>
      <div className="navbar">DLTA Recommendation System</div>

      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Paper elevation={3} className="paper">
        <Typography 
  variant="h2" 
  className="header" 
  style={{ fontWeight: 'bold', marginBottom: '30px', fontSize: '1.5rem', font: 'Varela' }}
>
  Here is what we know about you:
</Typography>
          <div className="key-value-pairs">
            {Object.entries(jsonData).map(([key, value], index) => (
              <div key={index} className="key-value-pair">
                <div className="key">{key}:</div>
                <div className="value">{value}</div>
              </div>
            ))}
          </div>
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}