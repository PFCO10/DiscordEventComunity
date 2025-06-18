import React, { useState, useEffect } from "react";

const API_URL = "https://discord-member-event.created.app"; // Usa tu endpoint real

function ServerStats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("No se pudo obtener datos del servidor");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <div className="flex items-center mb-6">
        {data.icon && (
          <img src={data.icon} alt="Server Icon" className="w-16 h-16 rounded-full mr-4" />
        )}
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-4">
        <h2 className="text-xl">Miembros Totales: {data.memberCount}</h2>
      </div>

      <div className="bg-gray-800 p-4 rounded mb-4">
        <h2 className="text-xl mb-2">Top 5 Miembros Más Activos</h2>
        {data.topMembers?.slice(0, 5).map((member, i) => (
          <div key={member.id} className="flex justify-between border-b py-1">
            <span>{i + 1}. {member.username}</span>
            <span>{member.messageCount} mensajes</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">Todos los Miembros</h2>
        <div className="max-h-64 overflow-y-auto">
          {data.topMembers?.map((member) => (
            <div key={member.id} className="flex justify-between border-b py-1">
              <span>{member.username}</span>
              <span>{member.messageCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServerStats;
