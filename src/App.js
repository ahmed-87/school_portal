import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container  from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';





function App() {

  const [data, setData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);


  useEffect(() => {
    
    
    // const url = "http://localhost:8081/students";
    const url = process.env.REACT_APP_API;


    axios.get(url, {
      headers: {}
    }).then(
      (resp) => {
        setData(resp.data);

        setAverageScore(resp.data.reduce((a, b) => a + b.score, 0) / resp.data.length);
      },
      (err) => console.log(err)
    );
 
  }, []);


  const handleScoreChange = (id, score) => {

    data[id - 1].score = score;
    setAverageScore(data.reduce((a, b) => a + b.score, 0) / data.length);

  }


  return (

    <Container size="md">
      <br/>
      <br/>
      <br/>
      <Typography variant="h3" gutterBottom component="div">
        Teacher's Portal
      </Typography>
      <br/>
      <br/>
      <br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption><label>Average Score: </label> {averageScore}</caption>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>SCORE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {

              return (
                <TableRow key={item.id}>
                  <TableCell >{item.full_name}</TableCell>
                  <TableCell>
                    <Input 
                    type='number' 
                    defaultValue={item.score} 
                    onChange={(event) => {
                      event.preventDefault();
                      handleScoreChange(item.id, +event.target.value)
                    }}
                    sx={{ maxWidth: 100 }} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>


  );
}

export default App;
