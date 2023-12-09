import React from "react";
import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card,Button } from "react-bootstrap";


export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  console.log("step whole");
  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const { primaryImageSmall, title, objectDate, classification, medium } = data;

    // Render a Bootstrap Card component with the fetched data
    return (
      <Card>
        <Card.Img
          src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[Not+Available]'}
          alt="Artwork"
        />
        <Card.Body>
          <Card.Title>{title || 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {objectDate || 'N/A'}
            <br />
            <strong>Classification:</strong> {classification || 'N/A'}
            <br />
            <strong>Medium:</strong> {medium || 'N/A'}
          </Card.Text>
          <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="primary">{objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
  // If there's no data yet, return null
  return null;
};
