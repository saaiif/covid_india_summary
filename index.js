const API_URL = 'https://api.covid19api.com/summary';

const countryName = document.querySelector('[data-country-name]');
const slugElement = document.querySelector('[data-slug-info]');
const newCase = document.querySelector('[data-newcase-info]');
const totalNewcase = document.querySelector('[data-totalnewcase-info]');
const newDeaths = document.querySelector('[data-newdeaths-info]');
const totalDeaths = document.querySelector('[data-totaldeaths-info]');
const newRecovered = document.querySelector('[data-newrecovered-info]');
const totalRecovered = document.querySelector('[data-totalrecovered-info]');
const currentDate = document.querySelector('[data-date]');

let solw;
getInfo().then((lives) => {
	solw = lives.length - 1;
	displayData(lives);
	console.log(lives);
});

function displayData(lives) {
	const selectedCountry = lives[solw];
	countryName.innerText = selectedCountry.country;
	slugElement.innerText = selectedCountry.slug;
	newCase.innerText = selectedCountry.newConfirmedCase;
	totalNewcase.innerText = selectedCountry.totalConfirmed;
	newDeaths.innerText = selectedCountry.newDeaths;
	totalDeaths.innerText = selectedCountry.totalDeaths;
	newRecovered.innerText = selectedCountry.newRecovered;
	totalRecovered.innerText = selectedCountry.totalRecovered;
	currentDate.innerText = displayDate(selectedCountry.date);
}

function displayDate(date) {
	return date.toLocaleString({ day: 'numeric', month: 'long' });
}

function getInfo() {
	return fetch(API_URL).then((res) => res.json()).then((data) => {
		const { Countries, ...covidData } = data;
		console.log(data);
		return Object.entries(covidData).map(() => {
			return {
				country: data.Countries[98].Country,
				slug: data.Countries[98].Slug,
				newConfirmedCase: data.Countries[98].NewConfirmed,
				totalConfirmed: data.Countries[98].TotalConfirmed,
				newDeaths: data.Countries[98].NewDeaths,
				totalDeaths: data.Countries[98].TotalDeaths,
				newRecovered: data.Countries[98].NewRecovered,
				totalRecovered: data.Countries[98].TotalRecovered,
				date: new Date(data.Date)
			};
		});
		// console.log(temp);
	});
}
