import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import illustration from '../../../../public/assets/images/logo/log.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validation
    if (!trimmedEmail || !trimmedPassword) {
      Swal.fire('Error!', 'Both email and password are required.', 'error');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      Swal.fire('Error!', 'Please enter a valid email address.', 'error');
      return;
    }

    if (trimmedPassword.length < 6) {
      Swal.fire('Error!', 'Password must be at least 6 characters long.', 'error');
      return;
    }

    try {
      const res = await axios.post('http://site2demo.in/ai-beauty/api/admin/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const token = res.data?.data?.access_token;
      const user = res.data?.data;

      if (!token) {
        throw new Error('Login failed. Access token not provided.');
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      await Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${user.name || 'Admin'}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid credentials. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: msg,
      });
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <img src={illustration} alt="Illustration" style={styles.illustration} />
      </div>
      <div style={styles.right}>
        <div style={styles.card}>
          <img src={illustration} alt="Logo" style={styles.logo} />
          <h2 style={styles.heading}>Admin Login</h2>
          <p style={styles.subheading}>Please enter your credentials to proceed.</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" style={styles.button}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Styling (unchanged)
const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    background: '#f4f6f8',
  },
  left: {
    flex: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    borderRight: '1px solid #ddd',
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  illustration: {
    maxWidth: '100%',
    height: 'auto',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  logo: {
    width: '60px',
    marginBottom: '20px',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  subheading: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '12px 15px',
    fontSize: '16px',
    backgroundColor: '#FF9C73',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
