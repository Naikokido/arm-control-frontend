export const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Guardar el JWT
      return data;
    }
    throw new Error(data.error);
  };
  