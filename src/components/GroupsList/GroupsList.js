import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import './GroupsList.css';

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortOnColumn: null,
            direction: null,
            isSorted: false
        };
    }

    handleSort = (clickedColumn) => {
        const currentData = this.props.groups;
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
                direction: 'ascending',
                isSorted: true
            })

            return;
        }

        this.setState({ // if the clicked column is already the currently sorted column, we want to reverse it.
            data: currentData.reverse(),
            direction: currentDirection === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        const data = this.state.isSorted ? this.state.data : this.props.groups;

        return (
            <Table sortable celled padded selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    singleLine
                    sorted={this.state.sortOnColumn === 'group_name' ? this.state.direction : null}
                    onClick={() => this.handleSort('group_name')}
                    >
                        Group Name
                    </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((group, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell className="group-name" onClick={() => this.props.updateSelectedGroup(group.id)}>{ group.group_name }</Table.Cell>
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
