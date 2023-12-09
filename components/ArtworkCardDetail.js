import {React, useState,current,useEffect} from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Error from "next/error";
import { Card ,Button} from 'react-bootstrap';
import { favouritesAtom } from '@/store';
import { useAtom } from "jotai";
import { addToFavourites, removeFromFavourites } from '../lib/userData.js';

const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  
  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
}, [favouritesList, objectID])
const { data, error } = useSWR(objectID ?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null);

  // const [showAdded, setShowAdded] = useState(
  //   favouritesList.includes(objectID) ? true : false
  // );
  const  favouritesClicked =async () => {
    if (showAdded) {
      
      setFavouritesList(await removeFromFavourites(objectID )) ;
      setShowAdded(false);
    } else {
      
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };
  
    
    console.log("step detail");
    if (error) {
      // If there's an error, render the Error component
      return <Error statusCode={404} />;
    }
  
    if (data) {
      const {
        primaryImage,
        title,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        creditLine,
        dimensions,
        artistWikidata_URL,
      } = data;
  
      // Render a Bootstrap Card component with the fetched data
      return (
        <Card>
          {primaryImage && (
            <Card.Img src={primaryImage} alt="Artwork" />
          )}
          <Card.Body>
            <Card.Title>{title || 'N/A'}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {objectDate || 'N/A'}
              <br />
              <strong>Classification:</strong> {classification || 'N/A'}
              <br />
              <strong>Medium:</strong> {medium || 'N/A'}
              <br />
              <br />
              <strong>Artist:</strong> {artistDisplayName || 'N/A'}
              <br />
              <strong>Credit Line:</strong> {creditLine || 'N/A'}
              <br />
              <strong>Dimensions:</strong> {dimensions || 'N/A'}
              <br />
              {artistWikidata_URL && (
                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                  Wiki
                </a>
              )}
            </Card.Text>
            <Button variant={showAdded ? "primary" : "outline-primary"} 
            onClick={favouritesClicked}
        >{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
          </Card.Body>
        </Card>
      );
    }
  
    // If there's no data yet, return null
    return null;
  };
  
  export default ArtworkCardDetail;