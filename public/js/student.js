const goalSearch = document.querySelector('.goalSearch');
const goalForm = document.querySelector('.goalForm');
const ID = document.querySelector('.ID');
goalSearch.addEventListener('click', findGoals);

async function findGoals() {
	console.log(ID.innerText.split(':')[1]);
	console.log(goalForm);
	const goalArray = Object.values(goalForm);
	const goalInputArray = goalArray.filter((goal) => {
		return goal.checked;
	});
	const goalSearchArray = goalInputArray.map((goal) => {
		return goal.value;
	});
	console.log(goalSearchArray);

	let searchArr = [];
}
