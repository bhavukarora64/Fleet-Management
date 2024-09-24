import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone, FaHome, FaBriefcase } from 'react-icons/fa';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('');
  const [formFields, setFormFields] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // New state for success message
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setFormFields({}); // Reset form fields when the role changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const validateFields = () => {
    // Common fields validation
    if (!formFields.username || !formFields.emailID || !formFields.password || !formFields.confirmPassword) {
      setError('Please fill in all the common fields.');
      return false;
    }

    // Role-specific validation
    if (role === 'driver') {
      if (!formFields.name || !formFields.license_number || !formFields.phone || !formFields.address) {
        setError('Please fill in all the driver fields.');
        return false;
      }
    } else if (role === 'fleet_manager') {
      if (!formFields.company_name || !formFields.fleet_size) {
        setError('Please fill in all the fleet manager fields.');
        return false;
      }
    }

    setError(''); // Clear any errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Stop if validation fails
    }

    try {
      const dataToSend = { ...formFields, role };
      const response = await axios.post('https://fleet-management-5eyg.vercel.app//register', dataToSend);
      console.log('Registration successful:', response.data);

      setSuccess(true); // Show the success message
      setTimeout(() => {
        navigate('/login'); // Redirect after 3 seconds
      }, 3000);
    } catch (err) {
      console.log('Error during registration:', err);
      setError(err.response?.data?.msg || 'There was an error registering!');
    }
  };

  return (
    <div className="background-animation">
      <div className="register-form">
        <h2><center>Register</center></h2>
        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="form-group">
            <label htmlFor="role"><FaUser /> Registration Method:</label>
            <select id="role" name="role" value={role} onChange={handleRoleChange} required>
              <option value="">-- Select Role --</option>
              <option value="fleet_manager">Fleet Manager</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username"><FaUser /> Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formFields.username || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailID"><FaEnvelope /> Email Address:</label>
            <input
              type="email"
              id="emailID"
              name="emailID"
              value={formFields.emailID || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock /> Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formFields.password || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword"><FaLock /> Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formFields.confirmPassword || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Driver-Specific Fields */}
          {role === 'driver' && (
            <>
              <div className="form-group">
                <label htmlFor="name"><FaUser /> Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formFields.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="license_number"><FaIdCard /> License Number:</label>
                <input
                  type="text"
                  id="license_number"
                  name="license_number"
                  value={formFields.license_number || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone"><FaPhone /> Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formFields.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address"><FaHome /> Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formFields.address || ''}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </>
          )}

          {/* Fleet Manager-Specific Fields */}
          {role === 'fleet_manager' && (
            <>
              <div className="form-group">
                <label htmlFor="company_name"><FaBriefcase /> Company Name:</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formFields.company_name || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fleet_size"><FaBriefcase /> Fleet Size:</label>
                <input
                  type="number"
                  id="fleet_size"
                  name="fleet_size"
                  value={formFields.fleet_size || ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-submit">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <div className="success-message">
            <p>Congratulations, you are registered!  Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
