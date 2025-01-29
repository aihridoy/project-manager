import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import HamBurgerSvg from "./HamBurgerSvg";
import NotificationSvg from "./NotificationSvg";
import MessageSvg from "./MessageSvg";

/* eslint-disable react/no-unknown-property */
const TopBar = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <header className="flex items-center justify-between bg-gray-800 p-4">
                <button className="lg:hidden">
                    <HamBurgerSvg />
                </button>
                <div className="mx-4 flex-1">
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
                    />
                </div>
                <div className="flex items-center">
                    <button className="relative mr-4">
                        <NotificationSvg />
                        <span
                            className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"
                        ></span>
                    </button>
                    <button className="relative mr-4">
                        <MessageSvg />
                        <span
                            className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"
                        ></span>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default TopBar;