import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '../lib/userData';

export default function AdvancedSearch() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      searchBy: "",
      geoLocation: "",
      medium: "",
      isOnView: "",
      isHighlight: "",
      q: "",
    },
  });

  useEffect(() => {
    let data = {
      searchBy: "true",
      geoLocation: "",
      medium: "",
      isOnView: "false",
      isHighlight: "false",
      q: "q",
    };

    // Set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, [setValue]); // Include setValue in the dependency array

  const submitForm = async (data) => {
    let queryString = "";
    if (data.searchBy) queryString += `${data.searchBy}=true`;
    else queryString += "title=true";
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;
    console.log(queryString);
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };
  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            {errors.q ? (
              <Form.Control
                className="is-invalid form-control"
                type="text"
                placeholder=""
                name="q"
                {...register("q", { required: true })}
                defaultValue=""
              />
            )
             : (
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                {...register("q", { required: true })}
                defaultValue=""
              />
            )
            }
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select  name="searchBy" className="mb-3"
            {...register("searchBy")} >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control   type="text" placeholder="" name="geoLocation"
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
            Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;
            China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text"  placeholder=""  name="medium"
              {...register("medium")}  />
            <Form.Text className="text-muted">
            Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.),
             with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            {...register("isHighlight")}
    defaultChecked={true}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            {...register("isOnView")}
    defaultChecked={false}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

