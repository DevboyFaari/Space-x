import React from "react";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";

const LAUNCHES_QUERY = `query launches {
  launches {
    mission_name
    mission_id
    rocket {
      rocket_name
      rocket {
        company
        name
        mass {
          kg
        }
      }
    }
    launch_site {
      site_name
    }
    launch_date_local
  }
}
`;

function App() {
  const [launches, setLaunches] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setLaunches(data.data.launches));
  }, []);

  return (
    <div className="App">
      <ReactBootStrap.Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>mission_name</th>
            <th>rocket</th>
            <th>company</th>
            <th>name</th>
            <th>kg</th>
            <th>launch_date_local</th>
          </tr>
        </thead>

        <tbody>
          {launches.map((launch) => (
            <tr key={launch.id}>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket.rocket_name}</td>
              <td>{launch.rocket.rocket.company}</td>
              <td>{launch.rocket.rocket.name}</td>
              <td>{launch.rocket.rocket.mass.kg}</td>
              <td>{launch.launch_date_local}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default App;
