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

let accommodationDivs = document.querySelectorAll(
	'.accommodation__sectiontitle'
);
accommodationDivs.forEach((div) => {
	div.addEventListener('click', () => {
		console.log(div);
		div.nextSibling.classList.toggle('hidden');
	});
});
