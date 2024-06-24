import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert('Signup successful');
      navigate('/login');
    } else {
      alert('Enter valid credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input type="text" placeholder="Enter name" name="name" value={credentials.name} onChange={onChange} style={styles.input} />
        </div>
        <div>
          <label htmlFor="email" style={styles.label}>Email address</label>
          <input type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} style={styles.input} />
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} style={styles.input} />
        </div>
        <div>
          <label htmlFor="location" style={styles.label}>Location</label>
          <input type="text" placeholder="Location" name="location" value={credentials.location} onChange={onChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.signupbutton}>SignUp</button>
        <Link to="/login" style={styles.link}>Already a user</Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  form: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
  },
  input: {
    width: '90%',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    fontSize: '14px',
  },
  signupbutton: {
    width: '100%',
    padding: '10px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '20px',
  },
  label: {
    fontSize: '20px',
  },
};

export default Signup;
