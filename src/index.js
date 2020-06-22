import React from "react";
import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";

import CSVReader1 from './CSVReader';

import ResultsList from "./ResultsList";
import FileInput from "./FileInput";

// const App = ({ children }) => (
//   <Container style={{ margin: 20 }}>
//     <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

//     {children}
//     <h3>Importing your people to Breeze is a, well... it's a breeze.</h3>
//     <CSVReader1 />
//   </Container>
// );

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleToImport: [],
        };
    }

    updatePeopleToImport = (peopleData) => {
        this.setState({
            peopleToImport: peopleData
        });
        console.log(this.state.peopleToImport.length);
    }

    clearPeopleToImport = () => {
        this.setState({
            peopleToImport: []
        });
    }

    importPeople = (peopleData) => {
        // Fire this function when the user wants to send the data to the server
        console.log("Importing people...");
        if (this.state.peopleToImport.length !== 0) {
            this.state.peopleToImport.forEach(person => {
                fetch("http://localhost:8000/api/people", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive'
                    },
                    body: JSON.stringify(person.data)
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error ('Failed to import people')
                        }
                        return res.json();
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
            })

            this.setState({
                peopleToImport: [] // Empty the peopleToImport. The change in state will also refresh the app to load the new people from the database.
            })
        } else {
            console.log('Currently no people to import');
        }
    }

    validatePeopleFile = () => {
        if (this.state.peopleToImport.length === 0) {
            return 'You need to attach a file to upload'
        } else {
            let headers = Object.keys(this.state.peopleToImport[0].data);
            const requiredHeaders = ['first_name', 'last_name', 'email_address', 'status'];

            console.log (headers);

            for (let i = 0; i < requiredHeaders.length; i ++) {
                if (!headers.includes(requiredHeaders[i])) {
                    return `You are missing the header ${requiredHeaders[i]} in your CSV file. Please adjust your data and try again.`
                }
            }
        }
    }

    render() {

        let peopleErrorMessage = this.validatePeopleFile();

        return (
            <Container style={{ margin: 20 }}>
                <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

                <h3>Importing your people to Breeze is a, well... it's a breeze.</h3>
                <CSVReader1
                    updatePeopleToImport={this.updatePeopleToImport}
                    clearPeopleToImport={this.clearPeopleToImport}
                />
                <button
                    onClick={this.importPeople}
                    disabled={peopleErrorMessage}
                >
                    Import people
                </button>

                {this.props.children}
                <div className="error-message">{peopleErrorMessage}</div>
            </Container>
        )
    }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <App>
    <ResultsList />
  </App>,
  document.getElementById("root")
);
