import React, { useState, useEffect } from "react";
import { IconButton, Dialog, TextField, Box, Typography, Tooltip, MenuItem, Select, Checkbox, Menu, Button } from "@mui/material";
import { Delete, Visibility, Add, VisibilityOff, Refresh } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const generateRandomPassword = () => {
  const length = 8;
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*";
  const allChars = lowerCase + upperCase + numbers + specialChars;

  let password = "";
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split("").sort(() => Math.random() - 0.5).join("");
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("user");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ fullname: "", emailPrefix: "", emailDomain: "@pregrado.uoh.cl", password: "", phone: "", role: "", active: true });
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<{ id: number; open: boolean }>({ id: 0, open: false });
  const [showTablePasswords, setShowTablePasswords] = useState<{[key:number]:boolean}>({});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(users));
    handleSearch();
  }, [users]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = users.filter(
      (user) =>
        user.fullname.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.role.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(results);
  };

  const handleAddUser = async () => {
    const email = `${newUser.emailPrefix}${newUser.emailDomain}`;
    const phone = `+56 9 ${newUser.phone}`;
    if (!newUser.fullname || !newUser.emailPrefix || !newUser.password || !newUser.phone || !newUser.role) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register/", {
        username: newUser.fullname,
        email: email,
        password: newUser.password,
      });

      toast.success("User registered successfully!");
      setUsers([...users, { id: Date.now(), fullname: newUser.fullname, email, password: newUser.password, phone, role: newUser.role, active: newUser.active }]);
      setNewUser({ fullname: "", emailPrefix: "", emailDomain: "@pregrado.uoh.cl", password: "", phone: "", role: "", active: true });
      setOpenAddUser(false);
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        toast.error(data.message || "Error registering user. Please try again.");
      } else {
        toast.error("Server connection error.");
      }
    }
  };

  const handleGeneratePassword = () => {
    setNewUser((prevUser) => ({
      ...prevUser,
      password: generateRandomPassword(),
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleProfile = (id: number) => {
    setProfile({ id, open: profile.id === id ? !profile.open : true });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    if (profile.id === id) {
      setProfile({ id: 0, open: false });
    }
  };

  const handleToggleActive = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  };

  //misma q handleToggleActive
  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  };

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
  };

  //misma que handleRoleChange
  const updateUserRole = (id: number, newRole: string) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const toggleShowPassword = (id: number) => {
    setShowTablePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Header />
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">User Management</h1>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: "100%", maxWidth: 400 }}
              />
              <IconButton color="primary" onClick={() => setOpenAddUser(true)}>
                <Add />
              </IconButton>
            </Box>

            {/* Modal para agregar usuario */}
            <Dialog open={openAddUser} onClose={() => setOpenAddUser(false)}>
              <Box sx={{padding:3, minWidth:300}}>
                <Typography variant="h6">Add New User</Typography>
                <TextField
                  label="Full Name"
                  value={newUser.fullname}
                  onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <Box sx={{ display:"flex", gap:2 }}>
                  <TextField
                    label="Email"
                    value={newUser.emailPrefix}
                    onChange={(e) => setNewUser({ ...newUser, emailPrefix: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <Select 
                    value={newUser.emailDomain}
                    onChange={(e)=> setNewUser({ ...newUser, emailDomain: e.target.value})}
                    sx={{
                      width: 'auto',
                      minWidth: '200px', // Fija el ancho del MenuItem
                      height: '56px', // Ajusta la altura
                      marginTop:2
                    }}
                  >
                      <MenuItem value="@pregrado.uoh.cl">@pregrado.uoh.cl</MenuItem>
                      <MenuItem value="@uoh.cl">@uoh.cl</MenuItem>
                    </Select>
                  </Box>

                  <TextField
                  label="Password"
                  value={newUser.password}
                  sx={{ marginTop:2}}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display:"flex", alignItems:"center"}}>
                        <IconButton onClick={()=> setShowPassword((prev)=>!prev)}>
                          {showPassword ? <VisibilityOff />:<Visibility/>}
                        </IconButton>
                        <IconButton onClick = {handleGeneratePassword}>
                          <Refresh />
                        </IconButton>
                      </Box>
                    ),
                    }}
                  />

                <TextField
                  label="Phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value.slice(0, 8).replace (/\D/g, "") })}
                  fullWidth
                  sx={{ marginTop:1}}
                  placeholder="XXXXXXXX"
                  margin="normal"
                  InputProps={{
                    startAdornment:<Typography color="textSecondary" width={"60px"}>+56 9</Typography>,
                  }}
                />
                <Select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  fullWidth
                  sx={{ marginTop:2, marginBottom:2, borden:"none"}}
                  displayEmpty
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Dev">Dev</MenuItem>
                </Select>
                <Box sx={{ display: "flex", justifyContent:"flex-end", gap:2, marginTop:2}}>
                  <Button onClick={()=> setOpenAddUser(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={handleAddUser}> Add User</Button>
                </Box>
              </Box>
            </Dialog>

            {/* Tabla de usuarios */}
            <Box component="table" sx={{ width: "100%", marginTop: 3, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "15%" }}>Full Name</th>
                  <th style={{ textAlign: "center", width: "20%" }}>Email</th>
                  <th style={{ textAlign: "center", width: "15%" }}>Password</th>
                  <th style={{ textAlign: "center", width: "15%" }}>Phone</th>
                  <th style={{ textAlign: "center", width: "10%" }}>Role</th>
                  <th style={{ textAlign: "center", width: "10%" }}>Active</th>
                  <th style={{ textAlign: "center", width: "15%" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ textAlign: "center" }}>{user.fullname}</td>
                    <td style={{ textAlign: "center", maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</td>
                    <td style={{ textAlign: "center" }}>
                      {showTablePasswords[user.id] ? user.password : "••••••"}
                      <IconButton onClick={() => toggleShowPassword(user.id)} size="small">
                        {showTablePasswords[user.id] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </td>
                    <td style={{ textAlign: "center" }}>{user.phone}</td>
                    <td style={{ textAlign: "center" }}>
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        displayEmpty
                        sx={{ minWidth: 100, border: "none" }}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Member">Member</MenuItem>
                        <MenuItem value="Dev">Dev</MenuItem>
                      </Select>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Checkbox
                        checked={user.active}
                        onChange={() => handleToggleActive(user.id)}
                        color="primary"
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>

                      <Tooltip title="Delete User">
                        <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
