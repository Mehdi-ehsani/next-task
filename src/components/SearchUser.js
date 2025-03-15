"use client";
import { useState } from "react";
const SearchUser = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState("");
	return (
		<label className="input w-[290px]" >
			<svg
				className="h-[1em] opacity-50"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<g
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="2.5"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</g>
			</svg>
			<input
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					onSearch(e.target.value);
				}}
				type="text"
				placeholder="search..."
			/>
		</label>
	);
};

export default SearchUser;
