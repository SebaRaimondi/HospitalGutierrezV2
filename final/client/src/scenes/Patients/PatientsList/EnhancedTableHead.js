import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

class EnhancedTableHead extends React.Component {
  
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy} = this.props;

      const columnData = [
            {
            id: 'name',
            label: "Nombre",
            numeric: false,
            disablePadding: false,
            },
            {
            id: 'lastname',
            label: "Apellido",
            numeric: false,
            disablePadding: false,
            },
            {
            id: "documentType",
            label: "Tipo de documento",
            numeric: true,
            disablePadding: false,
            },
            {
            id: "dni",
            label: "N° de documento",
            numeric: true,
            disablePadding: false,
            }
      ];
    
      return (
        <TableHead>
          <TableRow>
            {columnData.map(column => {
              return (
                <TableCell 
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
            <TableCell padding={'default'}>
              {'Acciones'}
            </TableCell>
          </TableRow>
        </TableHead>
      );
    }
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

export default EnhancedTableHead