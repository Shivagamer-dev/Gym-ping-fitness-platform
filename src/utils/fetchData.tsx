export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY as string,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

export const fetchData = async (url: string, options: RequestInit): Promise<any> => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      // Handle non-OK responses (e.g., 404, 500, etc.)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Optional: Check if the data is in the expected format (e.g., an array or object)
    if (!data || typeof data !== 'object') {
      throw new Error('Received data is not in the expected format');
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  // Rethrow to allow the caller to handle the error
  }
};
