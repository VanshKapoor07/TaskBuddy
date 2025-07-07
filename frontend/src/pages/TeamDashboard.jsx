// src/pages/TeamDashboard.jsx
import React from 'react';
import CreateTeam from '../components/Team/CreateTeam';
import TeamList from '../components/Team/TeamList';

const TeamDashboard = () => {
  return (
    <div className="team-dashboard">
      <CreateTeam onTeamCreated={() => window.location.reload()} />
      <TeamList />
    </div>
  );
};

export default TeamDashboard;
