import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demo = [
  {
    category: "Seeds and Nuts",
    ingredients: ["Cashew Nut", "Chia Seeds", "Wall Nut"]
  },
  {
    category: "Protein",
    ingredients: ["Ground Beef", "Bacon strips"]
  },
  {
    category: "Bread",
    ingredients: ["Ham bread", "Brown bread"]
  }
];

const MenuCard = () => {
  const handleCheckBoxChange = (value) => {
    console.log(value);
  };

  return (
    <Accordion className="shadow-lg">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
        <div className='lg:flex items-center justify-between w-full'>
          <div className='lg:flex items-center'>
            <img className='w-[7rem] h-[7rem] object-cover rounded-lg' 
              src="https://cdn.pixabay.com/photo/2022/02/12/15/00/biryani-7009110_640.jpg" alt="item pic" />
            <div className='ml-3'>
              <p className='font-semibold text-xl'>Biriyani</p>
              <p className='text-gray-600'>$10</p>
              <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error fugit officiis eligendi aliquam illo tempore!</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div className='flex gap-5 flex-wrap'>
            {demo.map((item, index) => (
              <div key={index}>
                <p className='font-semibold'>{item.category}</p>
                <FormGroup>
                  {item.ingredients.map((ingredient, idx) => (
                    <FormControlLabel 
                      key={idx}
                      control={<Checkbox onChange={() => handleCheckBoxChange(ingredient)} />} 
                      label={ingredient} 
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className='pt-5'>
            <Button variant='contained' color='primary' type='submit'>Add to Cart</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
