

export default function Account() {
	return (
		<div class="header-account">
			<div class="header-account__icon">
				<img src="./img/icons/account-icon.svg" alt="" />
			</div>
			<p class="header-account__name">Ronald Mcdonald</p>
			<div class="header-account__info">
				<p class="header-account__info-name">Ronald Mcdonald</p>
				<p class="header-account__email">Ronald_hate_kfc@gmail.com</p>
				<div class="header-account__settings">
					<p class="header-account__text">Account settings</p>
					<p class="header-account__text">Help</p>
					<p class="header-account__text header-account__text--red">Sign out</p>
				</div>
			</div>
		</div>
	);
}
