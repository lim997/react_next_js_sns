"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiLoader } from 'react-icons/fi';

const Container = styled.div` padding: 20px; margin-left: 100px;`;
const SearchBar = styled.input` display: block; width: 100%; padding: 12px 20px; margin: 0 0 20px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; `;
const Grid = styled.div` display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: 4px; `;
const GridItem = styled.img` width: 100%; height: 100%; object-fit: cover; `;

export default function Interest(){
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Replace this function with a real API call
  const fetchImages = async () => {
    const newImages = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Op64Fsb9PGj7IYrxGTy7LRC9EPTGs72Eg&usqp=CAU',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ];

    setImages((prevImages) => [...prevImages, ...newImages]);

    // Set 'hasMore' to false when there are no more images to load
    // setHasMore(false);
  };

  const handleSearch = (event) => {
    console.log('Search:', event.target.value);
    // Implement search functionality here
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Container>
        <SearchBar
          type="text"
          placeholder="Search for users or hashtags..."
          onChange={handleSearch}
        />
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={hasMore}
          loader={<div><FiLoader></FiLoader><span> Loading...</span></div>}
        >
          <Grid>
            {images.map((image, index) => (
              <GridItem key={index} src={image} alt="Thumbnail" />
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
      <MenuBar />
    </div>
  )
}