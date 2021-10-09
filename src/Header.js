import React from "react";
// import {useSelector} from "react-redux"
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
	// const [q, setQ] = useState("");
	// const [searchParam] = useState(["capital", "name"]);

	// const fetchedData = useSelector((state) => state.dataReturned);
	//  const { dataReturned } = fetchedData;

	// return items.filter((item) => {
	//               return searchParam.some((newItem) => {
	//                   return (
	//                       item[newItem]
	//                           .toString()
	//                           .toLowerCase()
	//                           .indexOf(q.toLowerCase()) > -1
	//                   );
	//               });
	//           });
	//       }

	return (
		<div className="pt-4">
			<Container>
				<Row>
					<Col>
						<h1>iPhone Store</h1>
					</Col>
					<Col>
						<InputGroup className="rounded-pill">
							<Form.Control
								type="search"
								name="search-iphone"
								id="search-iphone"
								// value={q}
								// onChange={(e)=>setQ(e.target.value)}
							/>
							<Button variant="warning" type="button">
								Search
							</Button>
						</InputGroup>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Header;
