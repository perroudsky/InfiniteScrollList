import React, { useState, useEffect } from "react";

const List = () => {
  const [listItems, setListItems] = useState(
    Array.from(Array(50).keys(), n => n + 1)
  );
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };

  const fetchMoreListItems = () => {
    setTimeout(() => {
      setListItems(prevState => [
        ...prevState,
        ...Array.from(Array(20).keys(), n => n + prevState.length + 1)
      ]);
      setIsFetching(false);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  return (
    <div>
      {listItems.map(el => (
        <div>
          <p>{el}</p>
        </div>
      ))}
      {isFetching && <p>Fetching...</p>}
    </div>
  );
};

export default List;
