function UserProfile({ user, token, onLogout }) {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="profile-box">
      <div className="alert alert-success">
        <span>🎉 Successfully Authenticated!</span>
      </div>

      <div className="user-avatar">
        {getInitial(user.name)}
      </div>

      <h2 className="user-name">{user.name}</h2>
      <p className="user-email">{user.email}</p>

      <div className="form-group" style={{ textAlign: 'left' }}>
        <label className="form-label">JWT Token (Active Session):</label>
        <div className="token-preview">
          {token}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="submit-btn logout-btn"
      >
        Sign Out
      </button>
    </div>
  );
}

export default UserProfile;
