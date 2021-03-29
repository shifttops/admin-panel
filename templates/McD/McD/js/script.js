let burgerSideNav = document.querySelector('.header__burger');

let searchInput = document.querySelector('.header__search-input');
let searchResult = document.querySelector('.search-result');
let searchIcon = document.querySelector('.header__search-box svg');

(() => {
	let checkboxForStore = document.querySelectorAll('.checkbox__input');
	let reportBtn = document.querySelector('.dashboard-head__report');
	let printBtn = document.querySelector('.dashboard-head__print');
	let chooseAllCheckbox = document.querySelector('.checkbox__input--all');
	for (var i = 0; i < checkboxForStore.length; i++)
		checkboxForStore[i].addEventListener('change', function () {
			if (this.checked) {
				reportBtn.classList.remove('disabled-report');
				printBtn.style.display = "flex";
			} else {
				reportBtn.classList.add('disabled-report');
				printBtn.style.display = "none";
			}
		})
	if (chooseAllCheckbox) {
		chooseAllCheckbox.onchange = function (e) {
			var el = e.target || e.srcElement;
			for (var i = 0; i < checkboxForStore.length; i++) {
				if (el.checked) {
					checkboxForStore[i].checked = true;
				} else {
					checkboxForStore[i].checked = false;
				}
			}
		}
	}

})()


//анимация поиска
searchInput.addEventListener("keyup", function () {
	if (searchInput.value.length > 0) {
		searchResult.style.display = "block";
	} else {
		searchResult.style.display = "none";
	}
});
searchInput.onblur = function () {
	searchResult.style.display = "none";
}


const openNotificationsInfo = () => {
	let notificationIcon = document.querySelector('.header__bell-icon');
	let notificationIconSvg = document.querySelector('.header__bell-icon svg');
	let notificationInfo = document.querySelector('.notifications');

	notificationIcon.addEventListener('click', () => {
		notificationInfo.classList.toggle('show-block');
	})

	document.addEventListener('click', (e) => {
		const target = e.target;
		const infoBlock = target == notificationInfo || notificationInfo.contains(target);
		const notificationIconTarget = target == notificationIcon || target == notificationIconSvg;

		if (!infoBlock && !notificationIconTarget && notificationInfo.classList.contains('show-block')) {
			notificationInfo.classList.remove('show-block');
		}
	})
}
openNotificationsInfo();

// const openAccountInfo = () => {
// 	let account = document.querySelector('.header-account__name');
// 	let accountInfo = document.querySelector('.header-account__info');

// 	account.addEventListener('click', () => {
// 		accountInfo.classList.toggle('show-block');
// 	})

// 	document.addEventListener('click', (e) => {
// 		const target = e.target;
// 		const infoBlock = target == accountInfo || accountInfo.contains(target);
// 		const accountTarget = target == account;

// 		if (!infoBlock && !accountTarget && accountInfo.classList.contains('show-block')) {
// 			accountInfo.classList.remove('show-block');
// 		}
// 	})
// }
// openAccountInfo();


function openInfo(openBtnSelector, infoBlockSelector) {
	const openBtn = document.querySelector(openBtnSelector)
	infoBlock = document.querySelector(infoBlockSelector)

	openBtn.addEventListener('click', (e) => {
	
		infoBlock.classList.toggle('show-block');
	})

	document.addEventListener('click', (e) => {
		const target = e.target;
		const infoBlockTarget = target == infoBlock || infoBlock.contains(target);
		const iconTarget = target == openBtn;

		if (!infoBlockTarget && !iconTarget && infoBlock.classList.contains('show-block')) {
			infoBlock.classList.remove('show-block');
		}
	})
}

// openInfo('.header-account__name', '.header-account__info');
openInfo('.inner-store__btn', '.status-change');


tippy('.dashboard-head__report.disabled-report', {
	content: 'choose a restaurant',
});

tippy('.store-list__more', {
	content: 'more',
	interactive: true,
});

tippy('.manage__btn-apdate.disabled-report', {
	content: 'select status',
	interactive: true,
});