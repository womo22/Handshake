

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import { Button, Heading, Pane, Table, TextInputField } from "evergreen-ui"
import React, { useEffect, useState } from "react"
import { useMongoDB } from "./providers/mongodb"
import { useRealmApp } from "./providers/realm"
import {useHistory} from "react-router-dom";


function LogInForm(props) {
  return (
      <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
          <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
              <Heading size={800} marginTop="10" marginBottom="10">
                  Log in
              </Heading>
              <Pane>
                  <TextInputField
                      label="Username"
                      required
                      placeholder="mongodb@example.com"
                      onChange={(e) => props.setEmail(e.target.value)}
                      value={props.email}
                  />
              </Pane>
              <Pane>
                  <TextInputField
                      label="Password"
                      required
                      placeholder="**********"
                      type="password"
                      onChange={(e) => props.setPassword(e.target.value)}
                      value={props.password}
                  />
              </Pane>
              <Button appearance="primary" onClick={props.handleLogIn}>
                  Log in
              </Button>
          </Pane>
      </Pane>
  )
}
function StudentList(props) {
  return (
      <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
          <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
              <Table>
                  <Table.Head>
                      <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Check In Time</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Position</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Level</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                  </Table.Head>
                  <Table.Body height={240}>
                      {props.listOfStudents.map((aStudent) => (
                          <Table.Row key={aStudent._id}>
                              <Table.TextCell>{aStudent.first_name}</Table.TextCell>
                              <Table.TextCell>{aStudent.last_name}</Table.TextCell>
                              <Table.TextCell isDate>{aStudent.check_in_time}</Table.TextCell>
                              <Table.TextCell>{aStudent.position}</Table.TextCell>
                              <Table.TextCell>{aStudent.level}</Table.TextCell>
                          </Table.Row>
                      ))}
                  </Table.Body>
              </Table>

              <Button
                  height={50}
                  marginRight={16}
                  appearance="primary"
                  intent="danger"
                  onClick={props.logOut}
              >
                  Log Out
              </Button>
          </Pane>
      </Pane>
  )
}
function App() {
  const { logIn, logOut, user } = useRealmApp()
  const { db } = useMongoDB()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [listOfStudents, setStudents] = useState([])


  useEffect(() => {
      async function wrapStudentQuery() {
          if (user && db) {
              const verifiedStudentRecords = await db.collection("records").find()
              setStudents(verifiedStudentRecords)
          }
      }
      wrapStudentQuery()
  }, [user, db])

  async function handleLogIn() {
      await logIn(email, password)
  }
  

  
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
  
}

export default App
  



