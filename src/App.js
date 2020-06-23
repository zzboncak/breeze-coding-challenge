import React from "react";
import { Container, Header } from "semantic-ui-react";

import CSVReader1 from './CSVReader';
import GroupsCSVReader from "./GroupsCSVReader";

import ResultsList from "./ResultsList";
import GroupsList from "./GroupsList";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleToImport: [],
            groupsToImport: [],
            people: [],
            groups: [],
            selectedGroup: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ people: data.data }));

        fetch("http://localhost:8000/api/groups")
            .then(response => response.json())
            .then(data => this.setState({ groups: data.data }));
    }

    updatePeopleToImport = (peopleData) => {
        this.setState({
            peopleToImport: peopleData
        });
    }

    updateGroupsToImport = (groupsData) => {
        this.setState({
            groupsToImport: groupsData
        });
    }

    updateSelectedGroup = (groupId) => {
        this.setState({
            selectedGroup: groupId
        });
    }

    clearPeopleToImport = () => {
        this.setState({
            peopleToImport: []
        });
    }

    clearGroupsToImport = () => {
        this.setState({
            groupsToImport: []
        });
    }

    importPeople = () => {
        let peopleToImport = this.state.peopleToImport;

        if (peopleToImport.length !== 0) {
            peopleToImport.forEach(person => {
                fetch("http://localhost:8000/api/people", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Connection': 'keep-alive'
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
                people: peopleToImport.map(entry => entry.data) // Update the people in state to instantly refresh on the client. Data is stored in parallel on the database.
            });

        } else {
            console.log('Currently no people to import');
        }
    }

    importGroups = () => {

        if (this.state.groupsToImport.length !== 0) {
            this.state.groupsToImport.forEach(group => {
                fetch("http://localhost:8000/api/groups", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Connection': 'keep-alive'
                    },
                    body: JSON.stringify(group.data)
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error ('Failed to import groups')
                        }
                        return res.json();
                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
            })

            this.setState({
                groupsToImport: [],
            });

        } else {
            console.log('Currently no groups to import');
        }
    }

    validatePeopleFile = () => {
        if (this.state.peopleToImport.length === 0) {
            return 'You need to attach a file to upload';
        } else {
            let headers = Object.keys(this.state.peopleToImport[0].data);
            const requiredHeaders = ['first_name', 'last_name', 'email_address', 'status'];

            for (let i = 0; i < requiredHeaders.length; i ++) {
                if (!headers.includes(requiredHeaders[i])) {
                    return `You are missing the header ${requiredHeaders[i]} in your CSV file. Please adjust your data and try again.`
                }
            }

            return '';
        }
    }

    validateGroupsFile = () => {
        if (this.state.groupsToImport.length === 0) {
            return 'You need to attach a file to upload';
        } else {
            let headers = Object.keys(this.state.groupsToImport[0].data);
            const requiredHeaders = ['group_name'];

            for (let i = 0; i < requiredHeaders.length; i ++) {
                if (!headers.includes(requiredHeaders[i])) {
                    return `You are missing the header ${requiredHeaders[i]} in your CSV file. Please adjust your data and try again.`
                }
            }
        }
    }

    render() {

        let peopleErrorMessage = this.validatePeopleFile();
        let groupsErrorMessage = this.validateGroupsFile();

        return (
            <Container style={{ margin: 20 }}>
                <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

                <h3>Importing your people to Breeze is, well... it's a breeze.</h3>
                <CSVReader1
                    updatePeopleToImport={this.updatePeopleToImport}
                    clearPeopleToImport={this.clearPeopleToImport}
                />
                <button
                    onClick={this.importPeople}
                    disabled={peopleErrorMessage}
                    id='people-import-button'
                >
                    Import people
                </button>
                <div className="error-message">{peopleErrorMessage}</div>
                <br />

                <h3>Got groups?</h3>
                <GroupsCSVReader
                    updateGroupsToImport={this.updateGroupsToImport}
                    clearGroupsToImport={this.clearGroupsToImport}
                />
                <button
                    onClick={this.importGroups}
                    disabled={groupsErrorMessage}
                    id='groups-import-button'
                >
                    Import groups
                </button>
                <div className="error-message">{groupsErrorMessage}</div>

                <h2>People</h2>
                <ResultsList
                    people={this.state.people}
                    selectedGroup={this.state.selectedGroup}
                    />
                <h2>Groups</h2>
                <p>To see which of your people are in a particular group, simply click on the group name below to see the active people highlighted in the list above.</p>
                <GroupsList
                    people={this.state.people}
                    groups={this.state.groups}
                    updateSelectedGroup={this.updateSelectedGroup}
                    /> {/**Passing in people here so the groups list has access to the group_id on each person */}

            </Container>
        )
    }
}
