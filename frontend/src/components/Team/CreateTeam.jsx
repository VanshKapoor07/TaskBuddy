import React, {useState} from "react";

const CreateTeam = ({ onTeamCreated }) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async (e) =>{
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) return alert("You must be logged in!");

        const res = await fetch("http://localhost:5000/api/team/create", {
            method: "POST",
            headers: {
                'Content-Type':"application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, description })
        });

        const data = await res.json();
        if(res.ok){
            alert("Team created!");
            setName('');
            onTeamCreated();        //Refresh team list
        }
        else{
            alert(data.message || "Failed to create team");
    
        }
    };

    return (
        <div className="create-team-container">
          <h2>Create a New Team</h2>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Enter team name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter team description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit">Create Team</button>
          </form>
        </div>
      );
    };
    
export default CreateTeam;