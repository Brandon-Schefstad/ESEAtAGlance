let addOptions = document.querySelector('.add__options');
const add = document.querySelector('.add');

add.addEventListener('mouseover', showSubMenu);
add.addEventListener('mouseout', hideSubMenu);
addOptions.addEventListener('mouseover', showSubMenu);
addOptions.addEventListener('mouseout', hideSubMenu);

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
	console.log(e.target.id);
	const ID = e.target.id;
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

let accommodationDivs = document.querySelectorAll(
	'.accommodation__sectiontitle'
);
accommodationDivs.forEach((div) => {
	div.addEventListener('click', () => {
		console.log(div);
		div.nextSibling.classList.toggle('hidden');
	});
});

const ANIMATEDCLASSNAME = 'animated';
const ELEMENTS = document.querySelectorAll('.HOVER');
const ELEMENTS_SPAN = [];

ELEMENTS.forEach((element, index) => {
	let addAnimation = false;
	// Elements that contain the "FLASH" class, add a listener to remove
	// animation-class when the animation ends
	if (element.classList[1] == 'FLASH') {
		element.addEventListener('animationend', (e) => {
			element.classList.remove(ANIMATEDCLASSNAME);
		});
		addAnimation = true;
	}

	// If The span element for this element does not exist in the array, add it.
	if (!ELEMENTS_SPAN[index])
		ELEMENTS_SPAN[index] = element.querySelector('span');

	element.addEventListener('mouseover', (e) => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + 'px';
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + 'px';

		// Add an animation-class to animate via CSS.
		if (addAnimation) element.classList.add(ANIMATEDCLASSNAME);
	});

	element.addEventListener('mouseout', (e) => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + 'px';
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + 'px';
	});
});
