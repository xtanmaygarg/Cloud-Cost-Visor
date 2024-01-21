import { useState } from 'react';
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
    const [searchVal, setSearchVal] = useState("");

    return (
        <form className="form-control w-1/2 h-12 relative">
            <input onChange={setSearchVal} className="h-full !bg-white !text-zinc-950 !w-full !pr-10" />
            {searchVal && <SearchOutlined className="absolute text-zinc-950 right-5 top-1/2 -translate-y-1/2 cursor-pointer" />}
        </form>
    );
};

export default SearchBar