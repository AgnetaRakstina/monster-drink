import { useEffect, useState } from "react";
import '../css/loader.css';

/*
const topDrinks = [
	{
		"id": 4,
		"category": "MONSTER COFFEE",
		"collaboration": "",
		"origin": "ASV",
		"name": "Salted caramel",
		"image": "http://monster-drink/images/696d3036d959e.png",
		"flavor": "\"Salds un sāļš sāļš karamele\"",
		"caffeine_amount": 200,
		"released_in": 2016,
		"discontinued_in": null,
		"description": "Šajā izsmalcinātajā enerģijas dzērienā sāļā karamele satiekas ar bagātīgu kafiju un krējumu. Maigs, salds un gatavs dzeršanai ar Monster Energy piesātināto garšu un attieksmi." 
	},
	{
		"id": 3,
		"category": "JUICE MONSTER",
		"collaboration": "",
		"origin": "Brazīlija",
		"name": "Juiced monster RIO PUNCH",
		"image": "http://monster-drink/images/696d2f894233b.png",
		"flavor": "\"Salda papaija, vaniļas saldējums, upeņu nots\"",
		"caffeine_amount": 160,
		"released_in": 2024,
		"discontinued_in": null,
		"description": "Lielisks gāzētu sulu, vitamīnu un mūsu pasaulslavenā Monster enerģijas maisījuma sajaukums. Nobaudiet eksotiskās Juice Monster Rio Punch garšas, kas iedvesmotas no Riodežaneiro karnevāla episkās enerģijas!"
	},
	{
		"id": 1,
		"category": "MONSTER ENERGY",
		"collaboration": "",
		"origin": "ASV",
		"name": "Original Green \"OG\"",
		"image": "http://monster-drink/images/696d297a37b83.webp",
		"flavor": "\"Salds un sāļš - tas garšo kā nezvērs!\"",
		"caffeine_amount": 160,
		"released_in": 2002,
		"discontinued_in": null,
		"description": "Ieplēs bundžā planētas nejaukākā enerģijas dzēriena — Monster Energy. Tam ir spēcīgs trieciens, bet tas ir viegli dzerams ar savu viegli dzeramo garšu. Tā ir ideāla pareizo sastāvdaļu kombinācija pareizajās proporcijās, lai sniegtu lielo, čauno sajūtu, kādu spēj tikai Monster. Atbrīvo nezvēru!"
	}

]
const selectedDrink = {
	"id": 3,
	"category": "JUICE MONSTER",
	"collaboration": "",
	"origin": "Brazīlija",
	"name": "Juiced monster RIO PUNCH",
	"image": "http://monster-drink/images/696d2f894233b.png",
	"flavor": "\"Salda papaija, vaniļas saldējums, upeņu nots\"",
	"caffeine_amount": 160,
	"released_in": 2024,
	"discontinued_in": null,
	"description": "Lielisks gāzētu sulu, vitamīnu un mūsu pasaulslavenā Monster enerģijas maisījuma sajaukums. Nobaudiet eksotiskās Juice Monster Rio Punch garšas, kas iedvesmotas no Riodežaneiro karnevāla episkās enerģijas!"
};


const relatedDrinks =[
	{
	"id": 1,
	"category": "MONSTER ENERGY",
	"collaboration": "",
	"origin": "ASV",
	"name": "Original Green \"OG\"",
	"image": "http://monster-drink/images/696d297a37b83.webp",
	"flavor": "\"Salds un sāļš - tas garšo kā nezvērs!\"",
	"caffeine_amount": 160,
	"released_in": 2002,
	"discontinued_in": null,
	"description": "Ieplēs bundžā planētas nejaukākā enerģijas dzēriena — Monster Energy. Tam ir spēcīgs trieciens, bet tas ir viegli dzerams ar savu viegli dzeramo garšu. Tā ir ideāla pareizo sastāvdaļu kombinācija pareizajās proporcijās, lai sniegtu lielo, čauno sajūtu, kādu spēj tikai Monster. Atbrīvo nezvēru!"
	},
	{
	"id": 2,
	"category": "MONSTER ULTRA",
	"collaboration": "",
	"origin": "ASV",
	"name": "Monster energy ULTRA \"White monster\"",
	"image": "http://monster-drink/images/696d2e7aa922a.png",
	"flavor": "\"Viegli atsvaidzinoši citrusaugļi\"",
	"caffeine_amount": 150,
	"released_in": 2012,
	"discontinued_in": null,
	"description": "Monster Energy Ultra 500 ml bundžiņā, bezcukura enerģijas dzēriens ar enerģijas maisījumu un 150 mg kofeīna. Monster Energy Ultra ir viegla, atsvaidzinoša citrusaugļu garša. Monster Energy Ultra negaršo kā tradicionālie enerģijas dzērieni, taču tajā joprojām ir pilnvērtīgs Monster enerģijas maisījums. Pasniedziet aukstu, lai iegūtu maksimālu atspirdzinājumu."
  },
  {
	"id": 4,
    "category": "MONSTER COFFEE",
    "collaboration": "",
    "origin": "ASV",
    "name": "Salted caramel",
    "image": "http://monster-drink/images/696d3036d959e.png",
    "flavor": "\"Salds un sāļš sāļš karamele\"",
    "caffeine_amount": 200,
    "released_in": 2016,
    "discontinued_in": null,
    "description": "Šajā izsmalcinātajā enerģijas dzērienā sāļā karamele satiekas ar bagātīgu kafiju un krējumu. Maigs, salds un gatavs dzeršanai ar Monster Energy piesātināto garšu un attieksmi."
  }
]
*/


	//Galvena lietotnes komponente
