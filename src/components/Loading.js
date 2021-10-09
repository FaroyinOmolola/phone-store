import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Error() {
	return (
		<div className="pt-4">
			<Modal.Dialog className="" centered>
				<Modal.Header className="mx-auto border-0">
					<Spinner animation="border" variant="warning" />
				</Modal.Header>
			</Modal.Dialog>
		</div>
	);
}

export default Error;
