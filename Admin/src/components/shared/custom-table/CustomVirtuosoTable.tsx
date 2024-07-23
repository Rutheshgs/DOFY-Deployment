import { IonText } from '@ionic/react';
import React, { InputHTMLAttributes, useMemo } from 'react';
import { useTable } from 'react-table';
import { TableVirtuoso } from 'react-virtuoso';
import "./CustomVituosoTable.css";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    columns: Array<any>,
    data: Array<any>,
    height: any,
}

export const CustomVirtuosoTable = React.forwardRef(({ columns, data, height, ...rest }: inputProps, ref) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    return (
        <TableVirtuoso
            style={{ height: height ? height : '520' }}
            totalCount={rows.length}
            components={{
                Table: ({ style, ...props }) =>
                    <table {...getTableProps()} {...props} style={{ ...style, width: '100%', tableLayout: 'fixed' }} />,
                TableBody: React.forwardRef(({ style, ...props }, ref) => <tbody {...getTableBodyProps()} {...props} ref={ref} />),
                TableRow: (props) => {
                    const rowIndex = props['data-index'];
                    const row = rows[rowIndex];
                    return <tr {...props} {...row.getRowProps()} />
                },
            }}
            fixedHeaderContent={() => {
                return headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))
            }}
            itemContent={(index, user) => {
                const row = rows[index];
                prepareRow(row);
                return row.cells.map((cell: any, index) => {
                    return <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })
            }}
        />
    );
});