export default function App() {
	const [selectedDrinkID, setSelectedDrinkID] = useState(null)
	
	// funkcija Drink ID saglabasana stavokli
	function handleDrinkSelection(drinkID) {
		setSelectedDrinkID(drinkID);
	}
	// funkcija drink izveles atcelsanai
	function handleGoingBack() {
		setSelectedDrinkID(null);
	}
		
	return (
		<>
			<Header />
			<main className="mb-8 px-2 md:container md:mx-auto">
				{
				selectedDrinkID
				? <DrinkPage
					selectedDrinkID={selectedDrinkID}
					handleDrinkSelection={handleDrinkSelection}
					handleGoingBack={handleGoingBack}
				/>
				: <Homepage handleDrinkSelection={handleDrinkSelection} />
				}
			</main>
			<Footer />
		</>
	)
}

function Header() {
	return (
		<header className="bg-green-500 mb-8 py-2 sticky top-0">
			<div className="px-2 py-2 font-serif text-green-50 text-xl leading-6 md:container md:mx-auto">
				Monster enerģijas dzērieni
			</div>
		</header>
	)
}

function Footer() {
	return (
		<footer className="bg-neutral-300 mt-8">
			<div className="py-8 md:container md:mx-auto px-2">
				A. Rakstiņa, VeA, 2026
			</div>
		</footer>
	)
}
// Sākumlapa - ieladē datus no API un attēlo top dzērienus
function Homepage({ handleDrinkSelection }) {
	const [topDrinks, setTopDrinks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(function () {
		async function fetchTopDrinks() {
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://monster-drink/data/get-top-drinks');
				
				if (!response.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}
				
				const data = await response.json();
				console.log('top drinks fetched', data);
				setTopDrinks(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchTopDrinks();
	}, []);
	
	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && (
			topDrinks.map((drink, index) => (
					<TopDrinkView 
						drink = {drink}
						key={drink.id}
						index = {index}
						handleDrinkSelection={handleDrinkSelection}
					/>
				))
			)}	
		</>
	)
}
// Top dzērienu skats, attēlo sākumlapas dzērienus
function TopDrinkView({ drink, index, handleDrinkSelection }) {
	return (
		<div className="bg-neutral-100 rounded-lg mb-8 py-8 flex flex-wrap md:flex-row">
			<div className=
				{`order-2 px-12 md:basis-1/2
					${ index % 2 === 1 ? "md:order-1 md:text-right" : ""}
				`}
			>
				<h2 className="mb-4 text-3xl leading-8 font-light text-neutral-900">
					{drink.name}
				</h2>
				<p className="mb-4 text-xl leading-7 font-light text-neutral-900 mb-4">
					{ drink.description
					? (drink.description.split(' ').slice(0, 16).join(' ')) + '...'
					: '' }
				</p>
				<SeeMoreBtn
					drinkID={drink.id}
					handleDrinkSelection={handleDrinkSelection}
				/>
			</div>
			<div className=
				{`order-1 md:basis-1/2 ${ index % 2 === 1 ? "md:order-2" : ""}`}
			>
				<img
					src={ drink.image }
					alt={ drink.name }
					className="p-1 rounded-md border border-neutral-200 w-2/4 aspect-auto mx-auto" 
				/>
			</div>
		</div>
	)
}
//Poga "Rādīt vairāk"
function SeeMoreBtn({ drinkID, handleDrinkSelection }) {
		return (
			<button
				className="inline-block rounded-full py-2 px-4 bg-sky-500 hover:bg-sky-400 text-sky-50 cursor-pointer"
				onClick={() => handleDrinkSelection(drinkID)}
			>Rādīt vairāk</button>
		)
}
// Drink lapa - strukturāla komponente, satus drink lapas daļas
function DrinkPage({ selectedDrinkID, handleDrinkSelection, handleGoingBack }) {
	return (
		<>
			<SelectedDrinkView
				selectedDrinkID={selectedDrinkID}
				handleGoingBack={handleGoingBack}
			/>
			<RelatedDrinkSection
				selectedDrinkID={selectedDrinkID}
				handleDrinkSelection={handleDrinkSelection}
			/>
		</>
	)
}

//Izvēlētāš drink skats - attēlo datus
function SelectedDrinkView({ selectedDrinkID, handleGoingBack }) {
	const [selectedDrink, setSelectedDrink] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(function () {
		async function fetchSelectedDrink() {
			
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch('http://monster-drink/data/get-drink/' + selectedDrinkID);
				
				if (!response.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}
				const data = await response.json();
				console.log('drink ' + selectedDrinkID + ' fetched', data);
				setSelectedDrink(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		
		fetchSelectedDrink();
	}, [selectedDrinkID]);
	
	return (
		<>
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && <>
			
				<div className="rounded-lg flex flex-wrap md:flex-row">
					<div className="order-2 md:order-1 md:pt-12 md:basis-1/2">
						<h1 className="text-3xl leading-8 font-light text-neutral-900 mb-2">
							{selectedDrink.name}
						</h1>
						<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
							Kategorija: {selectedDrink.category}
						</p>
					
						{selectedDrink.collaboration && (
							<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
								Sadarbība: {selectedDrink.collaboration}
							</p>
						)}
					
						<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
							Izcelsme: {selectedDrink.origin}
						</p>
					
						<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
							Garša: {selectedDrink.flavor}
						</p>
					
						<p className="text-xl leading-7 font-light text-neutral-900 mb-2">
							Kofeīna daudzums: {selectedDrink.caffeine_amount} mg
						</p>
					
						<p className="text-xl leading-7 font-light text-neutral-900 mb-4">
							{selectedDrink.description}
						</p>
					
						<dl className="mb-4 md:flex md:flex-wrap md:flex-row">
							<dt className="font-bold md:basis-1/4">Izdošanas gads</dt>
							<dd className="mb-2 md:basis-3/4">{selectedDrink.released_in || "Nav izdots"}</dd>

							<dt className="font-bold md:basis-1/4">Pārtraukšanas gads</dt>
							<dd className="mb-2 md:basis-3/4">{selectedDrink.discontinued_in || "Vēl tiek ražots"}</dd>
						</dl>
					</div>
				
					<div className="order-1 md:order-2 md:pt-12 md:px-12 md:basis-1/2">
						{selectedDrink.image && (
							<img
								src={selectedDrink.image}
								alt={selectedDrink.name}
								className="p-1 rounded-md border border-neutral-200 mx-auto"
							/>
						)}
					</div>
				</div>
			
				<div className="mb-12 flex flex-wrap">
					<GoBackBtn handleGoingBack={handleGoingBack} />
				</div>
			</>}
		</>
	)
}

function GoBackBtn({ handleGoingBack }) {
	return (
		<button
			className="inline-block rounded-full py-2 px-4 bg-neutral-500 hover:bg-neutral-400 text-neutral-50 cursor-pointer"
			onClick={handleGoingBack}
		>Uz sākumu</button>
	)
}

function RelatedDrinkSection({ selectedDrinkID, handleDrinkSelection }) {
	const [relatedDrinks, setRelatedDrinks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(function () {
		async function fetchRelatedDrinks() {
			try {
				setIsLoading(true);
				setError(null);
				
				const response = await fetch('http://monster-drink/data/get-related-drinks/' + selectedDrinkID);
				
				if (!response.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}
				
				const data = await response.json();
				console.log('Related drinks fetched', data);
				setRelatedDrinks(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchRelatedDrinks();
	}, [selectedDrinkID]);

	return (
		<>
			<div className="flex flex-wrap">
				<h2 className="text-3xl leading-8 font-light text-neutral-900 mb-4">
					Līdzīgi dzērieni
				</h2>
			</div>
			
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && <>
			
			
				<div className="flex flex-wrap md:flex-row md:space-x-4 md:flexnowrap">
					{relatedDrinks.map( drink => (
						<RelatedDrinkView
							drink={drink}
							key={drink.id}
							handleDrinkSelection={handleDrinkSelection}
						/>
					))}
				</div>
			</>}
		</>
	)
}

function RelatedDrinkView({ drink, handleDrinkSelection }) {
	return (
		<div className="rounded-lg mb-4 md:basis-1/3">
			<img
				src={ drink.image }
				alt={ drink.name }
				className="md:h-[400px] md:mx-auto max-md:w-2/4 max-md:mx-auto" />
			<div className="p-4">
				<h3 className="text-xl leading-7 font-light text-neutral-900 mb4">
					{ drink.name }
				</h3>
				<SeeMoreBtn
					drinkID={drink.id}
					handleDrinkSelection={handleDrinkSelection}
				/>
			</div>
		</div>
	)
}

//ielādes indikators un kļūdas
function Loader() {
	return (
		<div className="my-12 px-2 md:container md:mx-auto text-center clear-both">
			<div className="loader"></div>
		</div>
	)
}
function ErrorMessage({ msg }) {
	return (
		<div className="md:container md:mx-auto bg-red-300 my-8 p-2">
			<p className="text-black">{ msg }</p>
		</div>
	)
}