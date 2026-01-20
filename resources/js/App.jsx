import { useEffect, useState } from "react";
import '../css/loader.css';
//import '../css/style.css';

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
	const [allDrinks, setAllDrinks] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("ALL PRODUCTS");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const categories = [
		"ALL PRODUCTS",
		"MONSTER ENERGY",
		"MONSTER ULTRA",
		"MONSTER COFFEE",
		"JUICE MONSTER",
		"REHAB MONSTER",
		"FAN FAVORITES",
	];
	
	useEffect(function () {
		async function fetchDrinks() {
			try {
				setIsLoading(true);
				setError(null);
				const responseTop = await fetch("http://monster-drink/data/get-top-drinks");
				const responseAll = await fetch("http://monster-drink/data/get-all-drinks");
				
				if (!responseTop.ok || !responseAll.ok) {
					throw new Error("Datu ielādes kļūda. Lūdzu, pārlādējiet lapu!");
				}
				
				const top = await responseTop.json();
				const all = await responseAll.json();
				
				console.log('top drinks fetched', top);
				setTopDrinks(top);
				setAllDrinks(all);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchDrinks();
	}, []);
	
	// filter drinks by category
	const filteredDrinks = 
		selectedCategory === "ALL PRODUCTS"
			? allDrinks
			: allDrinks.filter((drink) => drink.category.toLowerCase() === selectedCategory.toLowerCase());

	return (
		<>
			<CategorySelector
				categories={categories}
				selectedCategory={selectedCategory}
				onSelectCategory={setSelectedCategory}
			/>
		
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			
			{!isLoading && !error && (
				<div>
					{selectedCategory === "ALL PRODUCTS"
						? categories
							.filter((cat) => cat !== "ALL PRODUCTS" && cat !== "FAN FAVORITES")
							.map((cat) => {
								const drinksInCat = allDrinks.filter(
									(d) => d.category.toLowerCase() === cat.toLowerCase()
								);
								return (
									<CategorySection
										key={cat}
										category={cat}
										drinks={drinksInCat}
										handleDrinkSelection={handleDrinkSelection}
									/>
								);
							})
						: selectedCategory === "FAN FAVORITES"
						? ( 
							<TopDrinksSection 
								topDrinks={topDrinks} 
								handleDrinkSelection={handleDrinkSelection}
							/>
						)
						: (
							<CategorySection
								category={selectedCategory}
								drinks={filteredDrinks}
								handleDrinkSelection={handleDrinkSelection}
							/>
						)
					}
				</div>
			)}
		</>
	);
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
				<p className="mb-4 text-xl leading-7 font-light text-neutral-900">
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
				<h3 className="text-xl leading-7 font-light text-neutral-900 mb-4">
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

function CategorySelector({ categories, selectedCategory, onSelectCategory }) {
	return (
		<div className="flex gap-4 mb-8 justify-center">
			{categories.map((cat) => (
				<button
					key={cat}
					className={`px-4 py-2 rounded ${ 
						selectedCategory === cat 
							? "bg-green-500 text-white" 
							: "bg-neutral-800 text-neutral-200"
					}`}
					onClick={() => onSelectCategory(cat)}
				>
					{cat}
				</button>
			))}
		</div>
	)
}

function CategorySection({ category, drinks, handleDrinkSelection }) {
	return (
		<div className="mb-12">
			<h2 className="text-3xl font-bold text-green-500 mb-4">{category}</h2>
			<div className="flex gap-4 overflow-x-auto">
				{drinks.map((drink) => (
					<div key={drink.id} className="flex-shrink-0 w-48">
						<img src={drink.image} alt={drink.name} className="rounded-lg mb-2" />
						<h3 className="text-lg font-semibold">{drink.name}</h3>
						<p className="text-sm text-neutral-400">{drink.category}</p>
						<SeeMoreBtn drinkID={drink.id} handleDrinkSelection={handleDrinkSelection} />
					</div>
				))}
			</div>
		</div>
	);
}
function TopDrinksSection({ topDrinks, handleDrinkSelection }) {
	return (
		<div>
			{topDrinks.map((drink, index) => (
				<TopDrinkView
					key={drink.id}
					drink={drink}
					index={index}
					handleDrinkSelection={handleDrinkSelection}
				/>
			))}
		</div>
	);
}