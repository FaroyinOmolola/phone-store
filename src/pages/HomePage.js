import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Button,
  InputGroup,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MultiRangeSlider from "multi-range-slider-react";
import { dataFetched } from "../actions/DataActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function HomePage() {
  // dispatch fetch data action
  const [queryParams, setQueryParams] = useState({ page: 1 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataFetched(queryParams));
  }, [dispatch, queryParams]);
  console.log(queryParams);

  // access fetched data from store
  const fetchedData = useSelector((state) => state.dataReturned);
  const { loading, error, dataReturned } = fetchedData;

  //handle search
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    let search = searchTerm
      .toUpperCase()
      .split(",")
      .map((value) => value.trim());
    let byGrade = search.find((each) => /^[A-Z]{1}\d{1}$/.test(each));
    let byStorage = search.find((each) => /^\d{2,3}(GB|MB|TB)$/.test(each));
    if (byStorage || byGrade)
      setQueryParams((prev) => {
        return { ...prev, storage: byStorage, grade: byGrade };
      });
  };

  //handle phone category
  const [category, setCategory] = useState({
    Apple: true,
    Huawei: true,
    Samsung: true,
    Google: true,
    LG: true,
    OnePlus: true,
    Motorola: true,
  });
  const categoryHandler = (e) => {
    setCategory((prev) => {
      return { ...prev, [e.target.name]: e.target.checked };
    });
    let brand = "";
    for (let key in category) {
      if (
        (category[key] && key !== e.target.name) ||
        (e.target.name === key && e.target.checked)
      )
        brand += key + ",";
    }
    setQueryParams((prev) => {
      return { ...prev, brand };
    });
  };

  //handle price range
  const [minValue, set_minValue] = useState(50);
  const [maxValue, set_maxValue] = useState(2000);
  const handleInput = (e) => {
    set_minValue((prev) => (prev = e.minValue));
    set_maxValue((prev) => (prev = e.maxValue));
  };
  const handleApplyPrice = () => {
    setQueryParams((prev) => {
      return { ...prev, minPrice: minValue, maxPrice: maxValue };
    });
  };

  //handle storage size
  const [storageSize, setStorageSize] = useState({
    "512GB": true,
    "256GB": true,
    "128GB": true,
    "64GB": true,
    "32GB": true,
    "8GB": true,
    "16GB": true,
  });
  const storageSizeHandler = (e) => {
    setStorageSize((prev) => {
      return { ...prev, [e.target.name]: e.target.checked };
    });
    let storage = [];
    for (let key in storageSize) {
      if (
        (storageSize[key] && key !== e.target.name) ||
        (e.target.name === key && e.target.checked)
      )
        storage.push(key);
    }
    setQueryParams((prev) => {
      return { ...prev, storage: storage.join(",") };
    });
  };

  //handle pagination
  const [page, setPage] = useState(queryParams.page);
  let items = "";
  const handleChange = (event, value) => {
    setPage(value);
    setQueryParams((prev) => {
      return { ...prev, page: page };
    });
  };
  items = (
    <Stack spacing={2} sx={{ mx: "auto" }}>
      <Pagination
        count={Math.ceil(dataReturned?.total / 20)}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );

  return (
    <div className="">
      <main className="main p-3">
        <Container className="">
          <header>
            <Row>
              <Col md="4">
                <p className="fs-3">Phone Store</p>
              </Col>
              <Col md="6" className="mb-3">
                <InputGroup className="me-auto">
                  <Form.Control
                    type="search"
                    name="search-iphone"
                    id="search-iphone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    onClick={handleSearch}
                    variant="warning"
                    type="button"
                    className="text-white "
                  >
                    Search
                  </Button>
                </InputGroup>
              </Col>
              <Col md={2}>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  className="text-center"
                  overlay={
                    <Popover id="popover-positioned" className="p-0">
                      <Popover.Body>
                        <aside className="pt-3 px-2 px-lg-3 aside">
                          <Form>
                            <p className="mb-1">Category</p>
                            <Form.Check
                              className=""
                              type="checkbox"
                              id="apple"
                              label="Apple"
                              name="Apple"
                              checked={category.Apple}
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="samsung"
                              label="Samsung"
                              name="Samsung"
                              checked={category.Samsung}
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="google"
                              checked={category.Google}
                              label="Google"
                              name="Google"
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="huawei"
                              checked={category.Huawei}
                              name="Huawei"
                              label="Huawei"
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="lg"
                              checked={category.LG}
                              label="LG"
                              name="LG"
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="motorola"
                              checked={category.Motorola}
                              name="Motorola"
                              label="Motorola"
                              onChange={categoryHandler}
                            />
                            <Form.Check
                              type="checkbox"
                              id="oneplus"
                              checked={category.OnePlus}
                              name="OnePlus"
                              label="OnePlus"
                              onChange={categoryHandler}
                            />

                            <div>
                              <p className="pt-2 mt-2 mb-0">Price Range</p>
                              <MultiRangeSlider
                                min={0}
                                max={2500}
                                step={50}
                                ruler={false}
                                label={false}
                                preventWheel={false}
                                minValue={minValue}
                                maxValue={maxValue}
                                onChange={(e) => {
                                  handleInput(e);
                                }}
                              />
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    inputMode="numeric"
                                    id="min"
                                    className="py-0 fs-6 px-1"
                                    name="min"
                                    value={minValue}
                                    onChange={(e) => {
                                      handleInput(e);
                                    }}
                                  />
                                </Col>
                                <Col>
                                  {" "}
                                  <Form.Control
                                    type="text"
                                    inputMode="numeric"
                                    id="max"
                                    name="max"
                                    className="py-0 fs-6 px-1"
                                    value={maxValue}
                                    onChange={(e) => {
                                      handleInput(e);
                                    }}
                                  ></Form.Control>
                                </Col>
                              </Row>

                              <Button
                                type="button"
                                variant="warning"
                                className="py-0 w-75 mx-auto mt-2 mb-0"
                                onClick={handleApplyPrice}
                              >
                                Apply
                              </Button>
                            </div>

                            <div>
                              <p className="pt-2 mt-2 mb-0">Storage size</p>
                              <Form.Check
                                type="checkbox"
                                id="8GB"
                                label="8GB"
                                name="8GB"
                                checked={storageSize["8GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="16GB"
                                label="16GB"
                                name="16GB"
                                checked={storageSize["16GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="32GB"
                                label="32GB"
                                name="32GB"
                                checked={storageSize["32GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="64GB"
                                label="64GB"
                                name="64GB"
                                checked={storageSize["64GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="128GB"
                                label="128GB"
                                name="128GB"
                                checked={storageSize["128GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="256GB"
                                label="256GB"
                                name="256GB"
                                checked={storageSize["256GB"]}
                                onChange={storageSizeHandler}
                              />
                              <Form.Check
                                type="checkbox"
                                id="512GB"
                                label="512GB"
                                name="512GB"
                                checked={storageSize["512GB"]}
                                onChange={storageSizeHandler}
                              />
                            </div>
                          </Form>
                        </aside>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button variant="warning" className="w-50">
                    Filter
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </header>
        </Container>

        <Container className="pt-3">
          {loading && <Loading />}
          {error && (
            <Error>
              <p className="text-danger fs-5">
                Error: check internet connection and try again or contact
                customer care!
              </p>
            </Error>
          )}
          <Row>
            {dataReturned?.data?.map((res) => (
              <Col key={res?._id} className="my-4 mx-auto">
                <Card
                  key={res?._id}
                  style={{
                    width: "14rem",
                    background: "#d3d3d34d",
                  }}
                  className="mx-auto p-2 rounded-3 card-sm-width"
                >
                  {" "}
                  <Badge bg="warning" className="w-max-content ms-auto">
                    {res?.lowestAsk?.grade}
                  </Badge>
                  <Card.Img variant="top" className="w-75" src={res?.imgUrl} />
                  <Card.Body className="pb-0 pe-0">
                    <Card.Title>{res?.name}</Card.Title>
                    <Card.Text className="mb-0">
                      {res?.lowestAsk?.carrier} | {res?.lowestAsk?.storageSize}
                    </Card.Text>
                    <Card.Text className="mb-0">
                      <small>Unit Price</small>
                    </Card.Text>
                    <Card.Text className="mb-0 fwt-bold fs-5">
                      <span>$</span>
                      {res?.lowestAsk?.price}
                    </Card.Text>
                    <Card.Text className="mb-0">
                      {res?.quantity} Available
                    </Card.Text>
                    <Card.Text className="d-flex mt-2">
                      <Button
                        type="button"
                        variant="warning"
                        className="mx-auto w-75"
                      >
                        BUY
                      </Button>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <div className="justify-concent-center">{items}</div>
      </main>
    </div>
  );
}

export default HomePage;
