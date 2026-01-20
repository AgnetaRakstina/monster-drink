import { useEffect, useState } from "react";
import '../css/loader.css';
import '../css/style.css';

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
			<main className="monster-main">
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
		<header className="monster-header">
			<div className="header-content">
				{/* Add your logo here */}
				{/* <img src="/path-to-logo.png" alt="Monster Energy" className="logo" /> */}
				<h1 className="site-title">Monster Energy</h1>
			</div>
		</header>
	)
}

function Footer() {
	return (
		<footer className="monster-footer">
			<div>
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
		"JUICE MONSTER",
		"JAVA MONSTER",
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
			<div className="category-header">
				<h2 className="category-title">{selectedCategory}</h2>
			</div>
			
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
		<div className="top-drink-card">
			<div className="top-drink-rank">#{index + 1}</div>
			<div className="top-drink-content">
				<h2 className="drink-name">
					{drink.name}
				</h2>
				<p className="drink-description">
					{ drink.description
					? (drink.description.split(' ').slice(0, 16).join(' ')) + '...'
					: '' }
				</p>
				<SeeMoreBtn
					drinkID={drink.id}
					handleDrinkSelection={handleDrinkSelection}
				/>
			</div>
			<div>
				<img
					src={ drink.image }
					alt={ drink.name }
					className="drink-image" 
				/>
			</div>
		</div>
	)
}

//Poga "Rādīt vairāk"
function SeeMoreBtn({ drinkID, handleDrinkSelection }) {
		return (
			<button
				className="btn btn-see-more"
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
				<div className="mb-12">
					<GoBackBtn handleGoingBack={handleGoingBack} />
				</div>
				
				<div className="drink-detail">
					<div>
						{selectedDrink.image && (
							<img
								src={selectedDrink.image}
								alt={selectedDrink.name}
								className="drink-detail-image"
							/>
						)}
					</div>
					<div>
						<h1 className="drink-name">
							{selectedDrink.name}
						</h1>
						<ul className="drink-specs">
							<li>
								<span className="spec-label">Kategorija:</span>
								{selectedDrink.category}
							</li>
							
							{selectedDrink.collaboration && (
								<li>
									<span className="spec-label">Sadarbība:</span>
									{selectedDrink.collaboration}
								</li>
							)}
							
							<li>
								<span className="spec-label">Izcelsme:</span>
								{selectedDrink.origin}
							</li>
							
							<li>
								<span className="spec-label">Garša:</span>
								{selectedDrink.flavor}
							</li>
							
							<li>
								<span className="spec-label">Kofeīna daudzums:</span>
								{selectedDrink.caffeine_amount} mg
							</li>
							
							<li>
								<span className="spec-label">Apraksts:</span>
								{selectedDrink.description}
							</li>
							
							<li>
								<span className="spec-label">Izdošanas gads:</span>
								{selectedDrink.released_in || "Nav izdots"}
							</li>

							<li>
								<span className="spec-label">Pārtraukšanas gads:</span>
								{selectedDrink.discontinued_in || "Vēl tiek ražots"}
							</li>
						</ul>
					</div>
				</div>
			</>}
		</>
	)
}

function GoBackBtn({ handleGoingBack }) {
	return (
		<button
			className="btn btn-secondary"
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
			<div className="section-header">
				<div className="category-info">
					<h3>Līdzīgi dzērieni</h3>
				</div>
			</div>
			
			{isLoading && <Loader />}
			{error && <ErrorMessage msg={error} />}
			{!isLoading && !error && (
				<div className="related-drinks-grid">
					{relatedDrinks.map( drink => (
						<RelatedDrinkView
							drink={drink}
							key={drink.id}
							handleDrinkSelection={handleDrinkSelection}
						/>
					))}
				</div>
			)}
		</>
	)
}

function RelatedDrinkView({ drink, handleDrinkSelection }) {
	return (
		<div
			className="drink-card clickable"
			onClick={() => handleDrinkSelection(drink.id)}
		>
			<img
				src={ drink.image }
				alt={ drink.name }
				className="drink-image" />
			<div className="drink-info">
				<h3 className="drink-name">{ drink.name }</h3>
				<p className="drink-description">{drink.category}</p>
			</div>
		</div>
	)
}

//ielādes indikators un kļūdas
function Loader() {
	return (
		<div className="loader-container">
			<div className="loader"></div>
		</div>
	)
}

function ErrorMessage({ msg }) {
	return (
		<div className="error-message">
			<p>{ msg }</p>
		</div>
	)
}

function CategorySelector({ categories, selectedCategory, onSelectCategory }) {
	return (
		<div className="category-nav">
			{categories.map((cat) => (
				<button
					key={cat}
					className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
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
		<div className="category-section">
			<div className="section-header">
				<div className="category-info">
					<h3>{category}</h3>
				</div>
			</div>
			<div className="drink-horizontal-scroll">
				{drinks.map((drink) => (
					<div
						key={drink.id}
						className="drink-card clickable"
						onClick={() => handleDrinkSelection(drink.id)}
					>
						<img src={drink.image} alt={drink.name} className="drink-image" />
						<div className="drink-info">
							<h3 className="drink-name">{drink.name}</h3>
							<p className="drink-description">{drink.category}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function TopDrinksSection({ topDrinks, handleDrinkSelection }) {
	// Show only 7 top drinks as requested
	const displayTopDrinks = topDrinks.slice(0, 7);
	
	return (
		<div className="top-drinks-section">
			{displayTopDrinks.map((drink, index) => (
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