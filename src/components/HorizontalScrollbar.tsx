import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

// Arrow components
const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

interface HorizontalScrollbarProps {
  data: string[];
  bodyPart: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
}

// HorizontalScrollbar component
const HorizontalScrollbar: React.FC<HorizontalScrollbarProps> = ({ data, bodyPart, setBodyPart }) => {
    return (
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data.map((item: string) => (
          <Box key={item} title={item} m="0 40px">
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          </Box>
        ))}
      </ScrollMenu>
    );
  };

export default HorizontalScrollbar;
