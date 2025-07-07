// src/components/Team/TeamMembers.jsx
import React, { useEffect, useState } from 'react';

const TeamMembers = ({ teamId }) => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/team/view-members`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const data = await res.json();
    if (res.ok) setMembers(data);
    else alert("Failed to fetch team members");
  };

  useEffect(() => {
    fetchMembers();
  }, [teamId]);

  return (
    <div className="team-members-container">
      <h3>Team Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member.userId}>{member.name} ({member.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
