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
    }

    render() {

        return (
            <Container style={{ margin: 20 }}>
                <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

                {this.props.children}
                <h3>Importing your people to Breeze is a, well... it's a breeze.</h3>
                <CSVReader1
                    updatePeopleToImport={this.updatePeopleToImport}
                    clearPeopleToImport={this.clearPeopleToImport}
                />
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
