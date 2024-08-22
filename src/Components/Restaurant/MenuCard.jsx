import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';

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

const MenuCard = ({item}) => {
  const handleCheckBoxChange = (value) => {
    console.log(value);
  };

  return (
    <Accordion className="shadow-lg">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
        <div className='lg:flex items-center justify-between w-full'>
          <div className='lg:flex items-center'>
            <img className='w-[7rem] h-[7rem] object-cover rounded-lg' 
              src={item.images[0]} alt="item pic" />
            <div className='ml-3'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p className='text-gray-600'>${item.price}</p>
              <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
              <div>
                <p className='font-semibold'>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[category].map((item) => (
                    <FormControlLabel 
                      key={item.name}
                      control={<Checkbox onChange={() => handleCheckBoxChange(item)} />} 
                      label={item.name} 
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
