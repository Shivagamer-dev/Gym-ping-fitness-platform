import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';

// Define Exercise interface outside of handleSearch
interface Exercise {
  name: string;
  target: string;
  equipment: string;
  bodyPart: string;
}

// Props interface for SearchExercises
interface SearchExercisesProps {
  bodyPart: string;
  setExercises: (exercises: Exercise[]) => void;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;  // Ensure the type is correct here
}

const SearchExercises: React.FC<SearchExercisesProps> = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState<string>('');
  const [bodyParts, setBodyParts] = useState<string[]>([]); // Typing bodyParts as string[]

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        // Fetch the body parts data from the API
        const response = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

        // Check if the response is an array of objects
        if (Array.isArray(response)) {
          // Extract unique body parts from the response
          const bodyPartsArray = Array.from(new Set(response.map((item: any) => item.bodyPart))); // Extract unique body parts
          setBodyParts(['all', ...bodyPartsArray]);
        } else {
          console.error('Expected an array of exercises, but got:', response);
        }
      } catch (error) {
        console.error('Error fetching body parts:', error);
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData: Exercise[] = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      // Filter exercises based on the search query
      const searchedExercises = exerciseData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );
      console.log(searchedExercises);
      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <div>
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
            height: '76px', // Apply height here within sx
          }}
          value={search} // Bind search value
          onChange={(e) => setSearch(e.target.value.toLowerCase())} // Handle input change
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            position: 'absolute', // Position remains absolute for styling
            fontSize: { lg: '20px', xs: '14px' },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </Stack>
  );
};

export default SearchExercises;
