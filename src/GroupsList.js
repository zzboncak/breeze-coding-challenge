import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortOnColumn: null,
            direction: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/groups")
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
        const data = this.state.data || [];

        return (
            <Table sortable celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    singleLine
                    sorted={this.state.sortOnColumn === 'group_name' ? this.state.direction : null}
                    onClick={() => this.handleSort('group_name')}
                    >
                        First Name
                    </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((group, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
        )
    }
}

export default GroupsList;
