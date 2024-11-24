import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Favorite, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: 2,
    // marginTop: theme.spacing(2),
  },
}));
 export const InsightsTable = ({ insights, onFavorite, onDelete }) => {

    return (
      <TableContainer component={Paper} className={useStyles().table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Word Count</TableCell>
              <TableCell>Favorite</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { insights?.length > 0 && insights?.map((insight) => (
              <TableRow key={insight.id}>
                <TableCell>{insight.website_url}</TableCell>
                <TableCell>{insight.word_count}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onFavorite(insight.id)}>
                    <Favorite color={insight.favorite ? 'error' : 'disabled'} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(insight.id)}>
                    <Delete color="error" /> 
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };