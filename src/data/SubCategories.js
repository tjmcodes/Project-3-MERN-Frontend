import React from 'react';
import styles from '../styles/SubCategories.module.scss'

const SubCategories = ({ selected, setSelected }) => {


/** Function that will set different values to state variable
* based on which dropdown is selected
*/

const changeSelectOptionHandler = (event) => {
	setSelected({ category: event.target.value, subCategory: '' });
};
const changeSecondSelectOptionHandler = (event) => {
	setSelected({ ...selected, subCategory: event.target.value });
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
if (selected.category === "nature") {
	type = nature;
} else if (selected.category === "human") {
	type = human;
} else if (selected.category === "machines") {
	type = machines;
} else if (selected.category === "animals") {
	type = animals;
} else if (selected.category === "materials") {
	type = materials;
} else if (selected.category === "ambience") {
	type = ambience;
} else if (selected.category === "electric") {
	type = electric;
} else if (selected.category === "weather") {
	type = weather;
}

/** If "Type" is null or undefined then options will be null,
* otherwise it will create a options iterable based on our array
*/
if (type) {
	options = type.map((element) => <option key={element}>{element}</option>);
}


return (
	<div className="container">
	<form>
		<div>
		{/** Bind changeSelectOptionHandler to onChange method of select.
		* This method will trigger every time different
		* option is selected.
		*/}
		<select className={styles.inputText} onChange={changeSelectOptionHandler}>
			<option>Choose category...</option>
			<option>nature</option>
			<option>human</option>
			<option>machines</option>
			<option>animals</option>
			<option>materials</option>
			<option>ambience</option>
			<option>electric</option>
			<option>weather</option>
		</select>
		</div>
		<div>
		<select className='input' onChange={changeSecondSelectOptionHandler}>
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
