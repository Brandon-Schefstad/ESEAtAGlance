const goalSearch = document.querySelector('.goalSearch');
const goalForm = document.querySelector('.goalForm');
const ID = document.querySelector('.ID');
goalSearch.addEventListener('click', searchGoals);

async function searchGoals() {
	const searchID = ID.innerText.split(':')[1];
	console.log(searchID);
	const goalArray = Object.values(goalForm);
	const goalInputArray = goalArray.filter((goal) => {
		return goal.checked;
	});
	const goalSearchArray = goalInputArray.map((goal) => {
		return goal.value;
	});
	try {
		fetch('searchStudent?ID=' + searchID);
	} catch (error) {
		console.error(error);
	}
}
