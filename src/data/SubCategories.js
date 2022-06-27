import React, { useState } from 'react';

const SubCategories = () => {
/** "selected" here is state variable which will hold the
* value of currently selected dropdown.
*/
const [selected, setSelected] = React.useState("");

/** Function that will set different values to state variable
* based on which dropdown is selected
*/

const [formData, setFormData] = useState({
  category: '',
  subCategory: '',
})

const changeSelectOptionHandler = (event) => {
  setFormData({
    ...formData
    [event.target.name] = event.target.value,
  })
	setSelected(event.target.value);
};

/** Different arrays for different dropdowns */
const nature = [
    'Woodland',
    'Forest', 
    'Countryside',
    'Sea',
  ];

const human = [
  'Whistle',
  'Whisper',
  'Laughing',
  'Crying',
]

const machines = [
  'Aeroplane',
  'Cars',
  'Train',
  'Power-tools',
]

const animals = [
  'Birds',
  'Dogs',
  'Cats',
  'Insects',
] 

const materials = [
  'Glass',
  'Metal',
  'Stone',
  'Paper',
]

const ambience = [
  'Crowds',
  'Traffic',
  'Rural',
  'Industry',
]

const electric = [
  'Static-noise',
  'Sparks',
  'White-noise',
  'Pink-noise',
  'Brown-noise',
]

const weather = [
  'Thunder',
  'Light-rain',
  'Heavy-rain',
  'Wind',
]

/** Type variable to store different array for different dropdown */
let type = null;

/** This will be used to create set of options that user will see */
let options = null;

/** Setting Type variable according to dropdown */
if (selected === "Nature") {
	type = nature;
} else if (selected === "Human") {
	type = human;
} else if (selected === "Machines") {
	type = machines;
} else if (selected === "Animals") {
	type = animals;
} else if (selected === "Materials") {
	type = materials;
} else if (selected === "Ambience") {
	type = ambience;
} else if (selected === "Electric") {
	type = electric;
} else if (selected === "Weather") {
	type = weather;
}

/** If "Type" is null or undefined then options will be null,
* otherwise it will create a options iterable based on our array
*/
if (type) {
	options = type.map((el) => <option key={el}>{el}</option>);
}
return (
	<div className="container">
	<form>
		<div>
		{/** Bind changeSelectOptionHandler to onChange method of select.
		* This method will trigger every time different
		* option is selected.
		*/}
		<select className='input' onChange={changeSelectOptionHandler}>
			<option>Choose category...</option>
			<option>Nature</option>
			<option>Human</option>
			<option>Machines</option>
			<option>Animals</option>
			<option>Materials</option>
			<option>Ambience</option>
			<option>Electric</option>
			<option>Weather</option>
		</select>
		</div>
		<div>
		<select className='input'>
			Choose sub-category
        {
			/** This is where we have used our options variable */
			options
			}
		</select>
		</div>
	</form>
	</div>
);
};

export default SubCategories;
