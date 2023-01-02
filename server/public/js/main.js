let addOptions = document.querySelector('.add__options');

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
	const ID = e.target.parentElement.id;
	try {
		await fetch('/student/deleteStudent', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ID: ID,
			}),
		});
		window.location.reload();
	} catch (error) {
		console.error(error);
	}
}
