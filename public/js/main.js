let addOptions = document.querySelector('.add__options');
// if(document.querySelector('.add')
// const add = document.querySelector('.add');

// add.addEventListener('mouseover', showSubMenu);
// add.addEventListener('mouseout', hideSubMenu);
// addOptions.addEventListener('mouseover', showSubMenu);
// addOptions.addEventListener('mouseout', hideSubMenu);

function showSubMenu() {
	addOptions.classList.remove('hidden');
}
function hideSubMenu() {
	addOptions.classList.add('hidden');
}

const deleteBtns = document.querySelectorAll('.delete__button');
deleteBtns.forEach((button) => {
	button.addEventListener('click', deleteItem);
});

async function deleteItem(e) {
	console.log(e.target);
	const ID = e.target.parentElement.id;
	try {
		fetch('/student/deleteStudent', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ID: ID,
			}),
		}).then(() => {
			window.location.reload();
		});
	} catch (error) {
		console.error(error);
	}
}

// let accommodationDivs = document.querySelectorAll(
// 	'.accommodation__sectiontitle'
// );
// accommodationDivs.forEach((div) => {
// 	div.addEventListener('click', () => {
// 		console.log(div);
// 		div.nextSibling.classList.toggle('hidden');
// 	});
// });
