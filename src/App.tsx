import "./App.css";
import Profile from "./profile";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const callAPI = (firstName: string, lastName: string) => {
    // instantiate a headers object
    const myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    const raw = JSON.stringify({ firstName: firstName, lastName: lastName });
    // create a JSON object with parameters for API call and store in a variable
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = "https://katiiga2ol.execute-api.eu-central-1.amazonaws.com/dev";
    // make API call with parameters and use promises to get response
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => alert(JSON.parse(result).body))
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    callAPI(firstName, lastName);
    console.log("Input 1:", firstName);
    console.log("Input 2:", lastName);
  };
  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <form onSubmit={handleSubmit}>
        <label>
          First name: 
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last name: 
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
