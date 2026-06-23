import { useEffect, useRef } from 'react'
type FilterType =
  | 'all'
  | 'active'
  | 'completed'
type SortType =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'
  | 'due-date'
interface FilterBarProps {
  filter?: FilterType
  onFilterChange?: (filter: FilterType) => void
  sortOrder?: SortType
  onSortChange?: (sort: SortType) => void
  search?: string
  searchQuery?: string
  onSearchChange?: (value: string) => void
  categories?: string[]
  selectedCategory?: string
  onCategoryChange?: (
    category: string
  ) => void
}
export default function FilterBar({
  filter = 'all',
  onFilterChange = () => {},
  sortOrder = 'recent',
  onSortChange = () => {},
  search = '',
  searchQuery = '',
  onSearchChange = () => {},
  categories = [],
  selectedCategory = 'All categories',
  onCategoryChange = () => {},
}: FilterBarProps) {
  const searchInputRef =
  useRef<HTMLInputElement>(null)
useEffect(() => {
  if (searchInputRef.current) {
    searchInputRef.current.focus()}}, [])
  return (
    <div id="filter-bar">
      <input
        ref={searchInputRef}
        id="search-input"
        type="text"
        placeholder="Search tasks"
        value={search || searchQuery}
        onChange={(e) =>onSearchChange(e.target.value)}
      />
      {search && (
        <button
          id="clear-search"
          type="button"
          onClick={() =>onSearchChange('')}
        >Clear search</button>
      )}
      <button
        data-active={filter === 'all'}
        onClick={() =>onFilterChange('all')}
      >All</button>
      <button
        data-active={filter === 'active'}
        onClick={() =>onFilterChange('active')}
      >Active</button>
      <button
        data-active={filter === 'completed'}
        onClick={() =>onFilterChange('completed')}
      >Completed</button>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) =>onCategoryChange(e.target.value)}
      >
        <option value="All categories">
          All categories
        </option>
        {categories.map(
          (category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          )
        )}
      </select>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>onSortChange(e.target.value as SortType)}
      >
        <option value="recent">
          Recently Added
        </option>
        <option value="high-low">
          Priority: High to Low
        </option>
        <option value="low-high">
          Priority: Low to High
        </option>
        <option value="alphabetical">
          Alphabetical
        </option>
        <option value="due-date">
          Due Date (Soonest First)
        </option>
      </select>
    </div>
  )
}