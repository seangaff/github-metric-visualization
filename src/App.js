import React, {useState,} from 'react';
import './App.css';
import DonutChart from './DonutChart.js'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar,Form,Container,Button, Row, Col, Alert,Card, ListGroup, ListGroupItem } from 'react-bootstrap';


function App() {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [language, setLanguage] = useState('');
  const [forks, setForks] = useState('');
  const [watchers, setWatchers] = useState('');
  const [stargazers, setStargazers] = useState('');
  const [openIssues, setOpenIssues] = useState('');
  var [donutData, setDonut] = useState([]);

  const setStats = ({language, forks, watchers, open_issues,stargazers_count}) => {
    setLanguage(language);
    setForks(forks);
    setWatchers(watchers);
    setOpenIssues(open_issues);
    setStargazers(stargazers_count);
  }
  const setContributors = (contributors) => {
    donutData = [];
    for(var user of contributors) {
      var login = user.login;
      var contributions = user.contributions;
      donutData.push({["name"]:login,["value"]:contributions});
    }
    setDonut(donutData);
    donutData.length = 8;
    console.log(donutData);
  }

  const handleUserInput = (e) => {
    setOwner(e.target.value);
  }

  const handleRepoInput = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/repos/${owner}/${name}`)
      .then(res => res.json())
      .then(stats => {
        setStats(stats)
        ;})
    fetch(`https://api.github.com/repos/${owner}/${name}/contributors`)
      .then(res => res.json())
      .then(contribList => {
        setContributors(contribList)
        ;})
  }

  return (
    <div className="App">
      <Container>
        <Navbar g="light" expand="lg">
          <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/github-square-512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            GitHub Repo Stats
          </Navbar.Brand>
            <Form className="d-flex">
              <Form.Control
                onChange={handleUserInput}
                type="user"
                placeholder="User"
                className="me-2"
                aria-label="user"
              />
              <Form.Control
                onChange={handleRepoInput}
                type="repo"
                placeholder="Repository"
                className="me-2"
                aria-label="repo"
              />
              <Button variant="outline-success" onClick={handleSubmit}>Search</Button>
          </Form>
          </Container>
        </Navbar>
        <Row>
          <Alert align="Center"> Enter a valid public User and Repository above to see various statistics</Alert>
        </Row>
        <Row>
          <Col sm={4} align="Center">
              <Card style={{ width: '18rem' }} align="Left">
                <Card.Header as="h5">Statistics:</Card.Header>
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                <ListGroupItem>Owner: <b>{owner}</b></ListGroupItem>
                <ListGroupItem>Language: <b>{language}</b></ListGroupItem>
                <ListGroupItem>Fork Count: <b>{forks}</b></ListGroupItem>
                <ListGroupItem>Watch Count: <b>{watchers}</b></ListGroupItem>
                <ListGroupItem>Stargazers: <b>{stargazers}</b></ListGroupItem>
                <ListGroupItem>Open Issues: <b>{openIssues}</b></ListGroupItem>
              </ListGroup>
              <Button href={`https://github.com/${owner}/${name}`}>Open on GitHub</Button>
              </Card>
          </Col>
          <Col sm={8} align="Center">
            <Card style={{ width: '18rem' }} align="Center">
              <Card.Header as="h5" >Top Contributions:</Card.Header>
            </Card>
            <DonutChart data={donutData}  />
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;
