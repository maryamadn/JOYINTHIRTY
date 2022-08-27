const SearchResults = () => {
  return (
    <>
      <h3>Track Name</h3>
      <h3>Artist</h3>
      <h3>Duration</h3>
      <div>
        <img src="" alt="track image" />
        <p>track name</p>
        <p>artist</p>
        <p>00:30</p>
        <div class="dropdown">
          <p>3 dots</p>
          <div class="dropdown-content">
            <p>remove from playlist</p>
            <p>add to other/new playlist</p>
          </div>
        </div>
      </div>

      <button>.. prev page</button>
      <button>next page ..</button>
    </>
  );
};

export default SearchResults