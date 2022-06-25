// we need to create an array of objects for the sub categories:

const subCategories = [
  { category: 'nature', subCategory: [
    { value: 'woodland', label: 'Woodland' },
    { value: 'forest', label: 'Forest' }, 
    { value: 'countryside', label: 'Countryside' }, 
    { value: 'sea', label: 'Sea' } ] 
  },

  { category: 'human', 
  subCategory: [
    { value: 'whistle', label: 'Whistle' },
    { value: 'whisper', label: 'Whisper' }, 
    { value: 'laughing', label: 'Laughing' }, 
    { value: 'cyring', label: 'Crying' } ] 
  },

  { category: 'machines', 
  subCategory: [
    { value: 'aeroplane', label: 'Aeroplane' },
    { value: 'cars', label: 'Cars' }, 
    { value: 'train', label: 'Train' }, 
    { value: 'power-tools', label: 'Power-tools' } ] 
  }, 

  { category: 'animals', 
  subCategory: [
    { value: 'birds', label: 'Birds' },
    { value: 'dogs', label: 'Dogs' }, 
    { value: 'cats', label: 'Cats' }, 
    { value: 'insects', label: 'Insects' } ] 
  }, 

  { category: 'materials', 
  subCategory: [
    { value: 'glass', label: 'Glass' },
    { value: 'metal', label: 'Metal' }, 
    { value: 'stone', label: 'Stone' }, 
    { value: 'paper', label: 'Paper' }, ]
  }, 

  { category: 'ambience', 
  subCategory: [
    { value: 'crowds', label: 'Crowds' },
    { value: 'traffic', label: 'Traffic' }, 
    { value: 'rural', label: 'Rural' }, 
    { value: 'industry', label: 'Industry' }, ]
  },     

  { category: 'electric', 
  subCategory: [
    { value: 'static-noise', label: 'Static noise' },
    { value: 'sparks', label: 'Sparks' }, 
    { value: 'white-noise', label: 'White noise' }, 
    { value: 'pink-noise', label: 'Pink noise' }, 
    { value: 'brown-noise', label: 'Brown noise' }, ]
  },

  { category: 'weather', 
  subCategory: [
    { value: 'thunder', label: 'Thunder' },
    { value: 'light-rain', label: 'Light rain' }, 
    { value: 'heavy-rain', label: 'Heavy rain' }, 
    { value: 'wind', label: 'Wind' }, ]
  }, 
]

export default subCategories