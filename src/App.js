import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:3000/bfhl', parsedData);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or server error.');
      setResponseData(null);
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder='Enter JSON data, e.g., {"data": ["A","C","z"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <div>
          <h2>Response</h2>
          <label>Select Data to Display:</label>
          <select multiple={true} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div>
            {selectedOptions.includes("alphabets") && (
              <div>
                <h3>Alphabets</h3>
                <pre>{JSON.stringify(responseData.alphabets, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.includes("numbers") && (
              <div>
                <h3>Numbers</h3>
                <pre>{JSON.stringify(responseData.numbers, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.includes("highest_lowercase_alphabet") && (
              <div>
                <h3>Highest Lowercase Alphabet</h3>
                <pre>{JSON.stringify(responseData.highest_lowercase_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
