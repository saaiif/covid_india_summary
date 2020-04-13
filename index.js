const API_URL = 'https://api.covid19api.com/summary';

const countryName = document.querySelector('[data-country-name]');
const countryCodeElement = document.querySelector('[data-countrycode-info]');
const slugElement = document.querySelector('[data-slug-info]');
const newCase = document.querySelector('[data-newcase-info]');
const newcaseGlobally = document.querySelector('[data-newcase-infoGlobally]');
const totalNewcase = document.querySelector('[data-totalnewcase-info]');
const totalNewcaseGlobally = document.querySelector('[data-totalnewcase-infoGlobally]');
const newDeaths = document.querySelector('[data-newdeaths-info]');

const newDeathsGlobally = document.querySelector('[data-newdeaths-infoGlobally]');
const totalNewDeathsGlobally = document.querySelector('[data-totaldeaths-infoGlobally]');
const newRecoveredGlobally = document.querySelector('[data-newrecovered-infoGlobally]');
const totalNewRecoveredGlobally = document.querySelector('[data-totalrecovered-infoGlobally]');

const totalDeaths = document.querySelector('[data-totaldeaths-info]');
const newRecovered = document.querySelector('[data-newrecovered-info]');
const totalRecovered = document.querySelector('[data-totalrecovered-info]');
const currentDate = document.querySelector('[data-date]');
const currentGlobalDate = document.querySelector('[data-dateGlobally]');

let solw;
getInfo().then((lives) => {
	solw = lives.length - 1;
	displayData(lives);
	console.log(lives);
});

function displayData(lives) {
	const selectedCountry = lives[solw];
	countryName.innerText = selectedCountry.country;
	countryCodeElement.innerText = selectedCountry.countryCode;
	slugElement.innerText = selectedCountry.slug;
	newCase.innerText = selectedCountry.newConfirmedCase;
	newcaseGlobally.innerText = selectedCountry.newConfirmedCaseGlobally;
	totalNewcase.innerText = selectedCountry.totalConfirmed;
	totalNewcaseGlobally.innerText = selectedCountry.totalConfirmedGlobally;

	newDeathsGlobally.innerText = selectedCountry.newDeathsGlobally;
	totalNewDeathsGlobally.innerText = selectedCountry.totalDeathsGlobally;
	newRecoveredGlobally.innerText = selectedCountry.newRecoveredGlobally;
	totalNewRecoveredGlobally.innerText = selectedCountry.totalRecoveredGlobally;

	newDeaths.innerText = selectedCountry.newDeaths;
	totalDeaths.innerText = selectedCountry.totalDeaths;
	newRecovered.innerText = selectedCountry.newRecovered;
	totalRecovered.innerText = selectedCountry.totalRecovered;
	currentDate.innerText = displayDate(selectedCountry.date);
	currentGlobalDate.innerText = displayDate(selectedCountry.dateGlobally);
}

function displayDate(date) {
	return date.toLocaleString({ day: 'numeric', month: 'long' });
}

function getInfo() {
	return fetch(API_URL).then((res) => res.json()).then((data) => {
		const { Countries, ...covidData } = data;
		console.log(data);
		return Object.entries(covidData).map(() => {
			india = [ 100 ];
			return {
				country: data.Countries[india].Country,
				countryCode: data.Countries[india].CountryCode,
				slug: data.Countries[india].Slug,
				newConfirmedCase: data.Countries[india].NewConfirmed,
				totalConfirmed: data.Countries[india].TotalConfirmed,
				newDeaths: data.Countries[india].NewDeaths,
				totalDeaths: data.Countries[india].TotalDeaths,
				newRecovered: data.Countries[india].NewRecovered,
				totalRecovered: data.Countries[india].TotalRecovered,
				date: new Date(data.Date),
				newConfirmedCaseGlobally: data.Global.NewConfirmed,
				totalConfirmedGlobally: data.Global.TotalConfirmed,
				newDeathsGlobally: data.Global.NewDeaths,
				totalDeathsGlobally: data.Global.TotalDeaths,
				newRecoveredGlobally: data.Global.NewRecovered,
				totalRecoveredGlobally: data.Global.TotalRecovered,
				dateGlobally: new Date(data.Date)
			};
		});
		// console.log(temp);
	});
}
