import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortOnColumn: null,
            direction: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    handleSort = (clickedColumn) => {
        // implement sort functionality here
        const currentData = this.state.data;
        const currentSourtOnColumn = this.state.sortOnColumn;
        const currentDirection = this.state.direction;

        if (currentSourtOnColumn !== clickedColumn) {
            let sortedData = currentData.sort((a, b) => {
                let stringA = a[clickedColumn];
                let stringB = b[clickedColumn];
                if (stringA < stringB) {
                    return -1;
                } else if (stringA > stringB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            this.setState({
                data: sortedData,
                sortOnColumn: clickedColumn,
                direction: 'ascending'
            })

            return;
        }

        this.setState({ // if the clicked column is already the currently sorted column, we want to reverse it.
            data: currentData.reverse(),
            direction: currentDirection === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        var data = this.state.data || [];

        return (
            <Table sortable celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    singleLine
                    sorted={this.state.sortOnColumn === 'first_name' ? this.state.direction : null}
                    onClick={() => this.handleSort('first_name')}
                    >
                        First Name
                    </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={this.state.sortOnColumn === 'last_name' ? this.state.direction : null}
                    onClick={() => this.handleSort('last_name')}
                    >
                        Last Name
                    </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={this.state.sortOnColumn === 'email_address' ? this.state.direction : null}
                    onClick={() => this.handleSort('email_address')}
                    >
                        Email
                    </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={this.state.sortOnColumn === 'status' ? this.state.direction : null}
                    onClick={() => this.handleSort('status')}>
                        Status
                    </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
    );
}

}

export default ResultsList
