// src/components/Team/TeamList.jsx
import React, { useEffect, useState } from 'react';
import TeamMembers from './TeamMembers';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const fetchTeams = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/team', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("Fetched teams:", data); // 👈 Check this
    if (res.ok) setTeams(data.message);
    else alert("Failed to fetch teams");
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="team-list-container">
      <h2>Your Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <strong>{team.name}</strong>
            <button onClick={() => setSelectedTeamId(team.id)}>View Members</button>
          </li>
        ))}
      </ul>

      {selectedTeamId && <TeamMembers teamId={selectedTeamId} />}
    </div>
  );
};

export default TeamList;
