import React from 'react'

function SearchBar() {
  return (
    <div>
        <input
          type="text"
          placeholder="جستجوی محصول..."
          className="border-2 border-zinc-200 outline-0 px-3 py-2 rounded-xl text-xs w-full"
        />
    </div>
  )
}

export default SearchBar